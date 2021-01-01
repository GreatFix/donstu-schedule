import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import View from '@vkontakte/vkui/dist/components/View/View'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell'
import Link from '@vkontakte/vkui/dist/components/Link/Link'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'
import Select from '@vkontakte/vkui/dist/components/Select/Select'

import Icon24ChevronCompactRight from '@vkontakte/icons/dist/24/chevron_compact_right'
import { usePlatform } from '@vkontakte/vkui/dist/hooks/usePlatform'

import logo from '../../img/logo.png'
import ToggleTheme from '../../components/ToggleTheme/ToggleTheme'
import ModalFilter from '../../components/ModalFilter/ModalFilter'
import SearchPanel from '../../components/SearchPanel/SearchPanel'
import classes from './Profile.module.css'

import bridge from '@vkontakte/vk-bridge'

import { fetchGroups } from '../../store/actions/fetchGroups'
import { setGroupId, setGroupName, setFaculty, setPost } from '../../store/actions/userData'
import { clearScheduleGroup } from '../../store/actions/fetchScheduleGroup'
import { setDate } from '../../store/actions/date'

const Profile = () => {
  const dispatch = useDispatch()
  const onFetchGroups = useCallback(() => dispatch(fetchGroups()), [dispatch])
  const onSetGroupId = useCallback((groupId) => dispatch(setGroupId(groupId)), [dispatch])
  const onSetGroupName = useCallback((groupName) => dispatch(setGroupName(groupName)), [dispatch])
  const onSetFaculty = useCallback((faculty) => dispatch(setFaculty(faculty)), [dispatch])
  const onSetPost = useCallback((post) => dispatch(setPost(post)), [dispatch])
  const onClearScheduleGroup = useCallback(() => dispatch(clearScheduleGroup()), [dispatch])
  const onSetDate = useCallback((date) => dispatch(setDate(date)), [dispatch])

  const groupName = useSelector((state) => state.userData.groupName)
  const faculty = useSelector((state) => state.userData.faculty)
  const post = useSelector((state) => state.userData.post)
  const groups = useSelector((state) => state.fetchGroups.groups)

  const [activePanel, setActivePanel] = useState('main')
  const [activeModal, setActiveModal] = useState(null)
  const [facultyFilter, setFacultyFilter] = useState('')
  const [kursFilter, setKursFilter] = useState(0)
  const platform = usePlatform()

  const onClickSelectGroup = async () => {
    onFetchGroups()
    setActivePanel('searchGroup')
  }

  const onClickToggleTheme = async () => {
    const body = document.querySelector('body')
    let theme = body.getAttribute('scheme')

    if (theme === 'space_gray') {
      body.setAttribute('scheme', 'bright_light')
      bridge.send('VKWebAppStorageSet', { key: 'THEME', value: 'bright_light' })
    } else {
      body.setAttribute('scheme', 'space_gray')
      bridge.send('VKWebAppStorageSet', { key: 'THEME', value: 'space_gray' })
    }
  }

  const onClickGroup = (e) => {
    let cell = e.target

    while (!cell.classList.contains('SimpleCell')) cell = cell.parentNode
    const group = groups[cell.id]

    const id = String(group.id)
    const facul = String(group.facul)
    const name = String(group.name)

    bridge.send('VKWebAppStorageSet', { key: 'GROUP_ID', value: id })
    bridge.send('VKWebAppStorageSet', { key: 'GROUP_NAME', value: name })
    bridge.send('VKWebAppStorageSet', { key: 'FACULTY', value: facul })

    onSetGroupId(id)
    onSetFaculty(facul)
    onSetGroupName(name)
    onClearScheduleGroup()
    onSetDate(new Date())

    onGoMain()
  }

  const onChangeFaculty = (event) => setFacultyFilter(event.target.value)
  const onChangeKurs = (event) => setKursFilter(Number(event.target.value))

  const onChangePost = (event) => {
    onSetPost(event.target.value)
    bridge.send('VKWebAppStorageSet', { key: 'POST', value: event.target.value })
  }
  const onHideModal = () => setActiveModal(null)
  const onGoMain = () => {
    setActivePanel('main')
  }

  return (
    <View
      id="profile"
      activePanel={activePanel}
      modal={
        <ModalFilter
          activeModal={activeModal}
          onHideModal={onHideModal}
          onChangeFaculty={onChangeFaculty}
          onChangeKurs={onChangeKurs}
          facultyFilter={facultyFilter}
          kursFilter={kursFilter}
        />
      }
    >
      <Panel id="main">
        <PanelHeader> Профиль </PanelHeader>
        <RichCell
          disabled
          before={<Avatar size={48} src={logo} />}
          caption={
            <Link className={classes.Link} href="https://vk.com/donstushedule">
              Подпишитесь, чтобы поддержать автора
            </Link>
          }
        >
          ДГТУ - Расписание
        </RichCell>
        <SimpleCell>
          <Select onChange={onChangePost} defaultValue={post} top="Должность" placeholder="Не выбран">
            <option value={'Студент'}>Студент</option>
            <option value={'Преподаватель'}>Преподаватель</option>
          </Select>
        </SimpleCell>
        <SimpleCell indicator={faculty}>Факультет</SimpleCell>
        <SimpleCell
          onClick={onClickSelectGroup}
          expandable={true}
          indicator={
            <div className={classes.GroupCell}>
              {groupName}
              {platform !== 'ios' && <Icon24ChevronCompactRight style={{ marginLeft: 4 }} />}
            </div>
          }
        >
          Группа
        </SimpleCell>
        <ToggleTheme onClickToggleTheme={onClickToggleTheme} />
      </Panel>
      <Panel id="searchGroup">
        <SearchPanel
          groups={groups}
          faculty={facultyFilter}
          kurs={kursFilter}
          onFiltersClick={() => setActiveModal('filtersGroup')}
          onClickGroup={onClickGroup}
          goBack={onGoMain}
        />
      </Panel>
    </View>
  )
}

export default Profile
