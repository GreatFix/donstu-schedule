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
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar'
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
import { fetchDisciplines } from '../../store/actions/fetchDisciplines'
import { fetchTeacherGroups } from '../../store/actions/fetchTeacherGroups'
import { fetchGroupTeachers } from '../../store/actions/fetchGroupTeachers'

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
import CustomList from '../../components/CustomList/CustomList'

const Profile = () => {
  const dispatch = useDispatch()
  const onFetchGroups = useCallback(() => dispatch(fetchGroups()), [dispatch])
  const onFetchTeachers = useCallback(() => dispatch(fetchTeachers()), [dispatch])
  const onFetchDisciplines = useCallback(() => dispatch(fetchDisciplines()), [dispatch])
  const onFetchTeacherGroups = useCallback(() => dispatch(fetchTeacherGroups()), [dispatch])
  const onFetchGroupTeachers = useCallback(() => dispatch(fetchGroupTeachers()), [dispatch])
  const onSetGroupId = useCallback((groupId) => dispatch(setGroupId(groupId)), [dispatch])
  const onSetGroupName = useCallback((groupName) => dispatch(setGroupName(groupName)), [dispatch])
  const onSetTeacherId = useCallback((teacherId) => dispatch(setTeacherId(teacherId)), [dispatch])
  const onSetTeacherName = useCallback((teacherName) => dispatch(setTeacherName(teacherName)), [dispatch])
  const onSetFaculty = useCallback((faculty) => dispatch(setFaculty(faculty)), [dispatch])
  const onSetPost = useCallback((post) => dispatch(setPost(post)), [dispatch])
  const onClearSchedule = useCallback(() => dispatch(clearSchedule()), [dispatch])
  const onSetDate = useCallback((date) => dispatch(setDate(date)), [dispatch])

  const bridgeSupport = useSelector((state) => state.userData.bridgeSupport)
  const post = useSelector((state) => state.userData.post)
  const groupName = useSelector((state) => state.userData.groupName)
  const faculty = useSelector((state) => state.userData.faculty)
  const groups = useSelector((state) => state.fetchGroups.groups)
  const fetchinGroups = useSelector((state) => state.fetchGroups.fetching)
  const teacherName = useSelector((state) => state.userData.teacherName)
  const teachers = useSelector((state) => state.fetchTeachers.teachers)
  const fetchingTeachers = useSelector((state) => state.fetchTeachers.fetching)

  const groupTeachers = useSelector((state) => state.fetchGroupTeachers.teachers)
  const fetchingGroupTeachers = useSelector((state) => state.fetchGroupTeachers.fetching)
  const disciplines = useSelector((state) => state.fetchDisciplines.disciplines)
  const fetchingDisciplines = useSelector((state) => state.fetchDisciplines.fetching)
  const teacherGroups = useSelector((state) => state.fetchTeacherGroups.groups)
  const fetchingTeacherGroups = useSelector((state) => state.fetchTeacherGroups.fetching)

  const [activePanel, setActivePanel] = useState('main')
  const [activeModal, setActiveModal] = useState(null)
  const [snack, setSnack] = useState(null)
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
  const onClickDisciplines = () => {
    if (post === 'Преподаватель' && !teacherName) {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          Выберите для начала преподавателя
        </Snackbar>
      )
    } else if (post === 'Студент' && !groupName) {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          Выберите для начала группу
        </Snackbar>
      )
    } else {
      onFetchDisciplines()
      setActivePanel('disciplines')
    }
  }
  const onClickTeacherGroups = () => {
    if (teacherName) {
      onFetchTeacherGroups()
      setActivePanel('teacherGroups')
    } else {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          Выберите для начала преподавателя
        </Snackbar>
      )
    }
  }
  const onClickGroupTeachers = () => {
    if (groupName) {
      onFetchGroupTeachers()
      setActivePanel('groupTeachers')
    } else {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          Выберите для начала группу
        </Snackbar>
      )
    }
  }
  const onClickGroupTeacher = (id, name) => {
    if (bridgeSupport) {
      bridge.send('VKWebAppStorageSet', { key: 'TEACHER_ID', value: String(id) })
      bridge.send('VKWebAppStorageSet', { key: 'TEACHER_NAME', value: name })
      bridge.send('VKWebAppStorageSet', { key: 'POST', value: 'Преподаватель' })
    } else {
      localStorage.setItem('TEACHER_ID', String(id))
      localStorage.setItem('TEACHER_NAME', name)
      localStorage.setItem('POST', 'Преподаватель')
    }

    onSetPost('Преподаватель')
    onSetTeacherId(id)
    onSetTeacherName(name)
    onClearSchedule()
    onSetDate(new Date())
    onGoMain()
  }
  const onClickToggleTheme = () => {
    const body = document.querySelector('body')
    let theme = body.getAttribute('scheme')

    if (theme === 'space_gray') {
      body.setAttribute('scheme', 'bright_light')
      if (bridgeSupport) {
        bridge.send('VKWebAppStorageSet', { key: 'THEME', value: 'bright_light' })
      } else {
        localStorage.setItem('THEME', 'bright_light')
      }
    } else {
      body.setAttribute('scheme', 'space_gray')
      if (bridgeSupport) {
        bridge.send('VKWebAppStorageSet', { key: 'THEME', value: 'space_gray' })
      } else {
        localStorage.setItem('THEME', 'space_gray')
      }
    }
  }
  const onClickGroup = (id, name, facul) => {
    if (bridgeSupport) {
      bridge.send('VKWebAppStorageSet', { key: 'GROUP_ID', value: String(id) })
      bridge.send('VKWebAppStorageSet', { key: 'GROUP_NAME', value: name })
      bridge.send('VKWebAppStorageSet', { key: 'FACULTY', value: facul })
    } else {
      localStorage.setItem('GROUP_ID', String(id))
      localStorage.setItem('GROUP_NAME', name)
      localStorage.setItem('FACULTY', facul)
    }

    onSetGroupId(id)
    onSetFaculty(facul)
    onSetGroupName(name)
    onClearSchedule()
    onSetDate(new Date())
    setKursFilter(null)
    setFacultyFilter(null)

    onGoMain()
  }
  const onClickTeacher = (id, name) => {
    if (bridgeSupport) {
      bridge.send('VKWebAppStorageSet', { key: 'TEACHER_ID', value: String(id) })
      bridge.send('VKWebAppStorageSet', { key: 'TEACHER_NAME', value: name })
    } else {
      localStorage.setItem('TEACHER_ID', String(id))
      localStorage.setItem('TEACHER_NAME', name)
    }

    onSetTeacherId(String(id))
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
    if (bridgeSupport) {
      bridge.send('VKWebAppStorageSet', { key: 'POST', value: newPost })
    } else {
      localStorage.setItem('POST', newPost)
    }

    onClearSchedule()
  }
  const onHideModal = () => {
    setActiveModal(null)
  }
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
            <SimpleCell indicator={faculty} disabled>
              Факультет
            </SimpleCell>
            <SimpleCell
              onClick={onClickSelectGroup}
              expandable={true}
              indicator={
                <div className={classes.Cell}>
                  {groupName}
                  {platform !== 'ios' && <Icon24ChevronCompactRight style={{ marginLeft: 4 }} />}
                </div>
              }
            >
              Группа
            </SimpleCell>
            <SimpleCell onClick={onClickGroupTeachers} expandable={true}>
              Ваши преподаватели
            </SimpleCell>
          </>
        ) : (
          <>
            <SimpleCell
              onClick={onClickSelectTeacher}
              expandable={true}
              indicator={
                <div className={classes.Cell}>
                  {teacherName}
                  {platform !== 'ios' && <Icon24ChevronCompactRight style={{ marginLeft: 4 }} />}
                </div>
              }
            >
              ФИО
            </SimpleCell>
            <SimpleCell onClick={onClickTeacherGroups} expandable={true}>
              Ваши группы
            </SimpleCell>
          </>
        )}
        <SimpleCell onClick={onClickDisciplines} expandable={true}>
          Ваши предметы
        </SimpleCell>
        <ToggleTheme onClickToggleTheme={onClickToggleTheme} />
        {snack}
      </Panel>
      <Panel id="searchGroup">
        <SearchGroup
          groups={groups}
          faculty={facultyFilter}
          kurs={kursFilter}
          onFiltersClick={() => setActiveModal('filtersGroup')}
          onClickGroup={onClickGroup}
          goBack={onGoMain}
          fetching={fetchinGroups}
        />
      </Panel>
      <Panel id="searchTeacher">
        <SearchTeacher
          teachers={teachers}
          onClickTeacher={onClickTeacher}
          goBack={onGoMain}
          fetching={fetchingTeachers}
        />
      </Panel>
      <Panel id="disciplines">
        <CustomList
          list={disciplines}
          header={'Список предметов'}
          goBack={onGoMain}
          disabled={true}
          fetching={fetchingDisciplines}
        />
      </Panel>
      <Panel id="teacherGroups">
        <CustomList
          list={teacherGroups}
          header={'Список групп'}
          goBack={onGoMain}
          disabled={true}
          fetching={fetchingTeacherGroups}
        />
      </Panel>
      <Panel id="groupTeachers">
        <CustomList
          list={groupTeachers}
          onClick={onClickGroupTeacher}
          header={'Список преподавателей'}
          goBack={onGoMain}
          objectList={true}
          fetching={fetchingGroupTeachers}
        />
      </Panel>
    </View>
  )
}

export default Profile
