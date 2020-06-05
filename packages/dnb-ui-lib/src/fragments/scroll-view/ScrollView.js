/**
 * Web ScrollView Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses } from '../../components/space/SpacingHelper'

const renderProps = {
  render_content: null
}

const propTypes = {
  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]),

  // Web Component props
  class: PropTypes.string,
  render_content: PropTypes.func
}

const defaultProps = {
  // React props
  className: null,
  children: null,
  innerRef: null,

  // Web Component props
  class: null,
  ...renderProps
}

class ScrollView extends React.PureComponent {
  static tagName = 'dnb-scroll-view'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(ScrollView.tagName, ScrollView, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this.ref = props.innerRef || React.createRef()
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow
    )

    const {
      className,
      class: _className,
      innerRef, // eslint-disable-line
      ...attributes
    } = props

    const contentToRender = ScrollView.getContent(props)

    const mainParams = {
      className: classnames(
        'dnb-scroll-view',
        createSpacingClasses(props),
        _className,
        className
      ),
      ...attributes
    }

    validateDOMAttributes(this.props, mainParams)

    return (
      <div {...mainParams} ref={this.ref}>
        {contentToRender}
      </div>
    )
  }
}

export default React.forwardRef(function ScrollViewRef(props, ref) {
  return <ScrollView innerRef={ref} {...props} />
})
