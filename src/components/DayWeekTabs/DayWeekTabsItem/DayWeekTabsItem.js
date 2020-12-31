import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption'
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem'

import classes from './DayWeekTabsItem.module.css'

import { setDate } from '../../../store/actions/date'

const DAYS_WEEK = ['none', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
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

const DayWeekTabsItem = ({ dayWeek }) => {
  const dispatch = useDispatch()
  const onSetDate = (date) => dispatch(setDate(date))
  const date = useSelector((state) => state.date.date)

  const MONTH = MONTHS[new Date(dayWeek.date).getMonth()]

  return (
    <TabsItem onClick={() => onSetDate(dayWeek.date)} selected={date === dayWeek.date} className={classes.TabsItem}>
      <Headline weight="medium" style={{ marginBottom: 8 }}>
        {DAYS_WEEK[dayWeek.dayWeekNum]}
      </Headline>
      <Caption level="4" weight="bold" caps>
        {dayWeek.day}
      </Caption>
      <Caption level="4" weight="regular">
        {MONTH}
      </Caption>
    </TabsItem>
  )
}

export default DayWeekTabsItem
