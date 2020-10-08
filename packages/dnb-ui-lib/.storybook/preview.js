import React from 'react'
import { VisualGrid } from '../stories/helpers'

export const decorators = [
  (Story) => (
    <VisualGrid>
      <Story />
    </VisualGrid>
  )
]
