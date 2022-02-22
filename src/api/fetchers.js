import { DonstuAPI } from './instances'

export const getListYears = () =>
  DonstuAPI({
    url: `/Rasp/ListYears`,
  })

export const getTeacherList = (academicYear) => {
  if (!academicYear) {
    throw new RangeError('invalid academicYear')
  }

  return DonstuAPI({
    url: `/raspTeacherlist?year=${academicYear}`,
  })
}

export const getGroupList = (academicYear) => {
  if (!academicYear) {
    throw new RangeError('invalid academicYear')
  }

  return DonstuAPI({
    url: `/raspGrouplist?year=${academicYear}`,
  })
}

export const getTeacherById = (teacherId, date) => {
  if (!teacherId) {
    throw new RangeError('invalid teacherId')
  }

  return DonstuAPI({
    url: `/Rasp?idTeacher=${teacherId}${date ? `&sdate=${date}` : ''}`,
  })
}

export const getGroupById = (groupId, date) => {
  if (!groupId) {
    throw new RangeError('invalid groupId')
  }

  return DonstuAPI({
    url: `/Rasp?idGroup=${groupId}${date ? `&sdate=${date}` : ''}`,
  })
}

// export const fetchListYears = DonstuAPI({
//   url: `/Rasp/ListYears`,
// })export const fetchListYears = DonstuAPI({
//   url: `/Rasp/ListYears`,
// })export const fetchListYears = DonstuAPI({
//   url: `/Rasp/ListYears`,
// })export const fetchListYears = DonstuAPI({
//   url: `/Rasp/ListYears`,
// })
