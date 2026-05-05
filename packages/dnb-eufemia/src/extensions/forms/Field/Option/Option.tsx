import type { CSSProperties, ReactNode } from 'react'
import type { FieldProps } from '../../types'

export type FieldOptionProps = FieldProps<number | string> & {
  /** Title for the option. Overrides `children`. */
  title?: ReactNode
  /** Secondary text. */
  text?: ReactNode
  /** What group index in the `groups` prop this item belongs to. */
  groupIndex?: number
  /** Optional way to provide `title`. Will be ignored if `title` is used. */
  children?: ReactNode
  style?: CSSProperties
}

export default function Option(_props: FieldOptionProps) {
  return null
}
