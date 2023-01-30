import '@vkontakte/vkui/dist/vkui.css'

import {
  Icon20CalendarOutline,
  Icon28UserCircleOutline,
  Icon28WarningTriangleOutline,
} from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'
import { Epic, Snackbar, Tabbar, TabbarItem } from '@vkontakte/vkui'
import { memo, MouseEventHandler, useEffect, useState } from 'react'
import { useNavigation, useViewControl, VIEW_ENUM } from 'shared/contexts/Navigation'
import { Profile } from 'views/Profile/Profile'
import { Schedule } from 'views/Schedule/Schedule'

import { useSnack } from './shared/contexts/Snack'
//Hooks
import { useUserConfig } from './shared/contexts/UserConfig'

const _App = () => {
  const {
    data: { post, groupId, teacherId },
  } = useUserConfig()
  const { popState } = useNavigation()

  const { activeView, forward } = useViewControl<VIEW_ENUM>(VIEW_ENUM.SCHEDULE)

  const { setSnack } = useSnack()

  const [redirectToSearch, setRedirectToSearch] = useState<'group' | 'teacher' | null>(null)

  const onStoryChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.currentTarget.dataset.story === VIEW_ENUM.SCHEDULE) {
      const props = (() => {
        if (post === 'group' && !groupId) {
          return {
            action: 'Выбрать группу',
            onActionClick: () => setRedirectToSearch('group'),
            children: 'Пожалуйста, сначала выберите группу',
          }
        }
        if (post === 'teacher' && !teacherId) {
          return {
            action: 'Выбрать преподавателя',
            onActionClick: () => setRedirectToSearch('teacher'),
            children: 'Пожалуйста, сначала выберите преподавателя',
          }
        }

        return null
      })()

      if (props) {
        bridge.send('VKWebAppTapticNotificationOccurred', { type: 'warning' })

        return setSnack(
          <Snackbar
            layout="vertical"
            onClose={() => setSnack(null)}
            before={<Icon28WarningTriangleOutline />}
            duration={3000}
            {...props}
          />
        )
      }
    }

    forward(event.currentTarget.dataset.story as VIEW_ENUM)
  }

  useEffect(() => {
    const customPopState = (e: PopStateEvent) => {
      e.preventDefault()
      popState()
    }

    window.addEventListener('popstate', customPopState)

    return () => {
      window.removeEventListener('popstate', customPopState)
    }
  }, [popState])

  return (
    <Epic
      activeStory={activeView}
      tabbar={
        <Tabbar>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeView === VIEW_ENUM.SCHEDULE}
            data-story={VIEW_ENUM.SCHEDULE}
            text="Расписание"
          >
            <Icon20CalendarOutline width={28} height={28} />
          </TabbarItem>
          <TabbarItem
            onClick={onStoryChange}
            selected={activeView === VIEW_ENUM.PROFILE}
            data-story={VIEW_ENUM.PROFILE}
            text="Профиль"
          >
            <Icon28UserCircleOutline />
          </TabbarItem>
        </Tabbar>
      }
    >
      <Schedule id={VIEW_ENUM.SCHEDULE} />

      <Profile id={VIEW_ENUM.PROFILE} redirectToSearch={redirectToSearch} />
    </Epic>
  )
}

export const App = memo(_App)
