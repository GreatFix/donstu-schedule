import { useCallback } from 'react'
import { useNavigation } from 'shared/contexts/Navigation'

export function useModalControl<T extends string>() {
  const { setNavigation, popState, state } = useNavigation()

  const forward = useCallback(
    (modal: T) => setNavigation((prevState) => ({ ...prevState, modal }), true),
    [setNavigation]
  )

  const close = useCallback(
    async () => setNavigation((prevState) => ({ ...prevState, modal: null }), true),
    [setNavigation]
  )

  return { activeModal: state.modal, forward, back: popState, close }
}
