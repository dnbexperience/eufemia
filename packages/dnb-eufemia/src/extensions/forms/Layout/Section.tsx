import React from 'react'
import classnames from 'classnames'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../types'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = ComponentProps & {
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

function Section(props: Props) {
  const { className, direction, spacing, children } = props
  return (
    <FlexContainer
      className={classnames('dnb-forms-section', className)}
      direction={direction ?? 'column'}
      spacing={spacing ?? 'small'}
      {...forwardSpaceProps(props)}
    >
      {children}
    </FlexContainer>
  )
}

Section._supportsEufemiaSpacingProps = true
export default Section
