import { useController, useFormContext } from 'react-hook-form'
import {
  Radio, Group, Text, Box
} from '@mantine/core'
import { AnswerInputProps } from './types'

export const QuizAnswerInput = ({
  radioCount,
  name,
  label,
  description,
  leftSection,
  rightSection,
  ...styleProps
}: AnswerInputProps) => {
  const { control, formState: { isSubmitting } } = useFormContext()

  const {
    field: { value, onChange },
    fieldState: { error }
  } = useController({ name, control })

  return (
    <Radio.Group
      value={String(value)}
      onChange={(value) => onChange(Number(value))}
      label={label}
      error={error?.message}
      {...styleProps}
    >
      <Box mb="xs">
        {description}
      </Box>
      <Group>
        <Text>{leftSection}</Text>
        {Array.from(
          { length: radioCount },
          (_, index) => (
            <Radio
              value={String(index + 1)}
              key={String(index)}
              readOnly={isSubmitting}
            />
          )
        )}
        <Text>{rightSection}</Text>
      </Group>
    </Radio.Group>

  )
}
