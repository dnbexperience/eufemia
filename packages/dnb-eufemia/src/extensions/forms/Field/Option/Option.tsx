import type React from 'react'
import type { FieldProps } from '../../types'

export type Props = FieldProps<number | string> & {
  /** Title for the option. Overrides `children`. */
  title?: React.ReactNode
  /** Secondary text. */
  text?: React.ReactNode
  /** What group index in the `groups` prop this item belongs to. */
  groupIndex?: number
  /** Optional way to provide `title`. Will be ignored if `title` is used. */
  children?: React.ReactNode
  style?: React.CSSProperties
}

export default function Option(_props: Props) {
  return null
}
