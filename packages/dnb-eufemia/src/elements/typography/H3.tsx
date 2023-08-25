/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'

const H3 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H
      as="h3"
      size={size || (theme?.name === 'sbanken' ? 'large' : 'medium')}
      {...props}
    />
  )
}

export default H3
