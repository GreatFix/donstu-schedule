import {
  ERROR_SCHEDULE_GROUP,
  SUCCESS_SCHEDULE_GROUP,
  FETCHING_SCHEDULE_GROUP,
  CLEAR_SCHEDULE_GROUP,
} from '../actions/actionTypes'

const initialState = {
  schedule: null,
  fetching: false,
  error: null,
}

export function fetchScheduleGroupReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_SCHEDULE_GROUP:
      return { ...state, fetching: false, error: action.error }
    case SUCCESS_SCHEDULE_GROUP:
      return {
        ...state,
        fetching: false,
        schedule: action.schedule,
      }
    case FETCHING_SCHEDULE_GROUP:
      return { ...state, fetching: true }
    case CLEAR_SCHEDULE_GROUP:
      return { ...state, schedule: null }
    default:
      return state
  }
}
