import { Headline, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { useGroupsOfTeacher } from 'api/hooks/useGroupsOfTeacher'
import { CustomList } from 'components/CustomList'
import { IWithId } from 'shared/types/extend'

export interface IGroupsOfTeacherPanelProps extends IWithId {
  backToMain: () => void
}

export const GroupsOfTeacherPanel = ({ id, backToMain }: IGroupsOfTeacherPanelProps) => {
  const { data, isFetching } = useGroupsOfTeacher()

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />} separator={false}>
        <Headline>Список групп</Headline>
      </PanelHeader>
      <CustomList list={data || []} disabled showSkeletons={isFetching} />
    </Panel>
  )
}
