import { IScheduleData } from 'api/services/donstuAPI'
import { useUserConfig } from 'shared/contexts/UserConfig'

import { useClassroomData } from './useClassroomData'
import { useGroupData } from './useGroupData'
import { useTeacherData } from './useTeacherData'

const USE_HOOK = {
  teacher: useTeacherData,
  group: useGroupData,
  classroom: useClassroomData,
}

export const useDisciplines = () => {
  const {
    data: { post },
  } = useUserConfig()

  const { data, isFetching } = USE_HOOK[post]()

  return { data: pullDisciplines(data), isFetching }
}

/** Парсим названия предметов из расписания */
function pullDisciplines(data?: IScheduleData): string[] {
  if (!data?.info?.group?.name) return []

  const disciplines = new Set<string>()
  const lessons = Object.values(data.rasp)

  lessons.forEach((les) => {
    const [, ...nameAndSubgroupL] = les.дисциплина.split(' ')
    let [name] = nameAndSubgroupL.join(' ').split(',')
    if (name.includes('(')) {
      ;[name] = name.split('(')
    }
    if (name) {
      disciplines.add(name)
    }
  })

  return [...disciplines]
}
