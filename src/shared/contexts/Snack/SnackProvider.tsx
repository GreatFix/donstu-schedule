//Constants
//Hooks
import { useCallback, useState } from 'react'

import { SnackContext } from './SnackContext'

interface ISnackProviderProps {
  children: React.ReactNode
}

export const SnackProvider = ({ children }: ISnackProviderProps) => {
  const [snack, setSnack] = useState<React.ReactNode | null>(null)

  const closeSnack = useCallback(() => {
    setSnack(null)
  }, [])

  return (
    <SnackContext.Provider value={{ setSnack, snack, closeSnack }}>
      {children}
      {snack}
    </SnackContext.Provider>
  )
}
