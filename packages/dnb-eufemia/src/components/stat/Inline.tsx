import React from 'react'
import classnames from 'classnames'
import Flex from '../flex/Flex'
import type { Props as FlexHorizontalProps } from '../flex/Horizontal'

export type InlineProps = FlexHorizontalProps

const Inline = React.forwardRef<HTMLElement, InlineProps>(
  (
    {
      children,
      className = null,
      gap = 'x-small',
      align = 'center',
      ...rest
    },
    ref
  ) => {
    return (
      <Flex.Horizontal
        {...rest}
        innerRef={ref as React.RefObject<HTMLElement>}
        gap={gap}
        align={align}
        className={classnames('dnb-stat', 'dnb-stat__inline', className)}
      >
        {children}
      </Flex.Horizontal>
    )
  }
)

// @ts-expect-error - Adding custom property to component for spacing detection
Inline._supportsSpacingProps = true

export default Inline
