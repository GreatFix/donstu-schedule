import { Icon24Done, Icon28ClearDataOutline } from '@vkontakte/icons'
import {
  FormItem,
  FormLayout,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Platform,
  Select,
  useAdaptivity,
  usePlatform,
} from '@vkontakte/vkui'
import { useGroupList } from 'api/hooks/useGroupList'
import { ChangeEventHandler } from 'react'
import { useSearchGroupFilters } from 'shared/contexts/SearchGroupFilters'

import { KURS_LIST } from './constants'

interface IModalFilters {
  onClose: () => void
  id: string
}

export const ModalFilter = ({ id, onClose }: IModalFilters) => {
  const { data, isFetching } = useGroupList()
  const platform = usePlatform()
  const { viewWidth } = useAdaptivity()
  const isMobile = viewWidth < 3

  const { setFaculty, setKurs, reset, faculty, kurs } = useSearchGroupFilters()

  const handleChangeFaculty: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setFaculty(e.target.value)
  }

  const handleChangeKurs: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setKurs(Number(e.target.value))
  }

  const facultyOptions = [
    ...(isMobile ? [] : [{ label: 'Не выбран', value: '' }]),
    ...(data ? data.faculties.map((faculty) => ({ value: faculty, label: faculty })) : []),
  ]

  const kursOptions = [...(isMobile ? [] : [{ label: 'Не выбран', value: 0 }]), ...KURS_LIST]

  return (
    <ModalPage
      id={id}
      onClose={onClose}
      header={
        <ModalPageHeader
          before={
            <PanelHeaderButton onClick={reset} aria-label="Сбросить значения">
              <Icon28ClearDataOutline width={24} height={24} />
            </PanelHeaderButton>
          }
          after={
            <PanelHeaderButton onClick={onClose} aria-label="Закрыть модальное окно">
              {platform === Platform.IOS ? 'Готово' : <Icon24Done />}
            </PanelHeaderButton>
          }
        >
          Фильтры
        </ModalPageHeader>
      }
    >
      <FormLayout>
        <FormItem top="Факультет">
          <Select
            onChange={handleChangeFaculty}
            value={faculty}
            options={facultyOptions}
            placeholder="Не выбран"
            fetching={isFetching}
          />
        </FormItem>

        <FormItem top="Курс">
          <Select
            onChange={handleChangeKurs}
            value={kurs}
            placeholder="Не выбран"
            options={kursOptions}
          />
        </FormItem>
      </FormLayout>
    </ModalPage>
  )
}
