import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { ISODate } from 'shared/types/date'

import { ScheduleDayContext } from './ScheduleDayContext'

interface ScheduleDayProviderProps {
  children: React.ReactNode
}

export const ScheduleDayProvider = ({ children }: ScheduleDayProviderProps) => {
  const today = DateTime.now().toISODate() as ISODate

  const [selectedDate, selectDate] = useState<ISODate>(today)
  const [weekStartDate, setWeekStartDate] = useState<ISODate>(() => {
    const date = DateTime.fromISO(selectedDate)

    return date.minus({ days: date.weekday - 1 }).toISODate() as ISODate
  })

  return (
    <ScheduleDayContext.Provider
      value={{ selectDate, setWeekStartDate, selectedDate, weekStartDate, today }}
    >
      {children}
    </ScheduleDayContext.Provider>
  )
}
