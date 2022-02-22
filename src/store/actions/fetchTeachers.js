import { ERROR_TEACHERS, SUCCESS_TEACHERS, FETCHING_TEACHERS } from '../actions/actionTypes'
import { fetchAcademicYear } from './date'
import { getTeacherList } from '../../api'

function error(error) {
  return {
    type: ERROR_TEACHERS,
    error,
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
  return async (dispatch, getStore) => {
    try {
      await dispatch(fetching())

      const { date } = getStore()

      const academicYear = date.academicYear || (await dispatch(fetchAcademicYear()))

      const res = await getTeacherList(academicYear)

      const teachers = res.data.data

      await dispatch(success(teachers))
    } catch (err) {
      dispatch(error(err))
    }
  }
}
