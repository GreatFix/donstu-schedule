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

const SearchTeacher = ({ teachers, onClickBack, onChangeTeacher, fetching }) => {
  let [search, setSearch] = useState('')

  const onChange = (event) => setSearch(event.target.value)

  const result = () => {
    return teachers.filter((teacher) => {
      return teacher.name.toLowerCase().indexOf(search.toLowerCase()) === 0
    })
  }

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={onClickBack} />} separator={false}>
        <Headline level={4}>Поиск преподавателя</Headline>
      </PanelHeader>
      <Search value={search} onChange={onChange} />
      {fetching ? (
        <Spinner />
      ) : (
        <List>
          {search &&
            result().map((teacher) => (
              <SimpleCell
                onClick={() => onChangeTeacher(teacher.id, teacher.name)}
                key={teacher.id}
              >
                <span>{teacher.name}</span>
              </SimpleCell>
            ))}
        </List>
      )}
    </>
  )
}

export default SearchTeacher
