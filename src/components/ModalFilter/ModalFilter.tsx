import { Icon24Cancel, Icon24Done } from '@vkontakte/icons'
import {
  FormItem,
  FormLayout,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Platform,
  Select,
  usePlatform,
} from '@vkontakte/vkui'
import { useGroupList } from 'api/hooks/useGroupList'
import { ChangeEventHandler } from 'react'
import { useSearchGroupFiltres } from 'shared/contexts/SearchGroupFiltres'

import { KURS_LIST } from './constants'

interface IModalFiltres {
  onClose: () => void
  id: string
}

export const ModalFilter = ({ id, onClose }: IModalFiltres) => {
  const { data } = useGroupList()
  const platform = usePlatform()

  const { setFaculty, setKurs, faculty, kurs } = useSearchGroupFiltres()

  const handleChangeFaculty: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFaculty(e.target.value)
  }

  const handleChangeKurs: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setKurs(Number(e.target.value))
  }
  return (
    <ModalPage
      id={id}
      onClose={onClose}
      header={
        <ModalPageHeader
          left={
            (platform === Platform.ANDROID || platform === Platform.VKCOM) && (
              <PanelHeaderButton onClick={onClose}>
                <Icon24Cancel />
              </PanelHeaderButton>
            )
          }
          right={
            <PanelHeaderButton onClick={onClose}>
              {platform === Platform.IOS ? 'Готово' : <Icon24Done />}
            </PanelHeaderButton>
          }
        >
          Фильтры
        </ModalPageHeader>
      }
    >
      <FormLayout>
        {data && (
          <FormItem top="Факультет">
            <Select
              onChange={handleChangeFaculty}
              defaultValue={faculty}
              options={data.faculties.map((faculty) => ({ value: faculty, label: faculty }))}
              placeholder="Не выбран"
            />
          </FormItem>
        )}

        <FormItem top="Курс">
          <Select
            onChange={handleChangeKurs}
            defaultValue={kurs}
            placeholder="Не выбран"
            options={KURS_LIST}
          />
        </FormItem>
      </FormLayout>
    </ModalPage>
  )
}
