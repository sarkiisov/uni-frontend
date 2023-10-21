import { useController, useFormContext } from 'react-hook-form'
import { PasswordInput as MantinePasswordInput } from '@mantine/core'
import { Eye, EyeOff } from 'lucide-react'
import { useMemo, useState } from 'react'
import { PasswordInputProps } from './types'

export const PasswordInput = ({
  name, shouldUnregister, readOnly, ...props
}: PasswordInputProps) => {
  const { control, formState } = useFormContext()

  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  const [visibility, setVisibility] = useState(false)

  const VisibilityIcon = useMemo(() => ({ reveal }: { reveal: boolean }) => {
    const Icon = reveal ? Eye : EyeOff

    return <Icon size={18} strokeWidth={1.35} />
  }, [visibility])

  return (
    <MantinePasswordInput
      visible={visibility}
      onVisibilityChange={setVisibility}
      visibilityToggleIcon={VisibilityIcon}
      value={value ?? ''}
      error={error?.message}
      readOnly={formState.isSubmitting || readOnly}
      {...fieldProps}
      {...props}
    />
  )
}
