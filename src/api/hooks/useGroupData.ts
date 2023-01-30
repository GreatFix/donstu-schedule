import { useQuery } from '@tanstack/react-query'
import { donstuAPI } from 'api/services/donstuAPI'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { ISODate } from 'shared/types/date'

export const useGroupData = (date?: ISODate) => {
  const {
    data: { groupId, post },
  } = useUserConfig()

  return useQuery(
    ['useGroupData', groupId, date],
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const res = await donstuAPI.getGroupScheduleById(groupId!, date)

      return res.data.data
    },
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!groupId && post === 'group',
    }
  )
}
