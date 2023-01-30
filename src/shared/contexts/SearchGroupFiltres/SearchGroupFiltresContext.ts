import { useContext } from 'react'
import { createContext } from 'react'

interface ISearchGroupFiltresContext {
  setFaculty: React.Dispatch<React.SetStateAction<string>>
  setKurs: React.Dispatch<React.SetStateAction<number>>
  faculty: string
  kurs: number
}

const INITIAL_STATE: ISearchGroupFiltresContext = {
  setFaculty: () => {},
  setKurs: () => {},
  faculty: '',
  kurs: 0,
}

export const SearchGroupFiltresContext = createContext<ISearchGroupFiltresContext>(INITIAL_STATE)

export const useSearchGroupFiltres = () => useContext(SearchGroupFiltresContext)
