import { Headline, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

import { AboutLink, ShortcutCells, ThemeSwitcher } from './partials'

export interface ISettingsPanelProps extends IWithId {
  backToMain: () => void
}

export const SettingsPanel = ({ id, backToMain }: ISettingsPanelProps) => {
  const { bridgeSupport } = useUserConfig()
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />}>
        <Headline>Настройки</Headline>
      </PanelHeader>
      <AboutLink />

      {bridgeSupport && <ShortcutCells />}

      <ThemeSwitcher />
    </Panel>
  )
}
