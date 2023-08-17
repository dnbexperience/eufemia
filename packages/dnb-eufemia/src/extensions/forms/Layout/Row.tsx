import React from 'react'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = Omit<FlexContainerProps, 'direction'>

export default function Row({ children, ...props }: Props) {
  return (
    <FlexContainer direction="row" {...props}>
      {children}
    </FlexContainer>
  )
}
