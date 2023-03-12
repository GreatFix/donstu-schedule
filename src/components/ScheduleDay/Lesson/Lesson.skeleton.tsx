import { Div, useAdaptivity } from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { Skeleton } from 'components/Skeleton'

import styles from './index.module.css'
const cx = cn.bind(styles)

interface ILessonSkeletonProps {
  withSubGroups?: boolean
}

export const LessonSkeleton = ({ withSubGroups }: ILessonSkeletonProps) => {
  const { viewWidth } = useAdaptivity()
  const isMobile = viewWidth < 3
  return (
    <Div className={cx('Lesson')}>
      <div className={cx('Time')}>
        <span className={cx('Start')}>
          <Skeleton variant="text" width={40} height={15} />
        </span>

        <div className={cx('Rect')}>
          <Skeleton variant="text" className={cx('Number')} width={40} height={20} />
        </div>
        <span className={cx('End')}>
          <Skeleton variant="text" width={40} height={15} />
        </span>
      </div>
      <Skeleton className={cx('Line')} variant="rectangular" height={120} />

      <Skeleton className={cx('Type')} variant="text" width={90} />

      <div className={cx('Description')}>
        <div className={cx('Aud')}>
          <Skeleton variant="rectangular" className={cx('ContentIcon')} width={20} height={20} />
          <Skeleton variant="text" width={'20%'} height={20} />
        </div>
        <div className={cx('Name')}>
          <Skeleton variant="rectangular" className={cx('ContentIcon')} width={20} height={20} />
          <Skeleton variant="text" width={'75%'} height={20} />
        </div>

        <div className={cx('SubName')}>
          <Skeleton variant="rectangular" className={cx('ContentIcon')} width={20} height={20} />

          <Skeleton variant="text" width={'55%'} height={20} />
        </div>
      </div>

      {withSubGroups ? (
        <div className={cx('Pagination')}>
          {[1, 2].map((key) => {
            return (
              <Skeleton
                key={key}
                className={cx('SubGroup')}
                style={{ marginRight: key === 1 ? 8 : 0 }}
                width={isMobile ? 56 : 80}
              />
            )
          })}
        </div>
      ) : null}
    </Div>
  )
}
