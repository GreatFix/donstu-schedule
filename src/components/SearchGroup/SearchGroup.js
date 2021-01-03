import React, { useState } from 'react'
import {
  PanelHeader,
  PanelHeaderBack,
  Search,
  List,
  SimpleCell,
  Spinner,
  Headline,
} from '@vkontakte/vkui'
import { Icon24Filter } from '@vkontakte/icons'

const SearchGroup = ({
  groups,
  faculty,
  kurs,
  onClickBack,
  onClickFilters,
  onChangeGroup,
  fetching,
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
      <PanelHeader left={<PanelHeaderBack onClick={onClickBack} />} separator={false}>
        <Headline level={4}>Поиск группы</Headline>
      </PanelHeader>
      <Search
        value={search}
        onChange={onChange}
        icon={<Icon24Filter />}
        onIconClick={onClickFilters}
      />
      {fetching ? (
        <Spinner />
      ) : (
        <List>
          {(search || kurs || faculty) &&
            result().map((group) => (
              <SimpleCell
                onClick={() => onChangeGroup(group.id, group.name, group.facul)}
                key={group.id}
                indicator={group.facul}
              >
                <span>{group.name}</span>
              </SimpleCell>
            ))}
        </List>
      )}
    </>
  )
}

export default SearchGroup
