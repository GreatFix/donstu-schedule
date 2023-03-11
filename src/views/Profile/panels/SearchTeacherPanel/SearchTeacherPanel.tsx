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
//Hooks
import { useTeacherList } from 'api/hooks/useTeacherList'
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

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useVirtualizer({
    count: filteredTeachers.length,
    estimateSize: () => 48,
    overscan: 5,
    getScrollElement: () => wrapperRef.current,
  })

  return (
    <Panel className={cx('Panel')} id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />} separator={false}>
        <Headline level={'2'}>Поиск преподавателя</Headline>
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
          ) : filteredTeachers.length ? (
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const teacher = filteredTeachers[virtualRow.index]
              return (
                <SimpleCell
                  onClick={handleClick}
                  key={teacher.id}
                  data-id={teacher.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <span>{teacher.name}</span>
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
