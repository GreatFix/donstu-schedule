import { DateTime } from 'luxon'
import { createContext, useContext } from 'react'
import { ISODate } from 'shared/types/date'

interface ScheduleDayContext {
  selectDate: React.Dispatch<React.SetStateAction<ISODate>>
  setWeekStartDate: React.Dispatch<React.SetStateAction<ISODate>>
  today: ISODate
  selectedDate: ISODate
  weekStartDate: ISODate
}

const INITIAL_STATE: ScheduleDayContext = {
  selectDate: () => {},
  setWeekStartDate: () => {},
  today: DateTime.now().toISODate() as ISODate,
  selectedDate: DateTime.now().toISODate() as ISODate,
  weekStartDate: (() => {
    const date = DateTime.now()
    date.minus({ days: date.weekday - 1 })

    return date.toISODate() as ISODate
  })(),
}

export const ScheduleDayContext = createContext<ScheduleDayContext>(INITIAL_STATE)

export const useScheduleDay = () => useContext(ScheduleDayContext)
