import React from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import List from '@vkontakte/vkui/dist/components/List/List'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'
import Headline from '@vkontakte/vkui/dist/components/Typography/Headline/Headline'

const TeacherGroups = ({ goBack, teacherGroups }) => {
  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />} separator={false}>
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
