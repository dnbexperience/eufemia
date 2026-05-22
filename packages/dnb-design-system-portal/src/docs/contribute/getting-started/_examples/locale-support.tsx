import React from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { extendPropsWithContext } from '@dnb/eufemia/src/shared/component-helper'

import type { LocaleProps } from '@dnb/eufemia/src/shared/types'

export type ComponentProps = {
  myParam?: string
  myString?: string
}
export type ComponentAllProps = ComponentProps &
  LocaleProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { myString } = extendPropsWithContext(
    props,
    defaultProps,
    (context.getTranslation(props) as Record<string, unknown>)
      ?.MyComponent as Record<string, unknown> // details below 👇
    // ...
  )

  // Use myString ...
}

export default MyComponent
