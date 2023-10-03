import React from 'react'
import classnames from 'classnames'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

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
    <FlexContainer
      element="section"
      className={classnames('dnb-layout-stack', className)}
      direction={direction}
      alignSelf={alignSelf}
      align="stretch"
      {...rest}
    >
      {children}
    </FlexContainer>
  )
}

Stack._supportsEufemiaSpacingProps = true
export default Stack
