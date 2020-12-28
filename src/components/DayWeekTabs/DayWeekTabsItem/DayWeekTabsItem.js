import React from 'react'
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'
import Caption from '@vkontakte/vkui/dist/components/Typography/Caption/Caption'
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem'

import classes from './DayWeekTabsItem.module.css'

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

const DayWeekTabsItem = ({ dayWeek, dispatchDate, curDate }) => {
  const MONTH = MONTHS[new Date(dayWeek.date).getMonth()]

  return (
    <TabsItem
      onClick={() => dispatchDate({ type: 'setDate', date: dayWeek.date })}
      selected={curDate === dayWeek.date}
      className={classes.TabsItem}
    >
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
