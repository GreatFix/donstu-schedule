import { Caption, Counter, Headline, TabsItem, useAdaptivity } from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { PANEL_SCHEDULE_ENUM } from 'shared/contexts/Navigation'
import { ISODate } from 'shared/types/date'

import styles from './index.module.css'
const cx = cn.bind(styles)

export interface SelectableDay {
  week: string
  day: number
  month: string
  date: ISODate
}

export interface DayWeekTabsItemProps extends SelectableDay {
  disabled?: boolean
  selected?: boolean
  countLessons?: number
  onChangeDate: (date: SelectableDay['date']) => void
}

export const DayWeekTabsItem = ({
  date,
  day,
  month,
  week,
  selected,
  disabled,
  countLessons = 0,
  onChangeDate,
}: DayWeekTabsItemProps) => {
  const { viewWidth } = useAdaptivity()
  const isMobile = viewWidth < 3
  return (
    <TabsItem
      className={cx('Root', { disabled })}
      onClick={() => onChangeDate?.(date)}
      selected={selected}
      after={
        countLessons > 0 && (
          <Counter className={cx('Counter')} size="s" mode="secondary">
            <Caption level="4" weight="3">
              {countLessons}
            </Caption>
          </Counter>
        )
      }
      aria-controls={PANEL_SCHEDULE_ENUM.MAIN}
    >
      <Headline className={cx('WeekName')} level="2" weight="1">
        {week}
      </Headline>
      <Caption className={cx('Day')} level="1" weight="2">
        {day}
      </Caption>
      <Caption className={cx('Month')} level={isMobile ? '4' : '1'} weight="2">
        {month}
      </Caption>
    </TabsItem>
  )
}
