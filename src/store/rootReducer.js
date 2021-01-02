import { combineReducers } from 'redux'
import { dateReducer } from './reducers/date'
import { userDataReducer } from './reducers/userData'
import { fetchScheduleReducer } from './reducers/fetchSchedule'
import { fetchGroupsReducer } from './reducers/fetchGroups'
import { fetchTeachersReducer } from './reducers/fetchTeachers'
import { fetchDisciplinesReducer } from './reducers/fetchDisciplines'
import { fetchTeacherGroupsReducer } from './reducers/fetchTeacherGroups'
import { fetchGroupTeachersReducer } from './reducers/fetchGroupTeachers'

export const rootReducer = combineReducers({
  date: dateReducer,
  userData: userDataReducer,
  fetchSchedule: fetchScheduleReducer,
  fetchGroups: fetchGroupsReducer,
  fetchTeachers: fetchTeachersReducer,
  fetchDisciplines: fetchDisciplinesReducer,
  fetchTeacherGroups: fetchTeacherGroupsReducer,
  fetchGroupTeachers: fetchGroupTeachersReducer,
})
