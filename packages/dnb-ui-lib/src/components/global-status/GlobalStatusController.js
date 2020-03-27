/**
 * Web GlobalStatus Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import GlobalStatusProvider from './GlobalStatusProvider'
import { isTrue } from '../../shared/component-helper'

// This is the Update controller
class GlobalStatusController extends PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string, // Status Item id
    remove_on_unmount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  }
  static defaultProps = {
    id: 'main',
    status_id: null,
    remove_on_unmount: false
  }

  constructor(props) {
    super(props)

    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }

    this.provider = GSP.init(props.id, (provider) => {
      const { status_id } = provider.add(props)

      // current status id
      this.internal_status_id = props.status_id || status_id
    })

    return this
  }

  remove(props) {
    this.provider.remove(this.internal_status_id, props)
  }

  componentWillUnmount() {
    if (this.provider && isTrue(this.props.remove_on_unmount)) {
      this.provider.remove(this.internal_status_id)
      // this.provider.unbind() // For now, do not unbind, because of rerender issues
      // this.provider = null
    }
  }

  render() {
    return <></>
  }
}

class GlobalStatusRemove extends PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string, // Status Item id
    buffer_delay: PropTypes.number // Used for testing
  }
  static defaultProps = {
    id: 'main',
    status_id: null,
    buffer_delay: null
  }

  constructor(props) {
    super(props)

    let GSP = null
    try {
      GSP = GlobalStatusProvider
    } catch (e) {
      // do noting
    }
    if (!GSP && typeof window !== 'undefined') {
      GSP = window.GlobalStatusProvider
    }
    this.provider = GSP.init(props.id, (provider) => {
      if (props.status_id) {
        provider.remove(props.status_id, {
          buffer_delay: props.buffer_delay
        })
      }
    })
  }

  render() {
    return <></>
  }
}

export default GlobalStatusController
export { GlobalStatusRemove }

GlobalStatusController.Remove = GlobalStatusRemove
