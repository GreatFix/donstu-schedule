import { ERROR_TEACHER_GROUPS, SUCCESS_TEACHER_GROUPS, FETCHING_TEACHER_GROUPS } from '../actions/actionTypes'
import axios from 'axios'

function error() {
  return {
    type: ERROR_TEACHER_GROUPS,
  }
}
function success(groups) {
  return {
    type: SUCCESS_TEACHER_GROUPS,
    groups,
  }
}
function fetching() {
  return {
    type: FETCHING_TEACHER_GROUPS,
  }
}

export function fetchTeacherGroups() {
  return (dispatch, getStore) => {
    dispatch(fetching())
    const store = getStore()
    const teacherId = store.userData.teacherId
    const url = `https://edu.donstu.ru/api/Rasp?idTeacher=${teacherId}`

    axios({
      url,
      crossDomain: true,
      timeout: 20000,
    }).then(
      (res) => {
        if (res.data.data.info.prepod.name) {
          const groups = getGroups(res.data.data)
          dispatch(success(groups))
        }
      },
      (err) => {
        dispatch(error(err))
      }
    )
  }
}

function getGroups(data) {
  if (data) {
    let groups = new Set()
    let lessons = Object.keys(data.rasp)
    lessons.forEach((les) => {
      const name = data.rasp[les].группа
      if (name.includes(',')) {
        const names = name.split(',')
        names.forEach((name) => groups.add(name))
      } else groups.add(name)
    })
    return [...groups]
  }
}
