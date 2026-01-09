import React from 'react'
import type { Props as FieldBlockProps } from '../../FieldBlock';
import FieldBlock from '../../FieldBlock'

export type Props = Pick<
  FieldBlockProps,
  | 'id'
  | 'label'
  | 'labelDescription'
  | 'labelDescriptionInline'
  | 'labelSrOnly'
  | 'labelSize'
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
