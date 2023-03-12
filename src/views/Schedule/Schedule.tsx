//Hooks and helpers
import { Icon24ReportOutline, Icon28CancelCircleFillRed } from '@vkontakte/icons'
import bridge from '@vkontakte/vk-bridge'
//Components
import {
  Panel,
  PanelHeader,
  Placeholder,
  PullToRefresh,
  Snackbar,
  Title,
  View,
} from '@vkontakte/vkui'
import { useSchedule } from 'api/hooks/useSchedule'
import cn from 'classnames/bind'
//Styles
import { DayWeekTabs } from 'components/DayWeekTabs'
import { Fade } from 'components/Fade'
import { ScheduleDay, ScheduleDaySkeleton } from 'components/ScheduleDay'
import { DateTime } from 'luxon'
import { useEffect } from 'react'
import { PANEL_SCHEDULE_ENUM } from 'shared/contexts/Navigation'
import { useScheduleDay } from 'shared/contexts/ScheduleDay'
import { useSnack } from 'shared/contexts/Snack'
import { ISODate } from 'shared/types/date'
import { IDay } from 'shared/types/donstu'

import styles from './index.module.css'
const cx = cn.bind(styles)

interface IScheduleProps {
  id: string
}

const getWeekName = (date: ISODate) => DateTime.fromISO(date).weekdayLong

export const Schedule = ({ id }: IScheduleProps) => {
  const { selectedDate, weekStartDate, selectDate } = useScheduleDay()
  const { setSnack, closeSnack } = useSnack()

  const { data, isFetching, isLoading, refetch, error } = useSchedule(weekStartDate, (error) => {
    setSnack(
      <Snackbar
        layout="vertical"
        onClose={closeSnack}
        onActionClick={handleUpdate}
        action="Повторно запросить расписание"
        before={<Icon28CancelCircleFillRed />}
        duration={60000}
      >
        {error.message}
      </Snackbar>
    )
  })

  const selectedDay: IDay = data[selectedDate] || {
    dayWeekName: getWeekName(selectedDate),
    lessons: [],
  }
  const handleUpdate = () => refetch()

  useEffect(() => {
    bridge.send('VKWebAppSetSwipeSettings', { history: false })
  }, [])

  return (
    <View className={cx('View')} id={id} activePanel={PANEL_SCHEDULE_ENUM.MAIN}>
      <Panel id={PANEL_SCHEDULE_ENUM.MAIN} className={cx('Panel')}>
        <PanelHeader> Расписание </PanelHeader>
        <PullToRefresh
          className={cx('Content')}
          onRefresh={handleUpdate}
          isFetching={isFetching}
          slideThreshold={100}
        >
          {isLoading ? (
            <ScheduleDaySkeleton />
          ) : !error ? (
            <Fade transitionKey={selectedDate}>
              <ScheduleDay {...selectedDay} />
            </Fade>
          ) : (
            <Placeholder
              icon={
                <Icon24ReportOutline
                  width={120}
                  height={120}
                  fill="var(--vkui--color_icon_negative)"
                />
              }
            >
              <Title level="3" weight="2">
                Возникла ошибка при запросе расписания с сервера ДГТУ. <br />
                Повторите попытку.
              </Title>
            </Placeholder>
          )}
        </PullToRefresh>
        <DayWeekTabs selectedDate={selectedDate} schedule={data} onChangeDate={selectDate} />
      </Panel>
    </View>
  )
}
