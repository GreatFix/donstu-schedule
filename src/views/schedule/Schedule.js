import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import View from '@vkontakte/vkui/dist/components/View/View'
import PullToRefresh from '@vkontakte/vkui/dist/components/PullToRefresh/PullToRefresh'
import FixedLayout from '@vkontakte/vkui/dist/components/FixedLayout/FixedLayout'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Snackbar from '@vkontakte/vkui/dist/components/Snackbar/Snackbar'
import Icon28CancelCircleFillRed from '@vkontakte/icons/dist/28/cancel_circle_fill_red'
import { useSwipeable } from 'react-swipeable'

import { fetchSchedule } from '../../store/actions/fetchSchedule'
import { nextWeek, prevWeek } from '../../store/actions/date'

import classes from './Schedule.module.css'
import DayWeekTabs from '../../components/DayWeekTabs/DayWeekTabs'
import SheduleDay from '../../components/SheduleDay/SheduleDay'

const Schedule = () => {
  const dispatch = useDispatch()
  const onFetchSchedule = useCallback(() => dispatch(fetchSchedule()), [dispatch])
  const onNextWeek = useCallback(() => dispatch(nextWeek()), [dispatch])
  const onPrevWeek = useCallback(() => dispatch(prevWeek()), [dispatch])

  const platform = useSelector((state) => state.userData.platform)
  const dayWeekNum = useSelector((state) => state.date.dayWeekNum)
  const schedule = useSelector((state) => state.fetchSchedule.schedule)
  const fetching = useSelector((state) => state.fetchSchedule.fetching)
  const error = useSelector((state) => state.fetchSchedule.error)

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
        <PullToRefresh onRefresh={onFetchSchedule} isFetching={fetching}>
          {schedule && <SheduleDay day={schedule.days[dayWeekNum]} />}
        </PullToRefresh>

        {!error ? (
          platform !== 'desktop_web' ? (
            <div className={classes.SwiperWeek} {...handlers}>
              <FixedLayout vertical="bottom">
                <DayWeekTabs arrows={false} />
              </FixedLayout>
            </div>
          ) : (
            <FixedLayout className={classes.FixedLayout} vertical="bottom">
              <DayWeekTabs arrows={true} />
            </FixedLayout>
          )
        ) : (
          <Snackbar
            layout="vertical"
            onClose={onFetchSchedule}
            action="Повторить загрузку"
            onActionClick={onFetchSchedule}
            before={<Icon28CancelCircleFillRed />}
            duration="60000"
          >
            Error:{error}
          </Snackbar>
        )}
      </Panel>
    </View>
  )
}

export default Schedule
