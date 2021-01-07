import React from 'react'
import { List } from '@vkontakte/vkui'

import Lesson from './Lesson/Lesson'
import classes from './LessonList.module.css'

const LessonList = ({ lessons }) => {
  return (
    <List className={classes.List}>
      {Object.keys(lessons).map((item, index) => {
        return <Lesson key={index} lesson={lessons[item]} />
      })}
    </List>
  )
}

export default React.memo(LessonList)
