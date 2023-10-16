import {
  createTheme, rem, Paper
} from '@mantine/core'
import { NotificationsProps } from '@mantine/notifications'
import { generateColors } from '@mantine/colors-generator'
import '@fontsource/montserrat-alternates'

export const theme = createTheme({
  fontFamily: 'Montserrat Alternates',
  fontSizes: {
    md: rem(17),
    sm: rem(15)
  },
  primaryColor: 'theme-colorful-blue',
  colors: {
    'theme-colorful-blue': generateColors('#0079da'),
    'theme-colorful-violet': generateColors('#500e73')
  },
  components: {
    Paper: Paper.extend({
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        p: 'xl'
      }
    })
  }

})

export const notificationProps: NotificationsProps = {

}
