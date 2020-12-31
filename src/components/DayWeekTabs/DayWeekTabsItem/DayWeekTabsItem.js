import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption'
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem'

import classes from './DayWeekTabsItem.module.css'

import { setDate } from '../../../store/actions/date'

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
    <TabsItem onClick={() => onSetDate(new Date(day.date))} selected={date === day.date} className={classes.TabsItem}>
      <Headline weight="medium" style={{ marginBottom: 8 }}>
        {dayWeekShortName}
      </Headline>
      <Caption level="4" weight="bold" caps>
        {new Date(day.date).getDate()}
      </Caption>
      <Caption level="4" weight="regular">
        {MONTHS[new Date(day.date).getMonth()]}
      </Caption>
    </TabsItem>
  ) : (
    <TabsItem selected={date === day.date} className={classes.DisabledTabsItem}>
      <Headline weight="medium" style={{ marginBottom: 8 }}>
        {dayWeekShortName}
      </Headline>
      <Caption level="4" weight="bold" caps>
        {new Date(day.date).getDate()}
      </Caption>
      <Caption level="4" weight="regular">
        {MONTHS[new Date(day.date).getMonth()]}
      </Caption>
    </TabsItem>
  )
}

export default DayWeekTabsItem
