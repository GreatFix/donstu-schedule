import React from 'react'
import { useSelector } from 'react-redux'
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot'
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage'
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Select from '@vkontakte/vkui/dist/components/Select/Select'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import { usePlatform } from '@vkontakte/vkui/dist/hooks/usePlatform'

const ModalFilter = ({ activeModal, onHideModal, onChangeFaculty, onChangeKurs, facultyFilter, kursFilter }) => {
  const faculties = useSelector((state) => state.fetchGroups.faculties)
  const platform = usePlatform()
  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage
        id="filtersGroup"
        onClose={onHideModal}
        header={
          <ModalPageHeader
            left={
              platform === 'android' && (
                <PanelHeaderButton onClick={onHideModal}>
                  <Icon24Cancel />
                </PanelHeaderButton>
              )
            }
            right={
              <PanelHeaderButton onClick={onHideModal}>
                {platform === 'ios' ? 'Готово' : <Icon24Done />}
              </PanelHeaderButton>
            }
          >
            Фильтры
          </ModalPageHeader>
        }
      >
        <FormLayout>
          <Select onChange={onChangeFaculty} defaultValue={facultyFilter} top="Факультет" placeholder="Не выбрана">
            {faculties &&
              faculties.map((faculty, index) => (
                <option key={index} value={faculty}>
                  {faculty}
                </option>
              ))}
          </Select>
          <Select onChange={onChangeKurs} defaultValue={kursFilter} top="Курс" placeholder="Не выбран">
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
