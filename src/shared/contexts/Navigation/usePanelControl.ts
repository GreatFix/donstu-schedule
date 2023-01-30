import { useCallback, useLayoutEffect } from 'react'
import { useNavigation } from 'shared/contexts/Navigation'

export function usePanelControl<T extends string>(initialActive: T) {
  const { setNavigation, popState, state } = useNavigation()

  const forward = useCallback(
    (panel: T) => setNavigation((prevState) => ({ ...prevState, panel })),
    []
  )

  useLayoutEffect(() => {
    if (!state.panel) {
      forward(initialActive)
    }
  }, [])

  return { activePanel: state.panel, forward, back: popState }
}
