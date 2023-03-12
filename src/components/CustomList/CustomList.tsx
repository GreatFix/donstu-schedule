import { Icon28FaceRecognitionOutline } from '@vkontakte/icons'
import { List, Placeholder, SimpleCell } from '@vkontakte/vkui'
//Styles
import cn from 'classnames/bind'
import { Skeleton } from 'components/Skeleton'
import { memo, MouseEventHandler, useCallback } from 'react'

import styles from './index.module.css'
const cx = cn.bind(styles)

const SKELETONS = [1, 2, 3, 4, 5]

interface IListItem {
  id: string | number
  name: string
}

export interface ICustomListProps<T extends string | IListItem = IListItem> {
  /** Список элементов */
  list: T[]
  /** Включение скелетонов */
  showSkeletons?: boolean
  /** Событие выбора элемента */
  onSelect?: T extends string ? undefined : (item: IListItem) => void
  /** Отключение действий */
  disabled?: boolean
}

function _CustomList<T extends string | IListItem>({
  list = [],
  showSkeletons,
  onSelect,
  disabled,
}: ICustomListProps<T>) {
  const handleClick = useCallback<MouseEventHandler<HTMLElement>>(
    (e) => {
      const { dataset } = e.currentTarget
      const { id } = dataset
      if (id) {
        const clickedItem = (list as IListItem[]).find((item) => String(item.id) === id)
        if (clickedItem) {
          onSelect?.(clickedItem)
        }
      }
    },
    [list, onSelect]
  )

  return (
    <List>
      {showSkeletons ? (
        SKELETONS.map((key) => <Skeleton key={key} className={cx('Skeleton')} />)
      ) : list.length ? (
        list.map((item, index) =>
          typeof item === 'object' ? (
            <SimpleCell
              onClick={handleClick}
              key={item.id}
              multiline
              data-id={item.id}
              disabled={disabled}
            >
              <span>{item.name}</span>
            </SimpleCell>
          ) : (
            <SimpleCell key={index} multiline disabled={disabled}>
              <span>{item}</span>
            </SimpleCell>
          )
        )
      ) : (
        <Placeholder icon={<Icon28FaceRecognitionOutline width={56} height={56} />}>
          Не найдено
        </Placeholder>
      )}
    </List>
  )
}

export const CustomList = memo(_CustomList)
