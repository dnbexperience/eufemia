import React from 'react'
import ValueBlock, { Props as ValueProps } from '../../ValueBlock'

function CompositionValue(props: ValueProps) {
  return <ValueBlock composition {...props} />
}

CompositionValue._supportsSpacingProps = true
export default CompositionValue
