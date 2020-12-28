import React, { useEffect, useState, useCallback, useReducer } from 'react'
import {
  View,
  PullToRefresh,
  FixedLayout,
  PanelHeader,
  Panel,
  Snackbar,
  usePlatform,
} from '@vkontakte/vkui'
import { useSwipeable } from 'react-swipeable'
import axios from 'axios'
import bridge from '@vkontakte/vk-bridge'
import Icon28CancelCircleFillRed from '@vkontakte/icons/dist/28/cancel_circle_fill_red'

import classes from './Schedule.module.css'
import DayWeekTabs from '../../components/DayWeekTabs/DayWeekTabs'
import SheduleDay from '../../components/SheduleDay/SheduleDay'

import { Transition } from 'react-transition-group'

const dataTransformation = (data) => {
  const dateToDay = (date) => {
    let temp = date.split('-')[2]
    if (/^0/.test(temp)) return temp.split('')[1]
    else return temp
  }

  if (data) {
    let days = {}
    let lessons = Object.keys(data.rasp)
    let received = false
    lessons.length === 0 ? (received = false) : (received = true) //Проверка на наличие данных в расписании
    lessons.forEach((les) => {
      let key = data.rasp[les].дата.split('T')[0]
      if (!days[key]) {
        days[key] = {
          dayWeek: '',
          day: '',
          lessons: {},
        }
      }
      if (!days[key].dayWeek) days[key].dayWeek = data.rasp[les].день_недели

      if (!days[key].dayWeekNum)
        days[key].dayWeekNum = data.rasp[les].деньНедели

      if (!days[key].day) {
        days[key].date = key
        days[key].day = dateToDay(key)
      }

      const start = data.rasp[les].начало.replace('-', ':')
      const end = data.rasp[les].конец.replace('-', ':')
      if (!days[key].lessons[`${start}-${end}`])
        days[key].lessons[`${start}-${end}`] = {}

      let type = ''
      switch (data.rasp[les].дисциплина.split(' ')[0]) {
        case 'лек':
          type = 'Лекция'
          break
        case 'лаб':
          type = 'Лабораторная'
          break
        case 'пр.':
          type = 'Практика'
          break
        default:
          type = ''
      }
      let number = 0
      switch (start) {
        case '8:30':
          number = 1
          break
        case '10:15':
          number = 2
          break
        case '12:00':
          number = 3
          break
        case '14:15':
          number = 4
          break
        case '16:00':
          number = 5
          break
        case '17:45':
          number = 6
          break
        case '19:30':
          number = 7
          break
        case '21:15':
          number = 8
          break
        default:
          number = 0
      }

      const name = data.rasp[les].дисциплина.split(' ').slice(1).join(' ')
      const aud = data.rasp[les].аудитория
      const teacher = data.rasp[les].преподаватель

      days[key].lessons[`${start}-${end}`][data.rasp[les].код] = {
        start,
        end,
        name,
        aud,
        teacher,
        type,
        number,
      }
    })

    let temp = {
      WeekID: data.info.selectedNumNed,
      Day: data.info.curNumNed,
      Semester: data.info.curSem,
      Year: data.info.year,
      GroupName: data.info.group.name,
      days: { ...days },
      received: received,
    }

    return temp
  }
}

function toDate(date) {
  let dd = date.getDate()
  if (dd < 10) dd = '0' + dd

  let mm = date.getMonth() + 1
  if (mm < 10) mm = '0' + mm

  let yyyy = date.getFullYear()

  return `${yyyy}-${mm}-${dd}`
}

const initialFetch = {
  fetching: true,
  errorFetch: false,
}

function reducerFetch(state, action) {
  switch (action.type) {
    case 'errorID':
      return { ...state, errorFetch: 'Выберите свою группу в "Профиль"' }
    case 'error':
      return { ...state, errorFetch: 'Ошибка запроса к API' }
    case 'success':
      return { ...state, fetching: false, errorFetch: false }
    case 'fetching':
      return { ...state, fetching: true }
    default:
      throw new Error()
  }
}

const initialDate = {
  date: toDate(new Date()),
  toggleWeek: false,
}

function reducerDate(state, action) {
  const SEVEN_DAYS = 604800000

  switch (action.type) {
    case 'nextWeek':
      return {
        ...state,
        date: toDate(new Date(+new Date(state.date) + +SEVEN_DAYS)),
        toggleWeek: true,
      }
    case 'prevWeek':
      return {
        ...state,
        date: toDate(new Date(+new Date(state.date) - +SEVEN_DAYS)),
        toggleWeek: true,
      }
    case 'setDate':
      return { ...state, date: action.date }
    case 'toggleOff':
      return { ...state, toggleWeek: false }
    default:
      throw new Error()
  }
}

const initialDATA = {
  data: {},
  url: false,
  groupId: false,
}

function reducerDATA(state, action) {
  switch (action.type) {
    case 'setData':
      return { ...state, data: action.data }
    case 'setGroupId':
      return { ...state, groupId: action.groupId }
    default:
      throw new Error()
  }
}

const Schedule = (props) => {
  const [stateFetch, dispatchFetch] = useReducer(reducerFetch, initialFetch)
  const [stateDate, dispatchDate] = useReducer(reducerDate, initialDate)
  const [stateDATA, dispatchDATA] = useReducer(reducerDATA, initialDATA)
  const [url, setUrl] = useState(false)
  const [anim, setAnim] = useState(true)
  const platform = usePlatform()
  useEffect(() => {
    setAnim(false)
    setTimeout(() => setAnim(true), 150)
  }, [stateDate.toggleWeek])

  useEffect(() => {
    async function getInBridge() {
      const res = await bridge.send('VKWebAppStorageGet', {
        keys: ['GROUP_ID', 'GROUP_NAME', 'FACULTY'],
      })
      res.keys.forEach((obj) => {
        localStorage.setItem(obj.key, obj.value)
      })

      dispatchDATA({
        type: 'setGroupId',
        groupId: localStorage.getItem('GROUP_ID'),
      })
    }

    getInBridge() // получение данных из хранилища bridge
  }, [])

  useEffect(() => {
    if (stateDATA.groupId)
      setUrl(
        `https://edu.donstu.ru/api/Rasp?idGroup=${stateDATA.groupId}&sdate=${stateDate.date}`
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateDATA.groupId, stateDate.toggleWeek])

  const fetchData = useCallback(() => {
    dispatchFetch({ type: 'fetching' })
    axios({
      url: url,
      crossDomain: true,
      timeout: 20000,
    }).then(
      (res) => {
        if (
          // eslint-disable-next-line eqeqeq
          res.data.data.info.group.groupID == stateDATA.groupId &&
          stateDATA.groupId
        ) {
          let tempData = dataTransformation(res.data.data)
          sessionStorage.setItem('SCHEDULE', JSON.stringify(tempData))

          dispatchDATA({ type: 'setData', data: tempData })
          dispatchFetch({ type: 'success' })
        } else if (!stateDATA.groupId) {
          dispatchFetch({
            type: 'errorID',
            errorFetch: 'Выберите свою группу в "Профиль"',
          })
        }
      },
      (err) => {
        dispatchFetch({ type: 'errorID', errorFetch: 'Ошибка запроса к API' })
        throw new Error(err)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  useEffect(() => {
    if (url !== false) {
      if (stateDate.toggleWeek) {
        fetchData()
        dispatchDate({ type: 'toggleOff' })
      } else fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  const handlers = useSwipeable({
    onSwipedRight: () => {
      dispatchDate({ type: 'prevWeek' })
    },
    onSwipedLeft: () => {
      dispatchDate({ type: 'nextWeek' })
    },
  })
  console.log('render')
  const defaultStyle = {
    transition: `opacity 150ms linear`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  }

  return (
    <View id="shedule" activePanel="active">
      <Panel id="active">
        <PanelHeader> Расписание </PanelHeader>
        <PullToRefresh onRefresh={fetchData} isFetching={stateFetch.fetching}>
          {!stateFetch.fetching && (
            <SheduleDay dayData={stateDATA.data.days[stateDate.date]} />
          )}
        </PullToRefresh>

        {!stateFetch.errorFetch ? (
          platform === ('android' || 'ios') ? (
            <div className={classes.SwiperWeek} {...handlers}>
              <FixedLayout vertical="bottom">
                <Transition in={anim} timeout={50} classNames="my-node">
                  {(state) => (
                    <DayWeekTabs
                      style={{ ...defaultStyle, ...transitionStyles[state] }}
                      data={stateDATA.data}
                      dispatchDate={dispatchDate}
                      curDate={stateDate.date}
                      arrows={false}
                    />
                  )}
                </Transition>
              </FixedLayout>
            </div>
          ) : (
            <FixedLayout vertical="bottom">
              <Transition in={anim} timeout={50} classNames="my-node">
                {(state) => (
                  <DayWeekTabs
                    style={{ ...defaultStyle, ...transitionStyles[state] }}
                    data={stateDATA.data}
                    dispatchDate={dispatchDate}
                    curDate={stateDate.date}
                    arrows={true}
                  />
                )}
              </Transition>
            </FixedLayout>
          )
        ) : (
          <Snackbar
            layout="vertical"
            onClose={() => {
              fetchData()
            }}
            action="Повторить загрузку"
            onActionClick={() => {
              fetchData()
            }}
            before={<Icon28CancelCircleFillRed />}
            duration="60000"
          >
            Error:{stateFetch.errorFetch}
          </Snackbar>
        )}
      </Panel>
    </View>
  )
}
export default Schedule
