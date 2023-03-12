import { useQuery } from '@tanstack/react-query'
import { donstuAPI } from 'api/services/donstuAPI'
import { DateTime } from 'luxon'
import { AcademicYear } from 'shared/types/date'

const START_MONTH_ACADEMIC_YEAR = [1, 2, 3, 4, 5, 6, 7]

export const useAcademycYear = () =>
  useQuery(
    [donstuAPI.urls.getListYears],
    async () => {
      try {
        const res = await donstuAPI.getListYears()

        const { data } = res.data
        const { years } = data

        if (years?.length > 0) {
          return years[years.length - 1]
        } else {
          throw new Error('academic year undefined')
        }
      } catch (err) {
        const currentYear = new Date().getFullYear()
        const currentMonth = DateTime.local().month
        const currentAcademicYearStart = START_MONTH_ACADEMIC_YEAR.includes(currentMonth)
          ? currentYear - 1
          : currentYear

        return `${currentAcademicYearStart}-${currentAcademicYearStart + 1}` as AcademicYear
      }
    },
    {
      refetchInterval: false,
      refetchOnMount: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  )
