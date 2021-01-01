import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs'
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline'
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline'

import DayWeekTabsItem from './DayWeekTabsItem/DayWeekTabsItem'

import { nextWeek, prevWeek } from '../../store/actions/date'

const DAYS_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const DayWeekTabs = ({ arrows }) => {
  const dispatch = useDispatch()
  const NextWeek = useCallback(() => dispatch(nextWeek()), [dispatch])
  const PrevWeek = useCallback(() => dispatch(prevWeek()), [dispatch])

  const schedule = useSelector((state) => state.fetchSchedule.schedule)

  return (
    <Tabs>
      {arrows && (
        <TabsItem>
          <Button onClick={PrevWeek}>
            <Icon28ArrowLeftOutline style={{ backgroundColor: 'var(--button_primary_background)' }} />
          </Button>
        </TabsItem>
      )}
      {schedule &&
        DAYS_WEEK.map((dayWeekShortName, index) => {
          return <DayWeekTabsItem key={index} dayWeekShortName={dayWeekShortName} day={schedule.days[index]} />
        })}

      {arrows && (
        <TabsItem>
          <Button onClick={NextWeek}>
            {' '}
            <Icon28ArrowRightOutline style={{ backgroundColor: 'var(--button_primary_background)' }} />
          </Button>
        </TabsItem>
      )}
    </Tabs>
  )
}

export default DayWeekTabs
