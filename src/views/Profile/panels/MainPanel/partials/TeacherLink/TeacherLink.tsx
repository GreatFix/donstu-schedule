import { Icon56UserBookOutline } from '@vkontakte/icons'
import { Link, SimpleCell } from '@vkontakte/vkui'
import { useUserConfig } from 'shared/contexts/UserConfig'

export const TeacherLink = () => {
  const {
    data: { teacherName },
  } = useUserConfig()

  return (
    <Link
      href={`https://yandex.ru/search/?text=%22${teacherName}%22%20site%3Ahttps%3A%2F%2Fdonstu.ru%2Fstructure%2Fcadre%2F&lr=39`}
      target="_blank"
      rel="noopener noreferer"
    >
      <SimpleCell
        before={<Icon56UserBookOutline width={24} height={24} />}
        style={{ color: 'var(--text_link,var(--vkui--color_text_link))' }}
      >
        Страница преподавателя
      </SimpleCell>
    </Link>
  )
}
