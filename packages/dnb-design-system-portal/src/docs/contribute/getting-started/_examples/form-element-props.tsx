import React from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { extendPropsWithContext } from '@dnb/eufemia/src/shared/component-helper'
import { pickFormElementProps } from '@dnb/eufemia/src/shared/helpers/filterValidProps'

import type { SpacingProps } from '@dnb/eufemia/src/shared/types'
import type { SkeletonShow } from '@dnb/eufemia/src/components/skeleton/Skeleton'

export type FormComponentProps = {
  myParam?: string
  skeleton?: SkeletonShow
} & SpacingProps

const defaultProps = {
  myParam: 'value',
}

function FormComponent(props: FormComponentProps) {
  const context = React.useContext(Context)

  const { myParam, skeleton, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    pickFormElementProps(context?.formElement),
    (context as Record<string, unknown>).FormComponent as Record<
      string,
      unknown
    >
  )

  // Use myParam and spread the ...rest
}

export default FormComponent
