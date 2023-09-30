import { MantineProvider as MantineRootProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { notificationProps, theme } from '@/core'

export const MantineProvider = ({ children }: React.PropsWithChildren) => (
  <MantineRootProvider theme={theme}>
    <Notifications {...notificationProps} />
    {children}
  </MantineRootProvider>
)
