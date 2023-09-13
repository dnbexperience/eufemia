import React from 'react'
import classnames from 'classnames'
import { Heading } from '../../../components'
import { ComponentProps, pickSpacingProps } from '../types'
import type { HeadingLevel } from '../../../components/Heading'

export type Props = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
}

function SubHeading({ level, ...props }: Props) {
  const { className, children } = props
  return (
    <Heading
      className={classnames('dnb-forms-sub-heading', className)}
      level={level || 3}
      size="medium"
      {...pickSpacingProps(props)}
    >
      {children}
    </Heading>
  )
}

SubHeading._supportsEufemiaSpacingProps = true
export default SubHeading
