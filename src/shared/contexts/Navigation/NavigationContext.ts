import { useContext } from 'react'
import { createContext } from 'react'

import { PANEL_SCHEDULE_ENUM, VIEW_ENUM } from './navigation'

interface INavigation {
  view: string
  panel: string
  modal: string | null
}

export interface INavigationContext {
  setNavigation: (cb: (currentNavigation: INavigation) => INavigation, replace?: boolean) => void
  popState: () => void
  state: INavigation
}

export const INITIAL_STATE: INavigationContext = {
  setNavigation: () => Promise.resolve(),
  popState: () => {},
  state: {
    view: VIEW_ENUM.SCHEDULE,
    panel: PANEL_SCHEDULE_ENUM.MAIN,
    modal: null,
  },
}

export const NavigationContext = createContext<INavigationContext>(INITIAL_STATE)

export const useNavigation = () => useContext(NavigationContext)
