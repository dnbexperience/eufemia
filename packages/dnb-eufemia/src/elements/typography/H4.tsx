/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'
import { getHeadingSize } from '../../components/heading/HeadingHelpers'

const H4 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H as="h4" size={size || getHeadingSize(theme?.name)[4]} {...props} />
  )
}

export default H4
