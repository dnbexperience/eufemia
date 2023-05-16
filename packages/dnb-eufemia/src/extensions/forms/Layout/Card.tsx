import React from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
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

export default function Card(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    stack,
    direction,
    spacing,
    children,
  } = props

  if (stack) {
    return (
      <FlexContainer
        className={classnames('dnb-forms-card', className)}
        data-testid={dataTestId ?? 'layout-card'}
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
        data-testid={dataTestId ?? 'layout-card'}
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
      data-testid={dataTestId ?? 'layout-card'}
    >
      {children}
    </FlexItem>
  )
}
