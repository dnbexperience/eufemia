import React from 'react'
import ValueBlock, { Props as ValueProps } from '../../ValueBlock'

export type Props = Omit<ValueProps, 'layout'>

function CompositionValue(props: Props) {
  return <ValueBlock composition {...props} />
}

CompositionValue._supportsSpacingProps = true
export default CompositionValue
