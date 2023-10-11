import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import type { Props as FlexContainerProps } from '../flex/Container'
import type { Props as FlexItemProps } from '../flex/Item'

export type Props = FlexContainerProps &
  FlexItemProps & {
    stack?: boolean
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

  if (stack || direction || spacing) {
    return (
      <Flex.Container
        className={classnames('dnb-card', className)}
        direction={direction ?? 'vertical'}
        divider={stack ? 'line' : 'space'}
        element="section"
        wrap={false}
        spacing={spacing ?? (stack ? 'medium' : 'small')}
        alignSelf={alignSelf}
        {...rest}
      >
        {children}
      </Flex.Container>
    )
  }

  return (
    <Flex.Item
      className={classnames('dnb-card', className)}
      alignSelf={alignSelf}
      element="section"
      {...rest}
    >
      {children}
    </Flex.Item>
  )
}

Card._supportsEufemiaSpacingProps = true
export default Card
