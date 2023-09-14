import React from 'react'
import classnames from 'classnames'
import Heading from '../heading/Heading'
import type { HeadingLevel } from '../heading/Heading'
import type { ComponentProps } from '../../extensions/forms/component-types'

export type MainHeadingProps = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'size'>

function MainHeading({
  level = 2,
  className,
  children,
  ...rest
}: MainHeadingProps) {
  return (
    <Heading
      className={classnames('dnb-layout__main-heading', className)}
      level={level}
      size="large"
      {...rest}
    >
      {children}
    </Heading>
  )
}

MainHeading._supportsEufemiaSpacingProps = true
export default MainHeading
