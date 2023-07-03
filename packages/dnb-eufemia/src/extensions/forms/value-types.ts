import { SpacingProps } from '../../components/space/types'

export type ValueProps<Value> = SpacingProps & {
  label?: string
  /** Should the component render if the value is empty? */
  showEmpty?: boolean
  /** Text showing in place of the value if no value is given. When placeholder is given, it acts as  */
  placeholder?: string
  /** JSON Pointer for where the data for this input is located in the source dataset */
  path?: string
  value?: Value
  /** For showing the value inline (not as a block element) */
  inline?: boolean
}
