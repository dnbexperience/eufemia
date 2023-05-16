import React from 'react'
import classnames from 'classnames'
import { Heading } from '../../../components'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

export default function MainHeading(props: Props) {
  const { className, 'data-testid': dataTestId, children } = props
  return (
    <Heading
      className={classnames('dnb-forms-main-heading', className)}
      data-testid={dataTestId ?? 'layout-main-heading'}
      level="2"
      size="large"
      {...forwardSpaceProps(props)}
    >
      {children}
    </Heading>
  )
}
