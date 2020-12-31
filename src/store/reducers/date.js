import { SET_DATE_TOGGLE_WEEK, SET_DATE, TOGGLE_OFF } from '../actions/actionTypes'

const initialState = {
  date: null,
  toggleWeek: false,
}

export function dateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATE_TOGGLE_WEEK:
      return { ...state, date: action.date, toggleWeek: true }
    case SET_DATE:
      return { ...state, date: action.date }
    case TOGGLE_OFF:
      return { ...state, toggleWeek: false }
    default:
      return state
  }
}
