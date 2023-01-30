//Constants
//Hooks
import { useState } from 'react'

import { SearchGroupFiltresContext } from './SearchGroupFiltresContext'

interface ISearchGroupFiltresProviderProps {
  children: React.ReactNode
}

export const SearchGroupFiltresProvider = ({ children }: ISearchGroupFiltresProviderProps) => {
  const [faculty, setFaculty] = useState<string>('')
  const [kurs, setKurs] = useState<number>(0)

  return (
    <SearchGroupFiltresContext.Provider value={{ faculty, kurs, setFaculty, setKurs }}>
      {children}
    </SearchGroupFiltresContext.Provider>
  )
}
