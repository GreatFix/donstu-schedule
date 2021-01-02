import { ERROR_TEACHERS, SUCCESS_TEACHERS, FETCHING_TEACHERS } from '../actions/actionTypes'
import axios from 'axios'

function error() {
  return {
    type: ERROR_TEACHERS,
  }
}
function success(teachers) {
  return {
    type: SUCCESS_TEACHERS,
    teachers,
  }
}
function fetching() {
  return {
    type: FETCHING_TEACHERS,
  }
}
export function fetchTeachers() {
  return (dispatch) => {
    dispatch(fetching())
    //const store = getStore()
    //const year = store.fetchScheduleGroup.schedule.year
    const url = `https://edu.donstu.ru/api/raspTeacherlist?year=2020-2021`
    axios({
      url,
      crossDomain: true,
      timeout: 20000,
    }).then(
      (res) => {
        const teachers = res.data.data
        dispatch(success(teachers))
      },
      (err) => {
        dispatch(error(err))
      }
    )
  }
}
