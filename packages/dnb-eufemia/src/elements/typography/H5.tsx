/**
/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'

const H5 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H
      as="h5"
      size={size || (theme?.name === 'sbanken' ? 'basis' : 'small')}
      {...props}
    />
  )
}

export default H5
