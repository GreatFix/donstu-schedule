import axios from 'axios'
import { AcademicYear, ISODate } from 'shared/types/date'
import { IClassroom, IGroup, ITeacher } from 'shared/types/donstu'

interface IDonstuResponse<T> {
  msg: string
  state: number
  data: T
}

interface IGetListYearsResponse {
  years: AcademicYear[]
}

interface ILessonFromApi {
  custom1: string
  аудитория: string
  вебинарЗапущен: boolean
  группа: string
  дата: string
  датаНачала: string
  датаОкончания: string
  день: string
  день_недели: string
  деньНедели: number
  дисциплина: string
  должность: string
  замена: boolean
  код: number
  код_Семестра: number
  кодВебинара: null | number
  кодГруппы: number
  кодПользователя: number
  кодПреподавателя: number
  кодыСтрок: number[]
  конец: string
  начало: string
  неделяНачала: number
  неделяОкончания: number
  номерЗанятия: number
  номерПодгруппы: number
  почта: string
  преподаватель: string
  созданиеВебинара: boolean
  ссылка: string | null
  тема: string
  типНедели: number
  учебныйГод: string
  фиоПреподавателя: string
  часы: string
  элементЦиклРасписания: boolean
}

export interface IScheduleData {
  info: {
    group: {
      name: string
      groupID: number
    }
    prepod: {
      name: string
    }
    aud: {
      name: string
    }
    year: string
    curWeekNumber: number
    curNumNed: number
    selectedNumNed: number
    curSem: number
    typesWeek: {
      typeWeekID: number
      name: string
      shortName: string
    }[]
    fixedInCache: boolean
    date: string
    lastDate: string
    dateUploadingRasp: string
  }
  isCyclicalSchedule: boolean
  rasp: ILessonFromApi[]
}

export const donstuAPI = {
  instance: axios.create({
    timeout: 15000,
    baseURL: 'https://edu.donstu.ru/api',
  }),

  urls: {
    getListYears: '/Rasp/ListYears',
    getTeacherList: '/raspTeacherlist',
    getGroupList: '/raspGrouplist',
    getClassroomList: '/raspAudlist',
    getTeacherScheduleById: '/Rasp',
    getGroupScheduleById: '/Rasp',
    getClassroomScheduleById: '/Rasp',
  },

  getListYears: () =>
    donstuAPI.instance.get<IDonstuResponse<IGetListYearsResponse>>(donstuAPI.urls.getListYears),

  getTeacherList: (year: AcademicYear) => {
    if (!year) {
      throw new RangeError('Invalid year')
    }

    return donstuAPI.instance.get<IDonstuResponse<ITeacher[]>>(donstuAPI.urls.getTeacherList, {
      params: { year },
    })
  },

  getGroupList: (year: AcademicYear) => {
    if (!year) {
      throw new RangeError('Invalid year')
    }

    return donstuAPI.instance.get<IDonstuResponse<IGroup[]>>(donstuAPI.urls.getGroupList, {
      params: { year },
    })
  },

  getClassroomList: (year: AcademicYear) => {
    if (!year) {
      throw new RangeError('Invalid year')
    }

    return donstuAPI.instance.get<IDonstuResponse<IClassroom[]>>(donstuAPI.urls.getClassroomList, {
      params: { year },
    })
  },

  getTeacherScheduleById: (idTeacher: string, sdate?: ISODate) => {
    if (!idTeacher) {
      throw new RangeError('Invalid idTeacher')
    }

    return donstuAPI.instance.get<IDonstuResponse<IScheduleData>>(
      donstuAPI.urls.getTeacherScheduleById,
      {
        params: { idTeacher, sdate },
      }
    )
  },

  getClassroomScheduleById: (idAudLine: string, sdate?: ISODate) => {
    if (!idAudLine) {
      throw new RangeError('Invalid idAudLine')
    }

    return donstuAPI.instance.get<IDonstuResponse<IScheduleData>>(
      donstuAPI.urls.getClassroomScheduleById,
      {
        params: { idAudLine, sdate },
      }
    )
  },

  getGroupScheduleById: (idGroup: string, sdate?: ISODate) => {
    if (!idGroup) {
      throw new RangeError('Invalid idGroup')
    }

    return donstuAPI.instance.get<IDonstuResponse<IScheduleData>>(
      donstuAPI.urls.getGroupScheduleById,
      {
        params: { idGroup, sdate },
      }
    )
  },
}
