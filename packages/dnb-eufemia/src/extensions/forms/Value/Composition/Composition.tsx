import React from 'react'
import type { ValueBlockProps as ValueProps } from '../../ValueBlock'
import ValueBlock from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueCompositionProps = Omit<ValueProps, 'layout'>

function CompositionValue(props: ValueCompositionProps) {
  return <ValueBlock composition {...props} />
}

withComponentMarkers(CompositionValue, {
  _supportsSpacingProps: true,
})

export default CompositionValue
