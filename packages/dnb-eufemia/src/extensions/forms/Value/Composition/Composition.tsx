import React from 'react'
import type { Props as ValueProps } from '../../ValueBlock'
import ValueBlock from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = Omit<ValueProps, 'layout'>

function CompositionValue(props: Props) {
  return <ValueBlock composition {...props} />
}

withComponentMarkers(CompositionValue, {
  _supportsSpacingProps: true,
})

export default CompositionValue
