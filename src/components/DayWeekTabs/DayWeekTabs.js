import React from 'react'
import { Tabs, Title, TabsItem, Button } from '@vkontakte/vkui'
import Icon28ArrowLeftOutline from '@vkontakte/icons/dist/28/arrow_left_outline'
import Icon28ArrowRightOutline from '@vkontakte/icons/dist/28/arrow_right_outline'

import DayWeekTabsItem from './DayWeekTabsItem/DayWeekTabsItem'

const DayWeekTabs = ({ data, dispatchDate, curDate, style, arrows }) => {
  return (
    <Tabs style={{ ...style }}>
      {arrows && (
        <TabsItem>
          <Button
            onClick={() => {
              dispatchDate({ type: 'prevWeek' })
            }}
          >
            <Icon28ArrowLeftOutline />
          </Button>
        </TabsItem>
      )}
      {data.received ? (
        Object.keys(data.days).map((date, index) => {
          return (
            <DayWeekTabsItem
              key={index}
              dayWeek={data.days[date]}
              dispatchDate={dispatchDate}
              curDate={curDate}
            />
          )
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
          <Button
            onClick={() => {
              dispatchDate({ type: 'nextWeek' })
            }}
          >
            {' '}
            <Icon28ArrowRightOutline />
          </Button>
        </TabsItem>
      )}
    </Tabs>
  )
}

export default DayWeekTabs
