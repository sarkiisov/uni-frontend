import {
  SegmentedControlProps as MantineSegmentedControlProps,
  InputWrapperProps as MantineInputWrapperProps
} from '@mantine/core'

import { InputBaseProps } from '../types'

export type SegmentedControlProps =
  InputBaseProps &
  MantineSegmentedControlProps &
  MantineInputWrapperProps
