import type { ValueBlockProps as ValueProps } from '../../ValueBlock'
import ValueBlock from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueCompositionProps = Omit<
  ValueProps,
  'layout' | 'maxWidth' | 'gap'
> & {
  /**
   * Use `small`, `medium` or `large` for predefined standard max widths. Defaults to `auto`.
   */
  maxWidth?: ValueProps['maxWidth']
  /**
   * The gap between the different value blocks. Can be `xx-small`, `x-small`, `small`, `medium`, `large` or `false`. Defaults to `xx-small`.
   */
  gap?: ValueProps['gap']
}

function CompositionValue(props: ValueCompositionProps) {
  return <ValueBlock composition {...props} />
}

withComponentMarkers(CompositionValue, {
  _supportsSpacingProps: true,
})

export default CompositionValue
