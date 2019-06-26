/**
 * Lib Provider
 *
 */

export const translateSpacing = size => {
  switch (size) {
    case 'xs':
    case 'x-small':
      return 0.5
    case 's':
    case 'small':
      return 1
    case 'm':
    case 'medium':
      return 1.5
    case 'l':
    case 'large':
      return 2
    case 'xl':
    case 'x-large':
      return 3
    case 'xxl':
    case 'xx-large':
      return 3.5
  }
  return 0
}

export const SpacingHelper = props => {
  if (props.top && !(parseFloat(props.top) > 0)) {
    props.top = translateSpacing(props.top)
  }
  if (props.bottom && !(parseFloat(props.bottom) > 0)) {
    props.bottom = translateSpacing(props.bottom)
  }
  return Object.entries({
    marginTop: props.top && `${props.top}rem`,
    marginBottom: props.bottom && `${props.bottom}rem`,
    maxWidth: props.maxWidth && `${props.maxWidth}rem`,
    maxHeight: props.maxHeight && `${props.maxHeight}rem`,
    width: props.width && `${props.width}rem`,
    height: props.height && `${props.height}rem`
  }).reduce((acc, [key, val]) => {
    if (typeof val !== 'undefined') {
      acc[key] = val
    }
    return acc
  }, {})
}
