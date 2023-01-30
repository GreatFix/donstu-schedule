import { useCallback } from 'react'
import { useNavigation } from 'shared/contexts/Navigation'

export function useModalControl<T extends string>() {
  const { setNavigation, popState, state } = useNavigation()

  const forward = useCallback(
    (modal: T) => setNavigation((prevState) => ({ ...prevState, modal })),
    []
  )

  const close = useCallback(
    async () => setNavigation((prevState) => ({ ...prevState, modal: null })),
    []
  )

  return { activeModal: state.modal, forward, back: popState, close }
}
