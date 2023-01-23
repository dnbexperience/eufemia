/**
 * Web FormSet Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extend,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Context from '../../shared/Context'
import { formRowDefaultProps, formRowPropTypes } from '../form-row/FormRow'

export default class FormSet extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    element: PropTypes.string,
    no_form: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_submit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),

    ...formRowPropTypes,

    on_submit: PropTypes.func,

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,
  }

  static defaultProps = {
    element: 'form',
    no_form: false,
    disabled: null,
    skeleton: null,
    prevent_submit: false,

    on_submit: null,

    custom_element: null,
    custom_method: null,
  }

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
  }

  onSubmitHandler = (event) => {
    const { prevent_submit } = this.props
    if (isTrue(prevent_submit)) {
      event.preventDefault()
    }
    dispatchCustomElementEvent(this, 'on_submit', { event })
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      FormSet.defaultProps,
      this.context.FormSet
    )

    const {
      element,
      locale,
      no_form,
      prevent_submit, // eslint-disable-line
      id, // eslint-disable-line
      className,
      class: _className,

      ...rest
    } = props

    const allowedProps = Object.entries(rest).reduce((acc, [k, v]) => {
      if (
        typeof formRowDefaultProps[k] !== 'undefined' &&
        k !== 'id' &&
        k !== 'children' &&
        k !== 'label'
      ) {
        acc[k] = v
      }
      return acc
    }, {})
    const attributes = Object.entries(rest).reduce((acc, [k, v]) => {
      if (typeof allowedProps[k] === 'undefined' && k !== 'children') {
        acc[k] = v
      }
      return acc
    }, {})

    const params = {
      className: classnames(
        'dnb-form-set',
        createSpacingClasses(this.props),
        className,
        _className
      ),
      ...attributes,
    }

    if (!isTrue(no_form)) {
      params.onSubmit = this.onSubmitHandler
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const content = FormSet.getContent(this.props)

    const providerContext = extend(this.context, {
      locale: locale ? locale : this.context.locale,
      FormRow: allowedProps,
      // isInsideFormSet: true // We may considder to use this later to check if we are inside FormSet
    })

    const Element = isTrue(no_form) ? 'div' : element

    return (
      <Context.Provider value={providerContext}>
        <Element {...params}>{content}</Element>
      </Context.Provider>
    )
  }
}
