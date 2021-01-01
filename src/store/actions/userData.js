import {
  SET_ALL,
  SET_GROUP_ID,
  SET_GROUP_NAME,
  SET_FACULTY,
  SET_THEME,
  SET_PLATFORM,
  SET_POST,
  SET_TEACHER_ID,
  SET_TEACHER_NAME,
} from '../actions/actionTypes'

export function setAll(groupId, groupName, faculty, theme, platform, post, teacherId, teacherName) {
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
export function setPost(post) {
  return {
    type: SET_POST,
    post,
  }
}
export function setTeacherId(teacherId) {
  return {
    type: SET_TEACHER_ID,
    teacherId,
  }
}
export function setTeacherName(teacherName) {
  return {
    type: SET_TEACHER_NAME,
    teacherName,
  }
}
