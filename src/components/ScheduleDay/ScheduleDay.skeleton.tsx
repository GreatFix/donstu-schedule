import { Group } from '@vkontakte/vkui'
import { Skeleton } from 'components/Skeleton'

import { LessonSkeleton } from './Lesson'

export const ScheduleDaySkeleton = () => (
  <Group>
    <Skeleton style={{ margin: '12px auto' }} variant="text" width={128} height={24} />
    <LessonSkeleton withSubGroups />
    <LessonSkeleton />
  </Group>
)
