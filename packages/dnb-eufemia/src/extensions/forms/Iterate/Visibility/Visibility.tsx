import React from 'react'
import type { Props } from '../../Form/Visibility/Visibility'
import Visibility from '../../Form/Visibility/Visibility'
export * from '../../Form/Visibility/Visibility'

export default function IterateVisibility(props: Props) {
  return <Visibility withinIterate {...props} />
}

IterateVisibility._supportsSpacingProps = 'children'
