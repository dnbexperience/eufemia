import React from 'react'
import classnames from 'classnames'
import Heading from '../../../../components/heading/Heading'
import type { HeadingLevel } from '../../../../components/heading/Heading'
import type { ComponentProps } from '../../types'

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
MainHeading._isHeadingElement = true

export default MainHeading
