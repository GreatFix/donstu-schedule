import { useQuery } from '@tanstack/react-query'
import { useAcademycYear } from 'api/hooks/useAcademycYear'
import { donstuAPI } from 'api/services/donstuAPI'

export const useClassroomList = () => {
  const { data: academycYear } = useAcademycYear()

  return useQuery(
    [donstuAPI.urls.getClassroomList, academycYear],
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const res = await donstuAPI.getClassroomList(academycYear!)

      return res.data.data
    },
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      enabled: !!academycYear,
    }
  )
}
