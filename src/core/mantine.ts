import {
  createTheme, TabsList, Alert, Paper, rem
} from '@mantine/core'
import { NotificationsProps } from '@mantine/notifications'
import { generateColors } from '@mantine/colors-generator'
import '@fontsource/montserrat-alternates'
import '@fontsource-variable/montserrat'
import { DatesProviderSettings } from '@mantine/dates'

export const theme = createTheme({
  fontFamily: 'Montserrat Variable',
  fontSizes: {
    sm: rem(13)
  },
  primaryColor: 'violet',
  primaryShade: 4,
  colors: {
    blue: generateColors('#0079da'),
    violet: generateColors('#500e73')
  },
  components: {
    Paper: Paper.extend({
      defaultProps: {
        shadow: 'sm',
        radius: 'md'
      }
    }),
    TabsList: TabsList.extend({
      defaultProps: {
        fz: 'md'
      }
    }),
    Alert: Alert.extend({
      styles: {
        message: {
          color: 'var(--alert-color)'
        },
        root: {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'var(--alert-color)'
        }
      }
    })
  }
})

export const notificationProps: NotificationsProps = {
  position: 'top-center'
}

export const datesSettingsProps: DatesProviderSettings = {
  locale: 'ru',
  firstDayOfWeek: 0,
  weekendDays: [0],
  timezone: 'UTC'
}
