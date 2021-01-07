import React, { useState } from 'react'
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
import { Icon28FaceRecognitionOutline, Icon32SearchOutline } from '@vkontakte/icons'

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
          {search ? (
            result().length ? (
              result().map((teacher) => (
                <SimpleCell
                  onClick={() => onChangeTeacher(teacher.id, teacher.name)}
                  key={teacher.id}
                >
                  <span>{teacher.name}</span>
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

export default SearchTeacher
