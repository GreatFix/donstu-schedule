import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Headline, Caption, TabsItem } from '@vkontakte/vkui'
import { DateTime } from 'luxon'

import { setDate } from '../../../store/actions/date'
import classes from './DayWeekTabsItem.module.css'

const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const DayWeekTabsItem = ({ dayWeekShortName, day }) => {
  const dispatch = useDispatch()
  const onSetDate = (date) => dispatch(setDate(date))
  const date = useSelector((state) => state.date.date)
  return Object.keys(day.lessons).length ? (
    <TabsItem
      onClick={() => onSetDate(day.date)}
      selected={DateTime.fromSQL(date).day === DateTime.fromSQL(day.date).day}
      className={classes.TabsItem}
    >
      <Headline weight="medium" style={{ marginBottom: 8 }}>
        {dayWeekShortName}
      </Headline>
      <Caption level="4" weight="bold" caps>
        {DateTime.fromSQL(day.date).day}
      </Caption>
      <Caption level="4" weight="regular">
        {MONTHS[DateTime.fromSQL(day.date).month - 1]}
      </Caption>
    </TabsItem>
  ) : (
    <TabsItem
      onClick={() => onSetDate(day.date)}
      selected={DateTime.fromSQL(date).day === DateTime.fromSQL(day.date).day}
      className={classes.DisabledTabsItem}
    >
      <Headline weight="medium" style={{ marginBottom: 8 }}>
        {dayWeekShortName}
      </Headline>
      <Caption level="4" weight="bold" caps>
        {DateTime.fromSQL(day.date).day}
      </Caption>
      <Caption level="4" weight="regular">
        {MONTHS[DateTime.fromSQL(day.date).month - 1]}
      </Caption>
    </TabsItem>
  )
}

export default React.memo(DayWeekTabsItem)
