import { Headline, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
//Styles
import cn from 'classnames/bind'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

import styles from './index.module.css'
const cx = cn.bind(styles)

export interface IStatementsPanelProps extends IWithId {
  backToMain: () => void
}

export const StatementsPanel = ({ id, backToMain }: IStatementsPanelProps) => {
  const {
    data: { groupId },
  } = useUserConfig()

  return (
    <Panel id={id} className={cx('Panel')}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />}>
        <Headline>Ведомости</Headline>
      </PanelHeader>
      <iframe
        title="Ведомости"
        className={cx('Iframe')}
        src={`https://edu.donstu.ru/Ved/?group=${groupId}`}
      />
    </Panel>
  )
}
