import React, { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Div } from '@vkontakte/vkui'
import {
  Icon16UserOutline,
  Icon20Users3Outline,
  Icon28BookOutline,
  Icon16Place,
} from '@vkontakte/icons'
import { useSwipeable } from 'react-swipeable'

import classes from './Lesson.module.css'

const COLORS = {
  Лабораторная: '#32BE32', //лабораторная
  Практика: '#B7AE30', //практика
  Экзамен: '#DF5248', //Экзамен
  Лекция: '#937ACC', //лекция
  'Физ. воспитание': '#87C859', //физ. воспитание
  '': '#1C4FBB', //иные
}

const Lesson = (props) => {
  const post = useSelector((state) => state.userData.post)
  let [curLesson, setCurLesson] = useState('left')

  let keys = Object.keys(props.lesson)
  let length = keys.length
  let lesson = {}

  let pagItem_1 = ''
  let pagItem_2 = ''

  if (length === 2) {
    if (curLesson === 'left') {
      lesson = props.lesson[keys[0]]
      pagItem_1 = classes.Active
    } else {
      lesson = props.lesson[keys[1]]
      pagItem_2 = classes.Active
    }
  } else {
    lesson = props.lesson[keys[0]]
  }

  const handlers = useCallback(
    useSwipeable({
      onSwipedRight: () => {
        if (length === 2) setCurLesson('left')
      },
      onSwipedLeft: () => {
        if (length === 2) setCurLesson('right')
      },
    }),
    []
  )

  let clsLesson = classes.Lesson
  if (lesson.currentLesson) clsLesson += ' ' + classes.CurrentLesson
  return (
    <div {...handlers}>
      <Div className={clsLesson}>
        <div className={classes.Time} style={{ borderColor: COLORS[lesson.type] }}>
          <span className={classes.Start}>{lesson.start}</span>
          <div className={classes.Rect} style={{ borderColor: COLORS[lesson.type] }}>
            <span className={classes.Number}>{lesson.number}</span>
          </div>
          <span className={classes.End}>{lesson.end}</span>
        </div>
        <div className={classes.Line} style={{ backgroundColor: COLORS[lesson.type] }}></div>

        <div className={classes.Type} style={{ borderColor: COLORS[lesson.type] }}>
          {lesson.type}
        </div>

        <div className={classes.Description} style={{ borderColor: COLORS[lesson.type] }}>
          <div className={classes.Aud}>
            <Icon16Place />
            <span>{lesson.aud}</span>
          </div>
          <div className={classes.Name}>
            <Icon28BookOutline width={16} height={16} />
            <span>{lesson.name}</span>
          </div>

          {post === 'Студент' ? (
            <div className={classes.Teacher}>
              <Icon16UserOutline />
              <span>{lesson.teacher}</span>
            </div>
          ) : (
            <div className={classes.Group}>
              <Icon20Users3Outline width={16} height={16} />
              <span>{lesson.group}</span>
            </div>
          )}
        </div>

        {length === 2 ? (
          <div className={classes.Pagination}>
            <div className={pagItem_1} style={{ borderColor: COLORS[lesson.type] }}></div>
            <div className={pagItem_2} style={{ borderColor: COLORS[lesson.type] }}></div>
          </div>
        ) : null}
      </Div>
    </div>
  )
}
export default React.memo(Lesson)
