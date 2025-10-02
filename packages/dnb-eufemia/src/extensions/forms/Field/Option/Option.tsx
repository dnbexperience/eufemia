import React from 'react'
import type { FieldProps } from '../../types'

export type Props = FieldProps<number | string> & {
  title?: React.ReactNode
  text?: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function Option(_props: Props) {
  return null
}
