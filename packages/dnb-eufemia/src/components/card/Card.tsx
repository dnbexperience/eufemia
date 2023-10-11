import React from 'react'
import classnames from 'classnames'
import FlexContainer, {
  Props as FlexContainerProps,
} from '../layout/FlexContainer'
import FlexItem, { Props as FlexItemProps } from '../layout/FlexItem'

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
      <FlexContainer
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
      </FlexContainer>
    )
  }

  return (
    <FlexItem
      className={classnames('dnb-card', className)}
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
