import React from 'react'
import { PanelHeader, PanelHeaderBack, List, SimpleCell, Spinner, Headline } from '@vkontakte/vkui'

const CustomList = ({
  list,
  header,
  onClickBack,
  fetching,
  onClick = null,
  disabled = true,
  objectList = false,
}) => {
  return (
    <>
      <PanelHeader left={<PanelHeaderBack onClick={onClickBack} />}>
        <Headline>{header}</Headline>
      </PanelHeader>
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
