//Constants
import bridge from '@vkontakte/vk-bridge'
//Hooks
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { IGroup } from 'shared/types/donstu'

//Types
import { IUserConfigContext } from './types'
import { INITIAL_STATE, UserConfigContext } from './UserConfigContext'

interface IUserConfigProviderProps {
  children: React.ReactNode
}

export const UserConfigProvider = ({ children }: IUserConfigProviderProps) => {
  const [bridgeSupport, setBridgeSupport] = useState(false)
  const [data, setData] = useState<IUserConfigContext['data']>(INITIAL_STATE.data)

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
        console.error('Ошибка получения конфигурации из bridge')
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
  }, [bridgeSupport])

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
        } catch (err) {
          console.error('Ошибка сохранения конфигурации')
        }
      } else {
        localStorage.setItem('USER_CONFIG_DATA', JSON.stringify(data))
        setData(data)
      }
    },
    [bridgeSupport]
  )

  const setTeacher = useCallback<IUserConfigContext['setTeacher']>(
    ({ id, name }) => {
      const currentData = { ...data }

      currentData.teacherId = String(id)
      currentData.teacherName = name
      currentData.post = 'teacher'

      updateConfig(currentData)

      bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })

      // onSetCurrentDate()
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

      bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })

      // onSetCurrentDate()
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

      bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })

      // onSetCurrentDate()
    },
    [data, updateConfig]
  )

  const setPost = useCallback<IUserConfigContext['setPost']>(
    (post) => {
      const currentData = { ...data }

      currentData.post = post

      updateConfig(currentData)

      bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })
    },
    [data, updateConfig]
  )

  const setTheme = useCallback<IUserConfigContext['setTheme']>(
    (theme) => {
      const currentData = { ...data }

      currentData.theme = theme

      updateConfig(currentData)

      bridge.send('VKWebAppTapticNotificationOccurred', { type: 'success' })
    },
    [data, updateConfig]
  )

  const value = useMemo(
    () => ({
      data,
      bridgeSupport,
      setTeacher,
      setGroup,
      setBridgeSupport,
      setPost,
      setTheme,
      setClassroom,
    }),
    [data, bridgeSupport, setTeacher, setGroup, setPost, setTheme, setClassroom]
  )

  return <UserConfigContext.Provider value={value}>{children}</UserConfigContext.Provider>
}
