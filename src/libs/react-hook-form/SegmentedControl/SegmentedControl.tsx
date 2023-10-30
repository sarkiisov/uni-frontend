import { Box, Input, SegmentedControl as MantineSegmentedControl } from '@mantine/core'
import { useController, useFormContext } from 'react-hook-form'
import { SegmentedControlProps } from './types'

export const SegmentedControl = ({
  name, shouldUnregister, readOnly, label, ...props
}:SegmentedControlProps) => {
  const { control, formState } = useFormContext()

  const {
    field: { value, ...fieldProps },
    fieldState: { error }
  } = useController({ name, control, shouldUnregister })

  return (
    <Input.Wrapper label={label} error={error?.message}>
      <Box>
        <MantineSegmentedControl
          value={value}
          readOnly={formState.isSubmitting || readOnly}
          {...fieldProps}
          {...props}
        />
      </Box>
    </Input.Wrapper>

  )
}
