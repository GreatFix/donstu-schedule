import React, { useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Epic from '@vkontakte/vkui/dist/components/Epic/Epic'
import Tabbar from '@vkontakte/vkui/dist/components/Tabbar/Tabbar'
import TabbarItem from '@vkontakte/vkui/dist/components/TabbarItem/TabbarItem'
import View from '@vkontakte/vkui/dist/components/View/View'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

import Icon28NewsfeedOutline from '@vkontakte/icons/dist/28/newsfeed_outline'
import Icon28UserCircleOutline from '@vkontakte/icons/dist/28/user_circle_outline'
import Icon20CalendarOutline from '@vkontakte/icons/dist/20/calendar_outline'
import '@vkontakte/vkui/dist/vkui.css'

import classes from './App.css'
import Schedule from './views/schedule/Schedule'
import Profile from './views/Profile/Profile'

const App = () => {
  let [activeStory, setActiveStory] = useState('profile')

  const onStoryChange = (event) => {
    setActiveStory(event.currentTarget.dataset.story)
  }

  return (
    <Epic
      activeStory={activeStory}
      tabbar={
        <Tabbar>
          <TabbarItem onClick={onStoryChange} selected={activeStory === 'feed'} data-story="feed" text="Новости">
            <Icon28NewsfeedOutline style={{ backgroundColor: 'var(--header_alternate_background)' }} />
          </TabbarItem>
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
          <TabbarItem onClick={onStoryChange} selected={activeStory === 'profile'} data-story="profile" text="Профиль">
            <Icon28UserCircleOutline style={{ backgroundColor: 'var(--header_alternate_background)' }} />
          </TabbarItem>
        </Tabbar>
      }
    >
      <View id="feed" activePanel="feed">
        <Panel className={classes.Panel} id="feed">
          <PanelHeader>Новости</PanelHeader>
          <Div>В разработке...</Div>
        </Panel>
      </View>

      <Schedule id="schedule" />

      <Profile id="profile" />
    </Epic>
  )
}

export default App
