import React, { useState } from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import Search from '@vkontakte/vkui/dist/components/Search/Search'
import List from '@vkontakte/vkui/dist/components/List/List'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'

const SearchTeacher = ({ teachers, goBack, onClickTeacher }) => {
  let [search, setSearch] = useState('')

  const onChange = (event) => setSearch(event.target.value)

  const result = () => {
    return teachers.filter((teacher) => {
      return teacher.name.toLowerCase().indexOf(search.toLowerCase()) === 0
    })
  }

  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />} separator={false}>
        Поиск преподавателя
      </PanelHeader>
      <Search value={search} onChange={onChange} />
      <List>
        {search &&
          result().map((teacher) => (
            <SimpleCell
              target={1}
              onClick={onClickTeacher}
              id={teacher.key} //номер элемента массива, заранее задан в fetchTeachers
              key={teacher.id}
            >
              <span>{teacher.name}</span>
            </SimpleCell>
          ))}
      </List>
    </>
  )
}

export default SearchTeacher
