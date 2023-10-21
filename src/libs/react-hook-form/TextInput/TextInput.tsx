import { TextInput as MantineTextInput } from '@mantine/core'
import { useController, useFormContext } from 'react-hook-form'
import { TextInputProps } from './types'

export const TextInput = ({
  name, shouldUnregister, readOnly, ...props
}: TextInputProps) => {
  const { control, formState } = useFormContext()

  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  return (
    <MantineTextInput
      value={value ?? ''}
      error={error?.message}
      readOnly={formState.isSubmitting || readOnly}
      {...fieldProps}
      {...props}
    />
  )
}
