import { useQuery } from '@tanstack/react-query'
import { useAcademycYear } from 'api/hooks/useAcademycYear'
import { donstuAPI } from 'api/services/donstuAPI'

export const useGroupList = () => {
  const { data: academycYear } = useAcademycYear()

  return useQuery(
    [donstuAPI.urls.getGroupList, academycYear],
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const res = await donstuAPI.getGroupList(academycYear!)

      const groups = res.data.data
      const faculties = Array.from(new Set(groups.map(({ facul }) => facul)))

      return {
        groups,
        faculties,
      }
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
