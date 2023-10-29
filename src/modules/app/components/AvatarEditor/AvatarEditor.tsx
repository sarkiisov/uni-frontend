import { Flex, Slider } from '@mantine/core'
import React, { Ref, useState } from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import { AvatarEditorProps } from './types'

export const AvatarEditor = React.forwardRef(
  ({ file, size }: AvatarEditorProps, ref: Ref<ReactAvatarEditor>) => {
    const [scale, setScale] = useState(1)

    return (
      <Flex direction="column" align="center" gap="lg">
        {file && (
          <ReactAvatarEditor
            ref={ref}
            image={file}
            width={size ?? 260}
            height={size ?? 260}
            scale={scale}
          />
        )}
        <Slider w={280} px="md" step={0.01} max={2} min={1} value={scale} onChange={setScale} label={null} />
      </Flex>
    )
  }
)
