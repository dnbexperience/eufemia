import React from 'react'
import classnames from 'classnames'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

function Section(props: Props) {
  const { className, direction, spacing, children, ...rest } = props
  return (
    <FlexContainer
      element="section"
      className={classnames('dnb-layout__section', className)}
      direction={direction ?? 'column'}
      spacing={spacing ?? 'small'}
      {...rest}
    >
      {children}
    </FlexContainer>
  )
}

Section._supportsEufemiaSpacingProps = true
export default Section
