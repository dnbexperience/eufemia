import React from 'react'
import classnames from 'classnames'
import Heading from '../../../components/heading/Heading'
import type { HeadingLevel } from '../../../components/heading/Heading'
import type { ComponentProps } from '../types'

export type Props = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'size'>

function SubHeading({ level, ...props }: Props) {
  const { className, children, ...rest } = props
  return (
    <Heading
      className={classnames('dnb-layout-sub-heading', className)}
      level={level || 3}
      size="medium"
      {...rest}
    >
      {children}
    </Heading>
  )
}

SubHeading._supportsEufemiaSpacingProps = true
SubHeading._isHeadingElement = true

export default SubHeading
