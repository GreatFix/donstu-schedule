import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Tabs, TabsItem, Button } from '@vkontakte/vkui'
import { Icon28ArrowLeftOutline, Icon28ArrowRightOutline } from '@vkontakte/icons'

import { nextWeek, prevWeek } from '../../store/actions/date'
import DayWeekTabsItem from './DayWeekTabsItem/DayWeekTabsItem'

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
            <Icon28ArrowLeftOutline
              style={{ backgroundColor: 'var(--button_primary_background)' }}
            />
          </Button>
        </TabsItem>
      )}
      {schedule &&
        DAYS_WEEK.map((dayWeekShortName, index) => {
          return (
            <DayWeekTabsItem
              key={index}
              dayWeekShortName={dayWeekShortName}
              day={schedule.days[index]}
            />
          )
        })}

      {arrows && (
        <TabsItem>
          <Button onClick={NextWeek}>
            {' '}
            <Icon28ArrowRightOutline
              style={{ backgroundColor: 'var(--button_primary_background)' }}
            />
          </Button>
        </TabsItem>
      )}
    </Tabs>
  )
}

export default DayWeekTabs
