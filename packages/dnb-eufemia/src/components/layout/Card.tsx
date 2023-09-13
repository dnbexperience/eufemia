import React from 'react'
import classnames from 'classnames'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import FlexItem from './FlexItem'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  stack?: boolean
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

function Card(props: Props) {
  const { className, stack, direction, spacing, children, ...rest } = props

  if (stack) {
    return (
      <FlexContainer
        className={classnames('dnb-layout__card', className)}
        direction="column"
        divider="line"
        spacing={spacing ?? 'medium'}
        {...rest}
      >
        {children}
      </FlexContainer>
    )
  }

  if (direction || spacing) {
    return (
      <FlexContainer
        className={classnames('dnb-layout__card', className)}
        direction={direction ?? 'column'}
        divider="space"
        spacing={spacing ?? 'small'}
        {...rest}
      >
        {children}
      </FlexContainer>
    )
  }

  return (
    <FlexItem
      className={classnames('dnb-layout__card', className)}
      {...rest}
    >
      {children}
    </FlexItem>
  )
}

Card._supportsEufemiaSpacingProps = true
export default Card
