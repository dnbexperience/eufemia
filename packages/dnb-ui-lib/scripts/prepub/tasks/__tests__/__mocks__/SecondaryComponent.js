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
