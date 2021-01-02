import React, { useState } from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Search from '@vkontakte/vkui/dist/components/Search/Search'
import List from '@vkontakte/vkui/dist/components/List/List'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'
import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner'
import Icon24Filter from '@vkontakte/icons/dist/24/filter'
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'

const SearchGroup = ({ groups, faculty, kurs, goBack, onFiltersClick, onClickGroup, fetching }) => {
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
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />} separator={false}>
        <Headline level={4}>Поиск группы</Headline>
      </PanelHeader>
      <Search value={search} onChange={onChange} icon={<Icon24Filter />} onIconClick={onFiltersClick} />
      {fetching ? (
        <Spinner />
      ) : (
        <List>
          {(search || kurs || faculty) &&
            result().map((group) => (
              <SimpleCell
                onClick={() => onClickGroup(group.id, group.name, group.facul)}
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
