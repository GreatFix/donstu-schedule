import { DateTime } from 'luxon'
import { ISODate } from 'shared/types/date'

import { MONTHS } from './constants'
import { SelectableDay } from './DayWeekTabsItem'

/** Иницилизирует дни недели (прошедшие больше, т.к. анимация переключения не работает при добавлении. Чтобы покрыть большинство сценариев) */
export const initDays = (date: SelectableDay['date']) => {
  const today = DateTime.fromISO(date)

  const currentWeekStartDay = today.minus({ days: today.weekday - 1 })

  const days: SelectableDay[] = []
  for (let i = -91; i < 70; i++) {
    const iterationDay = currentWeekStartDay.plus({ days: i })
    const month = MONTHS[iterationDay.month - 1]
    const week = iterationDay.weekdayShort
    const day = iterationDay.day
    days.push({ month, week, day, date: iterationDay.toISODate() as ISODate })
  }

  return days
}

/** Добавляет следующую неделю */
export const nextWeekDays = (currentWeekStartDate: SelectableDay['date']) => {
  const nextWeekStartDate = DateTime.fromISO(currentWeekStartDate).plus({ weeks: 1 })

  const days: SelectableDay[] = []
  for (let i = 0; i < 7; i++) {
    const iterationDay = nextWeekStartDate.plus({ days: i })
    const month = MONTHS[iterationDay.month - 1]
    const week = iterationDay.weekdayShort
    const day = iterationDay.day
    days.push({ month, week, day, date: iterationDay.toISODate() as ISODate })
  }

  return days
}

/** Добавляет предыдущую неделю */
export const prevWeekDays = (currentWeekStartDate: SelectableDay['date']) => {
  const prevWeekStartDate = DateTime.fromISO(currentWeekStartDate).minus({ weeks: 1 })

  const days: SelectableDay[] = []
  for (let i = 0; i < 7; i++) {
    const iterationDay = prevWeekStartDate.plus({ days: i })
    const month = MONTHS[iterationDay.month - 1]
    const week = iterationDay.weekdayShort
    const day = iterationDay.day
    days.push({ month, week, day, date: iterationDay.toISODate() as ISODate })
  }

  return days
}
