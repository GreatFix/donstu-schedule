import React, { useState } from 'react'
import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui'
import { Icon28UserCircleOutline, Icon20CalendarOutline } from '@vkontakte/icons'
import '@vkontakte/vkui/dist/vkui.css'

import Schedule from './views/schedule/Schedule'
import Profile from './views/Profile/Profile'

const App = () => {
  let [activeStory, setActiveStory] = useState('schedule')

  const onStoryChange = (event) => {
    setActiveStory(event.currentTarget.dataset.story)
  }

  return (
    <Epic
      activeStory={activeStory}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === 'schedule'}
            data-story="schedule"
            text="Расписание"
          >
            <Icon20CalendarOutline
              style={{ backgroundColor: 'var(--header_alternate_background)' }}
              width={28}
              height={28}
            />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeStory === 'profile'}
            data-story="profile"
            text="Профиль"
          >
            <Icon28UserCircleOutline
              style={{ backgroundColor: 'var(--header_alternate_background)' }}
            />
          </TabbarItem>
        </Tabbar>
      }
    >
      <Schedule id="schedule" />

      <Profile id="profile" />
    </Epic>
  )
}

export default App
