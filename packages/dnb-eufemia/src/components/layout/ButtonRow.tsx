import React from 'react'
import classnames from 'classnames'
import { Div } from '../../elements'
import type { ComponentProps } from '../../extensions/forms/component-types'

export type ButtonRowProps = ComponentProps & {
  children?: React.ReactNode
}

function ButtonRow({ className, children, ...rest }: ButtonRowProps) {
  return (
    <Div
      className={classnames('dnb-layout__button-row', className)}
      {...rest}
    >
      {children}
    </Div>
  )
}

ButtonRow._supportsEufemiaSpacingProps = true
export default ButtonRow
