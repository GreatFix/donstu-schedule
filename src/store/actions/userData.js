import { SET_ALL, SET_GROUP_ID, SET_GROUP_NAME, SET_FACULTY, SET_THEME, SET_PLATFORM } from '../actions/actionTypes'

export function setAll(groupId, groupName, faculty, theme, platform) {
  return {
    type: SET_ALL,
    groupId,
    groupName,
    faculty,
    theme,
    platform,
  }
}
export function setGroupId(groupId) {
  return {
    type: SET_GROUP_ID,
    groupId,
  }
}
export function setGroupName(groupName) {
  return {
    type: SET_GROUP_NAME,
    groupName,
  }
}
export function setFaculty(faculty) {
  return {
    type: SET_FACULTY,
    faculty,
  }
}
export function setTheme(theme) {
  return {
    type: SET_THEME,
    theme,
  }
}
export function setPlatform(platform) {
  return {
    type: SET_PLATFORM,
    platform,
  }
}
