import React, { useState } from 'react'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import View from '@vkontakte/vkui/dist/components/View/View'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell'
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot'
import Link from '@vkontakte/vkui/dist/components/Link/Link'
import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage'
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Select from '@vkontakte/vkui/dist/components/Select/Select'

import axios from 'axios'
import { usePlatform } from '@vkontakte/vkui'
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import Icon24ChevronCompactRight from '@vkontakte/icons/dist/24/chevron_compact_right'
import logo from '../../img/logo.png'
import ToggleTheme from '../../components/ToggleTheme/ToggleTheme'

import bridge from '@vkontakte/vk-bridge'

let faculties = []

const Profile = () => {
  let GROUP_NAME = localStorage.getItem('GROUP_NAME')
  let FACULTY = localStorage.getItem('FACULTY')

  const platform = usePlatform()

  let [activePanel, setActivePanel] = useState('main')
  let [activeModal, setActiveModal] = useState(null)
  let [groups, setGroups] = useState([])
  let [faculty, setFaculty] = useState('')
  let [kurs, setKurs] = useState(0)

  const getGroups = async () => {
    const result = await axios({
      url: 'https://edu.donstu.ru/api/raspGrouplist?year=2020-2021',
      crossDomain: true,
    })

    const keys = Object.keys(result.data.data)
    const data = result.data.data
    keys.forEach((key) => {
      data[key].key = key
    }) //Нужно для обработки клика в seacrhPanel

    setGroups(data)
    const facultiesAll = data.map(({ facul }) => facul)
    faculties = Array.from(new Set(facultiesAll))
  }

  const handleClickSelectGroup = async () => {
    getGroups()
    setActivePanel('searchGroup')
  }

  const handleClickToggleTheme = async () => {
    const body = document.querySelector('body')
    let theme = body.getAttribute('scheme')

    if (theme === 'space_gray') {
      body.setAttribute('scheme', 'bright_light')
      bridge.send('VKWebAppStorageSet', { key: 'THEME', value: 'bright_light' })
      localStorage.setItem('THEME', 'bright_light')
    } else {
      body.setAttribute('scheme', 'space_gray')
      bridge.send('VKWebAppStorageSet', { key: 'THEME', value: 'space_gray' })
      localStorage.setItem('THEME', 'space_gray')
    }
  }

  const HandleClickGroup = (e) => {
    let cell = e.target

    while (!cell.classList.contains('SimpleCell')) cell = cell.parentNode
    const group = groups[cell.id]

    const id = String(group.id)
    const facul = String(group.facul)
    const name = String(group.name)

    bridge.send('VKWebAppStorageSet', { key: 'GROUP_ID', value: id })
    localStorage.setItem('GROUP_ID', id)

    bridge.send('VKWebAppStorageSet', { key: 'FACULTY', value: facul })
    localStorage.setItem('FACULTY', facul)

    bridge.send('VKWebAppStorageSet', { key: 'GROUP_NAME', value: name })
    localStorage.setItem('GROUP_NAME', name)

    sessionStorage.setItem('SCHEDULE', '')

    goMain()
  }

  const onChangeFaculty = (event) => setFaculty(event.target.value)
  const onChangeKurs = (event) => setKurs(Number(event.target.value))

  const hideModal = () => setActiveModal(null)
  const goMain = () => {
    setActivePanel('main')
    setFaculty('')
    setKurs(0)
  }

  return (
    <View
      id="profile"
      activePanel={activePanel}
      modal={
        <ModalRoot activeModal={activeModal}>
          <ModalPage
            id="filtersGroup"
            onClose={hideModal}
            header={
              <ModalPageHeader
                left={
                  platform === 'android' && (
                    <PanelHeaderButton onClick={hideModal}>
                      <Icon24Cancel />
                    </PanelHeaderButton>
                  )
                }
                right={
                  <PanelHeaderButton onClick={hideModal}>
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
                defaultValue={faculty}
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
                defaultValue={kurs}
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
      }
    >
      <Panel id="main">
        <PanelHeader separator={false}> Профиль </PanelHeader>
        <RichCell
          disabled
          //after={<Icon28UserAddOutline />}
          before={<Avatar size={48} src={logo} />}
          caption={
            <Link
              style={{ fontSize: '0.8em' }}
              href="https://vk.com/donstushedule"
            >
              Подпишитесь, чтобы поддержать автора
            </Link>
          }
        >
          ДГТУ - Расписание
        </RichCell>
        <SimpleCell indicator={FACULTY}>Факультет</SimpleCell>
        <SimpleCell
          onClick={handleClickSelectGroup}
          expandable={true}
          indicator={
            <div
              style={{
                display: 'flex',
                direction: 'row',
                alignItems: 'center',
              }}
            >
              {GROUP_NAME}
              {platform !== 'ios' && (
                <Icon24ChevronCompactRight style={{ marginLeft: 4 }} />
              )}
            </div>
          }
        >
          Группа
        </SimpleCell>
        <ToggleTheme handleClickToggleTheme={handleClickToggleTheme} />
      </Panel>
      <Panel id="searchGroup">
        <SearchPanel
          groups={groups}
          faculty={faculty}
          kurs={kurs}
          onFiltersClick={() => setActiveModal('filtersGroup')}
          HandleClickGroup={HandleClickGroup}
          goBack={goMain}
        />
      </Panel>
    </View>
  )
}

export default Profile
