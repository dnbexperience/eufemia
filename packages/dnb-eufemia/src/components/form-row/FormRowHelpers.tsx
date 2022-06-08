import { isTrue } from '../../shared/component-helper'

type FormRowProps = {
  label_direction?: string
  vertical?: string
}

export const prepareFormRowContext = (props: FormRowProps) => {
  if (typeof props.label_direction === 'undefined') {
    props.label_direction = isTrue(props.vertical)
      ? 'vertical'
      : props.label_direction
  }
  return props
}
