/**
 * Web FormLabel Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  isTrue,
  registerElement,
  validateDOMAttributes,
  skeletonElement,
  processChildren
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Context from '../../shared/Context'

const renderProps = {
  render_content: null
}

const propTypes = {
  for_id: PropTypes.string,
  element: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  id: PropTypes.string,
  class: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label_direction: PropTypes.oneOf(['vertical', 'horizontal']),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  render_content: PropTypes.func
}

const defaultProps = {
  for_id: null,
  element: 'label',
  title: null,
  text: null,
  id: null,
  class: null,
  disabled: null,
  skeleton: null,
  label_direction: null,
  direction: null,
  vertical: null,
  sr_only: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormLabel extends React.PureComponent {
  static tagName = 'dnb-form-label'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(FormLabel.tagName, FormLabel, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.formRow
    )

    const {
      for_id,
      element,
      title,
      className,
      id,
      disabled,
      skeleton,
      label_direction,
      direction, // eslint-disable-line
      vertical,
      sr_only,
      class: _className,

      text: _text, // eslint-disable-line

      ...attributes
    } = props

    const content = FormLabel.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-form-label',
        (isTrue(vertical) || label_direction === 'vertical') &&
          `dnb-form-label--vertical`,
        skeleton && 'dnb-skeleton',
        // "direction" is not in use
        // direction && `dnb-form-label--${direction}`,
        // we set and use "label_direction" above
        // label_direction && `dnb-form-label--${label_direction}-label`,
        isTrue(sr_only) && 'dnb-form-label--sr-only',
        createSpacingClasses(props),
        className,
        _className
      ),
      htmlFor: for_id,
      id,
      title,
      disabled: isTrue(disabled),
      ...attributes
    }

    if (disabled) {
      params.disabled = true
    }
    if (isTrue(skeleton)) {
      skeletonElement(params, this.context)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    if (isTrue(sr_only)) {
      return (
        <Element is={element} {...params}>
          {content}
        </Element>
      )
    }

    return (
      <Element is={element} {...params}>
        {content}
      </Element>
    )
  }
}

const Element = ({ is: Element, children, ...rest }) => (
  <Element {...rest}>{children}</Element>
)
Element.propTypes = {
  is: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
