import {
  createTheme, TabsList, Alert, Paper, rem
} from '@mantine/core'
import { NotificationsProps } from '@mantine/notifications'
import { generateColors } from '@mantine/colors-generator'
import '@fontsource-variable/montserrat'
import { DatesProviderSettings } from '@mantine/dates'

export const theme = createTheme({
  fontFamily: 'Montserrat Variable',
  fontSizes: {
    sm: rem(13),
    md: rem(14.4)
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
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
  timezone: 'UTC'
}
