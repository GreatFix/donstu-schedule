import { AcademicYear, ISODate } from './date'

export interface IGroup {
  facul: string
  facultyID: number
  id: number
  kurs: number
  name: string
  yearName: AcademicYear
}

export interface ITeacher {
  id: number
  idFromRasp: boolean
  kaf: string
  name: string
}

export interface IClassroom {
  id: number
  name: string
}

export interface ILessonSubGroup {
  start: string
  end: string
  name: string
  aud: string
  teacher: string
  group: string
  type: 'Лабораторная' | 'Практика' | 'Экзамен' | 'Лекция' | 'Зачёт' | 'Физ. воспитание' | ''
  number: number
  currentLesson: boolean
  subgroup: string
}

/** Занятие -> подгруппа */
export type TLesson = Record<string, ILessonSubGroup>

/** Время -> занятие */
export type TLessons = Record<string, TLesson>

/** День */
export interface IDay {
  dayWeekName: string
  day: number
  date: ISODate
  lessons: TLessons
}
