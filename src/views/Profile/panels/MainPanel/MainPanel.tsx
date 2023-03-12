import { Icon28SettingsOutline } from '@vkontakte/icons'
import { Group, Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

import {
  ClassroomCells,
  GroupCells,
  IClassroomCellsProps,
  IGroupCellsProps,
  ITeacherCellsProps,
  PostSwitcher,
  TeacherCells,
} from './partials'

interface IMainPanelProps
  extends IWithId,
    IGroupCellsProps,
    ITeacherCellsProps,
    IClassroomCellsProps {
  forwardToSettings: () => void
}

export const MainPanel = ({
  id,
  forwardToSearchGroup,
  forwardToDisciplines,
  forwardToTeachers,
  forwardToStatements,
  forwardToGroups,
  forwardToSearchTeacher,
  forwardToSettings,
  forwardToSearchClassroom,
}: IMainPanelProps) => {
  const {
    data: { post },
  } = useUserConfig()

  return (
    <Panel id={id}>
      <PanelHeader> Профиль </PanelHeader>

      <PostSwitcher />

      {post === 'group' && (
        <GroupCells
          forwardToSearchGroup={forwardToSearchGroup}
          forwardToDisciplines={forwardToDisciplines}
          forwardToTeachers={forwardToTeachers}
          forwardToStatements={forwardToStatements}
        />
      )}

      {post === 'teacher' && (
        <TeacherCells
          forwardToDisciplines={forwardToDisciplines}
          forwardToGroups={forwardToGroups}
          forwardToSearchTeacher={forwardToSearchTeacher}
        />
      )}

      {post === 'classroom' && (
        <ClassroomCells forwardToSearchClassroom={forwardToSearchClassroom} />
      )}

      <Group>
        <SimpleCell
          onClick={forwardToSettings}
          before={<Icon28SettingsOutline width={24} height={24} />}
          expandable={true}
        >
          Настройки
        </SimpleCell>
      </Group>
    </Panel>
  )
}
