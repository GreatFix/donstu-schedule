import { ERROR_GROUPS, SUCCESS_GROUPS, FETCHING_GROUPS } from '../actions/actionTypes'

const initialState = {
  groups: null,
  faculties: null,
  fetching: false,
  error: null,
}

export function fetchGroupsReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_GROUPS:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_GROUPS:
      return {
        ...state,
        fetching: false,
        groups: action.groups,
        faculties: action.faculties,
      }
    case FETCHING_GROUPS:
      return { ...state, fetching: true }
    default:
      return state
  }
}
