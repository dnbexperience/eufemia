import React from 'react'
import Visibility, { Props } from '../../Form/Visibility/Visibility'
export * from '../../Form/Visibility/Visibility'

export default function IterateVisibility(props: Props) {
  return <Visibility withinIterate {...props} />
}

IterateVisibility._supportsSpacingProps = 'children'
