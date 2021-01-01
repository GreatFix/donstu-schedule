import { ERROR_TEACHERS, SUCCESS_TEACHERS, FETCHING_TEACHERS } from '../actions/actionTypes'

const initialState = {
  teachers: null,
  fetching: false,
  error: null,
}

export function fetchTeachersReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_TEACHERS:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_TEACHERS:
      return {
        ...state,
        fetching: false,
        teachers: action.teachers,
      }
    case FETCHING_TEACHERS:
      return { ...state, fetching: true }
    default:
      return state
  }
}
