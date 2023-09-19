import React from 'react'
import classnames from 'classnames'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  alignSelf?: FlexContainerProps['alignSelf']
  children: React.ReactNode
}

function Stack(props: Props) {
  const {
    className,
    direction,
    spacing,
    alignSelf = 'stretch',
    children,
    ...rest
  } = props

  return (
    <FlexContainer
      element="section"
      className={classnames('dnb-layout-stack', className)}
      direction={direction ?? 'vertical'}
      spacing={spacing ?? 'small'}
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
