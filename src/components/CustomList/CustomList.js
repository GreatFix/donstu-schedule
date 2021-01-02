import React from 'react'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderBack from '@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack'
import List from '@vkontakte/vkui/dist/components/List/List'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'
import Spinner from '@vkontakte/vkui/dist/components/Spinner/Spinner'

const CustomList = ({ list, header, goBack, fetching, onClick = null, disabled = true, objectList = false }) => {
  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>{header}</PanelHeader>
      {fetching ? (
        <Spinner />
      ) : (
        <List>
          {list ? (
            list.map((item, index) => (
              <SimpleCell
                disabled={disabled}
                onClick={() => {
                  objectList && onClick(item.id, item.name)
                }}
                key={index}
              >
                <span>{objectList ? item.name : item}</span>
              </SimpleCell>
            ))
          ) : (
            <SimpleCell>
              <span>Не найдено</span>
            </SimpleCell>
          )}
        </List>
      )}
    </>
  )
}

export default CustomList
