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

export function setAll(
  groupId,
  groupName,
  faculty,
  theme,
  platform,
  post,
  teacherId,
  teacherName,
  helpers
) {
  return {
    type: SET_ALL,
    groupId,
    groupName,
    faculty,
    theme,
    platform,
    post,
    teacherId,
    teacherName,
    helpers,
  }
}
export function setGroup(groupId, groupName, faculty) {
  return {
    type: SET_GROUP,
    groupId,
    groupName,
    faculty,
  }
}
export function setTeacher(teacherId, teacherName) {
  return {
    type: SET_TEACHER,
    teacherId,
    teacherName,
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
export function setPost(post) {
  return {
    type: SET_POST,
    post,
  }
}
export function setBridgeSupport(bridgeSupport) {
  return {
    type: SET_BRIDGE_SUPPORT,
    bridgeSupport,
  }
}
export function addHelpers(tag) {
  return {
    type: ADD_HELPERS,
    tag,
  }
}
