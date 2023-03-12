import { useCallback, useLayoutEffect } from 'react'
import { useNavigation } from 'shared/contexts/Navigation'

export function useViewControl<T extends string>(initialActive: T) {
  const { setNavigation, state } = useNavigation()

  const forward = useCallback(
    (view: T) => setNavigation((prevState) => ({ ...prevState, view })),
    [setNavigation]
  )

  useLayoutEffect(() => {
    if (!state.view) {
      forward(initialActive)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { activeView: state.view, forward }
}
