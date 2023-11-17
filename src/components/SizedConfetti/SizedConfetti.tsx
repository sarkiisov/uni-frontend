import ReactConfetti, { Props } from 'react-confetti'
import { forwardRef } from 'react'
import { useViewportSize } from '@mantine/hooks'

export const SizedConfetti = forwardRef<HTMLCanvasElement, Props>((props: Props, ref) => {
  const { width, height } = useViewportSize()

  return (
    <ReactConfetti
      width={width}
      height={height - 20}
      {...props}
      ref={ref}
    />
  )
})
