import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Epic, Tabbar, TabbarItem, Snackbar } from '@vkontakte/vkui'
import {
  Icon28UserCircleOutline,
  Icon20CalendarOutline,
  Icon28WarningTriangleOutline,
} from '@vkontakte/icons'
import '@vkontakte/vkui/dist/vkui.css'
import bridge from '@vkontakte/vk-bridge'

import Schedule from './views/schedule/Schedule'
import Profile from './views/Profile/Profile'

const App = () => {
  let [activeStory, setActiveStory] = useState('schedule')
  const post = useSelector((state) => state.userData.post)
  const groupId = useSelector((state) => state.userData.groupId)
  const teacherId = useSelector((state) => state.userData.teacherId)
  const [snack, setSnack] = useState(null)
  const [redirectToSearch, setRedirectToSearch] = useState(null)
  if (
    ((post === 'Студент' && !groupId) || (post === 'Преподаватель' && !teacherId)) &&
    activeStory !== 'profile'
  ) {
    setActiveStory('profile')
  } //при первом запуске отправляет в профиль
  const onStoryChange = (event) => {
    if (event.currentTarget.dataset.story === 'schedule') {
      if (post === 'Студент' && !groupId) {
        bridge.send('VKWebAppTapticNotificationOccurred', { type: 'warning' })

        setSnack(
          <Snackbar
            layout="vertical"
            onClose={() => setSnack(null)}
            action="Выбрать группу"
            onActionClick={() => setRedirectToSearch('group')}
            before={<Icon28WarningTriangleOutline />}
            duration="3000"
          >
            Пожалуйста, сначала выберите группу
          </Snackbar>
        )
      } else if (post === 'Преподаватель' && !teacherId) {
        bridge.send('VKWebAppTapticNotificationOccurred', { type: 'warning' })

        setSnack(
          <Snackbar
            layout="vertical"
            onClose={() => setSnack(null)}
            action="Выбрать преподавателя"
            onActionClick={() => setRedirectToSearch('teacher')}
            before={<Icon28WarningTriangleOutline />}
            duration="3000"
          >
            Пожалуйста, сначала выберите преподавателя
          </Snackbar>
        )
      } else setActiveStory(event.currentTarget.dataset.story)
    } else setActiveStory(event.currentTarget.dataset.story)
  }

  return (
    <>
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

        <Profile id="profile" redirectToSearch={redirectToSearch} />
      </Epic>
      {snack}
    </>
  )
}

export default App
