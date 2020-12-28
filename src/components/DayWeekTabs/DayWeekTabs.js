import React from 'react'
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs'
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title'
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem'
import Button from '@vkontakte/vkui/dist/components/Button/Button'
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
            <Icon28ArrowLeftOutline
              style={{ backgroundColor: 'var(--button_primary_background)' }}
            />
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
