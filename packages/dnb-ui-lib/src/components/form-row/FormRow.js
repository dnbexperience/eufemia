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
  makeUniqueId,
  registerElement,
  validateDOMAttributes
  // processChildren
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import FormLabel from '../form-label/FormLabel'
import { createSpacingClasses } from '../space/SpacingHelper'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['vertical', 'horizontal']),
  label_id: PropTypes.string,
  label_class: PropTypes.string,
  no_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  indent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  indent_offset: PropTypes.string,
  section_style: PropTypes.string,
  section_spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  global_status_id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  /** React props */
  skipContentWrapperIfNested: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  render_content: PropTypes.func
}

const defaultProps = {
  id: null,
  label: null,
  label_direction: null,
  label_id: null,
  label_class: null,
  no_label: false,
  no_fieldset: null,
  indent: null,
  wrap: null,
  direction: null,
  vertical: null,
  indent_offset: null,
  section_style: null,
  section_spacing: null,
  global_status_id: null,
  disabled: null,
  class: null,

  /** React props */
  skipContentWrapperIfNested: false,
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
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
    this._id = props.id || makeUniqueId() // cause we need an id anyway
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    let {
      label,
      label_direction,
      label_id,
      label_class,
      no_fieldset,
      no_label,
      indent,
      direction,
      vertical,
      indent_offset,
      section_style,
      section_spacing,
      global_status_id,
      disabled,
      wrap,
      id: _id, // eslint-disable-line
      className,
      class: _className,
      skipContentWrapperIfNested,

      ...attributes
    } = props

    const isNested =
      this.context.formRow && this.context.formRow.itsMeAgain

    // in case we have a label already, we split this out and use this one instead
    const { label: nestedLabel, children } = FormRow.getContent(this.props)
    if (!label && nestedLabel) {
      label = nestedLabel
    }
    const hasLabel =
      (typeof label === 'string' && label.length > 0) || label
        ? true
        : false

    const id = this._id
    const params = {
      className: classnames(
        'dnb-form-row',
        (isTrue(vertical) || direction) &&
          `dnb-form-row--${isTrue(vertical) ? 'vertical' : direction}`,
        (isTrue(vertical) || label_direction) &&
          `dnb-form-row--${
            isTrue(vertical) ? 'vertical' : label_direction
          }-label`,
        indent &&
          !(
            isNested &&
            this.context.formRow.hasLabel &&
            this.context.formRow.indent
          ) &&
          `dnb-form-row__indent--${isTrue(indent) ? 'default' : indent}`,
        isNested && 'dnb-form-row--nested',
        section_style ? `dnb-section dnb-section--${section_style}` : null,
        section_spacing
          ? `dnb-section--spacing-${
              isTrue(section_spacing) ? 'default' : section_spacing
            }`
          : null,
        createSpacingClasses(props),
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
            return makeUniqueId() // cause we need an id anyway
          }
          this.isIsUsed = true
          return id
        },
        itsMeAgain: true,
        hasLabel,
        indent,
        global_status_id,
        direction,
        vertical,
        label_direction: isTrue(vertical) ? 'vertical' : label_direction,
        disabled
      }
    })

    const useFieldset = !isTrue(no_fieldset) && hasLabel

    return (
      <Context.Provider value={context}>
        <Fieldset useFieldset={useFieldset}>
          <div {...params}>
            {label && (
              <FormLabel
                className={classnames('dnb-form-row__label', label_class)}
                id={label_id ? label_id : id + '-label'}
                for_id={useFieldset ? null : id} // we don't use for_id, because we don't have a single element to target to
                text={label}
                element={useFieldset ? 'legend' : 'label'}
                direction={label_direction}
                disabled={isTrue(disabled)}
              />
            )}
            {isTrue(no_label) && (
              <span
                className="dnb-form-label dnb-form-row__label-dummy"
                aria-hidden
              />
            )}
            {isNested && skipContentWrapperIfNested ? (
              children
            ) : (
              <div
                className={classnames(
                  'dnb-form-row__content',
                  isTrue(wrap) && 'dnb-form-row__content--wrap',
                  label &&
                    !isTrue(vertical) &&
                    direction !== 'vertical' &&
                    `dnb-form-row__content--${indent_offset || 'default'}`
                )}
                ref={this._contentRef}
              >
                {children}
              </div>
            )}
          </div>
        </Fieldset>
      </Context.Provider>
    )
  }
}

const Fieldset = ({ useFieldset, className, children, ...props }) => {
  if (useFieldset) {
    return (
      <fieldset
        className={classnames('dnb-form-row__fieldset', className)}
        {...props}
      >
        {children}
      </fieldset>
    )
  }
  return (
    <div
      className={classnames('dnb-form-row__fieldset', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// docs (or use ptd): https://github.com/facebook/prop-types#usage
Fieldset.propTypes = {
  children: PropTypes.node.isRequired,
  useFieldset: PropTypes.bool,
  className: PropTypes.string
}
Fieldset.defaultProps = {
  useFieldset: false,
  className: null
}

export const prepareFormRowContext = (props = {}) => {
  if (typeof props.label_direction === 'undefined') {
    props.label_direction = isTrue(props.vertical)
      ? 'vertical'
      : props.label_direction
  }
  return props
}
