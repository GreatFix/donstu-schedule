import { combineReducers } from 'redux'
import { dateReducer } from './reducers/date'
import { userDataReducer } from './reducers/userData'
import { fetchScheduleReducer } from './reducers/fetchSchedule'
import { fetchGroupsReducer } from './reducers/fetchGroups'
import { fetchTeachersReducer } from './reducers/fetchTeachers'

export const rootReducer = combineReducers({
  date: dateReducer,
  userData: userDataReducer,
  fetchSchedule: fetchScheduleReducer,
  fetchGroups: fetchGroupsReducer,
  fetchTeachers: fetchTeachersReducer,
})
