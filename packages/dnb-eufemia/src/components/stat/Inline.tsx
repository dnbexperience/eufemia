import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import type { Props as FlexHorizontalProps } from '../flex/Horizontal'

export type InlineProps = FlexHorizontalProps

function Inline({
  children,
  className = null,
  gap = 'x-small',
  align = 'center',
  ...rest
}: InlineProps) {
  return (
    <Flex.Horizontal
      {...rest}
      gap={gap}
      align={align}
      className={classnames('dnb-stat', 'dnb-stat__inline', className)}
    >
      {children}
    </Flex.Horizontal>
  )
}

Inline._supportsSpacingProps = true

export default Inline
