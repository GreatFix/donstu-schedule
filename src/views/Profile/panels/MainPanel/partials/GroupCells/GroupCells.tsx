import {
  Icon20EducationOutline,
  Icon20Users3Outline,
  Icon24BillheadOutline,
  Icon28BookOutline,
  Icon56UserMicrophoneOutline,
  Icon56Users3Outline,
} from '@vkontakte/icons'
import { Button, Group, Placeholder, SimpleCell } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'

export interface IGroupCellsProps {
  forwardToSearchGroup: () => void
  forwardToStatements: () => void
  forwardToDisciplines: () => void
  forwardToTeachers: () => void
}

export const GroupCells = ({
  forwardToSearchGroup,
  forwardToStatements,
  forwardToDisciplines,
  forwardToTeachers,
}: IGroupCellsProps) => {
  const {
    data: { faculty, groupName, groupId },
  } = useUserConfig()

  return groupId ? (
    <Group>
      <SimpleCell
        onClick={forwardToSearchGroup}
        before={<Icon20Users3Outline width={24} height={24} />}
        expandable
        description={groupName}
      >
        Группа
      </SimpleCell>
      {groupId && (
        <>
          <SimpleCell
            before={<Icon20EducationOutline width={24} height={24} />}
            description={faculty}
            disabled
          >
            Факультет
          </SimpleCell>
          <SimpleCell
            onClick={forwardToTeachers}
            before={<Icon56UserMicrophoneOutline width={24} height={24} />}
            expandable
          >
            Преподаватели
          </SimpleCell>
          <SimpleCell
            onClick={forwardToDisciplines}
            before={<Icon28BookOutline width={24} height={24} />}
            expandable
          >
            Предметы
          </SimpleCell>
          <SimpleCell
            onClick={forwardToStatements}
            before={<Icon24BillheadOutline width={24} height={24} />}
            expandable
          >
            Ведомости
          </SimpleCell>
        </>
      )}
    </Group>
  ) : (
    <Group>
      <Placeholder
        icon={<Icon56Users3Outline />}
        action={
          <Button size="m" onClick={forwardToSearchGroup}>
            Выбрать группу
          </Button>
        }
      >
        Выберите учебную группу, расписание которой хотите посмотреть
      </Placeholder>
    </Group>
  )
}
