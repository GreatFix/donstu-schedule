import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, PullToRefresh, FixedLayout, PanelHeader, Panel, Snackbar } from '@vkontakte/vkui'
import { Icon28CancelCircleFillRed } from '@vkontakte/icons'
import { useSwipeable } from 'react-swipeable'

import { fetchSchedule, clearError } from '../../store/actions/fetchSchedule'
import { nextWeek, prevWeek, setDate } from '../../store/actions/date'
import DayWeekTabs from '../../components/DayWeekTabs/DayWeekTabs'
import SheduleDay from '../../components/SheduleDay/SheduleDay'
import image from '../../img/404.png'
import classes from './Schedule.module.css'

const Schedule = () => {
  const dispatch = useDispatch()
  const onFetchSchedule = useCallback(() => dispatch(fetchSchedule()), [dispatch])
  const onClearError = useCallback(() => dispatch(clearError()), [dispatch])
  const onNextWeek = useCallback(() => dispatch(nextWeek()), [dispatch])
  const onPrevWeek = useCallback(() => dispatch(prevWeek()), [dispatch])
  const onSetDate = useCallback((date) => dispatch(setDate(date)), [dispatch])

  const platform = useSelector((state) => state.userData.platform)
  const dayWeekNum = useSelector((state) => state.date.dayWeekNum)
  const schedule = useSelector((state) => state.fetchSchedule.schedule)
  const fetching = useSelector((state) => state.fetchSchedule.fetching)
  const error = useSelector((state) => state.fetchSchedule.error)

  const [snack, setSnack] = useState(null)

  if (error) {
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
    onClearError()
  }

  useEffect(() => {
    if (!schedule) onFetchSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlers = useSwipeable({
    onSwipedRight: onPrevWeek,
    onSwipedLeft: onNextWeek,
  })

  return (
    <View id="shedule" activePanel="active">
      <Panel id="active">
        <PanelHeader> Расписание </PanelHeader>
        <PullToRefresh
          onRefresh={() => {
            onSetDate(new Date())
            onFetchSchedule()
          }}
          isFetching={fetching}
        >
          {!error ? (
            schedule && <SheduleDay day={schedule.days[dayWeekNum]} />
          ) : (
            <div className={classes.Error}>
              <img src={image} className={classes.Image} alt={'Ошибка запроса'} />
            </div>
          )}
        </PullToRefresh>

        {platform !== 'desktop_web' ? (
          <div className={classes.SwiperWeek} {...handlers}>
            <FixedLayout vertical="bottom">
              <DayWeekTabs arrows={false} />
            </FixedLayout>
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
