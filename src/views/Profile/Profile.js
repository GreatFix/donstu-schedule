import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Panel,
  View,
  PanelHeader,
  Avatar,
  RichCell,
  Link,
  SimpleCell,
  Switch,
  Snackbar,
  usePlatform,
} from '@vkontakte/vkui'
import { Icon24ChevronCompactRight } from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'

import { fetchGroups } from '../../store/actions/fetchGroups'
import { fetchTeachers } from '../../store/actions/fetchTeachers'
import { fetchDisciplines } from '../../store/actions/fetchDisciplines'
import { fetchTeacherGroups } from '../../store/actions/fetchTeacherGroups'
import { fetchGroupTeachers } from '../../store/actions/fetchGroupTeachers'
import { setGroup, setPost, setTeacher } from '../../store/actions/userData'
import { clearSchedule } from '../../store/actions/fetchSchedule'
import { setDate } from '../../store/actions/date'

import ToggleTheme from '../../components/ToggleTheme/ToggleTheme'
import ModalFilter from '../../components/ModalFilter/ModalFilter'
import SearchGroup from '../../components/SearchGroup/SearchGroup'
import SearchTeacher from '../../components/SearchTeacher/SearchTeacher'
import CustomList from '../../components/CustomList/CustomList'
import logo from '../../img/logo.png'
import classes from './Profile.module.css'

const Profile = () => {
  const dispatch = useDispatch()
  const onFetchGroups = useCallback(() => dispatch(fetchGroups()), [dispatch])
  const onFetchTeachers = useCallback(() => dispatch(fetchTeachers()), [dispatch])
  const onFetchDisciplines = useCallback(() => dispatch(fetchDisciplines()), [dispatch])
  const onFetchTeacherGroups = useCallback(() => dispatch(fetchTeacherGroups()), [dispatch])
  const onFetchGroupTeachers = useCallback(() => dispatch(fetchGroupTeachers()), [dispatch])
  const onSetGroup = useCallback(
    (groupId, groupName, faculty) => dispatch(setGroup(groupId, groupName, faculty)),
    [dispatch]
  )
  const onSetTeacher = useCallback(
    (teacherId, teacherName) => dispatch(setTeacher(teacherId, teacherName)),
    [dispatch]
  )
  const onSetPost = useCallback((post) => dispatch(setPost(post)), [dispatch])
  const onSetDate = useCallback((date) => dispatch(setDate(date)), [dispatch])
  const onClearSchedule = useCallback(() => dispatch(clearSchedule()), [dispatch])

  const bridgeSupport = useSelector((state) => state.userData.bridgeSupport)
  const post = useSelector((state) => state.userData.post)

  const groupName = useSelector((state) => state.userData.groupName)
  const faculty = useSelector((state) => state.userData.faculty)
  const groups = useSelector((state) => state.fetchGroups.groups)
  const fetchingGroups = useSelector((state) => state.fetchGroups.fetching)

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

  const handleClickSearchGroup = () => {
    onFetchGroups()
    setActivePanel('searchGroup')
  }
  const handleClickSearchTeacher = () => {
    onFetchTeachers()
    setActivePanel('searchTeacher')
  }
  const handleClickDisciplines = () => {
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
  const handleClickGroups = () => {
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
  const handleClickTeachers = () => {
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
  const onChangeTeacher = (id, name) => {
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
    onSetTeacher(String(id), name)
    onClearSchedule()
    onSetDate(new Date())
    handleClickBack()
  }
  const onChangeGroup = (id, name, facul) => {
    if (bridgeSupport) {
      bridge.send('VKWebAppStorageSet', { key: 'GROUP_ID', value: String(id) })
      bridge.send('VKWebAppStorageSet', { key: 'GROUP_NAME', value: name })
      bridge.send('VKWebAppStorageSet', { key: 'FACULTY', value: facul })
    } else {
      localStorage.setItem('GROUP_ID', String(id))
      localStorage.setItem('GROUP_NAME', name)
      localStorage.setItem('FACULTY', facul)
    }

    onSetGroup(String(id), facul, name)
    onClearSchedule()
    onSetDate(new Date())
    setKursFilter(null)
    setFacultyFilter(null)

    handleClickBack()
  }
  const onChangeTheme = () => {
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
  const handleClickModalHide = () => {
    setActiveModal(null)
  }
  const handleClickBack = () => {
    setActivePanel('main')
  }

  return (
    <View
      id="profile"
      activePanel={activePanel}
      modal={
        <ModalFilter
          activeModal={activeModal}
          onClickHide={handleClickModalHide}
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
        <SimpleCell
          disabled
          after={<Switch onChange={onChangePost} checked={post === 'Преподаватель'} value={post} />}
        >
          Преподаватель
        </SimpleCell>
        {post === 'Студент' ? (
          <>
            <SimpleCell indicator={faculty} disabled>
              Факультет
            </SimpleCell>
            <SimpleCell
              onClick={handleClickSearchGroup}
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
            <SimpleCell onClick={handleClickTeachers} expandable={true}>
              Ваши преподаватели
            </SimpleCell>
          </>
        ) : (
          <>
            <SimpleCell
              onClick={handleClickSearchTeacher}
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
            <SimpleCell onClick={handleClickGroups} expandable={true}>
              Ваши группы
            </SimpleCell>
          </>
        )}
        <SimpleCell onClick={handleClickDisciplines} expandable={true}>
          Ваши предметы
        </SimpleCell>
        <ToggleTheme onChangeTheme={onChangeTheme} />
        {snack}
      </Panel>
      <Panel id="searchGroup">
        <SearchGroup
          groups={groups}
          faculty={facultyFilter}
          kurs={kursFilter}
          onClickFilters={() => setActiveModal('filtersGroup')}
          onChangeGroup={onChangeGroup}
          onClickBack={handleClickBack}
          fetching={fetchingGroups}
        />
      </Panel>
      <Panel id="searchTeacher">
        <SearchTeacher
          teachers={teachers}
          onChangeTeacher={onChangeTeacher}
          onClickBack={handleClickBack}
          fetching={fetchingTeachers}
        />
      </Panel>
      <Panel id="disciplines">
        <CustomList
          list={disciplines}
          header={'Список предметов'}
          onClickBack={handleClickBack}
          disabled={true}
          fetching={fetchingDisciplines}
        />
      </Panel>
      <Panel id="teacherGroups">
        <CustomList
          list={teacherGroups}
          header={'Список групп'}
          onClickBack={handleClickBack}
          disabled={true}
          fetching={fetchingTeacherGroups}
        />
      </Panel>
      <Panel id="groupTeachers">
        <CustomList
          list={groupTeachers}
          onClick={onChangeTeacher}
          header={'Список преподавателей'}
          onClickBack={handleClickBack}
          objectList={true}
          fetching={fetchingGroupTeachers}
        />
      </Panel>
    </View>
  )
}

export default Profile
