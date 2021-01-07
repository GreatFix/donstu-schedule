import React, { useCallback, useState } from 'react'
import {
  PanelHeader,
  PanelHeaderBack,
  Search,
  List,
  SimpleCell,
  Spinner,
  Headline,
  Placeholder,
} from '@vkontakte/vkui'
import { Icon24Filter, Icon28FaceRecognitionOutline, Icon32SearchOutline } from '@vkontakte/icons'
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

  const onChange = useCallback((event) => setSearch(event.target.value), [])

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
          {search || kurs || faculty ? (
            result().length ? (
              result().map((group) => (
                <SimpleCell
                  onClick={() => onChangeGroup(group.id, group.name, group.facul)}
                  key={group.id}
                  indicator={group.facul}
                >
                  <span>{group.name}</span>
                </SimpleCell>
              ))
            ) : (
              <Placeholder icon={<Icon28FaceRecognitionOutline width={56} height={56} />}>
                Не найдено
              </Placeholder>
            )
          ) : (
            <Placeholder icon={<Icon32SearchOutline width={56} height={56} />}>
              Введите значение для поиска
            </Placeholder>
          )}
        </List>
      )}
    </>
  )
}

export default SearchGroup
