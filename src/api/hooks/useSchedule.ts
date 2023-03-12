import { IScheduleData } from 'api/services/donstuAPI'
import { AxiosError } from 'axios'
import { DateTime } from 'luxon'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { ISODate } from 'shared/types/date'
import { IDay, ILessonSubGroup } from 'shared/types/donstu'

import { useClassroomData } from './useClassroomData'
import { useGroupData } from './useGroupData'
import { useTeacherData } from './useTeacherData'

const USE_HOOK = {
  teacher: useTeacherData,
  group: useGroupData,
  classroom: useClassroomData,
}

const CACHE_DATA: Record<'teacher' | 'group' | 'classroom', Record<ISODate, IDay>> = {
  teacher: {},
  group: {},
  classroom: {},
}

export const useSchedule = (date?: ISODate, onError?: (err: AxiosError) => void) => {
  const {
    data: { post },
  } = useUserConfig()

  const { data, isFetching, error, refetch } = USE_HOOK[post](date, onError)
  const transformedData = dataTransformation(data)

  CACHE_DATA[post] = { ...CACHE_DATA[post], ...transformedData }
  return {
    data: CACHE_DATA[post],
    isFetching,
    error: error as AxiosError,
    refetch,
  }
}

function dataTransformation(data?: IScheduleData): Record<ISODate, IDay> {
  if (!data) return {}
  if (!data.info?.group?.name && !data.info?.prepod?.name) return {}

  const days: Record<string, IDay> = {}

  const lessons = Object.values(data.rasp)

  lessons.forEach((les) => {
    const key = les.дата?.split('T')[0]
    if (!key) return
    const currentDate = DateTime.local()

    const currentTime = currentDate.hour + ':' + currentDate.minute
    const start = les.начало.replace('-', ':')
    const end = les.конец.replace('-', ':')

    days[key] = days[key] || { lessons: {} }
    days[key].lessons[`${start}-${end}`] = days[key]?.lessons[`${start}-${end}`] || {}

    const currentLesson =
      checkCurrentLesson(currentTime, start, end) &&
      checkCurrentDay(currentDate, DateTime.fromISO(days[key].date)) //определение текущего занятия

    const typeIndex = les.дисциплина.indexOf(' ')
    const typeCut = les.дисциплина.substring(0, typeIndex).toLowerCase()
    const fullName = les.дисциплина.substring(typeIndex).trim()

    let subgroup = '',
      name
    if (fullName.toLowerCase().includes('п/г')) {
      const index = fullName.toLowerCase().indexOf('п/г')
      subgroup = fullName.substring(index - 1).trim()
      name = fullName.substring(0, index - 2).trim()
    } else {
      name = fullName
    }

    const aud = les.аудитория
    const teacher = les.преподаватель
    const group = les.группа
    const type = LESSON_TYPE_MAP[typeCut] || ''
    const number = LESSON_NUMBER_MAP[start] || 0

    const lesson = days[key].lessons[`${start}-${end}`]

    lesson[les.код] = {
      start,
      end,
      name,
      aud,
      teacher,
      group,
      type,
      number,
      currentLesson,
      subgroup: subgroup || (Object.keys(lesson).length > 0 ? 'п/г 2' : 'п/г 1'),
    }
  })

  const dates = Object.keys(days)

  dates.forEach((date) => {
    const dateObject = DateTime.fromISO(date)

    days[date].dayWeekName = dateObject.weekdayLong
    days[date].date = dateObject.toISODate() as ISODate
    days[date].day = dateObject.day
  })

  return days
}

function checkCurrentLesson(currentTime: string, start: string, end: string) {
  const [hours = 0, minutes = 0] = currentTime.split(':')
  const [startHours = 0, startMinutes = 0] = start.split(':')
  const [endHours = 0, endMinutes = 0] = end.split(':')
  const CT = Number(hours) * 3600 + Number(minutes) * 60 //seconds
  const S = Number(startHours) * 3600 + Number(startMinutes) * 60
  const E = Number(endHours) * 3600 + Number(endMinutes) * 60

  return CT >= S && CT <= E
}

function checkCurrentDay(currentDate: DateTime, checkingDate: DateTime) {
  const isCurrentMonth = currentDate.month === checkingDate.month
  const isCurrentDay = currentDate.day === checkingDate.day

  return isCurrentMonth && isCurrentDay
}

const LESSON_TYPE_MAP: Record<string, ILessonSubGroup['type']> = {
  лек: 'Лекция',
  лаб: 'Лабораторная',
  ['пр.']: 'Практика',
  фв: 'Физ. воспитание',
  экз: 'Экзамен',
  зач: 'Зачёт',
}

const LESSON_NUMBER_MAP: Record<string, number> = {
  '08:30': 1,
  '8:30': 1,
  '10:15': 2,
  '12:00': 3,
  '14:15': 4,
  '16:00': 5,
  '17:45': 6,
  '19:30': 7,
  '21:15': 8,
}
