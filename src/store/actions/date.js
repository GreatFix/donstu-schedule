import {
  SET_DATE_TOGGLE_WEEK,
  SET_DATE,
  TOGGLE_OFF,
  SET_CURRENT_DATE,
  SET_ACADEMIC_YEAR,
} from '../actions/actionTypes'
import { fetchSchedule } from './fetchSchedule'
import { DateTime } from 'luxon'
import { getListYears } from '../../api'

const START_MONTH_ACADEMIC_YEAR = [1, 2, 3, 4, 5, 6, 7]

export function setDateToggleWeek(date, toggleWeek) {
  return {
    type: SET_DATE_TOGGLE_WEEK,
    date: date,
    dayWeekNum: formatDayWeek(date),
    toggleWeek,
  }
}
export function setDate(date) {
  return {
    type: SET_DATE,
    date: date,
    dayWeekNum: formatDayWeek(date),
  }
}
export function setCurrentDate() {
  return {
    type: SET_CURRENT_DATE,
    date: DateTime.local().toISODate(),
    dayWeekNum: formatDayWeek(DateTime.local().toISODate()),
  }
}
export function setAcademicYear(academicYear) {
  return {
    type: SET_ACADEMIC_YEAR,
    academicYear,
  }
}
export function toggleOff() {
  return {
    type: TOGGLE_OFF,
  }
}

export function fetchAcademicYear() {
  return async (dispatch) => {
    let year = ''
    try {
      const res = await getListYears()

      const { data } = res.data
      const { years } = data

      if (years?.length > 0) {
        year = years[years.length - 1]
      } else {
        throw new Error('academic year undefined')
      }
    } catch (err) {
      const currentYear = new Date().getFullYear()
      const currentMonth = DateTime.local().month
      const currentAcademicYearStart = START_MONTH_ACADEMIC_YEAR.includes(currentMonth)
        ? currentYear - 1
        : currentYear

      year = `${currentAcademicYearStart}-${currentAcademicYearStart + 1}`
    } finally {
      await dispatch(setAcademicYear(year))
      return year
    }
  }
}

export function nextWeek() {
  return (dispatch, getStore) => {
    let date = DateTime.fromSQL(getStore().date.date)

    switch (date.weekday) {
      case 0:
        date = date.plus({ days: 1 })
        break
      case 1:
        date = date.plus({ days: 7 })
        break
      case 2:
        date = date.plus({ days: 6 })
        break
      case 3:
        date = date.plus({ days: 5 })
        break
      case 4:
        date = date.plus({ days: 4 })
        break
      case 5:
        date = date.plus({ days: 3 })
        break
      case 6:
        date = date.plus({ days: 2 })
        break
      default:
        return console.error('Week not changed')
    }
    dispatch(setDateToggleWeek(date.toISODate(), 'NEXT'))
    dispatch(fetchSchedule())
  }
}

export function prevWeek() {
  return (dispatch, getStore) => {
    let date = DateTime.fromSQL(getStore().date.date)
    switch (date.weekday) {
      case 0:
        date = date.minus({ days: 8 })
        break
      case 1:
        date = date.minus({ days: 2 })
        break
      case 2:
        date = date.minus({ days: 3 })
        break
      case 3:
        date = date.minus({ days: 4 })
        break
      case 4:
        date = date.minus({ days: 5 })
        break
      case 5:
        date = date.minus({ days: 6 })
        break
      case 6:
        date = date.minus({ days: 7 })
        break
      default:
        return console.error('Week not changed')
    }
    dispatch(setDateToggleWeek(date.toISODate(), 'PREV'))
    dispatch(fetchSchedule())
  }
}

function formatDayWeek(date) {
  let dayWeekNum = DateTime.fromSQL(date).weekday
  dayWeekNum > 0 ? (dayWeekNum -= 1) : (dayWeekNum = 6)
  return dayWeekNum
}
