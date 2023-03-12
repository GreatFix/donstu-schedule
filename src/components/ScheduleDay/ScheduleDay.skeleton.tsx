import { Group, Title } from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { IDay } from 'shared/types/donstu'

import styles from './index.module.css'
import { LessonSkeleton } from './Lesson'
const cx = cn.bind(styles)

export const ScheduleDaySkeleton = ({ dayWeekName }: Pick<IDay, 'dayWeekName'>) => (
  <Group>
    <Title level="2" weight="3" className={cx('Title')}>
      {dayWeekName}
    </Title>
    <LessonSkeleton />
    <LessonSkeleton withSubGroups />
  </Group>
)
