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

function MainHeading({ level, ...props }: Props) {
  const { className, children } = props
  return (
    <Heading
      className={classnames('dnb-layout__main-heading', className)}
      level={level || 2}
      size="large"
      {...forwardSpaceProps(props)}
    >
      {children}
    </Heading>
  )
}

MainHeading._supportsEufemiaSpacingProps = true
export default MainHeading
