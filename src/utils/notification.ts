import { showNotification as showMantineNotification } from '@mantine/notifications'
import { theme } from '@/core'

export type NotificationTypes = 'ERROR' | 'SUCCESS' | 'INFO' | 'DANGER'

export type ShowNotificationOptions = {
  message: React.ReactNode
  type: NotificationTypes
}

const getNotificationColor = (type: NotificationTypes): string => {
  const colorsMap: {
    [key in NotificationTypes]: string
  } = {
    ERROR: 'red',
    SUCCESS: 'green',
    INFO: theme.primaryColor!,
    DANGER: 'orange'
  }

  return colorsMap[type]
}

export const showNotification = ({
  message,
  type
}: ShowNotificationOptions) => {
  showMantineNotification({
    color: getNotificationColor(type),
    message
  })
}
