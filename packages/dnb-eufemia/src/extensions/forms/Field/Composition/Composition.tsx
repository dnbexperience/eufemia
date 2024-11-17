import React from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'

function CompositionField(
  props: Pick<
    FieldBlockProps,
    | 'label'
    | 'labelDescription'
    | 'labelSrOnly'
    | 'width'
    | 'align'
    | 'contentWidth'
    | 'disabled'
    | 'error'
    | 'warning'
    | 'info'
    | 'children'
  >
) {
  return <FieldBlock {...props} composition />
}

CompositionField._supportsSpacingProps = true
export default CompositionField
