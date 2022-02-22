import { ERROR_GROUPS, SUCCESS_GROUPS, FETCHING_GROUPS } from './actionTypes'
import { fetchAcademicYear } from './date'
import { getGroupList } from '../../api'

function error(error) {
  return {
    type: ERROR_GROUPS,
    error,
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
  return async (dispatch, getStore) => {
    try {
      await dispatch(fetching())

      const { date } = getStore()

      const academicYear = date.academicYear || (await dispatch(fetchAcademicYear()))

      const res = await getGroupList(academicYear)

      const groups = res.data.data
      const faculties = Array.from(new Set(groups.map(({ facul }) => facul)))

      await dispatch(success(groups, faculties))
    } catch (err) {
      await dispatch(error(err))
    }
  }
}
