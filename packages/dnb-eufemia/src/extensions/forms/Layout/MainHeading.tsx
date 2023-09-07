import React from 'react'
import classnames from 'classnames'
import { Heading } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'
import type { HeadingLevel } from '../../../components/Heading'

export type Props = ComponentProps & {
  level?: HeadingLevel
  children?: React.ReactNode
}

function MainHeading({ level, ...props }: Props) {
  const { className, children } = props
  return (
    <Heading
      className={classnames('dnb-forms-main-heading', className)}
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
