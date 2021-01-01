import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import View from '@vkontakte/vkui/dist/components/View/View'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar'
import RichCell from '@vkontakte/vkui/dist/components/RichCell/RichCell'
import Link from '@vkontakte/vkui/dist/components/Link/Link'
import SimpleCell from '@vkontakte/vkui/dist/components/SimpleCell/SimpleCell'
import Switch from '@vkontakte/vkui/dist/components/Switch/Switch'
import Icon24ChevronCompactRight from '@vkontakte/icons/dist/24/chevron_compact_right'
import { usePlatform } from '@vkontakte/vkui/dist/hooks/usePlatform'
import bridge from '@vkontakte/vk-bridge'

import logo from '../../img/logo.png'
import ToggleTheme from '../../components/ToggleTheme/ToggleTheme'
import ModalFilter from '../../components/ModalFilter/ModalFilter'
import SearchGroup from '../../components/SearchGroup/SearchGroup'
import SearchTeacher from '../../components/SearchTeacher/SearchTeacher'

import classes from './Profile.module.css'

import { fetchGroups } from '../../store/actions/fetchGroups'
import { fetchTeachers } from '../../store/actions/fetchTeachers'
import {
  setGroupId,
  setGroupName,
  setFaculty,
  setPost,
  setTeacherId,
  setTeacherName,
} from '../../store/actions/userData'
import { clearSchedule } from '../../store/actions/fetchSchedule'
import { setDate } from '../../store/actions/date'

const Profile = () => {
  const dispatch = useDispatch()
  const onFetchGroups = useCallback(() => dispatch(fetchGroups()), [dispatch])
  const onFetchTeachers = useCallback(() => dispatch(fetchTeachers()), [dispatch])
  const onSetGroupId = useCallback((groupId) => dispatch(setGroupId(groupId)), [dispatch])
  const onSetGroupName = useCallback((groupName) => dispatch(setGroupName(groupName)), [dispatch])
  const onSetTeacherId = useCallback((teacherId) => dispatch(setTeacherId(teacherId)), [dispatch])
  const onSetTeacherName = useCallback((teacherName) => dispatch(setTeacherName(teacherName)), [dispatch])
  const onSetFaculty = useCallback((faculty) => dispatch(setFaculty(faculty)), [dispatch])
  const onSetPost = useCallback((post) => dispatch(setPost(post)), [dispatch])
  const onClearSchedule = useCallback(() => dispatch(clearSchedule()), [dispatch])
  const onSetDate = useCallback((date) => dispatch(setDate(date)), [dispatch])

  const post = useSelector((state) => state.userData.post)
  const groupName = useSelector((state) => state.userData.groupName)
  const faculty = useSelector((state) => state.userData.faculty)
  const groups = useSelector((state) => state.fetchGroups.groups)
  const teacherName = useSelector((state) => state.userData.teacherName)
  const teachers = useSelector((state) => state.fetchTeachers.teachers)

  const [activePanel, setActivePanel] = useState('main')
  const [activeModal, setActiveModal] = useState(null)
  const [facultyFilter, setFacultyFilter] = useState('')
  const [kursFilter, setKursFilter] = useState(0)
  const platform = usePlatform()

  const onClickSelectGroup = () => {
    onFetchGroups()
    setActivePanel('searchGroup')
  }
  const onClickSelectTeacher = () => {
    onFetchTeachers()
    setActivePanel('searchTeacher')
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
    onClearSchedule()
    onSetDate(new Date())

    onGoMain()
  }
  const onClickTeacher = (e) => {
    let cell = e.target

    while (!cell.classList.contains('SimpleCell')) cell = cell.parentNode
    const teacher = teachers[cell.id]

    const id = String(teacher.id)
    const name = String(teacher.name)

    bridge.send('VKWebAppStorageSet', { key: 'TEACHER_ID', value: id })
    bridge.send('VKWebAppStorageSet', { key: 'TEACHER_NAME', value: name })

    onSetTeacherId(id)
    onSetTeacherName(name)
    onClearSchedule()
    onSetDate(new Date())

    onGoMain()
  }
  const onChangeFaculty = (e) => {
    setFacultyFilter(e.target.value)
  }
  const onChangeKurs = (e) => {
    setKursFilter(Number(e.target.value))
  }

  const onChangePost = (e) => {
    let newPost = 'Студент'
    if (e.target.value === 'Студент') newPost = 'Преподаватель'
    onSetPost(newPost)
    bridge.send('VKWebAppStorageSet', { key: 'POST', value: newPost })
    onClearSchedule()
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
        <SimpleCell disabled after={<Switch onChange={onChangePost} checked={post === 'Преподаватель'} value={post} />}>
          Преподаватель
        </SimpleCell>
        {post === 'Студент' ? (
          <>
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
          </>
        ) : (
          <>
            <SimpleCell
              onClick={onClickSelectTeacher}
              expandable={true}
              indicator={
                <div className={classes.TeacherCell}>
                  {teacherName}
                  {platform !== 'ios' && <Icon24ChevronCompactRight style={{ marginLeft: 4 }} />}
                </div>
              }
            >
              ФИО
            </SimpleCell>
          </>
        )}
        <ToggleTheme onClickToggleTheme={onClickToggleTheme} />
      </Panel>
      <Panel id="searchGroup">
        <SearchGroup
          groups={groups}
          faculty={facultyFilter}
          kurs={kursFilter}
          onFiltersClick={() => setActiveModal('filtersGroup')}
          onClickGroup={onClickGroup}
          goBack={onGoMain}
        />
      </Panel>
      <Panel id="searchTeacher">
        <SearchTeacher teachers={teachers} onClickTeacher={onClickTeacher} goBack={onGoMain} />
      </Panel>
    </View>
  )
}

export default Profile
