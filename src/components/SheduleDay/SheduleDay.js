import React from 'react'
import { Title } from '@vkontakte/vkui'

import LessonList from './LessonList/LessonList'
import image from '../../img/empty.png'
import classes from './SheduleDay.module.css'

const SheduleDay = ({ day }) => {
  if (Object.keys(day.lessons).length) {
    return (
      <>
        <Title level="3" weight="semibold" className={classes.Title}>
          {day.dayWeekName}
        </Title>
        <LessonList lessons={day.lessons} />
      </>
    )
  } else {
    return (
      <Title level="3" weight="semibold" className={classes.AltTitle}>
        <img src={image} className={classes.Image} alt={'В этот день занятия отсутствуют'} />
      </Title>
    ) //пример png из ru.pngtree.com
  }
}

export default SheduleDay
