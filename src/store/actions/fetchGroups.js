import { ERROR_GROUPS, SUCCESS_GROUPS, FETCHING_GROUPS } from './actionTypes'
import axios from 'axios'

function error() {
  return {
    type: ERROR_GROUPS,
  }
}
function success(groups, faculties) {
  return {
    type: SUCCESS_GROUPS,
    groups,
    faculties,
  }
}
function fetching() {
  return {
    type: FETCHING_GROUPS,
  }
}
export function fetchGroups() {
  return (dispatch) => {
    dispatch(fetching())
    //const store = getStore()
    //const year = store.fetchScheduleGroup.schedule.year
    const url = `https://edu.donstu.ru/api/raspGrouplist?year=2020-2021`
    axios({
      url,
      crossDomain: true,
      timeout: 20000,
    }).then(
      (res) => {
        const groups = res.data.data
        const faculties = Array.from(new Set(groups.map(({ facul }) => facul)))
        dispatch(success(groups, faculties))
      },
      (err) => {
        dispatch(error(err))
      }
    )
  }
}
