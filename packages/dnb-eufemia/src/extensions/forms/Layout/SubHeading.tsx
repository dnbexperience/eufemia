import React from 'react'
import classnames from 'classnames'
import { Heading } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

export default function SubHeading(props: Props) {
  const { className, 'data-testid': dataTestId, children } = props
  return (
    <Heading
      className={classnames('dnb-forms-sub-heading', className)}
      data-testid={dataTestId ?? 'layout-sub-heading'}
      level="3"
      {...forwardSpaceProps(props)}
    >
      {children}
    </Heading>
  )
}
