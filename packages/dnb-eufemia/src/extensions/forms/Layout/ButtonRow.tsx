import React from 'react'
import classnames from 'classnames'
import { Div } from '../../../elements'
import { ComponentProps, pickSpacingProps } from '../types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

function ButtonRow(props: Props) {
  const { className, children } = props
  return (
    <Div
      className={classnames('dnb-forms-button-row', className)}
      {...pickSpacingProps(props)}
    >
      {children}
    </Div>
  )
}

ButtonRow._supportsEufemiaSpacingProps = true
export default ButtonRow
