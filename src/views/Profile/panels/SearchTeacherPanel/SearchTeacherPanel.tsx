import { Icon28FaceRecognitionOutline } from '@vkontakte/icons'
import {
  Headline,
  List,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Search,
  SimpleCell,
} from '@vkontakte/vkui'
//Hooks
import { useTeacherList } from 'api/hooks/useTeacherList'
//Styles
import cn from 'classnames/bind'
import { Skeleton } from 'components/Skeleton'
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

import styles from './index.module.css'
const cx = cn.bind(styles)

const SKELETONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export interface ISearchTeacherPanelProps extends IWithId {
  backToMain: () => void
}

export const SearchTeacherPanel = ({ id, backToMain }: ISearchTeacherPanelProps) => {
  const [search, setSearch] = useState('')

  const { data, isFetching, isFetched } = useTeacherList()
  const { setTeacher } = useUserConfig()

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setSearch(event.target.value),
    []
  )

  const filteredTeachers = useMemo(
    () =>
      (data || []).filter((teacher) => {
        return (
          !!teacher.name &&
          (!search || teacher.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        )
      }),
    [data, search]
  )

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      const { dataset } = e.currentTarget
      const { id } = dataset

      if (id) {
        const clickedItem = filteredTeachers.find((item) => String(item.id) === id)
        if (clickedItem) {
          setTeacher(clickedItem)
          backToMain()
        }
      }
    },
    [filteredTeachers, setTeacher, backToMain]
  )

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />}>
        <Headline level={'2'}>Поиск преподавателя</Headline>
      </PanelHeader>
      <Search className={cx('Search')} value={search} onChange={onChange} />

      <List>
        {isFetching || !isFetched ? (
          SKELETONS.map((key) => <Skeleton key={key} className={cx('Skeleton')} />)
        ) : filteredTeachers.length ? (
          filteredTeachers.map((teacher) => (
            <SimpleCell onClick={handleClick} key={teacher.id} data-id={teacher.id}>
              <span>{teacher.name}</span>
            </SimpleCell>
          ))
        ) : (
          <Placeholder icon={<Icon28FaceRecognitionOutline width={56} height={56} />}>
            Не найдено
          </Placeholder>
        )}
      </List>
    </Panel>
  )
}
