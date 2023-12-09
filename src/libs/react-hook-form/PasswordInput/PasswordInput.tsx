import { useController, useFormContext } from 'react-hook-form'
import { PasswordInput as MantinePasswordInput } from '@mantine/core'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { PasswordInputProps } from './types'
import classes from './PasswordInput.module.css'

export const PasswordInput = ({
  name, shouldUnregister, readOnly, ...props
}: PasswordInputProps) => {
  const { control, formState } = useFormContext()

  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  const [visibility, setVisibility] = useState(false)

  return (
    <MantinePasswordInput
      classNames={{
        input: classes.input
      }}
      visible={visibility}
      onVisibilityChange={setVisibility}
      visibilityToggleIcon={({ reveal }) => (reveal
        ? (<Eye size="1.2rem" />)
        : (<EyeOff size="1.2rem" />))}
      value={value ?? ''}
      error={error?.message}
      readOnly={formState.isSubmitting || readOnly}
      {...fieldProps}
      {...props}
    />
  )
}
