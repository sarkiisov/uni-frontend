import { MantineProvider as MantineRootProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { DatesProvider } from '@mantine/dates'
import { datesSettingsProps, notificationProps, theme } from '@/core'

export const MantineProvider = ({ children }: React.PropsWithChildren) => (
  <MantineRootProvider theme={theme}>
    <Notifications {...notificationProps} />
    <DatesProvider settings={datesSettingsProps}>
      {children}
    </DatesProvider>
  </MantineRootProvider>
)
