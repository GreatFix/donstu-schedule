import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs'
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title'
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline'
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline'

import DayWeekTabsItem from './DayWeekTabsItem/DayWeekTabsItem'

import { nextWeek, prevWeek } from '../../store/actions/date'

const DayWeekTabs = ({ style, arrows }) => {
  const dispatch = useDispatch()
  const NextWeek = useCallback(() => dispatch(nextWeek()), [dispatch])
  const PrevWeek = useCallback(() => dispatch(prevWeek()), [dispatch])

  const schedule = useSelector((state) => state.fetchScheduleGroup.schedule)

  return (
    <Tabs style={{ ...style }}>
      {arrows && (
        <TabsItem>
          <Button onClick={PrevWeek}>
            <Icon28ArrowLeftOutline style={{ backgroundColor: 'var(--button_primary_background)' }} />
          </Button>
        </TabsItem>
      )}
      {schedule && schedule.received ? (
        Object.keys(schedule.days).map((date, index) => {
          return <DayWeekTabsItem key={index} dayWeek={schedule.days[date]} />
        })
      ) : (
        <TabsItem>
          <Title level="3" weight="semibold">
            На этой неделе пар нет :)
          </Title>
        </TabsItem>
      )}
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
