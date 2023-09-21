import React from 'react'
import classnames from 'classnames'
import Heading from '../heading/Heading'
import type { HeadingLevel } from '../heading/Heading'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'size'>

function MainHeading({ level, ...props }: Props) {
  const { className, children, ...rest } = props
  return (
    <Heading
      className={classnames('dnb-layout-main-heading', className)}
      level={level || 2}
      size="large"
      {...rest}
    >
      {children}
    </Heading>
  )
}

MainHeading._supportsEufemiaSpacingProps = true
export default MainHeading
