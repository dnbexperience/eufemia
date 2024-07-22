import React from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'

function CompositionField(props: FieldBlockProps) {
  return <FieldBlock {...props} composition />
}

CompositionField._supportsSpacingProps = true
export default CompositionField
