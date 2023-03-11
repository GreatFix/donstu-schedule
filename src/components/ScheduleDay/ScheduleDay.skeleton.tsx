import { Group } from '@vkontakte/vkui'

import { LessonSkeleton } from './Lesson'

export const ScheduleDaySkeleton = () => (
  <Group>
    <LessonSkeleton withSubGroups />
    <LessonSkeleton />
  </Group>
)
