import {
  Icon16ArticleBoxOutline,
  Icon16Place,
  Icon20Users3Outline,
  Icon56UserMicrophoneOutline,
} from '@vkontakte/icons'
import {
  Button,
  ButtonGroup,
  Caption,
  Div,
  Headline,
  Paragraph,
  useAdaptivity,
} from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { Fade } from 'components/Fade'
import React, { useState } from 'react'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { TLesson } from 'shared/types/donstu'

import { COLORS } from './constants'
import styles from './index.module.css'
const cx = cn.bind(styles)

interface ILessonProps {
  lesson: TLesson
}

const SUB_NAME = {
  group: Icon56UserMicrophoneOutline,
  teacher: Icon20Users3Outline,
  classroom: Icon20Users3Outline,
}

const _Lesson = ({ lesson }: ILessonProps) => {
  const {
    data: { post = 'group' },
  } = useUserConfig()
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const { viewWidth } = useAdaptivity()
  const isMobile = viewWidth < 3

  const lessons = Object.values(lesson)

  const withSubGroups = lessons.length > 1

  const { aud, currentLesson, end, group, name, number, start, teacher, type } =
    lessons[activeLessonIndex]

  const SubNameIcon = SUB_NAME[post]
  const AudIcon = post === 'classroom' ? Icon56UserMicrophoneOutline : Icon16Place

  return (
    <Div className={cx('Lesson', { current: currentLesson, withSubGroups })}>
      <div className={cx('Time')} style={{ borderColor: COLORS[type] }}>
        <Headline level="2" className={cx('Start')} weight="2">
          {start}
        </Headline>
        <div className={cx('Rect', 'withBorder')} style={{ borderColor: COLORS[type] }}>
          <Headline className={cx('Number')} level="2" weight="1">
            {number}
          </Headline>
        </div>
        <Headline level="2" className={cx('End')} weight="2">
          {end}
        </Headline>
      </div>
      <div className={cx('Line')} style={{ backgroundColor: COLORS[type] }}></div>

      <Paragraph
        className={cx('Type', 'withBorder')}
        weight="1"
        style={{ borderColor: COLORS[type] }}
      >
        {type}
      </Paragraph>

      <div className={cx('Description')} style={{ borderColor: COLORS[type] }}>
        <div className={cx('Aud')}>
          <AudIcon className={cx('ContentIcon')} width={20} height={20} />
          <Caption level="1" weight="2">
            {post === 'classroom' ? teacher : aud}
          </Caption>
        </div>
        <div className={cx('Name')}>
          <Icon16ArticleBoxOutline className={cx('ContentIcon')} width={20} height={20} />
          <Caption level="1" weight="2">
            {name}
          </Caption>
        </div>

        <div className={cx('SubName', post)}>
          <SubNameIcon className={cx('ContentIcon')} width={20} height={20} />

          <Fade transitionKey={post === 'group' ? teacher : group}>
            <Caption level="1" weight="2">
              {post === 'group' ? teacher : group}
            </Caption>
          </Fade>
        </div>
      </div>

      {withSubGroups ? (
        <ButtonGroup
          className={cx('Pagination')}
          mode={isMobile ? 'horizontal' : 'vertical'}
          gap="s"
        >
          {lessons.map((lesson, i) => {
            return (
              <Button
                className={cx('SubGroup')}
                key={i}
                size="s"
                mode="outline"
                appearance={activeLessonIndex === i ? 'positive' : 'accent'}
                onClick={() => setActiveLessonIndex(i)}
              >
                <Caption level="3" weight="2">
                  {lesson.subgroup}
                </Caption>
              </Button>
            )
          })}
        </ButtonGroup>
      ) : null}
    </Div>
  )
}
export const Lesson = React.memo(_Lesson)
