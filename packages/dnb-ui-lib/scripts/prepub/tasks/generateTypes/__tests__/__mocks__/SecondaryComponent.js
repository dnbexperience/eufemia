/**
 * Test mock file
 *
 */

import PropTypes from 'prop-types'

export const secondaryPropTypes = {
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export const secondaryDefaultProps = {
  secondary: null
}

const Element = () => {
  return null
}
Element.propTypes = {
  ...secondaryPropTypes,
  children: PropTypes.node,
  secondProperty: PropTypes.string
}
Element.defaultProps = {
  children: null,
  secondProperty: null
}

export default Element
