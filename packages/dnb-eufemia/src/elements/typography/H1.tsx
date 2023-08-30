/**
 * HTML Element
 *
 */
import React from 'react'
import type { SharedHProps } from './H'
import H from './H'
import { useTheme } from '../../shared'
import { getHeadingSize } from '../../components/heading/HeadingHelpers'

const H1 = ({ size, ...props }: SharedHProps) => {
  const theme = useTheme()

  return (
    <H as="h1" size={size || getHeadingSize(theme?.name)[1]} {...props} />
  )
}

export default H1
