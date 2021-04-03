import {
  SET_DATE_TOGGLE_WEEK,
  SET_DATE,
  TOGGLE_OFF,
  SET_CURRENT_DATE,
} from '../actions/actionTypes'

const initialState = {
  date: null,
  dayWeekNum: null,
  toggleWeek: null,
}

export function dateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATE_TOGGLE_WEEK:
      return {
        ...state,
        date: action.date,
        dayWeekNum: action.dayWeekNum,
        toggleWeek: action.toggleWeek,
      }
    case SET_DATE:
      return { ...state, date: action.date, dayWeekNum: action.dayWeekNum }
    case SET_CURRENT_DATE:
      return { ...state, date: action.date, dayWeekNum: action.dayWeekNum }
    case TOGGLE_OFF:
      return { ...state, toggleWeek: null }
    default:
      return state
  }
}
