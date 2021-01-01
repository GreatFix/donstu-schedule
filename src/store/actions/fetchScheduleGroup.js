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
    let startDate = new Date(data.info.date) //устанавливаем дату понедельника

    for (let i = 0; i < 7; i++) {
      days[i] = { dayWeekName: '', day: '', lessons: {}, date: '' }
    }

    for (let i = 0; i < 7; i++) {
      days[i].date = new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().split('T')[0] //Задаем дату для каждого дня недели
    }

    let lessons = Object.keys(data.rasp)
    let received = false
    lessons.length === 0 ? (received = false) : (received = true) //Проверка на наличие данных в расписании
    lessons.forEach((les) => {
      let key = data.rasp[les].деньНедели - 1

      if (!days[key].dayWeekName) days[key].dayWeekName = data.rasp[les].день_недели
      if (!days[key].day) days[key].day = new Date(data.rasp[les].дата).getDate()

      const currentDate = new Date()
      const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes()
      const start = data.rasp[les].начало.replace('-', ':')
      const end = data.rasp[les].конец.replace('-', ':')
      if (!days[key].lessons[`${start}-${end}`]) days[key].lessons[`${start}-${end}`] = {}

      let currentLesson = false //определение текущего занятия
      if (checkCurrentLesson(currentTime, start, end) && checkCurrentDay(currentDate, days[key].date))
        currentLesson = true

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
        case 'фв':
          type = 'ФВ'
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
        currentLesson,
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

function checkCurrentLesson(currentTime, start, end) {
  const CT = currentTime.split(':')[0] * 3600 + currentTime.split(':')[1] * 60 //seconds
  const S = start.split(':')[0] * 3600 + start.split(':')[1] * 60
  const E = end.split(':')[0] * 3600 + end.split(':')[1] * 60

  if (CT >= S && CT <= E) return true
  else return false
}

function checkCurrentDay(currentDate, checkingDate) {
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.getMonth()
  const checkingDay = new Date(checkingDate).getDate()
  const checkingMonth = new Date(checkingDate).getMonth()

  if (currentDay === checkingDay && currentMonth === checkingMonth) return true
  else return false
}
