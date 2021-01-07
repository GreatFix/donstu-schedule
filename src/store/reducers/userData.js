import {
  SET_ALL,
  SET_GROUP,
  SET_TEACHER,
  SET_THEME,
  SET_PLATFORM,
  SET_POST,
  SET_BRIDGE_SUPPORT,
  ADD_HELPERS,
} from '../actions/actionTypes'

const initialState = {
  groupId: null,
  groupName: null,
  faculty: null,
  theme: null,
  platform: null,
  post: null,
  teacherId: null,
  teacherName: null,
  bridgeSupport: false,
  helpers: '',
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
        post: action.post,
        teacherId: action.teacherId,
        teacherName: action.teacherName,
        helpers: action.helpers,
      }
    case SET_GROUP:
      return {
        ...state,
        groupId: action.groupId,
        groupName: action.groupName,
        faculty: action.faculty,
      }
    case SET_TEACHER:
      return { ...state, teacherId: action.teacherId, teacherName: action.teacherName }
    case SET_THEME:
      return { ...state, theme: action.theme }
    case SET_PLATFORM:
      return { ...state, platform: action.platform }
    case SET_POST:
      return { ...state, post: action.post }
    case SET_BRIDGE_SUPPORT:
      return { ...state, bridgeSupport: action.bridgeSupport }
    case ADD_HELPERS:
      return { ...state, helpers: state.helpers + action.tag }
    default:
      return state
  }
}
