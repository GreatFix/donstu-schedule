import {
  ERROR_GROUP_TEACHERS,
  SUCCESS_GROUP_TEACHERS,
  FETCHING_GROUP_TEACHERS,
} from '../actions/actionTypes'
import { getGroupById } from '../../api'

function error(error) {
  return {
    type: ERROR_GROUP_TEACHERS,
    error,
  }
}
function success(teachers) {
  return {
    type: SUCCESS_GROUP_TEACHERS,
    teachers,
  }
}
function fetching() {
  return {
    type: FETCHING_GROUP_TEACHERS,
  }
}

export function fetchGroupTeachers() {
  return (dispatch, getStore) => {
    dispatch(fetching())
    const store = getStore()
    const groupId = store.userData.groupId

    getGroupById(groupId).then(
      (res) => {
        if (res.data.data.info.group.name) {
          const teachers = pullTeachers(res.data.data)
          dispatch(success(teachers))
        }
      },
      (err) => {
        dispatch(error(err))
      }
    )
  }
}

function pullTeachers(data) {
  if (data) {
    const teachers = []
    const nameListSet = new Set()
    const idListSet = new Set()
    const lessons = Object.keys(data.rasp)
    lessons.forEach((les) => {
      let name = data.rasp[les].преподаватель
      if (name.includes('.')) {
        ;[name] = name.split('.').reverse() // забираем фио без должности
      }
      nameListSet.add(name)

      let id = data.rasp[les].кодПреподавателя
      idListSet.add(id)
    })
    const nameList = [...nameListSet]
    const idList = [...idListSet]

    for (let i = 0; i < nameList.length; i++) teachers[i] = { name: nameList[i], id: idList[i] }

    return teachers
  }
}
