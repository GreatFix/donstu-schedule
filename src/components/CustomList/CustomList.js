import React from 'react'
import {
  PanelHeader,
  PanelHeaderBack,
  List,
  SimpleCell,
  Spinner,
  Headline,
  Placeholder,
} from '@vkontakte/vkui'
import Icon28FaceRecognitionOutline from '@vkontakte/icons/dist/28/face_recognition_outline'
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
          {list && list.length ? (
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
            <Placeholder icon={<Icon28FaceRecognitionOutline width={56} height={56} />}>
              Не найдено
            </Placeholder>
          )}
        </List>
      )}
    </>
  )
}

export default CustomList
