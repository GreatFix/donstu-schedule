import React from 'react'
import { PanelHeader, PanelHeaderBack, List, SimpleCell, Headline } from '@vkontakte/vkui'

const TeacherGroups = ({ onClickBack, teacherGroups }) => {
  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={onClickBack} />} separator={false}>
        <Headline>Список предметов</Headline>
      </PanelHeader>
      <List>
        {teacherGroups &&
          teacherGroups.map((group, index) => (
            <SimpleCell key={index}>
              <span>{group}</span>
            </SimpleCell>
          ))}
      </List>
    </>
  )
}

export default TeacherGroups
