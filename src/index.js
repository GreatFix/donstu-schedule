import 'core-js/features/map'
import 'core-js/features/set'
import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import App from './App'

// Init VK  Mini App

const appInit = async () => {
  bridge.send('VKWebAppInit')

  const res = await bridge.send('VKWebAppStorageGet', {
    keys: ['THEME'],
  })
  const body = document.querySelector('body')
  body.setAttribute('scheme', res.keys[0].value) //Регистрация цветовой схемы

  const url = new URL(window.location.href)
  const platform = url.searchParams.get('vk_platform')
  sessionStorage.setItem('PLATFORM', platform)

  ReactDOM.render(<App />, document.getElementById('root'))
  if (process.env.NODE_ENV === 'development') {
    import('./eruda').then(({ default: eruda }) => {}) //runtime download
  }
}
appInit()
