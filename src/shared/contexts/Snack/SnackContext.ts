import { useContext } from 'react'
import { createContext } from 'react'

interface ISnackContext {
  setSnack: React.Dispatch<React.SetStateAction<React.ReactNode>>
  closeSnack: () => void
  snack: React.ReactNode | null
}

const INITIAL_STATE: ISnackContext = {
  setSnack: () => {},
  closeSnack: () => {},
  snack: null,
}

export const SnackContext = createContext<ISnackContext>(INITIAL_STATE)

export const useSnack = () => useContext(SnackContext)
