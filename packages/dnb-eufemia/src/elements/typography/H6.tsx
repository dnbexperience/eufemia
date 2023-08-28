/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'

const H6 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H
      as="h6"
      size={size || (theme?.name === 'sbanken' ? 'small' : 'x-small')}
      {...props}
    />
  )
}

export default H6
