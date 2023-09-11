import React from 'react'
import classnames from 'classnames'
import Heading from '../heading/Heading'
import type { HeadingLevel } from '../heading/Heading'
import type { ComponentProps } from '../../extensions/forms/component-types'

export type Props = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'size'>

function SubHeading({ level, ...props }: Props) {
  const { className, children, ...rest } = props
  return (
    <Heading
      className={classnames('dnb-layout__sub-heading', className)}
      level={level || 3}
      size="medium"
      {...rest}
    >
      {children}
    </Heading>
  )
}

SubHeading._supportsEufemiaSpacingProps = true
export default SubHeading
