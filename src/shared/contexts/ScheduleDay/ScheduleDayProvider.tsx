import { DateTime } from 'luxon'
import React, { useState } from 'react'
import { ISODate } from 'shared/types/date'

import { ScheduleDayContext } from './ScheduleDayContext'

interface ScheduleDayProviderProps {
  children: React.ReactNode
}

export const ScheduleDayProvider = ({ children }: ScheduleDayProviderProps) => {
  const [selectedDate, selectDate] = useState<ISODate>(() => DateTime.now().toISODate() as ISODate)
  const [weekStartDate, setWeekStartDate] = useState<ISODate>(() => {
    const date = DateTime.fromISO(selectedDate)

    return date.minus({ days: date.weekday - 1 }).toISODate() as ISODate
  })

  return (
    <ScheduleDayContext.Provider
      value={{ selectDate, setWeekStartDate, selectedDate, weekStartDate }}
    >
      {children}
    </ScheduleDayContext.Provider>
  )
}
