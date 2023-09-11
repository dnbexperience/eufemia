import React from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../types'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import FlexItem from './FlexItem'

export type Props = ComponentProps & {
  stack?: boolean
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

function Card(props: Props) {
  const { className, stack, direction, spacing, children } = props

  if (stack) {
    return (
      <FlexContainer
        className={classnames('dnb-forms-card', className)}
        direction="column"
        divider="line"
        spacing={spacing ?? 'medium'}
        {...forwardSpaceProps(props)}
      >
        {children}
      </FlexContainer>
    )
  }

  if (direction || spacing) {
    return (
      <FlexContainer
        className={classnames('dnb-forms-card', className)}
        direction={direction ?? 'column'}
        divider="space"
        spacing={spacing ?? 'small'}
        {...forwardSpaceProps(props)}
      >
        {children}
      </FlexContainer>
    )
  }

  return (
    <FlexItem
      className={classnames('dnb-forms-card', className)}
      {...forwardSpaceProps(props)}
    >
      {children}
    </FlexItem>
  )
}

Card._supportsEufemiaSpacingProps = true
export default Card
