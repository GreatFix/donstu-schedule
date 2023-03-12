import { Div, Group, Header, SegmentedControl, SegmentedControlProps } from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { useUserConfig } from 'shared/contexts/UserConfig'

import { POSTS_LIST } from './constants'
import styles from './index.module.css'
const cx = cn.bind(styles)

export const PostSwitcher = () => {
  const {
    data: { post },
    setPost,
  } = useUserConfig()

  return (
    <Group header={<Header>Расписание по</Header>}>
      <Div>
        <SegmentedControl
          className={cx('Switcher')}
          value={post}
          onChange={setPost as SegmentedControlProps['onChange']}
          options={POSTS_LIST}
        />
      </Div>
    </Group>
  )
}
