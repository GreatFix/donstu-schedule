import React from 'react'
import { Title } from '@vkontakte/vkui'

import classes from './SheduleDay.module.css'
import LessonList from '../LessonList/LessonList'

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
      <Title
        level="3"
        weight="semibold"
        style={{ margin: 0, padding: 10, textAlign: 'center' }}
      >
        В этот день пар нет :)
      </Title>
    )
  }
}

export default SheduleDay
