import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import bridge from '@vkontakte/vk-bridge'
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NavigationProvider } from 'shared/contexts/Navigation'
import { ScheduleDayProvider } from 'shared/contexts/ScheduleDay'
import { SnackProvider } from 'shared/contexts/Snack'

import { App } from './App'
import { UserConfigProvider, useUserConfig } from './shared/contexts/UserConfig'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.POSITIVE_INFINITY,
      staleTime: 10 * 60 * 1000,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
    },
  },
})

const renderTimer = setTimeout(() => initApp(), 250)

;(async () => {
  const { result } = await bridge.send('VKWebAppInit')

  if (result) {
    clearTimeout(renderTimer)
    initApp()
  }
})()

function initApp() {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserConfigProvider>
          <AppWithConfig />
        </UserConfigProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

const AppWithConfig = () => {
  const {
    data: { theme },
  } = useUserConfig()
  return (
    <ConfigProvider appearance={theme}>
      <AdaptivityProvider>
        <AppRoot>
          <NavigationProvider>
            <SnackProvider>
              <ScheduleDayProvider>
                <App />
              </ScheduleDayProvider>
            </SnackProvider>
          </NavigationProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}
