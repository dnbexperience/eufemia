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
      const { status_id } = provider.add(props)

      // current status id
      this.status_id = status_id
    })

    return this
  }
  add(props) {
    return this.provider.add({ status_id: this.status_id, ...props })
  }
  update(props) {
    return this.provider.update(this.status_id, props)
  }
  remove() {
    return this.provider.remove(this.status_id)
  }
}

// This is the Update controller
class GlobalStatusController extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string, // Status Item id
    remove_on_unmount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }
  static defaultProps = {
    id: 'main',
    status_id: null,
    remove_on_unmount: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (state._props !== props) {
      state.provider.update(state.status_id, props)
      state._props = props
    }

    return state
  }

  state = {}

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

    this.state.provider = GSP.init(props.id)
    this.state._props = props

    return this
  }

  componentDidMount() {
    const { status_id } = this.state.provider.add(this.props)

    // current status id
    this.setState({ status_id })
  }

  componentWillUnmount() {
    if (this.state.provider && isTrue(this.props.remove_on_unmount)) {
      this.state.provider.remove(this.state.status_id)
      /**
       * For now, do not unbind, because of re-render issues
       */
      // this.state.provider.unbind()
      // this.state.provider = null
    }
  }

  render() {
    return null
  }
}

class GlobalStatusRemove extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    status_id: PropTypes.string.isRequired, // Status Item id
  }
  static defaultProps = {
    id: 'main',
  }

  static getDerivedStateFromProps(props, state) {
    if (state._props !== props) {
      state.provider.update(props.status_id, props)
    }

    return state
  }

  state = {}

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
    this.state.provider = GSP.init(props.id)
    this.state._props = props
  }

  componentDidMount() {
    this.state.provider.remove(this.props.status_id, this.props)
  }

  render() {
    return null
  }
}

GlobalStatusController.Remove = GlobalStatusRemove
GlobalStatusController.Update = GlobalStatusController

export default GlobalStatusController
export { GlobalStatusRemove }
