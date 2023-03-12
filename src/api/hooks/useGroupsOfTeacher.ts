import { IScheduleData } from 'api/services/donstuAPI'

import { useTeacherData } from './useTeacherData'

export const useGroupsOfTeacher = () => {
  const { data, isFetching } = useTeacherData()

  return { data: pullGroups(data), isFetching: isFetching }
}

/** Парсим названия групп из расписания */
function pullGroups(data?: IScheduleData): string[] {
  if (data?.info?.prepod?.name) {
    const groups = new Set<string>()
    const lessons = Object.values(data.rasp)
    lessons.forEach((les) => {
      const name = les.группа

      if (name.includes(',')) {
        const names = name.split(',')
        names.forEach((name) => groups.add(name))
      } else groups.add(name)
    })

    return [...groups]
  }
  return []
}
