import { Headline, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { IWithId } from 'shared/types/extend'

export interface ILKPanelProps extends IWithId {
  backToMain: () => void
}

export const LKPanel = ({ id, backToMain }: ILKPanelProps) => {
  return (
    <Panel id={id} className={'PanelWithIframe'}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />}>
        <Headline>Личный кабинет</Headline>
      </PanelHeader>
      <div className={'Iframe'}>
        <iframe
          title="ved"
          src={`https://edu.donstu.ru/WebApp/#`}
          width="100%"
          height="100%"
          frameBorder={0}
        />
      </div>
    </Panel>
  )
}
