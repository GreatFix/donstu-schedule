import {
  Icon16Place,
  Icon16UserOutline,
  Icon20Users3Outline,
  Icon28BookOutline,
} from '@vkontakte/icons'
import {
  Button,
  ButtonGroup,
  Caption,
  Div,
  Group,
  Headline,
  Paragraph,
  Subhead,
  Text,
} from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { Fade } from 'components/Fade'
import React, { Ref, useState } from 'react'
import { IUserData, useUserConfig } from 'shared/contexts/UserConfig'
import { TLesson } from 'shared/types/donstu'

import { COLORS } from './constants'
import styles from './index.module.css'
const cx = cn.bind(styles)

interface ILessonProps {
  lesson: TLesson
}

interface IconProps {
  fill?: string
  width?: number
  height?: number
  getRootRef?: Ref<SVGSVGElement>
  title?: string
  deprecated?: boolean
  replacement?: string
}

const SUB_NAME: Record<IUserData['post'], React.FC<IconProps>> = {
  group: Icon20Users3Outline,
  teacher: Icon16UserOutline,
  classroom: Icon20Users3Outline,
}

const _Lesson = ({ lesson }: ILessonProps) => {
  const {
    data: { post = 'group' },
  } = useUserConfig()
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)

  const lessons = Object.values(lesson)

  const withSubGroups = lessons.length > 1

  const { aud, currentLesson, end, group, name, number, start, teacher, type } =
    lessons[activeLessonIndex]

  const SubNameIcon = SUB_NAME[post]

  return (
    <Div className={cx('Lesson', { current: currentLesson })}>
      <div className={cx('Time')} style={{ borderColor: COLORS[type] }}>
        <Text className={cx('Start')} weight="2">
          {start}
        </Text>
        <div className={cx('Rect')} style={{ borderColor: COLORS[type] }}>
          <Headline className={cx('Number')} level="2" weight="1">
            {number}
          </Headline>
        </div>
        <Text className={cx('End')} weight="2">
          {end}
        </Text>
      </div>
      <div className={cx('Line')} style={{ backgroundColor: COLORS[type] }}></div>

      <Paragraph className={cx('Type')} weight="1" style={{ borderColor: COLORS[type] }}>
        {type}
      </Paragraph>

      <div className={cx('Description')} style={{ borderColor: COLORS[type] }}>
        <div className={cx('Aud')}>
          <Icon16Place width={20} height={20} />
          <Caption level="1" weight="2">
            {aud}
          </Caption>
        </div>
        <div className={cx('Name')}>
          <Icon28BookOutline width={20} height={20} />
          <Caption level="1" weight="2">
            {name}
          </Caption>
        </div>

        <div className={cx('SubName', post)}>
          <SubNameIcon width={20} height={20} />

          <Fade transitionKey={post === 'group' ? teacher : group}>
            <Caption level="1" weight="2">
              {post === 'group' ? teacher : group}
            </Caption>
          </Fade>
        </div>
      </div>

      {withSubGroups ? (
        <ButtonGroup className={cx('Pagination')} mode="horizontal" gap="s">
          {lessons.map((lesson, i) => (
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
          ))}
        </ButtonGroup>
      ) : null}
    </Div>
  )
}
export const Lesson = React.memo(_Lesson)
