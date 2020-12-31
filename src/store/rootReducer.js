import { combineReducers } from 'redux'
import { dateReducer } from './reducers/date'
import { userDataReducer } from './reducers/userData'
import { fetchScheduleGroupReducer } from './reducers/fetchScheduleGroup'
import { fetchGroupsReducer } from './reducers/fetchGroups'

export const rootReducer = combineReducers({
  date: dateReducer,
  userData: userDataReducer,
  fetchScheduleGroup: fetchScheduleGroupReducer,
  fetchGroups: fetchGroupsReducer,
})
