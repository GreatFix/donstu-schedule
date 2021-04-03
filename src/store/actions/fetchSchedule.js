import { ERROR_SCHEDULE, SUCCESS_SCHEDULE, FETCHING_SCHEDULE, CLEAR_SCHEDULE } from './actionTypes'
import axios from 'axios'
import { toggleOff, setDate } from './date'
import { DateTime } from 'luxon'

function error(error) {
  return {
    type: ERROR_SCHEDULE,
    error,
  }
}
function success(schedule) {
  return {
    type: SUCCESS_SCHEDULE,
    schedule,
  }
}
function fetching() {
  return {
    type: FETCHING_SCHEDULE,
  }
}
export function clearSchedule() {
  return {
    type: CLEAR_SCHEDULE,
  }
}
export function fetchSchedule() {
  return (dispatch, getStore) => {
    dispatch(fetching())
    const store = getStore()
    const toggleWeek = store.date.toggleWeek
    const date = store.date.date
    let url = ''
    const post = store.userData.post
    if (post === 'Студент') {
      const groupId = store.userData.groupId
      if (!groupId) {
        dispatch(error('Error: Группа не выбрана'))
        return
      }
      url = `https://edu.donstu.ru/api/Rasp?idGroup=${groupId}&sdate=${date}`
    } else if (post === 'Преподаватель') {
      const teacherId = store.userData.teacherId
      if (!teacherId) {
        dispatch(error('Error: Преподаватель не выбран'))
        return
      }
      url = `https://edu.donstu.ru/api/Rasp?idTeacher=${teacherId}&sdate=${date}`
    } else {
      dispatch(error('Error: Ошибка при определении должности. Сообщите разработчику..'))
      return
    }
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
              if (newDate) dispatch(setDate(newDate))
            } else if (toggleWeek === 'NEXT') {
              let days = tempData.days
              let newDate = null
              for (let i = 6; i >= 0; i--) {
                if (Object.keys(days[i].lessons).length) newDate = days[i].date
              }
              if (newDate) dispatch(setDate(newDate))
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

function dataTransformation(data) {
  if (data) {
    let days = {}
    let startDate = DateTime.fromISO(data.info.date) //устанавливаем дату понедельника

    for (let i = 0; i < 7; i++) {
      days[i] = { dayWeekName: '', day: '', lessons: {}, date: '' }
      days[i].date = startDate.plus({ days: i }).toISODate() //Задаем дату для каждого дня недели
    }

    let lessons = Object.keys(data.rasp)
    let received = false
    lessons.length === 0 ? (received = false) : (received = true) //Проверка на наличие данных в расписании

    lessons.forEach((les) => {
      let key = data.rasp[les].деньНедели - 1

      if (!days[key].dayWeekName) days[key].dayWeekName = data.rasp[les].день_недели
      if (!days[key].day) days[key].day = DateTime.fromISO(data.rasp[les].дата).day
      const currentDate = DateTime.local()

      const currentTime = currentDate.hour + ':' + currentDate.minute
      const start = data.rasp[les].начало.replace('-', ':')
      const end = data.rasp[les].конец.replace('-', ':')
      if (!days[key].lessons[`${start}-${end}`]) days[key].lessons[`${start}-${end}`] = {}

      let currentLesson = false //определение текущего занятия
      if (
        checkCurrentLesson(currentTime, start, end) &&
        checkCurrentDay(currentDate, days[key].date)
      )
        currentLesson = true
      const [typeL, ...nameAndSubgroupL] = data.rasp[les].дисциплина.split(' ')
      const [name] = nameAndSubgroupL.join(' ').split(',')

      let type = ''
      switch (typeL) {
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
          type = 'Физ. воспитание'
          break
        case 'экз':
          type = 'Экзамен'
          break
        case 'зач':
          type = 'Зачёт'
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

      const aud = data.rasp[les].аудитория
      const teacher = data.rasp[les].преподаватель
      const group = data.rasp[les].группа

      days[key].lessons[`${start}-${end}`][data.rasp[les].код] = {
        start,
        end,
        name,
        aud,
        teacher,
        group,
        type,
        number,
        currentLesson,
      }
    })

    let temp = {
      //WeekID: data.info.selectedNumNed, отключены за ненадобностью
      //Day: data.info.curNumNed,
      //Semester: data.info.curSem,
      //Year: data.info.year,
      //GroupName: data.info.group.name,
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
  if (currentDate.day === checkingDate.day && currentDate.month === checkingDate.month) return true
  else return false
}
