import { Avatar, Group, Link, RichCell } from '@vkontakte/vkui'
import logo from 'assets/images/logo.png'

export const AboutLink = () => {
  return (
    <Group>
      <RichCell
        disabled
        before={<Avatar size={48} src={logo} />}
        caption={
          <Link href="https://vk.com/donstushedule">Подпишитесь, чтобы поддержать автора</Link>
        }
      >
        ДГТУ - Расписание
      </RichCell>
    </Group>
  )
}
