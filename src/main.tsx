import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { AppRouter } from './AppRouter'

import 'dayjs/locale/ru'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/carousel/styles.css'

import { RootProvider } from './providers'

dayjs.extend(CustomParseFormat)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RootProvider>
      <AppRouter />
    </RootProvider>
  </React.StrictMode>
)
