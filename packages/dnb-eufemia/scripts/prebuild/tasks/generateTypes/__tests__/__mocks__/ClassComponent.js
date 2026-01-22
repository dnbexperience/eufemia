/**
 * Test mock file
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

const ComponentName: React.FC<{
  children?: React.ReactNode
  classProperty?: string
}> = () => {
  return null
}

ComponentName.propTypes = {
  children: PropTypes.node,
  classProperty: PropTypes.string,
}

ComponentName.defaultProps = {
  children: null,
  classProperty: null,
}

export default ComponentName
