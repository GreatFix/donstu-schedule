import {
  ERROR_SCHEDULE_GROUP,
  SUCCESS_SCHEDULE_GROUP,
  FETCHING_SCHEDULE_GROUP,
  CLEAR_SCHEDULE_GROUP,
} from './actionTypes'
import axios from 'axios'
import { toggleOff, setDate } from './date'

function error() {
  return {
    type: ERROR_SCHEDULE_GROUP,
  }
}
function success(schedule) {
  return {
    type: SUCCESS_SCHEDULE_GROUP,
    schedule,
  }
}
function fetching() {
  return {
    type: FETCHING_SCHEDULE_GROUP,
  }
}
export function clearScheduleGroup() {
  return {
    type: CLEAR_SCHEDULE_GROUP,
  }
}
export function fetchScheduleGroup() {
  return (dispatch, getStore) => {
    dispatch(fetching())
    const store = getStore()
    const groupId = store.userData.groupId
    const date = store.date.date
    const toggleWeek = store.date.toggleWeek
    const url = `https://edu.donstu.ru/api/Rasp?idGroup=${groupId}&sdate=${date}`
    axios({
      url,
      crossDomain: true,
      timeout: 20000,
    }).then(
      (res) => {
        if (res.data.data.info.group.name || res.data.data.info.prepod.name) {
          let tempData = dataTransformation(res.data.data)
          dispatch(success(tempData))
          if (toggleWeek) {
            dispatch(toggleOff())
            if (toggleWeek === 'PREV') {
              let days = tempData.days
              let newDate = null
              for (let i = 0; i < 7; i++) {
                if (Object.keys(days[i].lessons).length) newDate = days[i].date
              }
              if (newDate) dispatch(setDate(new Date(newDate)))
            } else if (toggleWeek === 'NEXT') {
              let days = tempData.days
              let newDate = null
              for (let i = 6; i >= 0; i--) {
                if (Object.keys(days[i].lessons).length) newDate = days[i].date
              }
              if (newDate) dispatch(setDate(new Date(newDate)))
            }
          }
        }
      },
      (err) => {
        dispatch(error(err))
        if (toggleWeek) dispatch(toggleOff())
      }
    )
  }
}

const dataTransformation = (data) => {
  if (data) {
    let days = {}
    let startDate = new Date(data.info.date)

    for (let i = 0; i < 7; i++) {
      days[i] = { dayWeekName: '', day: '', lessons: {}, date: '' }
    }

    for (let i = 0; i < 7; i++) {
      days[i].date = new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0]
    }

    let lessons = Object.keys(data.rasp)
    let received = false
    lessons.length === 0 ? (received = false) : (received = true) //Проверка на наличие данных в расписании
    lessons.forEach((les) => {
      let key = data.rasp[les].деньНедели - 1

      if (!days[key].dayWeekName) days[key].dayWeekName = data.rasp[les].день_недели
      if (!days[key].day) days[key].day = new Date(data.rasp[les].дата).getDate()

      const start = data.rasp[les].начало.replace('-', ':')
      const end = data.rasp[les].конец.replace('-', ':')
      if (!days[key].lessons[`${start}-${end}`]) days[key].lessons[`${start}-${end}`] = {}

      let type = ''
      switch (data.rasp[les].дисциплина.split(' ')[0]) {
        case 'лек':
          type = 'Лекция'
          break
        case 'лаб':
          type = 'Лабораторная'
          break
        case 'пр.':
          type = 'Практика'
          break
        default:
          type = ''
      }
      let number = 0
      switch (start) {
        case '8:30':
          number = 1
          break
        case '10:15':
          number = 2
          break
        case '12:00':
          number = 3
          break
        case '14:15':
          number = 4
          break
        case '16:00':
          number = 5
          break
        case '17:45':
          number = 6
          break
        case '19:30':
          number = 7
          break
        case '21:15':
          number = 8
          break
        default:
          number = 0
      }

      const name = data.rasp[les].дисциплина.split(' ').slice(1).join(' ')
      const aud = data.rasp[les].аудитория
      const teacher = data.rasp[les].преподаватель

      days[key].lessons[`${start}-${end}`][data.rasp[les].код] = {
        start,
        end,
        name,
        aud,
        teacher,
        type,
        number,
      }
    })

    let temp = {
      WeekID: data.info.selectedNumNed,
      Day: data.info.curNumNed,
      Semester: data.info.curSem,
      Year: data.info.year,
      GroupName: data.info.group.name,
      days: { ...days },
      received: received,
    }

    return temp
  }
}
