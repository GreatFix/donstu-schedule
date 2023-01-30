import { Headline, Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui'
import { useTeachersOfGroup } from 'api/hooks/useTeachersOfGroup'
import { CustomList, ICustomListProps } from 'components/CustomList'
import { useCallback } from 'react'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

export interface ITeachersOfGroupPanelProps extends IWithId {
  backToMain: () => void
}

export const TeachersOfGroupPanel = ({ id, backToMain }: ITeachersOfGroupPanelProps) => {
  const { setTeacher } = useUserConfig()
  const { data, isFetching } = useTeachersOfGroup()

  const handleSelectTeacher = useCallback<Required<ICustomListProps>['onSelect']>(
    ({ id, name }) => {
      setTeacher({ id: Number(id), name })
      backToMain()
    },
    [backToMain, setTeacher]
  )

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />}>
        <Headline>Список преподавателей</Headline>
      </PanelHeader>
      <CustomList list={data || []} onSelect={handleSelectTeacher} showSkeletons={isFetching} />
    </Panel>
  )
}
