import { SpacingProps } from '../../components/space/types'

export type ValueProps<Value> = SpacingProps & {
  label?: string
  /** Should the component render if the value is empty? */
  showEmpty?: boolean
  /** Text showing in place of the value if no value is given. */
  placeholder?: string
  /** JSON Pointer for where the data for this input is located in the source dataset */
  path?: string
  value?: Value
  /** For showing the value inline (not as a block element) */
  inline?: boolean
  // Derivatives
  /** Prepare value for display (regardless of source like props or data context) */
  prepare?: (external: Value | undefined) => string
}
