import React from 'react'
import { isTrue } from './component-helper'
import Context, { ContextProps } from './Context'
import {
  makeMediaQueryList,
  createMediaQueryListener,
  onMediaQueryChange,
  isMatchMediaSupported,
} from './MediaQueryUtils'
import type {
  MediaQueryProps,
  MediaQueryState,
  MediaQueryListener,
} from './MediaQueryUtils'

export type { MediaQueryProps }

export { onMediaQueryChange }

export default class MediaQuery extends React.PureComponent<
  MediaQueryProps,
  MediaQueryState
> {
  static contextType = Context
  listener: MediaQueryListener
  context: ContextProps

  state = {
    match: null,
    mediaQueryList: null,
  }

  constructor(props: MediaQueryProps, context?: ContextProps) {
    super(props)

    if (!isMatchMediaSupported() && isTrue(props.matchOnSSR)) {
      this.state.match = true
    }

    if (isMatchMediaSupported()) {
      const { query, when, not } = props
      const { disabled, correctRange = true, log } = props
      this.state.mediaQueryList = makeMediaQueryList(
        { query, when, not },
        context?.breakpoints,
        { disabled, correctRange, log }
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
    return <>{this.state.match ? children : null}</>
  }
}
