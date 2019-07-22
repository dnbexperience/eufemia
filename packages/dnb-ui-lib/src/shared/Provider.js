/**
 * Lib Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import { prepareFormRowContext } from '../components/form-row/FormRow'

const Provider = ({ children, ...context }) => {
  if (context.formRow) {
    context.formRow = prepareFormRowContext(context.formRow)
  }
  return <Context.Provider value={context}>{children}</Context.Provider>
}
Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export default Provider
