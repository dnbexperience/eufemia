import React from 'react'
import PropTypes from 'prop-types' //
import { isTrue } from './component-helper'
import Context from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  onMediaQueryChange,
  isMatchMediaSupported,
} from './MediaQueryUtils'

export { onMediaQueryChange }

export default class MediaQuery extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    matchOnSSR: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    when: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object,
    ]),
    not: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    query: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.node,
  }

  static defaultProps = {
    matchOnSSR: null,
    when: null,
    not: null,
    query: null,
    children: null,
  }

  state = {
    match: null,
    mediaQueryList: null,
  }

  constructor(props, context) {
    super(props)

    if (!isMatchMediaSupported() && isTrue(props.matchOnSSR)) {
      this.state.match = true
    }

    if (isMatchMediaSupported()) {
      this.state.mediaQueryList = makeMediaQueryList(
        props,
        context.breakpoints
      )

      if (this.state.mediaQueryList?.matches) {
        this.state.match = true
      }
    }
  }

  componentDidMount() {
    if (isMatchMediaSupported()) {
      this.bindListener()
    }
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener()
      this.listener = null
    }
  }

  componentDidUpdate(props) {
    if (
      this.props.query !== props.query ||
      this.props.when !== props.when ||
      this.props.not !== props.not
    ) {
      const mediaQueryList = makeMediaQueryList(
        this.props,
        this.context.breakpoints
      )
      this.setState(
        {
          match: mediaQueryList?.matches,
          mediaQueryList,
        },
        this.bindListener
      )
    }
  }

  bindListener = () => {
    this.componentWillUnmount()
    if (this.state.mediaQueryList) {
      this.listener = createMediaQueryListener(
        this.state.mediaQueryList,
        (match) => {
          this.setState({ match })
        }
      )
    }
  }

  render() {
    const { children } = this.props
    return this.state.match ? children : null
  }
}
