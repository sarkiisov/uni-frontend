import { Checkbox as MantineCheckbox } from '@mantine/core'
import { useController, useFormContext } from 'react-hook-form'

import { CheckboxGroupProps } from './types'

export const CheckboxGroup = ({
  name, shouldUnregister, children, ...props
}: React.PropsWithChildren<CheckboxGroupProps>) => {
  const { control } = useFormContext()

  const {
    field: { ref: fieldRef, value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  return (
    <MantineCheckbox.Group
      defaultValue={value?.length ? value : []}
      error={error?.message}
      {...fieldProps}
      {...props}

    >
      {children}
    </MantineCheckbox.Group>
  )
}
