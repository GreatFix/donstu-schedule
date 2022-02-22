import {
  ERROR_TEACHER_GROUPS,
  SUCCESS_TEACHER_GROUPS,
  FETCHING_TEACHER_GROUPS,
} from '../actions/actionTypes'
import { getTeacherById } from '../../api'

function error(error) {
  return {
    type: ERROR_TEACHER_GROUPS,
    error,
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

    getTeacherById(teacherId).then(
      (res) => {
        if (res.data.data.info.prepod.name) {
          const groups = pullGroups(res.data.data)
          dispatch(success(groups))
        }
      },
      (err) => {
        dispatch(error(err))
      }
    )
  }
}

function pullGroups(data) {
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
