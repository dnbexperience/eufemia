import React from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = ComponentProps & {
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

export default function Section(props: Props) {
  const {
    className,
    'data-testid': dataTestId,
    direction,
    spacing,
    children,
  } = props
  return (
    <FlexContainer
      className={classnames('dnb-forms-section', className)}
      data-testid={dataTestId ?? 'layout-section'}
      direction={direction ?? 'column'}
      spacing={spacing ?? 'small'}
      {...forwardSpaceProps(props)}
    >
      {children}
    </FlexContainer>
  )
}
