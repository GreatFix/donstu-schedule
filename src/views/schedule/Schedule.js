import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  PullToRefresh,
  FixedLayout,
  PanelHeader,
  Panel,
  Snackbar,
  Placeholder,
  Spinner,
  Tooltip,
} from '@vkontakte/vkui'
import bridge from '@vkontakte/vk-bridge'
import { Icon28CancelCircleFillRed, Icon24ReportOutline } from '@vkontakte/icons'
import { useSwipeable } from 'react-swipeable'

import { addHelpers } from '../../store/actions/userData'
import { fetchSchedule } from '../../store/actions/fetchSchedule'
import { nextWeek, prevWeek, setCurrentDate } from '../../store/actions/date'
import DayWeekTabs from '../../components/DayWeekTabs/DayWeekTabs'
import SheduleDay from '../../components/SheduleDay/SheduleDay'
import classes from './Schedule.module.css'

const Schedule = () => {
  const dispatch = useDispatch()
  const onFetchSchedule = useCallback(() => dispatch(fetchSchedule()), [dispatch])
  const onNextWeek = useCallback(() => dispatch(nextWeek()), [dispatch])
  const onPrevWeek = useCallback(() => dispatch(prevWeek()), [dispatch])
  const onSetCurrentDate = useCallback(() => dispatch(setCurrentDate), [dispatch])
  const onAddHelpers = useCallback((helpers) => dispatch(addHelpers(helpers)), [dispatch])

  const bridgeSupport = useSelector((state) => state.userData.bridgeSupport)
  const helpers = useSelector((state) => state.userData.helpers)
  const platform = useSelector((state) => state.userData.platform)
  const dayWeekNum = useSelector((state) => state.date.dayWeekNum)
  const schedule = useSelector((state) => state.fetchSchedule.schedule)
  const fetching = useSelector((state) => state.fetchSchedule.fetching)
  const error = useSelector((state) => state.fetchSchedule.error)

  const [snack, setSnack] = useState(null)

  if (error && !snack) {
    setSnack(
      <Snackbar
        layout="vertical"
        onClose={() => setSnack(null)}
        action="Повторить загрузку"
        onActionClick={onFetchSchedule}
        before={<Icon28CancelCircleFillRed />}
        duration="60000"
      >
        {String(error)}
      </Snackbar>
    )
  }

  useEffect(() => {
    if (!schedule) onFetchSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlers = useSwipeable({
    onSwipedRight: onPrevWeek,
    onSwipedLeft: onNextWeek,
  })

  const handleClickTooltip = useCallback(
    (tag) => {
      if (bridgeSupport) {
        bridge.send('VKWebAppStorageSet', { key: 'HELPERS', value: String(helpers + tag) })
      } else {
        localStorage.setItem('HELPERS', String(helpers + tag))
      }
      onAddHelpers(tag)
    },
    [bridgeSupport, helpers, onAddHelpers]
  )

  return (
    <View id="shedule" activePanel="active">
      <Panel id="active">
        <PanelHeader> Расписание </PanelHeader>
        <PullToRefresh
          onRefresh={() => {
            onSetCurrentDate()
            onFetchSchedule()
          }}
          isFetching={fetching}
        >
          {fetching ? (
            <Spinner />
          ) : !error ? (
            schedule && <SheduleDay day={schedule.days[dayWeekNum]} />
          ) : (
            <Placeholder icon={<Icon24ReportOutline width={56} height={56} fill={'#FF0000'} />}>
              Ошибка ответа от API ДГТУ
            </Placeholder>
          )}
        </PullToRefresh>

        {platform !== 'desktop_web' ? (
          <div className={classes.SwiperWeek} {...handlers}>
            <Tooltip
              isShown={!helpers.includes('first')}
              onClose={() => handleClickTooltip('first')}
              header="Подсказочка"
              text="Вы можете провести пальцем по дням недели налево и направо, чтобы перейти соответственно  в предыдущую и следующую неделю. Спасибо за внимание :) "
              alignY="top"
            >
              <FixedLayout vertical="bottom">
                <DayWeekTabs
                  arrows={false}
                  helpers={helpers}
                  handleClickTooltip={handleClickTooltip}
                />
              </FixedLayout>
            </Tooltip>
          </div>
        ) : (
          <FixedLayout className={classes.FixedLayout} vertical="bottom">
            <DayWeekTabs arrows={true} />
          </FixedLayout>
        )}

        {snack}
      </Panel>
    </View>
  )
}

export default Schedule
