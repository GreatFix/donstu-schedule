import React, { useState, useEffect } from 'react'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

import Icon16UserOutline from '@vkontakte/icons/dist/16/user_outline'
import Icon28BookOutline from '@vkontakte/icons/dist/28/book_outline'
import Icon16Place from '@vkontakte/icons/dist/16/place'
import { useSwipeable } from 'react-swipeable'
import { Transition } from 'react-transition-group'

import classes from './Lesson.module.css'
//'#65BA8B',// '#00BE96',
const COLORS = {
  Лабораторная: '#32BE32', //лабораторная
  Практика: '#B7AE30', //практика
  Экзамен: '#DF5248', //Экзамен
  Лекция: '#937ACC', //лекция
  'Физ. воспитание': '#87C859', //физ. воспитание
  '': '#1C4FBB', //иные
}

const Lesson = (props) => {
  let [curLesson, setCurLesson] = useState('left')
  const [anim, setAnim] = useState(true)

  useEffect(() => {
    setAnim(false)
    setTimeout(() => setAnim(true), 150)
  }, [curLesson])

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

  const handlers = useSwipeable({
    onSwipedRight: () => {
      if (length === 2) setCurLesson('left')
    },
    onSwipedLeft: () => {
      if (length === 2) setCurLesson('right')
    },
  })

  const defaultStyle = {
    transition: `opacity 150ms linear`,
    opacity: 0,
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0.6 },
    exited: { opacity: 0.6 },
  }

  let clsLesson = classes.Lesson
  if (lesson.currentLesson) clsLesson += ' ' + classes.CurrentLesson
  return (
    <div {...handlers}>
      <Transition in={anim} timeout={50} classNames="node">
        {(state) => (
          <Div style={{ ...defaultStyle, ...transitionStyles[state] }} className={clsLesson}>
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

              <div className={classes.Teacher}>
                <Icon16UserOutline />
                <span>{lesson.teacher}</span>
              </div>
            </div>

            {length === 2 ? (
              <div className={classes.Pagination}>
                <div className={pagItem_1}></div>
                <div className={pagItem_2}></div>
              </div>
            ) : null}
          </Div>
        )}
      </Transition>
    </div>
  )
}
export default Lesson
