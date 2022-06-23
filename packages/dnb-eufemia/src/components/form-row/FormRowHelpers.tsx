import { isTrue } from '../../shared/component-helper'

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
