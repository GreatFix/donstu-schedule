//Constants
import bridge from '@vkontakte/vk-bridge'
//Hooks
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

import { useUserConfig } from '../UserConfig'
import { INavigationContext, INITIAL_STATE, NavigationContext } from './NavigationContext'

const KEY = 'HISTORY'

interface IHistory {
  value: INavigationContext['state']
  next: this | null
}

interface INavigationProviderProps {
  children: React.ReactNode
}

const addAsSearchParam = ([key, value]: [string, string | null]) => (value ? `${key}=${value}` : '')

export const NavigationProvider = ({ children }: INavigationProviderProps) => {
  const { bridgeSupport } = useUserConfig()

  const [state, setState] = useState<INavigationContext['state']>(INITIAL_STATE.state)

  /** История навигации в виде стэка */
  const historyRef = useRef<IHistory>({
    value: state,
    next: null,
  })

  const initState = useCallback(async () => {
    let savedState: string | null = null

    /** Забираем конфигурацию из bridge */
    if (bridgeSupport) {
      try {
        const res = await bridge.send('VKWebAppStorageGet', {
          keys: [KEY],
        })

        savedState = res.keys[0]?.value
      } catch (err) {
        console.error('Ошибка получения конфигурации из bridge')
      }
    }

    /** Забираем конфигурацию из localStorage, если bridge не поддерживается или пуст */
    if (!savedState) {
      savedState = localStorage.getItem(KEY)
    }

    /** Если есть сохраненнная конфигурация, устанавливаем */
    if (savedState) {
      setState(JSON.parse(savedState))
    }
  }, [bridgeSupport])

  const saveInStorage = useCallback(async (state: INavigationContext['state']) => {
    const jsonNewState = JSON.stringify(state)

    if (bridgeSupport) {
      try {
        await bridge.send('VKWebAppStorageSet', {
          key: KEY,
          value: jsonNewState,
        })
      } catch (err) {
        console.error('Ошибка сохранения навигации в bridge')
        localStorage.setItem(KEY, jsonNewState)
      }
    } else {
      localStorage.setItem(KEY, jsonNewState)
    }
  }, [])

  const setNavigation = useCallback<INavigationContext['setNavigation']>(
    async (cb) => {
      const newState = cb(historyRef.current.value)
      await saveInStorage(newState)

      historyRef.current = { value: newState, next: historyRef.current }
      setState(newState)
      window.history.pushState(
        null,
        '',
        '?' + Object.entries(newState).map(addAsSearchParam).join('&')
      )
    },
    [setState]
  )

  const popState = useCallback(async () => {
    const prevState = historyRef.current.next
    if (prevState) {
      historyRef.current = prevState
      await saveInStorage(prevState.value)
      setState(prevState.value)
    }
  }, [setNavigation])

  useLayoutEffect(() => {
    initState()
  }, [])

  return (
    <NavigationContext.Provider value={{ state, setNavigation, popState }}>
      {children}
    </NavigationContext.Provider>
  )
}
