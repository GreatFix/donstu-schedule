import { ERROR_TEACHER_GROUPS, SUCCESS_TEACHER_GROUPS, FETCHING_TEACHER_GROUPS } from '../actions/actionTypes'

const initialState = {
  groups: null,
  fetching: false,
  error: null,
}

export function fetchTeacherGroupsReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_TEACHER_GROUPS:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_TEACHER_GROUPS:
      return {
        ...state,
        fetching: false,
        groups: action.groups,
      }
    case FETCHING_TEACHER_GROUPS:
      return { ...state, fetching: true }
    default:
      return state
  }
}
