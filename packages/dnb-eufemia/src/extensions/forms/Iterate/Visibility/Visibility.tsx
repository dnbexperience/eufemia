import React from 'react'
import Visibility, { Props } from '../../Form/Visibility/Visibility'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
import type { Props } from '../../Form/Visibility/Visibility'
import Visibility from '../../Form/Visibility/Visibility'
export * from '../../Form/Visibility/Visibility'

export default function IterateVisibility(props: Props) {
  return <Visibility withinIterate {...props} />
}

withComponentMarkers(IterateVisibility, {
  _supportsSpacingProps: 'children',
})
