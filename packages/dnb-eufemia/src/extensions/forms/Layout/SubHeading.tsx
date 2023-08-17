import React from 'react'
import classnames from 'classnames'
import { Heading } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

function SubHeading(props: Props) {
  const { className, children } = props
  return (
    <Heading
      className={classnames('dnb-forms-sub-heading', className)}
      level="3"
      {...forwardSpaceProps(props)}
    >
      {children}
    </Heading>
  )
}

SubHeading._supportsEufemiaSpacingProps = true
export default SubHeading
