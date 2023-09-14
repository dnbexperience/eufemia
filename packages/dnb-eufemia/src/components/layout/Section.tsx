import React from 'react'
import classnames from 'classnames'
import FlexContainer, { FlexContainerProps } from './FlexContainer'
import type { ComponentProps } from '../../extensions/forms/component-types'

export type LayoutSectionProps = ComponentProps & {
  direction?: FlexContainerProps['direction']
  spacing?: FlexContainerProps['spacing']
  children: React.ReactNode
}

function Section({
  className,
  direction = 'column',
  spacing = 'small',
  children,
  ...rest
}: LayoutSectionProps) {
  return (
    <FlexContainer
      element="section"
      className={classnames('dnb-layout__section', className)}
      direction={direction}
      spacing={spacing}
      {...rest}
    >
      {children}
    </FlexContainer>
  )
}

Section._supportsEufemiaSpacingProps = true
export default Section
