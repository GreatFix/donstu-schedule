import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import bridge from '@vkontakte/vk-bridge'
import { AdaptivityProvider, AppRoot } from '@vkontakte/vkui'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { NavigationProvider } from 'shared/contexts/Navigation'
import { ScheduleDayProvider } from 'shared/contexts/ScheduleDay'
import { SnackProvider } from 'shared/contexts/Snack'

import { App } from './App'
import { UserConfigProvider } from './shared/contexts/UserConfig'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 10800,
      staleTime: Infinity,
      refetchOnReconnect: false,
      retry: false,
      keepPreviousData: true,
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  },
})

bridge
  .send('VKWebAppInit')
  .then(({ result }) => result)
  .catch(() => false)
  .then((bridgeSupport: boolean) => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <SnackProvider>
            <UserConfigProvider bridgeSupport={bridgeSupport}>
              <AdaptivityProvider>
                <AppRoot>
                  <NavigationProvider>
                    <ScheduleDayProvider>
                      <App />
                    </ScheduleDayProvider>
                  </NavigationProvider>
                </AppRoot>
              </AdaptivityProvider>
            </UserConfigProvider>
          </SnackProvider>
        </QueryClientProvider>
      </React.StrictMode>
    )
  })
