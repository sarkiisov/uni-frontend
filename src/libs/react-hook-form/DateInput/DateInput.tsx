import { DateInput as MantineDateInput } from '@mantine/dates'
import { useController, useFormContext } from 'react-hook-form'
import { DateInputProps } from './types'

export const DateInput = ({
  name, shouldUnregister, readOnly, ...props
}: DateInputProps) => {
  const { control, formState } = useFormContext()

  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  return (
    <MantineDateInput
      value={value}
      error={error?.message}
      readOnly={formState.isSubmitting || readOnly}
      {...fieldProps}
      {...props}
    />
  )
}
