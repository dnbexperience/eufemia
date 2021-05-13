/**
 * Web ProgressIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import ProgressIndicatorCircular from './ProgressIndicatorCircular'
import ProgressIndicatorLinear from './ProgressIndicatorLinear'

export default class ProgressIndicator extends React.PureComponent {
  static tagName = 'dnb-progress-indicator'
  static contextType = Context

  static propTypes = {
    visible: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    type: PropTypes.oneOf(['circular', 'linear']),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    size: PropTypes.oneOf(['default', 'small', 'medium', 'large', 'huge']),
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    label_direction: PropTypes.string,
    show_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    indicator_label: PropTypes.string,
    section_style: PropTypes.string,
    section_spacing: PropTypes.string,

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    on_complete: PropTypes.func,
  }

  static defaultProps = {
    visible: true,
    type: 'circular',
    no_animation: false,
    size: 'default',
    progress: null,
    label: null,
    label_direction: 'horizontal',
    show_label: false,
    indicator_label: null,
    section_style: null,
    section_spacing: null,

    class: null,
    className: null,
    children: null,

    on_complete: null,
  }

  static enableWebComponent() {
    registerElement(
      ProgressIndicator.tagName,
      ProgressIndicator,
      ProgressIndicator.defaultProps
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.visible = isTrue(props.visible)
      if (state.visible) {
        state.complete = false
      }
      if (parseFloat(props.progress) > -1) {
        state.progress = props.progress
      }
    }
    state._listenForPropChanges = true
    return state
  }

  state = {
    _listenForPropChanges: true,
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout)
    clearTimeout(this.fadeOutTimeout)
  }

  callOnCompleteHandler = () => {
    this.completeTimeout = setTimeout(() => {
      this.setState({
        complete: true,
      })
      if (typeof this.props.on_complete === 'function') {
        this.fadeOutTimeout = setTimeout(() => {
          dispatchCustomElementEvent(this, 'on_complete')
        }, 600) // wait for CSS fade out, defined in "progress-indicator-fade-out"
      }
    }, 200)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      ProgressIndicator.defaultProps,
      this.context.getTranslation(this.props).ProgressIndicator,
      this.context.FormRow,
      this.context.ProgressIndicator
    )

    const {
      type,
      size,
      no_animation,
      on_complete,
      label,
      indicator_label,
      label_direction,
      show_label,
      className,
      class: _className,
      children,
      progress: _progress, //eslint-disable-line
      visible: _visible, //eslint-disable-line
      complete: _complete, //eslint-disable-line
      ...attributes
    } = props

    const { progress, visible, complete } = this.state

    const params = { ...attributes }

    const indicatorLabel =
      label || children || (isTrue(show_label) && indicator_label)

    validateDOMAttributes(this.props, params)

    return (
      <div
        className={classnames(
          'dnb-progress-indicator',
          visible && 'dnb-progress-indicator--visible',
          complete && 'dnb-progress-indicator--complete',
          type === 'linear' && 'dnb-progress-indicator--full-width',
          label_direction && `dnb-progress-indicator--${label_direction}`,
          isTrue(no_animation) && 'dnb-progress-indicator--no-animation',
          createSpacingClasses(props),
          className,
          _className
        )}
        {...params}
      >
        {type === 'circular' && (
          <ProgressIndicatorCircular
            size={size}
            progress={progress}
            visible={visible}
            complete={complete}
            onComplete={on_complete}
            callOnCompleteHandler={this.callOnCompleteHandler}
          />
        )}
        {type === 'linear' && (
          <ProgressIndicatorLinear
            size={size}
            progress={progress}
            visible={visible}
            complete={complete}
            onComplete={on_complete}
            callOnCompleteHandler={this.callOnCompleteHandler}
          />
        )}
        {indicatorLabel && (
          <div className="dnb-progress-indicator__label">
            <p className="dnb-p">{indicatorLabel}</p>
          </div>
        )}
      </div>
    )
  }
}
