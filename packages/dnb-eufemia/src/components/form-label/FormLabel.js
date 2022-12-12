/**
 * Web FormLabel Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContextInClassComponent,
  isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import { includeValidProps } from '../form-row/FormRowHelpers'
import Context from '../../shared/Context'

export default class FormLabel extends React.PureComponent {
  static tagName = 'dnb-form-label'
  static contextType = Context

  static propTypes = {
    for_id: PropTypes.string,
    element: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    id: PropTypes.string,
    class: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label_direction: PropTypes.oneOf(['vertical', 'horizontal']),
    vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    for_id: null,
    element: 'label',
    title: null,
    text: null,
    id: null,
    class: null,
    disabled: null,
    skeleton: null,
    label_direction: null,
    vertical: null,
    sr_only: null,

    className: null,
    children: null,
  }

  static enableWebComponent() {
    registerElement(FormLabel?.tagName, FormLabel, FormLabel.defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    return processChildren(props)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      FormLabel.defaultProps,
      { skeleton: this.context?.skeleton },
      includeValidProps(this.context.FormRow),
      this.context.FormLabel
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
        isTrue(sr_only) && 'dnb-sr-only',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      htmlFor: for_id,
      id,
      title,
      disabled: isTrue(disabled),
      ...attributes,
    }

    if (disabled) {
      params.disabled = true
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    params.children = content

    const Element = element

    // Use the font-swap feature dnb-skeleton--font
    // if (isTrue(skeleton)) {
    //   // skeletonDOMAttributes(attributes, skeleton, this.context)
    //   return <AutoSize __element={Element} ref={this._ref} {...params} />
    // }

    return <Element {...params} />
  }
}
