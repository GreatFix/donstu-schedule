//Constants
import { Icon28CancelCircleFillRed } from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'
import { ConfigProvider, Snackbar } from '@vkontakte/vkui'
//Hooks
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'

import { useSnack } from '../Snack'
//Types
import { IUserConfigContext } from './types'
import { INITIAL_STATE, UserConfigContext } from './UserConfigContext'

interface IUserConfigProviderProps {
  children: React.ReactNode
  bridgeSupport: boolean
}

export const UserConfigProvider = ({ children, bridgeSupport }: IUserConfigProviderProps) => {
  const [data, setData] = useState<IUserConfigContext['data']>(INITIAL_STATE.data)
  const [inited, setInited] = useState<boolean>(false)
  const { setSnack } = useSnack()

  const initData = useCallback(async () => {
    let savedData: string | null = null

    /** Забираем конфигурацию из bridge */
    if (bridgeSupport) {
      try {
        const res = await bridge.send('VKWebAppStorageGet', {
          keys: ['USER_CONFIG_DATA'],
        })

        savedData = res.keys[0]?.value
      } catch (err) {
        setSnack(
          <Snackbar
            layout="vertical"
            onClose={() => setSnack(null)}
            before={<Icon28CancelCircleFillRed />}
            duration={3000}
          >
            Ошибка при получении конфигурации из VK bridge
          </Snackbar>
        )
      }
    }

    /** Забираем конфигурацию из localStorage, если bridge не поддерживается или пуст */
    if (!savedData) {
      savedData = localStorage.getItem('USER_CONFIG_DATA')
    }

    /** Если есть сохраненнная конфигурация, устанавливаем */
    if (savedData) {
      setData(JSON.parse(savedData))
    }
    setInited(true)
  }, [bridgeSupport, setSnack])

  useLayoutEffect(() => {
    initData()
  }, [initData])

  const updateConfig = useCallback(
    async (data: IUserConfigContext['data']) => {
      if (bridgeSupport) {
        try {
          await bridge.send('VKWebAppStorageSet', {
            key: 'USER_CONFIG_DATA',
            value: JSON.stringify(data),
          })
          setData(data)
          bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })
        } catch (err) {
          bridge.send('VKWebAppTapticNotificationOccurred', { type: 'error' })

          setSnack(
            <Snackbar
              layout="vertical"
              onClose={() => setSnack(null)}
              before={<Icon28CancelCircleFillRed />}
              duration={3000}
            >
              Ошибка при сохранения конфигурации в VK bridge
            </Snackbar>
          )
        }
      } else {
        localStorage.setItem('USER_CONFIG_DATA', JSON.stringify(data))
        setData(data)
        bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })
      }
    },
    [bridgeSupport, setSnack]
  )

  const setTeacher = useCallback<IUserConfigContext['setTeacher']>(
    ({ id, name }) => {
      const currentData = { ...data }

      currentData.teacherId = String(id)
      currentData.teacherName = name
      currentData.post = 'teacher'

      updateConfig(currentData)
    },
    [data, updateConfig]
  )

  const setGroup = useCallback<IUserConfigContext['setGroup']>(
    ({ facul, name, id }) => {
      const currentData = { ...data }

      currentData.groupId = String(id)
      currentData.groupName = name
      currentData.faculty = facul
      currentData.post = 'group'

      updateConfig(currentData)
    },
    [data, updateConfig]
  )

  const setClassroom = useCallback<IUserConfigContext['setClassroom']>(
    ({ id, name }) => {
      const currentData = { ...data }

      currentData.classroomId = String(id)
      currentData.classroomName = name
      currentData.post = 'classroom'

      updateConfig(currentData)
    },
    [data, updateConfig]
  )

  const setPost = useCallback<IUserConfigContext['setPost']>(
    (post) => {
      const currentData = { ...data }

      currentData.post = post

      updateConfig(currentData)
    },
    [data, updateConfig]
  )

  const setTheme = useCallback<IUserConfigContext['setTheme']>(
    (theme) => {
      const currentData = { ...data }

      currentData.theme = theme

      updateConfig(currentData)
    },
    [data, updateConfig]
  )

  const value = useMemo(
    () => ({
      data,
      bridgeSupport,
      inited,
      setTeacher,
      setGroup,
      setPost,
      setTheme,
      setClassroom,
    }),
    [data, bridgeSupport, inited, setTeacher, setGroup, setPost, setTheme, setClassroom]
  )

  return (
    <UserConfigContext.Provider value={value}>
      <ConfigProvider appearance={data.theme}>{children}</ConfigProvider>
    </UserConfigContext.Provider>
  )
}
