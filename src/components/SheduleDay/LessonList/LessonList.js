import React from 'react'
import List from '@vkontakte/vkui/dist/components/List/List'

import classes from './LessonList.module.css'
import Lesson from './Lesson/Lesson'

const LessonList = ({ lessons }) => {
  return (
    <List className={classes.List}>
      {Object.keys(lessons).map((item, index) => {
        return <Lesson key={index} lesson={lessons[item]} />
      })}
    </List>
  )
}

export default LessonList
