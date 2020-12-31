import { SET_DATE_TOGGLE_WEEK, SET_DATE, TOGGLE_OFF } from '../actions/actionTypes'
import { fetchScheduleGroup } from './fetchScheduleGroup'
export function setDateToggleWeek(date) {
  return {
    type: SET_DATE_TOGGLE_WEEK,
    date: toFormatDate(date),
  }
}
export function setDate(date) {
  return {
    type: SET_DATE,
    date: toFormatDate(date),
  }
}
export function toggleOff() {
  return {
    type: TOGGLE_OFF,
  }
}

export function nextWeek() {
  return (dispatch, getStore) => {
    let date = new Date(getStore().date.date)

    switch (date.getDay()) {
      case 0:
        date.setDate(date.getDate() + 1)
        break
      case 1:
        date.setDate(date.getDate() + 7)
        break
      case 2:
        date.setDate(date.getDate() + 6)
        break
      case 3:
        date.setDate(date.getDate() + 5)
        break
      case 4:
        date.setDate(date.getDate() + 4)
        break
      case 5:
        date.setDate(date.getDate() + 3)
        break
      case 6:
        date.setDate(date.getDate() + 2)
        break
      default:
        return console.error('Week not changed')
    }
    dispatch(setDateToggleWeek(date))
    dispatch(fetchScheduleGroup())
  }
}

export function prevWeek() {
  return (dispatch, getStore) => {
    let date = new Date(getStore().date.date)

    switch (date.getDay()) {
      case 0:
        date.setDate(date.getDate() - 8)
        break
      case 1:
        date.setDate(date.getDate() - 2)
        break
      case 2:
        date.setDate(date.getDate() - 3)
        break
      case 3:
        date.setDate(date.getDate() - 4)
        break
      case 4:
        date.setDate(date.getDate() - 5)
        break
      case 5:
        date.setDate(date.getDate() - 6)
        break
      case 6:
        date.setDate(date.getDate() - 7)
        break
      default:
        return console.error('Week not changed')
    }
    dispatch(setDateToggleWeek(date))
    dispatch(fetchScheduleGroup())
  }
}

function toFormatDate(date) {
  if (typeof date === 'object') {
    let dd = date.getDate()
    if (dd < 10) dd = '0' + dd

    let mm = date.getMonth() + 1
    if (mm < 10) mm = '0' + mm

    let yyyy = date.getFullYear()

    return `${yyyy}-${mm}-${dd}`
  } else {
    return date
  }
}
