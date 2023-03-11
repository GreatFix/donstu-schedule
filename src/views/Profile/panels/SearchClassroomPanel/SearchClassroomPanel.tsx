import { useVirtualizer } from '@tanstack/react-virtual'
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
import {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
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

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: filteredClassrooms.length,
    estimateSize: () => 48,
    overscan: 5,
    getScrollElement: () => wrapperRef.current,
  })

  return (
    <Panel className={cx('Panel')} id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />} separator={false}>
        <Headline level={'2'}>Поиск аудитории</Headline>
      </PanelHeader>
      <Search className={cx('Search')} value={search} onChange={onChange} />

      <div className={cx('ListWrapper')} ref={wrapperRef}>
        <List
          className={cx('List')}
          style={{
            height: `${rowVirtualizer.getTotalSize() + 24}px`,
          }}
        >
          {isFetching || !isFetched ? (
            SKELETONS.map((key) => <Skeleton key={key} className={cx('Skeleton')} />)
          ) : filteredClassrooms.length ? (
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const classroom = filteredClassrooms[virtualRow.index]
              return (
                <SimpleCell
                  onClick={handleClick}
                  key={classroom.id}
                  data-id={classroom.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <span>{classroom.name}</span>
                </SimpleCell>
              )
            })
          ) : (
            <Placeholder icon={<Icon28FaceRecognitionOutline width={56} height={56} />}>
              Не найдено
            </Placeholder>
          )}
        </List>
      </div>
    </Panel>
  )
}
