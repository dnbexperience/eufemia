/**
 * Lib Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context, { defaultContext } from './Context'

// fill with data
import { prepareFormRowContext } from '../components/form-row/FormRow'

const Provider = ({ children, ...props }) => {
  // 1. Set defualt context to be overwirtter by the provider props
  const context = defaultContext(props)

  // 2. The reset will extend the Provider Context

  // chore preparation
  if (context.formRow) {
    context.formRow = prepareFormRowContext(context.formRow)
  }

  // general context update
  if (!context.update) {
    context.update = props => setContext({ ...context, ...props })
  }

  // make it posible to change the locale during runtime
  if (!context.setLocale) {
    context.setLocale = locale =>
      setContext({ ...context, translation: context.locales[locale] })
  }

  const [usedContext, setContext] = React.useState(context)

  return (
    <Context.Provider value={usedContext}>{children}</Context.Provider>
  )
}
Provider.propTypes = {
  children: PropTypes.node.isRequired
}

export default Provider
