import { Icon20Users3Outline, Icon56SchoolOutline } from '@vkontakte/icons'
import { Button, Group, Placeholder, SimpleCell } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'

export interface IClassroomCellsProps {
  forwardToSearchClassroom: () => void
}

export const ClassroomCells = ({ forwardToSearchClassroom }: IClassroomCellsProps) => {
  const {
    data: { classroomName, classroomId },
  } = useUserConfig()

  return classroomId ? (
    <Group>
      <SimpleCell
        onClick={forwardToSearchClassroom}
        before={<Icon56SchoolOutline width={24} height={24} />}
        expandable
        description={classroomName}
      >
        Аудитория
      </SimpleCell>
    </Group>
  ) : (
    <Group>
      <Placeholder
        icon={<Icon56SchoolOutline />}
        action={
          <Button size="m" onClick={forwardToSearchClassroom}>
            Выбрать аудиторию
          </Button>
        }
      >
        Выберите аудиторию, расписание которой хотите посмотреть
      </Placeholder>
    </Group>
  )
}
