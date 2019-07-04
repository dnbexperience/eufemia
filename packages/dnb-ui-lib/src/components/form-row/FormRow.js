/**
 * Web FormRow Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extend,
  extendPropsWithContext,
  isTrue,
  registerElement,
  validateDOMAttributes
  // processChildren
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import FormLabel from '../form-label/FormLabel'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  label_id: PropTypes.string,
  no_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  section_style: PropTypes.string,
  section_spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

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

export const defaultProps = {
  id: null,
  label: null,
  label_id: null,
  no_label: false,
  no_fieldset: null,
  size: null,
  direction: null,
  vertical: null,
  section_style: null,
  section_spacing: null,
  disabled: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormRow extends PureComponent {
  static tagName = 'dnb-form-row'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(FormRow.tagName, FormRow, defaultProps)
  }

  static getContent(props) {
    if (typeof props.render_content === 'function')
      props.render_content(props)

    let label = null
    let children =
      typeof props.children === 'function'
        ? props.children(props)
        : props.children

    if (Array.isArray(props.children)) {
      children = children.reduce((pV, cV) => {
        if (cV.type.name === 'FormLabel') {
          label = cV.props.children
        } else {
          pV.push(cV)
        }
        return pV
      }, [])
    }

    return { label, children }
  }

  constructor(props, context) {
    super(props)
    this.isInsideFormSet =
      context.formRow && context.formRow.isInsideFormSet
    this._id =
      props.id || `dnb-form-row-${Math.round(Math.random() * 999)}` // cause we need an id anyway
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    let {
      label,
      label_id,
      no_fieldset,
      no_label,
      size,
      direction,
      vertical,
      section_style,
      section_spacing,
      disabled,
      id: _id, // eslint-disable-line
      className,
      class: _className,

      ...attributes
    } = props

    const isNested =
      this.context.formRow && this.context.formRow.itsMeAgain

    // in case we have a label already, we split this out and use this one instead
    const { label: nestedLabel, children } = FormRow.getContent(this.props)
    if (!label && nestedLabel) {
      label = nestedLabel
    }

    const id = this._id
    const params = {
      className: classnames(
        'dnb-form-row',
        (isTrue(vertical) || direction) &&
          `dnb-form-row--${isTrue(vertical) ? 'vertical' : direction}`,
        size && `dnb-form-row__size--${isTrue(size) ? 'default' : size}`,
        isNested && `dnb-form-row--nested`,
        section_style ? `dnb-section dnb-section--${section_style}` : null,
        section_spacing
          ? `dnb-section--spacing-${
              isTrue(section_spacing) ? 'default' : section_spacing
            }`
          : null,
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const context = extend(this.context, {
      formRow: {
        useId: () => {
          if (this.isIsUsed) {
            // make a new ID, as we used one
            return `dnb-form-row-${Math.round(Math.random() * 999)}` // cause we need an id anyway
          }
          this.isIsUsed = true
          return id
        },
        itsMeAgain: true,
        hasLabel: label,
        size,
        direction,
        vertical,
        label_direction: isTrue(vertical) ? 'vertical' : direction,
        disabled
      }
    })

    const useFieldset = !isTrue(no_fieldset)

    const Fieldset = ({ children }) => {
      // if (this.isInsideFormSet) {
      if (label && useFieldset) {
        return (
          <fieldset className="dnb-form-row__wrapper">{children}</fieldset>
        )
      }
      return children
    }

    return (
      <Context.Provider value={context}>
        <Fieldset>
          <div {...params}>
            {label && (
              <FormLabel
                className="dnb-form-row__label"
                id={(label_id ? label_id : id) + '-label'}
                for_id={!useFieldset ? id : null} // we don't use for_id, because we don't have a single element to target to
                text={label}
                element={!useFieldset ? 'label' : 'legend'}
                disabled={isTrue(disabled)}
              />
            )}
            {isTrue(no_label) && (
              <span
                className="dnb-form-label dnb-form-row__label-dummy"
                aria-hidden
              />
            )}
            {isNested ? (
              children
            ) : (
              <div className="dnb-form-row__content">{children}</div>
            )}
          </div>
        </Fieldset>
      </Context.Provider>
    )
  }
}
