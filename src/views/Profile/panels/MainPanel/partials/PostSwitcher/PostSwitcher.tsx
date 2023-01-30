import { Div, Group, Header, SegmentedControl, SegmentedControlProps } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'

import { POSTS_LIST } from './constants'

export const PostSwitcher = () => {
  const {
    data: { post },
    setPost,
  } = useUserConfig()

  return (
    <Group header={<Header>Расписание по</Header>}>
      <Div>
        <SegmentedControl
          value={post}
          onChange={setPost as SegmentedControlProps['onChange']}
          options={POSTS_LIST}
        />
      </Div>
    </Group>
  )
}
