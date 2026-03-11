import React from 'react'
import FieldBlock, { Props as FieldBlockProps } from '../../FieldBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

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

export default withComponentMarkers(CompositionField, {
  _supportsSpacingProps: true,
})
