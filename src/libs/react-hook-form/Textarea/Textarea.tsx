import { Textarea as MantineTextarea } from '@mantine/core'
import { useController, useFormContext } from 'react-hook-form'
import { TextareaProps } from './types'

export const Textarea = ({
  name, shouldUnregister, readOnly, ...props
}: TextareaProps) => {
  const { control, formState } = useFormContext()

  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  return (
    <MantineTextarea
      value={value ?? ''}
      error={error?.message}
      readOnly={formState.isSubmitting || readOnly}
      {...fieldProps}
      {...props}

    />
  )
}
