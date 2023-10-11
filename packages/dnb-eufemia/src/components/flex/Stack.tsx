import React from 'react'
import classnames from 'classnames'
import Container from './Container'
import type { Props as FlexContainerProps } from './Container'

export type Props = FlexContainerProps

function Stack(props: Props) {
  const {
    className,
    direction = 'vertical',
    alignSelf = 'stretch',
    children,
    ...rest
  } = props

  return (
    <Container
      element="section"
      className={classnames('dnb-flex-stack', className)}
      direction={direction}
      alignSelf={alignSelf}
      align="stretch"
      {...rest}
    >
      {children}
    </Container>
  )
}

Stack._supportsEufemiaSpacingProps = true
export default Stack
