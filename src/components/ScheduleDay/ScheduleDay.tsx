import { Icon56GhostOutline } from '@vkontakte/icons'
import { Group, List, Placeholder, Title } from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { IDay } from 'shared/types/donstu'

import styles from './index.module.css'
import { Lesson } from './Lesson/Lesson'
const cx = cn.bind(styles)

export const ScheduleDay = ({
  lessons = {},
  dayWeekName,
}: Pick<IDay, 'dayWeekName' | 'lessons'>) => {
  const lessonsList = Object.values(lessons)
  const withLessons = !!lessonsList.length

  return (
    <Group className={cx('Root')}>
      <Title level="2" weight="3" className={cx('Title')}>
        {dayWeekName}
      </Title>
      {withLessons ? (
        <List className={cx('List')}>
          {lessonsList.map((lesson, index) => (
            <Lesson key={index} lesson={lesson} />
          ))}
        </List>
      ) : (
        <Placeholder icon={<Icon56GhostOutline width={120} height={120} />}>
          <Title level="3" weight="2">
            Занятия отсутствуют
          </Title>
        </Placeholder>
      )}
    </Group>
  )
}
