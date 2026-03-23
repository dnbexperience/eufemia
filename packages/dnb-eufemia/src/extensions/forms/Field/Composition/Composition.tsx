import React from 'react'
import type { FieldBlockProps } from '../../FieldBlock'
import FieldBlock from '../../FieldBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type FieldCompositionProps = Pick<
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

function CompositionField(props: FieldCompositionProps) {
  const params: FieldCompositionProps = {}

  if (props?.width) {
    params.width = 'stretch'
    params.contentWidth = props.width
  }

  return <FieldBlock {...props} {...params} composition asFieldset />
}

withComponentMarkers(CompositionField, {
  _supportsSpacingProps: true,
})

export default CompositionField
