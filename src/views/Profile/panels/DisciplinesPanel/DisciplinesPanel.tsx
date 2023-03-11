import { Headline, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { useDisciplines } from 'api/hooks/useDisciplines'
import { CustomList } from 'components/CustomList'
import { IWithId } from 'shared/types/extend'

export interface IDisciplinesPanelProps extends IWithId {
  backToMain: () => void
}

export const DisciplinesPanel = ({ id, backToMain }: IDisciplinesPanelProps) => {
  const { data, isFetching } = useDisciplines()

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />} separator={false}>
        <Headline>Список предметов</Headline>
      </PanelHeader>
      <CustomList list={data || []} disabled showSkeletons={isFetching} />
    </Panel>
  )
}
