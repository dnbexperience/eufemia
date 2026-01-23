/**
 * Web GlobalStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import GlobalStatusProvider from './GlobalStatusProvider'
import { isTrue } from '../../shared/component-helper'

export class GlobalStatusInterceptor {
  constructor(props) {
    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }

    this.provider = GSP.init(props.id || 'main', (provider) => {
      const { statusId } = provider.add(props)

      // current status id
      this.statusId = statusId
    })

    return this
  }
  add(props) {
    return this.provider.add({ statusId: this.statusId, ...props })
  }
  update(props) {
    return this.provider.update(this.statusId, props)
  }
  remove() {
    return this.provider.remove(this.statusId)
  }
}

const controllerPropTypes = {
  id: PropTypes.string, // Provider id
  statusId: PropTypes.string, // Status Item id
  removeOnUnmount: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}

const controllerDefaultProps = {
  id: 'main',
  statusId: null,
  removeOnUnmount: false,
}

// This is the Update controller
function GlobalStatusController(props) {
  const [statusId, setStatusId] = React.useState(null)
  const providerRef = React.useRef(null)
  const prevPropsRef = React.useRef(props)

  // Initialize provider
  React.useEffect(() => {
    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }

    const provider = GSP.init(props.id)
    providerRef.current = provider

    // Add status and get statusId
    const { statusId: newStatusId } = provider.add(props)
    setStatusId(newStatusId)

    return () => {
      if (provider && isTrue(props.removeOnUnmount)) {
        provider.remove(newStatusId)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // getDerivedStateFromProps equivalent - update provider when props change
  React.useEffect(() => {
    if (
      prevPropsRef.current !== props &&
      providerRef.current &&
      statusId
    ) {
      providerRef.current.update(statusId, props)
    }
    prevPropsRef.current = props
  }, [props, statusId])

  return null
}

GlobalStatusController.propTypes = controllerPropTypes
GlobalStatusController.defaultProps = controllerDefaultProps

function GlobalStatusRemove(props) {
  const providerRef = React.useRef(null)
  const prevPropsRef = React.useRef(props)

  // Initialize provider
  React.useEffect(() => {
    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }
    const provider = GSP.init(props.id)
    providerRef.current = provider

    // Remove status immediately
    provider.remove(props.statusId, props)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // getDerivedStateFromProps equivalent - update provider when props change
  React.useEffect(() => {
    if (prevPropsRef.current !== props && providerRef.current) {
      providerRef.current.update(props.statusId, props)
    }
    prevPropsRef.current = props
  }, [props])

  return null
}

GlobalStatusRemove.propTypes = {
  id: PropTypes.string, // Provider id
  statusId: PropTypes.string.isRequired, // Status Item id
}

GlobalStatusRemove.defaultProps = {
  id: 'main',
}

GlobalStatusController.Remove = GlobalStatusRemove
GlobalStatusController.Update = GlobalStatusController

GlobalStatusController._supportsSpacingProps = true

export default GlobalStatusController
export { GlobalStatusRemove }
