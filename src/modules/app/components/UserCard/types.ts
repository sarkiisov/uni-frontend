import { TextProps } from '@mantine/core'
import { User } from '@/modules/auth/types'

export type UserCardProps = {
  user?: User
  nameProps?: TextProps
  actions?: React.ReactNode
}
