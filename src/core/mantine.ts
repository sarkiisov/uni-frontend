import {
  createTheme, TextInput, PasswordInput, Button, Paper, rem
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
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        size: 'md'
      }
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: 'md'
      }
    }),
    Button: Button.extend({
      defaultProps: {
        size: 'md'
      }
    })
  }
})

export const notificationProps: NotificationsProps = {
  position: 'top-center'
}
