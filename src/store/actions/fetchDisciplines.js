import { ERROR_DISCIPLINES, SUCCESS_DISCIPLINES, FETCHING_DISCIPLINES } from './actionTypes'
import axios from 'axios'

function error() {
  return {
    type: ERROR_DISCIPLINES,
  }
}
function success(disciplines) {
  return {
    type: SUCCESS_DISCIPLINES,
    disciplines,
  }
}
function fetching() {
  return {
    type: FETCHING_DISCIPLINES,
  }
}

export function fetchDisciplines() {
  return (dispatch, getStore) => {
    dispatch(fetching())
    const store = getStore()
    let url = ''
    const post = store.userData.post
    if (post === 'Студент') {
      const groupId = store.userData.groupId
      url = `https://edu.donstu.ru/api/Rasp?idGroup=${groupId}`
    } else if (post === 'Преподаватель') {
      const teacherId = store.userData.teacherId
      url = `https://edu.donstu.ru/api/Rasp?idTeacher=${teacherId}`
    } else {
      dispatch(error('Error: Ошибка при определении должности.'))
    }

    axios({
      url,
      crossDomain: true,
      timeout: 20000,
    }).then(
      (res) => {
        if (res.data.data.info.group.name) {
          const disciplines = getDisciplines(res.data.data)
          dispatch(success(disciplines))
        }
      },
      (err) => {
        dispatch(error(err))
      }
    )
  }
}

function getDisciplines(data) {
  if (data) {
    let disciplines = new Set()
    let lessons = Object.keys(data.rasp)
    lessons.forEach((les) => {
      const [, ...nameAndSubgroupL] = data.rasp[les].дисциплина.split(' ')
      let [name] = nameAndSubgroupL.join(' ').split(',')
      if (name.includes('(')) {
        ;[name] = name.split('(')
      }
      disciplines.add(name)
    })
    return [...disciplines]
  }
}
