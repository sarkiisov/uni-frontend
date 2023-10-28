import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter'

import 'dayjs/locale/ru'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'

import { RootProvider } from './providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootProvider>
      <AppRouter />
    </RootProvider>
  </React.StrictMode>
)
