import React from 'react'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = Omit<FlexContainerProps, 'direction'>

export default function Column({ children, ...props }: Props) {
  return (
    <FlexContainer direction="column" {...props}>
      {children}
    </FlexContainer>
  )
}
