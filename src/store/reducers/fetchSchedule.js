import { ERROR_SCHEDULE, SUCCESS_SCHEDULE, FETCHING_SCHEDULE, CLEAR_SCHEDULE } from '../actions/actionTypes'

const initialState = {
  schedule: null,
  fetching: false,
  error: null,
}

export function fetchScheduleReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_SCHEDULE:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_SCHEDULE:
      return {
        ...state,
        fetching: false,
        schedule: action.schedule,
      }
    case FETCHING_SCHEDULE:
      return { ...state, fetching: true }
    case CLEAR_SCHEDULE:
      return { ...state, schedule: null }
    default:
      return state
  }
}
