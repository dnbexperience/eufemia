import React from 'react'
import classnames from 'classnames'
import { ComponentProps, pickSpacingProps } from '../types'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import FlexItem, { Props as FlexItemProps } from './FlexItem'

export type Props = ComponentProps & {
  stack?: boolean
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  alignSelf?: FlexItemProps['alignSelf']
  children: React.ReactNode
}

function Card(props: Props) {
  const {
    className,
    stack,
    direction,
    spacing,
    alignSelf = 'stretch',
    children,
  } = props

  if (stack) {
    return (
      <FlexContainer
        className={classnames('dnb-forms-card', className)}
        direction="column"
        divider="line"
        spacing={spacing ?? 'medium'}
        alignSelf={alignSelf}
        {...pickSpacingProps(props)}
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
        alignSelf={alignSelf}
        {...pickSpacingProps(props)}
      >
        {children}
      </FlexContainer>
    )
  }

  return (
    <FlexItem
      className={classnames('dnb-forms-card', className)}
      alignSelf={alignSelf}
      {...pickSpacingProps(props)}
    >
      {children}
    </FlexItem>
  )
}

Card._supportsEufemiaSpacingProps = true
export default Card
