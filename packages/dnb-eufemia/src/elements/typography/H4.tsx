/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'

const H4 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H
      as="h4"
      size={size || (theme?.name === 'sbanken' ? 'medium' : 'basis')}
      {...props}
    />
  )
}

export default H4
