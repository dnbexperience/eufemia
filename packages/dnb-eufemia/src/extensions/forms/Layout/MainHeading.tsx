import React from 'react'
import classnames from 'classnames'
import { Heading } from '../../../components'
import { ComponentProps, pickSpacingProps } from '../types'
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
      {...pickSpacingProps(props)}
    >
      {children}
    </Heading>
  )
}

MainHeading._supportsEufemiaSpacingProps = true
export default MainHeading
