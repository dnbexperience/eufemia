import React from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { clsx } from 'clsx'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '@dnb/eufemia/src/shared/component-helper'
import { useSpacing } from '@dnb/eufemia/src/components/space/SpacingUtils'

import type { SpacingProps } from '@dnb/eufemia/src/shared/types'

export type ComponentProps = {
  myParam?: string
}
export type ComponentAllProps = ComponentProps &
  SpacingProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { myParam, className, ...rest } = extendPropsWithContext(
    props,
    defaultProps
    // ...
  )

  // This helper will remove e.g. all spacing properties so you get only valid HTML attributes
  validateDOMAttributes(props, rest)

  // This hook applies spacing classes and CSS custom properties to the root element props
  const rootParams = useSpacing(props, {
    ...rest,
    className: clsx('dnb-my-component', className),
  })

  // Spread the ...rootParams on your root element
}

export default MyComponent
