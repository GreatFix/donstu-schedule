import {
  Icon20Users3Outline,
  Icon24UserOutline,
  Icon28BookOutline,
  Icon56UserMicrophoneOutline,
} from '@vkontakte/icons'
import { Button, Group, Placeholder, SimpleCell } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'

import { TeacherLink } from '../TeacherLink'

export interface ITeacherCellsProps {
  forwardToSearchTeacher: () => void
  forwardToDisciplines: () => void
  forwardToGroups: () => void
}

export const TeacherCells = ({
  forwardToSearchTeacher,
  forwardToDisciplines,
  forwardToGroups,
}: ITeacherCellsProps) => {
  const {
    data: { teacherName, teacherId },
  } = useUserConfig()

  return teacherId ? (
    <Group>
      <SimpleCell
        onClick={forwardToSearchTeacher}
        before={<Icon56UserMicrophoneOutline width={24} height={24} />}
        expandable
        multiline={true}
        description={teacherName}
      >
        ФИО
      </SimpleCell>
      {teacherId && (
        <>
          <SimpleCell
            onClick={forwardToGroups}
            before={<Icon20Users3Outline width={24} height={24} />}
            expandable
          >
            Группы
          </SimpleCell>
          <SimpleCell
            onClick={forwardToDisciplines}
            before={<Icon28BookOutline width={24} height={24} />}
            expandable
          >
            Предметы
          </SimpleCell>
          <TeacherLink />
        </>
      )}
    </Group>
  ) : (
    <Group>
      <Placeholder
        icon={<Icon56UserMicrophoneOutline />}
        action={
          <Button size="m" onClick={forwardToSearchTeacher}>
            Выбрать преподавателя
          </Button>
        }
      >
        Выберите преподавателя, расписание которого хотите посмотреть
      </Placeholder>
    </Group>
  )
}
