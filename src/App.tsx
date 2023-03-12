import '@vkontakte/vkui/dist/vkui.css'
import './documents.css'

import {
  Icon20CalendarOutline,
  Icon28UserCircleOutline,
  Icon28WarningTriangleOutline,
} from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'
import { Epic, Snackbar, Tabbar, TabbarItem } from '@vkontakte/vkui'
import { memo, MouseEventHandler, useEffect, useLayoutEffect, useRef } from 'react'
import {
  PANEL_PROFILE_ENUM,
  useNavigation,
  useViewControl,
  VIEW_ENUM,
} from 'shared/contexts/Navigation'
import { Profile } from 'views/Profile/Profile'
import { Schedule } from 'views/Schedule/Schedule'

import { useSnack } from './shared/contexts/Snack'
//Hooks
import { useUserConfig } from './shared/contexts/UserConfig'

const _App = () => {
  const {
    data: { post, groupId, teacherId, classroomId },
    inited,
  } = useUserConfig()
  const { popState } = useNavigation()

  const { activeView, forward } = useViewControl<VIEW_ENUM>(VIEW_ENUM.SCHEDULE)
  const profilePanelForwardRef = useRef<(panel: PANEL_PROFILE_ENUM) => void>(null)

  const { setSnack } = useSnack()

  const postGroupAndNotSelected = post === 'group' && !groupId
  const postTeacherAndNotSelected = post === 'teacher' && !teacherId
  const postClassroomAndNotSelected = post === 'classroom' && !classroomId

  const onStoryChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (event.currentTarget.dataset.story === VIEW_ENUM.SCHEDULE) {
      const props = (() => {
        if (postGroupAndNotSelected) {
          return {
            action: 'Выбрать группу',
            onActionClick: () => profilePanelForwardRef.current?.(PANEL_PROFILE_ENUM.SEARCH_GROUP),
            children: 'Пожалуйста, сначала выберите группу',
          }
        }
        if (postTeacherAndNotSelected) {
          return {
            action: 'Выбрать преподавателя',
            onActionClick: () =>
              profilePanelForwardRef.current?.(PANEL_PROFILE_ENUM.SEARCH_TEACHER),
            children: 'Пожалуйста, сначала выберите преподавателя',
          }
        }
        if (postClassroomAndNotSelected) {
          return {
            action: 'Выбрать аудиторию',
            onActionClick: () =>
              profilePanelForwardRef.current?.(PANEL_PROFILE_ENUM.SEARCH_CLASSROOM),
            children: 'Пожалуйста, сначала выберите аудиторию',
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
            before={<Icon28WarningTriangleOutline fill="var(--vkui--color_icon_negative)" />}
            duration={3000}
            {...props}
          />
        )
      }
    }

    forward(event.currentTarget.dataset.story as VIEW_ENUM)
  }

  /** Не позволяет уйти с вкладки профиль, если не выбрана группа, препод. или аудитория соответственно выбранному post */
  useLayoutEffect(() => {
    if (activeView === VIEW_ENUM.PROFILE || !inited) return
    if (postGroupAndNotSelected || postTeacherAndNotSelected || postClassroomAndNotSelected) {
      forward(VIEW_ENUM.PROFILE)
    }
  }, [
    activeView,
    forward,
    inited,
    postClassroomAndNotSelected,
    postGroupAndNotSelected,
    postTeacherAndNotSelected,
  ])

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

      <Profile ref={profilePanelForwardRef} id={VIEW_ENUM.PROFILE} />
    </Epic>
  )
}

export const App = memo(_App)
