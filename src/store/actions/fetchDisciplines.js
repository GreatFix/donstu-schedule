import { ERROR_DISCIPLINES, SUCCESS_DISCIPLINES, FETCHING_DISCIPLINES } from './actionTypes'
import { getTeacherById, getGroupById } from '../../api'

function error(error) {
  return {
    type: ERROR_DISCIPLINES,
    error,
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
  return async (dispatch, getStore) => {
    try {
      await dispatch(fetching())
      const { userData } = getStore()
      let res = null
      const post = userData.post

      if (post === 'Студент') {
        const groupId = userData.groupId
        res = await getGroupById(groupId)
      } else if (post === 'Преподаватель') {
        const teacherId = userData.teacherId
        res = await getTeacherById(teacherId)
      } else {
        await dispatch(error('Error: Ошибка при определении должности.'))
      }

      if (res?.data.data?.info?.group?.name) {
        const disciplines = pullDisciplines(res.data.data)

        await dispatch(success(disciplines))
      }
    } catch (err) {
      await dispatch(error(err))
    }
  }
}

function pullDisciplines(data) {
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
