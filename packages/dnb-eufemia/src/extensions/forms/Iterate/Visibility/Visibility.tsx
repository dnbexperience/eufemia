import React from 'react'
import type { FormVisibilityProps } from '../../Form/Visibility/Visibility'
import Visibility from '../../Form/Visibility/Visibility'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'
export * from '../../Form/Visibility/Visibility'

export default function IterateVisibility(props: FormVisibilityProps) {
  return <Visibility withinIterate {...props} />
}

withComponentMarkers(IterateVisibility, {
  _supportsSpacingProps: 'children',
})
