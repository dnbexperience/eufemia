import { isTrue } from '../../shared/component-helper'
import { filterValidProps } from '../../shared/helpers/filterValidProps'

type FormRowProps = {
  label_direction?: 'vertical' | 'horizontal'
  vertical?: string | boolean
}

export const prepareFormRowContext = (props: FormRowProps) => {
  if (typeof props.label_direction === 'undefined') {
    props.label_direction = isTrue(props.vertical)
      ? 'vertical'
      : props.label_direction
  }
  return props
}

const validFormRowProps = {
  skeleton: null,
  disabled: null,
  vertical: null,
  label_direction: null,
}

export const includeValidProps = (
  props: FormRowProps,
  excludeProps: Record<string, unknown>
) => {
  return filterValidProps(props, validFormRowProps, excludeProps)
}
