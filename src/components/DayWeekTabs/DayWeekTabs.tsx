// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

import { Icon28ArrowLeftOutline, Icon28ArrowRightOutline } from '@vkontakte/icons'
import { IconButton, Tabs, useAdaptivity } from '@vkontakte/vkui'
import cn from 'classnames/bind'
import { DateTime } from 'luxon'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useScheduleDay } from 'shared/contexts/ScheduleDay'
import { ISODate } from 'shared/types/date'
import { IDay } from 'shared/types/donstu'
import { Navigation, Swiper as ISwiper, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { NAVIGATION } from './constants'
import {
  DayWeekTabsItem,
  DayWeekTabsItemProps,
  SelectableDay,
} from './DayWeekTabsItem/DayWeekTabsItem'
import { initDays, nextWeekDays, prevWeekDays } from './helpers'
import styles from './index.module.css'
const cx = cn.bind(styles)

const MODULES = [Virtual, Navigation]

interface IDayWeekTabsProps extends Pick<DayWeekTabsItemProps, 'onChangeDate'> {
  selectedDate: SelectableDay['date']
  schedule: Record<ISODate, IDay>
}

const _DayWeekTabs = ({ schedule = {}, selectedDate, onChangeDate }: IDayWeekTabsProps) => {
  const [swiper, initSwiper] = useState<ISwiper | null>(null)
  const { viewWidth } = useAdaptivity()
  const { weekStartDate, setWeekStartDate } = useScheduleDay()
  const isMobile = viewWidth < 3
  const isFirstRenderRef = useRef(true)

  const [days, setDays] = useState<SelectableDay[]>(() => initDays(selectedDate))
  const selectedSlideIndex = days.findIndex((day) => day.date === selectedDate)

  const getCountLessons = (day?: IDay) => {
    if (day?.lessons) {
      const lessons = Object.keys(day.lessons)
      return lessons.length
    }

    return 0
  }

  const handleSlideChange = useCallback(
    (swiper: ISwiper) => {
      const typedSwiper = swiper as unknown as { visibleSlidesIndexes: number[] }
      if (!(typedSwiper?.visibleSlidesIndexes?.length > 0)) return

      const firstSlideIndex = typedSwiper.visibleSlidesIndexes[0]
      const firstSlide = swiper.slides[firstSlideIndex]
      const firstSlideDate = firstSlide.getAttribute('data-date') as ISODate

      if (!firstSlideDate) return

      const date = DateTime.fromISO(firstSlideDate)

      if (date.weekday === 1) {
        setWeekStartDate(firstSlideDate)
      }
    },
    [setWeekStartDate]
  )

  /** Добавляет дни недели при перелистывании */
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    const index = days.findIndex((day) => day.date === weekStartDate)
    if (index > days.length - 8) {
      setDays((days) => [...days, ...nextWeekDays(weekStartDate)])
    } else if (index < 7) {
      swiper?.slideNext()
      setDays((days) => [...prevWeekDays(weekStartDate), ...days])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekStartDate])

  /** Листает до активного слайда */
  return (
    <Tabs className={cx('Root')}>
      <Swiper
        className={cx('Swiper', { isMobile })}
        onSwiper={initSwiper}
        slidesPerView={7}
        slidesPerGroup={7}
        onInit={(swiper) => {
          if (selectedSlideIndex !== -1) swiper?.slideTo(selectedSlideIndex)
        }}
        initialSlide={selectedSlideIndex}
        navigation={isMobile ? false : NAVIGATION}
        virtual
        modules={MODULES}
        onSlideChange={handleSlideChange}
      >
        {days.map((day, index) => (
          <SwiperSlide
            key={day.date}
            virtualIndex={index > 7 ? index - 7 : index}
            data-date={day.date}
          >
            <DayWeekTabsItem
              {...day}
              selected={selectedDate === day.date}
              disabled={!(day.date in schedule)}
              countLessons={getCountLessons(schedule[day.date])}
              onChangeDate={onChangeDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isMobile && (
        <>
          <IconButton className={cx('NavigationPrev')} id="prev-slide">
            <Icon28ArrowLeftOutline />
          </IconButton>
          <IconButton className={cx('NavigationNext')} id="next-slide">
            <Icon28ArrowRightOutline />
          </IconButton>
        </>
      )}
    </Tabs>
  )
}

export const DayWeekTabs = memo(_DayWeekTabs)
