/**
 * Test mock file
 *
 */

import PropTypes from 'prop-types'

export const propTypes = {
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ])
}

export const defaultProps = {
  secondary: null
}

const Element = () => {
  return null
}
Element.propTypes = {
  ...propTypes,
  children: PropTypes.node
}
Element.defaultProps = {
  children: null
}

export default Element
