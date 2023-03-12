//Styles
import cn from 'classnames/bind'
import { CSSProperties } from 'react'

import styles from './index.module.css'

const cx = cn.bind(styles)

interface ISkeletonProps {
  className?: string

  style?: CSSProperties

  variant?: 'text' | 'rectangular' | 'circular'

  animation?: 'pulse' | 'wave'

  height?: CSSProperties['height']

  width?: CSSProperties['width']
}

export const Skeleton = ({
  className,
  style,
  variant = 'text',
  animation = 'pulse',
  height,
  width,
}: ISkeletonProps) => {
  return (
    <span
      className={cx('Root', variant, animation, className)}
      style={{ ...style, height, width }}
    />
  )
}
