/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'

const H2 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H
      as="h2"
      size={size || (theme?.name === 'sbanken' ? 'x-large' : 'large')}
      {...props}
    />
  )
}
export default H2
