import React from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'

function CompositionField(
  props: Pick<
    FieldBlockProps,
    | 'label'
    | 'labelDescription'
    | 'labelDescriptionInline'
    | 'labelSrOnly'
    | 'width'
    | 'align'
    | 'contentWidth'
    | 'disabled'
    | 'error'
    | 'warning'
    | 'info'
    | 'children'
    | 'className'
    | 'help'
  >
) {
  return <FieldBlock {...props} composition asFieldset />
}

CompositionField._supportsSpacingProps = true
export default CompositionField
