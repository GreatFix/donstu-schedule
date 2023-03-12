import { useQuery } from '@tanstack/react-query'
import { donstuAPI } from 'api/services/donstuAPI'
import { AxiosError } from 'axios'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { ISODate } from 'shared/types/date'

export const useClassroomData = (date?: ISODate, onError?: (err: AxiosError) => void) => {
  const {
    data: { classroomId, post },
  } = useUserConfig()

  return useQuery(
    [donstuAPI.urls.getGroupList, classroomId, date],
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const res = await donstuAPI.getClassroomScheduleById(classroomId!, date)

      return res.data.data
    },
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!classroomId && post === 'classroom',
      onError,
    }
  )
}
