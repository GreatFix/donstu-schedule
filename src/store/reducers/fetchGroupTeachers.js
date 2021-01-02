import { ERROR_GROUP_TEACHERS, SUCCESS_GROUP_TEACHERS, FETCHING_GROUP_TEACHERS } from '../actions/actionTypes'

const initialState = {
  teachers: null,
  fetching: false,
  error: null,
}

export function fetchGroupTeachersReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_GROUP_TEACHERS:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_GROUP_TEACHERS:
      return {
        ...state,
        fetching: false,
        teachers: action.teachers,
      }
    case FETCHING_GROUP_TEACHERS:
      return { ...state, fetching: true }
    default:
      return state
  }
}
