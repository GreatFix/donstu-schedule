import { useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual'
import { Icon24Filter, Icon28FaceRecognitionOutline } from '@vkontakte/icons'
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
import { useGroupList } from 'api/hooks/useGroupList'
//Styles
import cn from 'classnames/bind'
import { Skeleton } from 'components/Skeleton'
import { ChangeEventHandler, useCallback, useMemo, useRef, useState } from 'react'
import { useSearchGroupFiltres } from 'shared/contexts/SearchGroupFiltres'
import { useUserConfig } from 'shared/contexts/UserConfig'
import { IWithId } from 'shared/types/extend'

import styles from './index.module.css'
const cx = cn.bind(styles)

const SKELETONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export interface ISearchGroupPanelProps extends IWithId {
  onOpenFiltres?: () => void
  backToMain: () => void
}

export const SearchGroupPanel = ({ id, onOpenFiltres, backToMain }: ISearchGroupPanelProps) => {
  const [search, setSearch] = useState('')

  const { data, isFetching, isFetched } = useGroupList()

  const { faculty, kurs } = useSearchGroupFiltres()

  const { setGroup } = useUserConfig()

  const filteredGroups = useMemo(
    () =>
      data?.groups.filter((group) => {
        return (
          group.name.toLowerCase().indexOf(search.toLowerCase()) === 0 &&
          (faculty ? group.facul === faculty : true) &&
          (kurs > 0 ? group.kurs === kurs : true)
        )
      }) || [],
    [data?.groups, faculty, kurs, search]
  )

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => setSearch(event.target.value),
    []
  )

  const handleClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    (e) => {
      const { dataset } = e.currentTarget
      const { id } = dataset
      if (id) {
        const clickedItem = filteredGroups.find((item) => String(item.id) === id)
        if (clickedItem) {
          setGroup(clickedItem)
          backToMain()
        }
      }
    },
    [backToMain, filteredGroups, setGroup]
  )

  const panelRef = useRef<HTMLDivElement | null>(null)

  const rowVirtualizer = useWindowVirtualizer({
    count: filteredGroups.length,
    estimateSize: () => 35,
    overscan: 5,
  })

  return (
    <Panel getRootRef={panelRef} id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={backToMain} />} separator={false}>
        <Headline level={'2'}>Поиск группы</Headline>
      </PanelHeader>
      <Search
        className={cx('Search')}
        value={search}
        onChange={onChange}
        icon={<Icon24Filter />}
        onIconClick={onOpenFiltres}
      />
      <List
        style={{
          height: `${rowVirtualizer.getTotalSize() + 24}px`,
          position: 'relative',
        }}
      >
        {isFetching || !isFetched ? (
          SKELETONS.map((key) => <Skeleton key={key} className={cx('Skeleton')} />)
        ) : filteredGroups.length ? (
          rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const group = filteredGroups[virtualRow.index]
            return (
              <SimpleCell
                onClick={handleClick}
                key={virtualRow.index}
                data-id={group.id}
                indicator={group.facul}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 16,
                  right: 16,
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <span>{group.name}</span>
              </SimpleCell>
            )
          })
        ) : (
          <Placeholder icon={<Icon28FaceRecognitionOutline width={56} height={56} />}>
            Не найдено
          </Placeholder>
        )}
      </List>
    </Panel>
  )
}
