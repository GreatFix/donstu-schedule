//Hooks
import { useCallback, useState } from 'react'

import { INavigationContext, INITIAL_STATE, NavigationContext } from './NavigationContext'

interface INavigationProviderProps {
  children: React.ReactNode
}

const addAsSearchParam = ([key, value]: [string, string | null]) => (value ? `${key}=${value}` : '')

const stateFromSearch = (searchString: string) => {
  const params = new URLSearchParams(searchString)
  const { panel, view, modal } = INITIAL_STATE.state
  return { panel: params.get('panel') || panel, view: params.get('view') || view, modal }
}

export const NavigationProvider = ({ children }: INavigationProviderProps) => {
  const [state, setState] = useState<INavigationContext['state']>(() =>
    stateFromSearch(window.location.search)
  )

  const setNavigation = useCallback<INavigationContext['setNavigation']>((cb, replace) => {
    setState((prevState) => {
      const newState = cb(prevState)
      const method = replace ? 'replaceState' : 'pushState'
      window.history[method](
        null,
        '',
        '?' + Object.entries(newState).map(addAsSearchParam).join('&')
      )

      return newState
    })
  }, [])

  const popState = useCallback(() => {
    setState(stateFromSearch(window.location.search))
  }, [])

  return (
    <NavigationContext.Provider value={{ state, setNavigation, popState }}>
      {children}
    </NavigationContext.Provider>
  )
}
