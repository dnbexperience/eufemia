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
import {
  spacingPropTypes,
  createSpacingClasses
} from '../../components/space/SpacingHelper'

class ScrollView extends React.PureComponent {
  static tagName = 'dnb-scroll-view'
  static contextType = Context

  static propTypes = {
    ...spacingPropTypes,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    innerRef: PropTypes.object,

    class: PropTypes.string
  }

  static defaultProps = {
    className: null,
    children: null,
    innerRef: null,

    class: null
  }

  static enableWebComponent() {
    registerElement(
      ScrollView.tagName,
      ScrollView,
      ScrollView.defaultProps
    )
  }

  static getContent(props) {
    if (props.text) return props.text
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
      ScrollView.defaultProps,
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
