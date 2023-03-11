//Hooks
import { useCallback, useState } from 'react'

import { SearchGroupFiltersContext } from './SearchGroupFiltersContext'

interface ISearchGroupFiltersProviderProps {
  children: React.ReactNode
}

export const SearchGroupFiltersProvider = ({ children }: ISearchGroupFiltersProviderProps) => {
  const [faculty, setFaculty] = useState<string>('')
  const [kurs, setKurs] = useState<number>(-1)

  const reset = useCallback(() => {
    setFaculty('')
    setKurs(0)
  }, [])
  return (
    <SearchGroupFiltersContext.Provider value={{ faculty, kurs, setFaculty, setKurs, reset }}>
      {children}
    </SearchGroupFiltersContext.Provider>
  )
}
