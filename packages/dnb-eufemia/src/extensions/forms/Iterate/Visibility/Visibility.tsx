import React from 'react'
import type { Props } from '../../Form/Visibility/Visibility'
import Visibility from '../../Form/Visibility/Visibility'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
export * from '../../Form/Visibility/Visibility'

export default function IterateVisibility(props: Props) {
  return <Visibility withinIterate {...props} />
}

withComponentMarkers(IterateVisibility, {
  _supportsSpacingProps: 'children',
})
