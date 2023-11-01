import { BoxProps } from '@mantine/core'
import { LucideIcon } from 'lucide-react'

export type HorizontalMenuItem = {
  icon: LucideIcon
  label: string
  to: string
}

export type HorizontalMenuProps = BoxProps & {
  items: HorizontalMenuItem[]
}
