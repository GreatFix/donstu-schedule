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
import { useClassroomList } from 'api/hooks/useClassroomList'
//Styles
import cn from 'classnames/bind'
import { Skeleton } from 'components/Skeleton'
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react'
//Hooks
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

import styles from './index.module.css'
const cx = cn.bind(styles)

const SKELETONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export interface ISearchClassroomPanelProps extends IWithId {
  backToMain: () => void
}

export const SearchClassroomPanel = ({ id, backToMain }: ISearchClassroomPanelProps) => {
  const [search, setSearch] = useState('')

  const { data, isFetching, isFetched } = useClassroomList()
  const { setClassroom } = useUserConfig()

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setSearch(event.target.value),
    []
  )

  const filteredClassrooms = useMemo(
    () =>
      (data || []).filter((classroom) => {
        return (
          !!classroom.name &&
          (!search || classroom.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        )
      }),
    [data, search]
  )

  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      const { dataset } = e.currentTarget
      const { id } = dataset

      if (id) {
        const clickedItem = filteredClassrooms.find((item) => String(item.id) === id)
        if (clickedItem) {
          setClassroom(clickedItem)
          backToMain()
        }
      }
    },
    [backToMain, filteredClassrooms, setClassroom]
  )

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />}>
        <Headline level={'2'}>Поиск аудитории</Headline>
      </PanelHeader>
      <Search className={cx('Search')} value={search} onChange={onChange} />

      <List>
        {isFetching || !isFetched ? (
          SKELETONS.map((key) => <Skeleton key={key} className={cx('Skeleton')} />)
        ) : filteredClassrooms.length ? (
          filteredClassrooms.map((classroom) => (
            <SimpleCell onClick={handleClick} key={classroom.id} data-id={classroom.id}>
              <span>{classroom.name}</span>
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
