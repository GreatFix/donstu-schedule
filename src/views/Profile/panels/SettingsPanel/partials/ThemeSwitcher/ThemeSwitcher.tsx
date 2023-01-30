import { Div, Group, Header, SegmentedControl, SegmentedControlProps } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'

import { THEMES_LIST } from './constants'

export const ThemeSwitcher = () => {
  const {
    data: { theme },
    setTheme,
  } = useUserConfig()
  return (
    <Group header={<Header>Цветовая схема</Header>}>
      <Div>
        <SegmentedControl
          value={theme}
          onChange={setTheme as SegmentedControlProps['onChange']}
          options={THEMES_LIST}
        />
      </Div>
    </Group>
  )
}
