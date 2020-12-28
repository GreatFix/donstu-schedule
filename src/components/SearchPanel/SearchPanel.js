import React, { useState } from 'react'
import {
  PanelHeader,
  PanelHeaderBack,
  Search,
  List,
  SimpleCell,
} from '@vkontakte/vkui'
import Icon24Filter from '@vkontakte/icons/dist/24/filter'

const SearchPanel = ({
  groups,
  faculty,
  kurs,
  goBack,
  onFiltersClick,
  HandleClickGroup,
}) => {
  let [search, setSearch] = useState('')

  const onChange = (event) => setSearch(event.target.value)

  const result = () => {
    return groups.filter((group) => {
      return (
        group.name.toLowerCase().indexOf(search.toLowerCase()) === 0 &&
        (faculty ? group.facul === faculty : true) &&
        (kurs > 0 ? group.kurs === kurs : true)
      )
    })
  }

  return (
    <>
      <PanelHeader
        left={<PanelHeaderBack onClick={goBack} />}
        separator={false}
      >
        Поиск группы
      </PanelHeader>
      <Search
        value={search}
        onChange={onChange}
        icon={<Icon24Filter />}
        onIconClick={onFiltersClick}
      />
      <List>
        {(search || kurs || faculty) &&
          result().map((group) => (
            <SimpleCell
              target={1}
              onClick={HandleClickGroup}
              id={group.key} //ключ элемента массива
              key={group.id}
              indicator={group.facul}
            >
              <span>{group.name}</span>
            </SimpleCell>
          ))}
      </List>
    </>
  )
}

export default SearchPanel
