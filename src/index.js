import 'core-js/features/map'
import 'core-js/features/set'
import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store/store'
import { setAll, setBridgeSupport } from './store/actions/userData'
import { setDate } from './store/actions/date'

const appInit = async () => {
  await bridge.send('VKWebAppInit').then(
    (res) => store.dispatch(setBridgeSupport(res.result)) //Проверка на поддержку событий bridge
  )

  let temp

  if (store.getState().userData.bridgeSupport) {
    temp = await getInBridge() //получаем из хранилища ВК
  } else {
    temp = await getInStorage() //получаем из local.storage
  }
  const {
    GROUP_ID = null,
    GROUP_NAME = null,
    FACULTY = null,
    THEME = 'space_gray',
    PLATFORM = 'desktop_web',
    POST = 'Студент',
    TEACHER_ID = null,
    TEACHER_NAME = null,
    HELPERS = '',
  } = temp

  store.dispatch(
    setAll(GROUP_ID, GROUP_NAME, FACULTY, THEME, PLATFORM, POST, TEACHER_ID, TEACHER_NAME, HELPERS)
  )
  store.dispatch(setDate(new Date())) //заносим в редакс

  const body = document.querySelector('body')
  body.setAttribute('scheme', THEME) //регистрируем цветовую схему

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

  if (process.env.NODE_ENV === 'development') {
    import('./eruda').then(({ default: eruda }) => {}) //runtime download
  }
}

appInit()

async function getInBridge() {
  const res = await bridge.send('VKWebAppStorageGet', {
    keys: [
      'GROUP_ID',
      'GROUP_NAME',
      'FACULTY',
      'THEME',
      'POST',
      'TEACHER_ID',
      'TEACHER_NAME',
      'HELPERS',
    ],
  })
  const userData = {}
  res.keys.forEach((obj) => {
    if (obj.value) userData[obj.key] = obj.value
  })

  const url = new URL(window.location.href)
  const platform = url.searchParams.get('vk_platform')

  userData.PLATFORM = platform

  return userData
}

async function getInStorage() {
  let userData = {}
  let keys = Object.keys(localStorage)
  for (let key of keys) {
    userData[key] = localStorage.getItem(key)
  }

  const url = new URL(window.location.href)
  const platform = url.searchParams.get('vk_platform')

  userData.PLATFORM = platform

  return userData
}
