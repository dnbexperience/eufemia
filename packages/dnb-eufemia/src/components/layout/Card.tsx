import React from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../../extensions/forms/utils'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import FlexItem from './FlexItem'
import type { ComponentProps } from '../../extensions/forms/component-types'

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
        className={classnames('dnb-layout-card', className)}
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
        className={classnames('dnb-layout-card', className)}
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
      className={classnames('dnb-layout-card', className)}
      {...forwardSpaceProps(props)}
    >
      {children}
    </FlexItem>
  )
}

Card._supportsEufemiaSpacingProps = true
export default Card
