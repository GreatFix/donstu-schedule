import { SET_ALL, SET_GROUP_ID, SET_GROUP_NAME, SET_FACULTY, SET_THEME, SET_PLATFORM } from '../actions/actionTypes'

const initialState = {
  groupId: null,
  groupName: null,
  faculty: null,
  theme: null,
  platform: null,
}

export function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL:
      return {
        ...state,
        groupId: action.groupId,
        groupName: action.groupName,
        faculty: action.faculty,
        theme: action.theme,
        platform: action.platform,
      }
    case SET_GROUP_ID:
      return { ...state, groupId: action.groupId }
    case SET_GROUP_NAME:
      return { ...state, groupName: action.groupName }
    case SET_FACULTY:
      return { ...state, faculty: action.faculty }
    case SET_THEME:
      return { ...state, theme: action.theme }
    case SET_PLATFORM:
      return { ...state, theme: action.platform }
    default:
      return state
  }
}
