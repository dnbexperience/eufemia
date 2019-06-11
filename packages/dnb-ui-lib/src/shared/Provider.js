/**
 * Lib Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'

const Provider = ({ children, ...rest }) => {
  return <Context.Provider {...rest}>{children}</Context.Provider>
}
Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export default Provider
