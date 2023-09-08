import React from 'react'
import classnames from 'classnames'
import { Heading } from '../'
import { forwardSpaceProps } from '../../extensions/forms/utils'
import type { HeadingLevel } from '../Heading'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
}

function SubHeading({ level, ...props }: Props) {
  const { className, children } = props
  return (
    <Heading
      className={classnames('dnb-layout-sub-heading', className)}
      level={level || 3}
      size="medium"
      {...forwardSpaceProps(props)}
    >
      {children}
    </Heading>
  )
}

SubHeading._supportsEufemiaSpacingProps = true
export default SubHeading
