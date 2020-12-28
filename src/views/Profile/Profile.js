import React, { useState } from 'react'
import {
  View,
  Panel,
  PanelHeader,
  Avatar,
  RichCell,
  ModalRoot,
  Link,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  SimpleCell,
  FormLayout,
  Select,
} from '@vkontakte/vkui'
import axios from 'axios'
import { usePlatform } from '@vkontakte/vkui'
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'
import Icon24Done from '@vkontakte/icons/dist/24/done'
import Icon24ChevronCompactRight from '@vkontakte/icons/dist/24/chevron_compact_right'
import logo from '../../img/logo.png'

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
    // const METHOD_NAME = 'groups.getById';
    // const PARAMETERS = 'group_id=201108040&test_mode=1';
    // const ACCESS_TOKEN = '6829aa39812d9591adca16533803334d634862c22deb7611ba15cd0d889bd4bb452fa3c9b8d2b28fbbce3';
    // const V = '5.126'
    // axios({url:`https://api.vk.com/method/${METHOD_NAME}?${PARAMETERS}&access_token=${ACCESS_TOKEN}&v=${V}`, crossDomain: true}).then(
    //   res => console.log(res)
    // )
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
      </Panel>
      <Panel id="searchGroup">
        <SearchPanel
          groups={groups}
          faculty={faculty}
          kurs={kurs}
          onFiltersClick={() => setActiveModal('filtersGroup')}
          goBack={goMain}
        />
      </Panel>
    </View>
  )
}

export default Profile
