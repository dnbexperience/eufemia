import { processChildren } from '../../shared/component-helper'

export const checkMinMaxWidth = (
  min: number | string,
  max: number | string
) => {
  // ensure the min/max don't conflict
  let maxWidth = max
  let minWidth = min
  if (min && !max && parseFloat(String(min)) > 0) {
    maxWidth = 0
  } else if (max && !min && parseFloat(String(max)) > 0) {
    minWidth = 0
  }
  return { minWidth, maxWidth }
}

export const getContent = (props) => {
  if (typeof props.modalContent === 'string') {
    return props.modalContent
  } else if (typeof props.modalContent === 'function') {
    return props.modalContent(props)
  }
  return processChildren(props)
}
