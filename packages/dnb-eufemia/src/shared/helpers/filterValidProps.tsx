import { isTrue } from '../component-helper'

/**
 * Filters out props from a given object/context
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object of component properties
 * @param validKeys object with keys that should get returned
 * @param excludeKeys object with keys that should be excluded
 * @returns filtered properties
 */
export function filterValidProps<Props>(
  props: Props,
  validKeys?: Record<string, unknown>,
  excludeKeys?: Record<string, unknown>
) {
  const res = {} as Props,
    o = Object.prototype.hasOwnProperty

  for (const key in props) {
    if (
      (!validKeys || (validKeys && o.call(validKeys, key))) &&
      (!excludeKeys || (excludeKeys && !o.call(excludeKeys, key)))
    ) {
      res[key] = props[key]
    }
  }

  return res
}

/**
 * Filters out props from a given object/context
 * It returns a new object, with keys defined in validKeys
 *
 * @param props object of form component properties
 * @param excludeProps object with keys that should be excluded
 * @returns filtered properties
 */
export function pickFormElementProps(
  props: FormElementProps,
  excludeProps?: Record<string, unknown>
) {
  return filterValidProps(props, validFormElementProps, excludeProps)
}
export function prepareFormElementContext<Props>(
  props: Props & FormElementProps
) {
  if (isTrue(props.vertical)) {
    if (typeof props.labelDirection === 'undefined') {
      props.labelDirection = 'vertical'
    }
    if (typeof props.label_direction === 'undefined') {
      props.label_direction = 'vertical'
    }
  }
  return props
}
export type FormElementProps = {
  vertical?: boolean
  labelDirection?: 'vertical' | 'horizontal'

  /** @deprecated use labelDirection instead */
  label_direction?: 'vertical' | 'horizontal'
}
const validFormElementProps = {
  skeleton: null,
  disabled: null,
  vertical: null,
  labelDirection: null,

  /** @deprecated use labelDirection instead */
  label_direction: null,
}
