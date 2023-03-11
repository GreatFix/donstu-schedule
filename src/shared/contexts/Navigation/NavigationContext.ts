import { useContext } from 'react'
import { createContext } from 'react'

import { PANEL_PROFILE_ENUM, VIEW_ENUM } from './navigation'

interface INavigation {
  view: string
  panel: string
  modal: string | null
}

export interface INavigationContext {
  setNavigation: (cb: (currentNavigation: INavigation) => INavigation) => void
  popState: () => void
  state: INavigation
}

export const INITIAL_STATE: INavigationContext = {
  setNavigation: () => Promise.resolve(),
  popState: () => {},
  state: {
    view: VIEW_ENUM.PROFILE,
    panel: PANEL_PROFILE_ENUM.MAIN,
    modal: null,
  },
}

export const NavigationContext = createContext<INavigationContext>(INITIAL_STATE)

export const useNavigation = () => useContext(NavigationContext)
