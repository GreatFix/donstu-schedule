import { IScheduleData } from 'api/services/donstuAPI'

import { useGroupData } from './useGroupData'

export const useTeachersOfGroup = () => {
  const { data, isFetching } = useGroupData()

  return { data: pullTeachers(data), isFetching: isFetching }
}

/** Парсим преподавателей группы из расписания */
function pullTeachers(data?: IScheduleData): { name: string; id: string }[] {
  if (data?.info?.group?.name) {
    const lessons = Object.values(data.rasp)

    const teachersObject = lessons.reduce((acc, item) => {
      let name = item.преподаватель
      if (name.includes('.')) {
        name = name.split('.').reverse()[0] // забираем фио без должности
      }
      const id = item.кодПреподавателя

      return { ...acc, [id]: { name, id } }
    }, {})

    return Object.values(teachersObject)
  }

  return []
}
