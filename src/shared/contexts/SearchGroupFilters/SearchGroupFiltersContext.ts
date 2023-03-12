import { useContext } from 'react'
import { createContext } from 'react'

interface ISearchGroupFiltersContext {
  setFaculty: React.Dispatch<React.SetStateAction<string>>
  setKurs: React.Dispatch<React.SetStateAction<number>>
  reset: () => void
  faculty: string
  kurs: number
}

const INITIAL_STATE: ISearchGroupFiltersContext = {
  setFaculty: () => {},
  setKurs: () => {},
  reset: () => {},
  faculty: '',
  kurs: 0,
}

export const SearchGroupFiltersContext = createContext<ISearchGroupFiltersContext>(INITIAL_STATE)

export const useSearchGroupFilters = () => useContext(SearchGroupFiltersContext)
