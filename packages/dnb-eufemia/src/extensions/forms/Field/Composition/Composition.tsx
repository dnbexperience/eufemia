import React from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'

export type Props = Pick<
  FieldBlockProps,
  | 'id'
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
  | 'help'
  | 'className'
  | 'space'
>

function CompositionField(props: Props) {
  const params: Props = {}

  if (props?.width) {
    params.width = 'stretch'
    params.contentWidth = props.width
  }

  return <FieldBlock {...props} {...params} composition asFieldset />
}

CompositionField._supportsSpacingProps = true
export default CompositionField
