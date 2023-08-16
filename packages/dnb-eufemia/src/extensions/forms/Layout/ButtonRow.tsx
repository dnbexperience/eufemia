import React from 'react'
import classnames from 'classnames'
import { Div } from '../../../elements'
import { forwardSpaceProps } from '../utils'
import type { ComponentProps } from '../component-types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

export default function ButtonRow(props: Props) {
  const { className, children } = props
  return (
    <Div
      className={classnames('dnb-forms-button-row', className)}
      {...forwardSpaceProps(props)}
    >
      {children}
    </Div>
  )
}
