//Hooks and helpers
import { Icon24ReportOutline, Icon28CancelCircleFillRed } from '@vkontakte/icons'
//Components
import {
  Panel,
  PanelHeader,
  Placeholder,
  PullToRefresh,
  Snackbar,
  Spinner,
  View,
} from '@vkontakte/vkui'
import { useSchedule } from 'api/hooks/useSchedule'
import cn from 'classnames/bind'
//Styles
import { DayWeekTabs } from 'components/DayWeekTabs'
import { Fade } from 'components/Fade'
import { ScheduleDay } from 'components/ScheduleDay'
import { PANEL_SCHEDULE_ENUM } from 'shared/contexts/Navigation'
import { useScheduleDay } from 'shared/contexts/ScheduleDay'
import { useSnack } from 'shared/contexts/Snack'

import styles from './index.module.css'
const cx = cn.bind(styles)

interface IScheduleProps {
  id: string
}

export const Schedule = ({ id }: IScheduleProps) => {
  const { selectedDate, weekStartDate, selectDate } = useScheduleDay()
  const { data, isFetching, error } = useSchedule(weekStartDate)

  const { setSnack, closeSnack, snack } = useSnack()

  const selectedDay = data[selectedDate] || {}

  if (error && !snack) {
    setSnack(
      <Snackbar
        layout="vertical"
        onClose={closeSnack}
        action="Повторить загрузку"
        before={<Icon28CancelCircleFillRed />}
        duration={60000}
      >
        {String(error)}
      </Snackbar>
    )
  }

  return (
    <View id={id} activePanel={PANEL_SCHEDULE_ENUM.MAIN}>
      <Panel id={PANEL_SCHEDULE_ENUM.MAIN} className={cx('Panel')}>
        <PanelHeader> Расписание </PanelHeader>
        <PullToRefresh className={cx('Content')} onRefresh={() => {}} isFetching={isFetching}>
          {isFetching ? (
            <Spinner />
          ) : !error ? (
            <Fade transitionKey={selectedDate}>
              <ScheduleDay {...selectedDay} />
            </Fade>
          ) : (
            <Placeholder icon={<Icon24ReportOutline width={56} height={56} fill={'#FF0000'} />}>
              Ошибка ответа от API ДГТУ
            </Placeholder>
          )}
        </PullToRefresh>
        <DayWeekTabs selectedDate={selectedDate} schedule={data} onChangeDate={selectDate} />
      </Panel>
    </View>
  )
}
