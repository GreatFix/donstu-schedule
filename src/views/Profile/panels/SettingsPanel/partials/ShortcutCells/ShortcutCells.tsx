import { Icon20CheckCircleOutline } from '@vkontakte/icons'
import bridge, { ErrorData } from '@vkontakte/vk-bridge'
import { Group, SimpleCell, Snackbar, Spinner } from '@vkontakte/vkui'
import { useLayoutEffect, useRef, useState } from 'react'
import { useSnack } from 'shared/contexts/Snack'

export const ShortcutCells = () => {
  const [check, setCheck] = useState({
    is_feature_supported: false,
    is_added_to_home_screen: false,
  })
  const { setSnack, closeSnack } = useSnack()
  const checkAddedIntervalRef = useRef<NodeJS.Timer>()
  const checkedCounterRef = useRef<number>(0)

  useLayoutEffect(() => {
    /** Проверяет, поддерживается ли добавление ярлыка и добавлен ли он */
    bridge.send('VKWebAppAddToHomeScreenInfo').then(setCheck)
  }, [])

  /** Проверяет, добавился ли ярлык на рабочий стол */
  const checkAdding = async () => {
    checkedCounterRef.current++

    const check = await bridge.send('VKWebAppAddToHomeScreenInfo')

    if (check.is_added_to_home_screen) {
      setSnack(
        <Snackbar layout="vertical" duration={3000} onClose={closeSnack}>
          Успешно добавлено
        </Snackbar>
      )
      clearInterval(checkAddedIntervalRef.current)
      return true
    }

    if (checkedCounterRef.current > 10) {
      setSnack(
        <Snackbar layout="vertical" duration={5000} onClose={closeSnack}>
          Не добавлено. Видимо нужно сначала дать разрешение VK добавлять ярлыки рабочего стола.
        </Snackbar>
      )
      clearInterval(checkAddedIntervalRef.current)
    }
  }

  const handleAddToDisplay = async () => {
    const adding = await bridge.send('VKWebAppAddToHomeScreen')

    setSnack(<Spinner />)

    if (adding.result) {
      checkedCounterRef.current = 0

      const isAdded = checkAdding()

      if (!isAdded) {
        checkAddedIntervalRef.current = setInterval(checkAdding, 1000)
      }
    } else {
      setSnack(
        <Snackbar layout="vertical" duration={3000} onClose={closeSnack}>
          {(adding as unknown as ErrorData).error_type +
            '-' +
            (adding as unknown as ErrorData).error_data}
        </Snackbar>
      )
    }
  }

  const handleAddToFavorite = async () => {
    const adding = await bridge.send('VKWebAppAddToFavorites')

    setSnack(
      <Snackbar layout="vertical" duration={3000} onClose={closeSnack}>
        {adding.result
          ? 'Успешно добавлено'
          : (adding as unknown as ErrorData).error_type +
            '-' +
            (adding as unknown as ErrorData).error_data}
      </Snackbar>
    )
  }

  return check.is_feature_supported ? (
    <Group>
      <SimpleCell onClick={handleAddToFavorite} expandable={true}>
        Добавить в избранное
      </SimpleCell>
      <SimpleCell
        onClick={handleAddToDisplay}
        after={check.is_added_to_home_screen && <Icon20CheckCircleOutline />}
        disabled={check.is_added_to_home_screen}
      >
        Добавить ярлык на главный экран
      </SimpleCell>
    </Group>
  ) : null
}
