import { ERROR_DISCIPLINES, SUCCESS_DISCIPLINES, FETCHING_DISCIPLINES } from '../actions/actionTypes'

const initialState = {
  disciplines: null,
  fetching: false,
  error: null,
}

export function fetchDisciplinesReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_DISCIPLINES:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_DISCIPLINES:
      return {
        ...state,
        fetching: false,
        disciplines: action.disciplines,
      }
    case FETCHING_DISCIPLINES:
      return { ...state, fetching: true }
    default:
      return state
  }
}
