import React from 'react'
import Title from '@vkontakte/vkui/dist/components/Typography/Title/Title'

import classes from './SheduleDay.module.css'
import LessonList from './LessonList/LessonList'
import image from '../../img/sleeping_people.jpg'

const SheduleDay = ({ dayData }) => {
  if (dayData) {
    return (
      <>
        <Title level="3" weight="semibold" className={classes.Title}>
          {dayData.dayWeek}
        </Title>
        <LessonList lessons={dayData.lessons} />
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
