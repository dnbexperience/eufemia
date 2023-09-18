import React from 'react'
import classnames from 'classnames'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import FlexItem, { Props as FlexItemProps } from './FlexItem'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  stack?: boolean
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  alignSelf?: FlexItemProps['alignSelf']
  element?: FlexItemProps['element']
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
    ...rest
  } = props

  if (direction || spacing || stack) {
    return (
      <FlexContainer
        className={classnames('dnb-layout__card', className)}
        direction={direction ?? 'vertical'}
        divider={stack ? 'line' : 'space'}
        element="section"
        wrap={false}
        spacing={spacing ?? (stack ? 'medium' : 'small')}
        alignSelf={alignSelf}
        {...rest}
      >
        {children}
      </FlexContainer>
    )
  }

  return (
    <FlexItem
      className={classnames('dnb-layout__card', className)}
      alignSelf={alignSelf}
      element="section"
      {...rest}
    >
      {children}
    </FlexItem>
  )
}

Card._supportsEufemiaSpacingProps = true
export default Card
