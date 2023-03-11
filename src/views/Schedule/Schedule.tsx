//Hooks and helpers
import { Icon24ReportOutline, Icon28CancelCircleFillRed } from '@vkontakte/icons'
//Components
import { Panel, PanelHeader, Placeholder, PullToRefresh, Snackbar, View } from '@vkontakte/vkui'
import { useSchedule } from 'api/hooks/useSchedule'
import cn from 'classnames/bind'
//Styles
import { DayWeekTabs } from 'components/DayWeekTabs'
import { Fade } from 'components/Fade'
import { ScheduleDay, ScheduleDaySkeleton } from 'components/ScheduleDay'
import { DateTime } from 'luxon'
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
  const { data, isFetching, error, refetch } = useSchedule(weekStartDate)

  const { setSnack, closeSnack, snack } = useSnack()

  const selectedDay: IDay = data[selectedDate] || {
    dayWeekName: getWeekName(selectedDate),
    lessons: [],
  }
  const handleUpdate = () => refetch()

  if (error && !snack) {
    setSnack(
      <Snackbar
        layout="vertical"
        onClose={closeSnack}
        onActionClick={handleUpdate}
        action="Повторить загрузку"
        before={<Icon28CancelCircleFillRed />}
        duration={60000}
      >
        {error.message}
      </Snackbar>
    )
  }

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
          {isFetching ? (
            <ScheduleDaySkeleton />
          ) : !error ? (
            <>
              <Fade transitionKey={selectedDate}>
                <ScheduleDay {...selectedDay} />
              </Fade>
            </>
          ) : (
            <Placeholder icon={<Icon24ReportOutline width={56} height={56} fill={'#FF0000'} />}>
              Ошибка при получении данные от сервера ДГТУ
            </Placeholder>
          )}
        </PullToRefresh>
        <DayWeekTabs selectedDate={selectedDate} schedule={data} onChangeDate={selectDate} />
      </Panel>
    </View>
  )
}
