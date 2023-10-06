import { MantineStyleProps } from '@mantine/core'

export type AnswerInputProps = MantineStyleProps & {
  radioCount: number
  name: string
  label?: string
  leftSection?: string
  rightSection?: string
  description?: React.ReactNode
}
