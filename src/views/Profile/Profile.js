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
  PanelHeaderBack,
  Headline,
  Spinner,
  usePlatform,
} from '@vkontakte/vkui'
import { Icon24ChevronCompactRight, Icon28CancelCircleFillRed } from '@vkontakte/icons'
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

const Profile = (props) => {
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

  const error = useSelector(
    (state) =>
      state.fetchGroups.error ||
      state.fetchTeachers.error ||
      state.fetchGroupTeachers.error ||
      state.fetchDisciplines.error ||
      state.fetchTeacherGroups.error
  )
  if (error && !snack) {
    setSnack(
      <Snackbar
        layout="vertical"
        onClose={() => setSnack(null)}
        before={<Icon28CancelCircleFillRed />}
        duration="60000"
      >
        {String(error)}
      </Snackbar>
    )
  }

  const handleClickModalHide = useCallback(() => {
    setActiveModal(null)
  }, [])

  const handleClickBack = useCallback(() => {
    setActivePanel('main')
  }, [])

  const handleClickSettings = useCallback(() => {
    setActivePanel('settings')
  }, [])

  const handleClickSearchGroup = useCallback(() => {
    onFetchGroups()
    setActivePanel('searchGroup')
  }, [onFetchGroups])

  const handleClickSearchTeacher = useCallback(() => {
    onFetchTeachers()
    setActivePanel('searchTeacher')
  }, [onFetchTeachers])

  const handleClickDisciplines = useCallback(() => {
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
  }, [groupName, onFetchDisciplines, post, teacherName])

  const handleClickGroups = useCallback(() => {
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
  }, [onFetchTeacherGroups, teacherName])

  const handleClickTeachers = useCallback(() => {
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
  }, [groupName, onFetchGroupTeachers])

  const handleClickAddToDisplay = useCallback(async () => {
    const check = await bridge.send('VKWebAppAddToHomeScreenInfo')
    if (check.is_feature_supported) {
      if (check.is_added_to_home_screen) {
        setSnack(
          <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
            Уже добавлено
          </Snackbar>
        )
        return
      }
      const adding = await bridge.send('VKWebAppAddToHomeScreen')
      setSnack(<Spinner />)
      if (adding.result) {
        const timeout = setTimeout(async () => {
          const check = await bridge.send('VKWebAppAddToHomeScreenInfo')
          if (check.is_added_to_home_screen) {
            setSnack(
              <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
                Успешно добавлено
              </Snackbar>
            )
            return
          } else {
            setSnack(
              <Snackbar layout="vertical" duration="5000" onClose={() => setSnack(null)}>
                Не добавлено. Видимо нужно сначала дать разрешение VK добавлять ярлыки рабочего
                стола.
              </Snackbar>
            )
          }
        }, 11000)

        const interval = setInterval(async () => {
          const check = await bridge.send('VKWebAppAddToHomeScreenInfo')
          if (check.is_added_to_home_screen) {
            setSnack(
              <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
                Успешно добавлено
              </Snackbar>
            )
            clearTimeout(timeout)
            clearInterval(interval)
            return
          }
        }, 1000)
      } else {
        setSnack(
          <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
            {adding.error_type + '-' + adding.error_data}
          </Snackbar>
        )
      }
    } else {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          На вашем устройстве не поддерживается
        </Snackbar>
      )
    }
  }, [])

  const handleClickAddToFavorite = useCallback(async () => {
    const adding = await bridge.send('VKWebAppAddToFavorites')

    if (adding.result) {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          Успешно добавлено
        </Snackbar>
      )
    } else {
      setSnack(
        <Snackbar layout="vertical" duration="3000" onClose={() => setSnack(null)}>
          {adding.error_type + '-' + adding.error_data}
        </Snackbar>
      )
    }
  }, [])

  const onChangeTeacher = useCallback(
    (id, name) => {
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
    },
    [bridgeSupport, handleClickBack, onClearSchedule, onSetDate, onSetPost, onSetTeacher]
  )

  const onChangeGroup = useCallback(
    (id, name, facul) => {
      if (bridgeSupport) {
        bridge.send('VKWebAppStorageSet', { key: 'GROUP_ID', value: String(id) })
        bridge.send('VKWebAppStorageSet', { key: 'GROUP_NAME', value: name })
        bridge.send('VKWebAppStorageSet', { key: 'FACULTY', value: facul })
      } else {
        localStorage.setItem('GROUP_ID', String(id))
        localStorage.setItem('GROUP_NAME', name)
        localStorage.setItem('FACULTY', facul)
      }

      onSetGroup(String(id), name, facul)
      onClearSchedule()
      onSetDate(new Date())
      setKursFilter(null)
      setFacultyFilter(null)

      handleClickBack()
    },
    [bridgeSupport, handleClickBack, onClearSchedule, onSetDate, onSetGroup]
  )

  const onChangeTheme = useCallback(() => {
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
  }, [bridgeSupport])

  const onChangeFaculty = useCallback((e) => {
    setFacultyFilter(e.target.value)
  }, [])

  const onChangeKurs = useCallback((e) => {
    setKursFilter(Number(e.target.value))
  }, [])

  const onChangePost = useCallback(
    (e) => {
      let newPost = 'Студент'
      if (e.target.value === 'Студент') newPost = 'Преподаватель'
      onSetPost(newPost)
      if (bridgeSupport) {
        bridge.send('VKWebAppStorageSet', { key: 'POST', value: newPost })
      } else {
        localStorage.setItem('POST', newPost)
      }

      onClearSchedule()
    },
    [bridgeSupport, onClearSchedule, onSetPost]
  )

  if (props.redirectToSearch && activePanel === 'main') {
    if (props.redirectToSearch === 'group' && !groupName) handleClickSearchGroup()
    else if (props.redirectToSearch === 'teacher' && !teacherName) handleClickSearchTeacher()
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
        {bridgeSupport && (
          <SimpleCell onClick={handleClickSettings} expandable={true}>
            Настройки
          </SimpleCell>
        )}
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
                <div className={classes.Cell} style={{ fontSize: '0.8em' }}>
                  {teacherName}
                  {platform !== 'ios' && <Icon24ChevronCompactRight style={{ marginLeft: 4 }} />}
                </div>
              }
              multiline={true}
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
        {snack}
      </Panel>
      <Panel id="searchTeacher">
        <SearchTeacher
          teachers={teachers}
          onChangeTeacher={onChangeTeacher}
          onClickBack={handleClickBack}
          fetching={fetchingTeachers}
        />
        {snack}
      </Panel>
      <Panel id="disciplines">
        <CustomList
          list={disciplines}
          header={'Список предметов'}
          onClickBack={handleClickBack}
          disabled={true}
          fetching={fetchingDisciplines}
        />
        {snack}
      </Panel>
      <Panel id="teacherGroups">
        <CustomList
          list={teacherGroups}
          header={'Список групп'}
          onClickBack={handleClickBack}
          disabled={true}
          fetching={fetchingTeacherGroups}
        />
        {snack}
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
        {snack}
      </Panel>
      <Panel id="settings">
        <PanelHeader left={<PanelHeaderBack onClick={handleClickBack} />}>
          <Headline>Настройки</Headline>
        </PanelHeader>
        <SimpleCell onClick={handleClickAddToFavorite} expandable={true}>
          Добавить в избранное
        </SimpleCell>
        <SimpleCell onClick={handleClickAddToDisplay} expandable={true} multiline={true}>
          Добавить ярлык на главный экран
        </SimpleCell>
        {snack}
      </Panel>
    </View>
  )
}

export default Profile
