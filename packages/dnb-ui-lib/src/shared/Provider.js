/**
 * Lib Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import Context from './Context'
import { prepareFormRowContext } from '../components/form-row/FormRow'

const Provider = ({ children, ...context }) => {
  const [usedContext, setContext] = React.useState(context)
  if (context.formRow) {
    context.formRow = prepareFormRowContext(context.formRow)
  }
  context.update = props => setContext({ ...context, ...props })
  return (
    <Context.Provider value={usedContext}>{children}</Context.Provider>
  )
}
Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export default Provider
