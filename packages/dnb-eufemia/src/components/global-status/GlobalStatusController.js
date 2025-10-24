/**
 * Web GlobalStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
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

// This is the Update controller
class GlobalStatusController extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string, // Provider id
    statusId: PropTypes.string, // Status Item id
    removeOnUnmount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }
  static defaultProps = {
    id: 'main',
    statusId: null,
    removeOnUnmount: false,
  }

  static getDerivedStateFromProps(props, state) {
    if (state._props !== props) {
      state.provider.update(state.statusId, props)
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
    const { statusId } = this.state.provider.add(this.props)

    // current status id
    this.setState({ statusId })
  }

  componentWillUnmount() {
    if (this.state.provider && isTrue(this.props.removeOnUnmount)) {
      this.state.provider.remove(this.state.statusId)
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
    statusId: PropTypes.string.isRequired, // Status Item id
  }
  static defaultProps = {
    id: 'main',
  }

  static getDerivedStateFromProps(props, state) {
    if (state._props !== props) {
      state.provider.update(props.statusId, props)
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
    this.state.provider.remove(this.props.statusId, this.props)
  }

  render() {
    return null
  }
}

GlobalStatusController.Remove = GlobalStatusRemove
GlobalStatusController.Update = GlobalStatusController

GlobalStatusController._supportsSpacingProps = true

export default GlobalStatusController
export { GlobalStatusRemove }
