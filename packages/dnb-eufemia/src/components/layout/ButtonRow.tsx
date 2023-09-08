import React from 'react'
import classnames from 'classnames'
import { Div } from '../../elements'
import { forwardSpaceProps } from '../../extensions/forms/utils'
import type { ComponentProps } from '../../extensions/forms/types'

export type Props = ComponentProps & {
  children?: React.ReactNode
}

function ButtonRow(props: Props) {
  const { className, children } = props
  return (
    <Div
      className={classnames('dnb-layout__button-row', className)}
      {...forwardSpaceProps(props)}
    >
      {children}
    </Div>
  )
}

ButtonRow._supportsEufemiaSpacingProps = true
export default ButtonRow
