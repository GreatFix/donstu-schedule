import React from 'react'
import { useSelector } from 'react-redux'
import {
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  FormLayout,
  Select,
  usePlatform,
} from '@vkontakte/vkui'
import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'

const MODAL_FILTERS_GROUP = 'FILTERS_GROUP'
const ModalFilter = ({
  activeModal,
  onClickHide,
  onChangeFaculty,
  onChangeKurs,
  facultyFilter,
  kursFilter,
}) => {
  const faculties = useSelector((state) => state.fetchGroups.faculties)
  const platform = usePlatform()
  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        id={MODAL_FILTERS_GROUP}
        onClose={onClickHide}
        header={
          <ModalPageHeader
            left={
              platform === 'android' && (
                <PanelHeaderButton onClick={onClickHide}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              )
            }
            right={
              <PanelHeaderButton onClick={onClickHide}>
                {platform === 'ios' ? 'Готово' : <Icon24Done />}
              </PanelHeaderButton>
            }
          >
            Фильтры
          </ModalPageHeader>
        }
      >
        <FormLayout>
          <Select
            onChange={onChangeFaculty}
            defaultValue={facultyFilter}
            top="Факультет"
            placeholder="Не выбрана"
          >
            {faculties &&
              faculties.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
          </Select>
          <Select
            onChange={onChangeKurs}
            defaultValue={kursFilter}
            top="Курс"
            placeholder="Не выбран"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </Select>
        </FormLayout>
      </ModalPage>
    </ModalRoot>
  )
}

export default ModalFilter
