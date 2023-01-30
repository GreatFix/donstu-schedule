import { Group, List, Title } from '@vkontakte/vkui'
import image from 'assets/images/empty.png'
import cn from 'classnames/bind'
import { IDay } from 'shared/types/donstu'

import styles from './index.module.css'
import { Lesson } from './Lesson/Lesson'
const cx = cn.bind(styles)

export const ScheduleDay = ({ lessons = {}, date, day, dayWeekName }: IDay) => {
  const lessonsList = Object.values(lessons)
  const withLessons = !!lessonsList.length

  return withLessons ? (
    <Group className={cx('Root')}>
      <Title level="2" weight="3" className={cx('Title')}>
        {dayWeekName}
      </Title>
      <List className={cx('List')}>
        {lessonsList.map((lesson, index) => (
          <Lesson key={index} lesson={lesson} />
        ))}
      </List>
    </Group>
  ) : (
    <img src={image} className={cx('Image')} alt={'В этот день занятия отсутствуют'} />
  )
}
