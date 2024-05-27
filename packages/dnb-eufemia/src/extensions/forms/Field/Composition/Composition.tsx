import React from 'react'
import FieldBlock, { Props as FieldSectionProps } from '../../FieldBlock'

function CompositionField(props: FieldSectionProps) {
  return <FieldBlock {...props} composition />
}

CompositionField._supportsSpacingProps = true
export default CompositionField
