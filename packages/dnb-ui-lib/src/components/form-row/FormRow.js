/**
 * Web FormRow Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extend,
  extendPropsWithContext,
  isTrue,
  makeUniqueId,
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import Context from '../../shared/Context'
import hashSum from '../../shared/libs/HashSum'
import FormLabel from '../form-label/FormLabel'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'

export const formRowPropTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['vertical', 'horizontal']),
  label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label_id: PropTypes.string,
  label_class: PropTypes.string,
  no_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  indent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  centered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  indent_offset: PropTypes.string,
  section_style: PropTypes.string,
  section_spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  global_status_id: PropTypes.string,
  responsive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  skipContentWrapperIfNested: PropTypes.bool,

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  custom_element: PropTypes.object,
  custom_method: PropTypes.func
}

export const formRowDefaultProps = {
  id: null,
  label: null,
  label_direction: null,
  label_sr_only: null,
  label_id: null,
  label_class: null,
  no_label: false,
  no_fieldset: null,
  indent: null,
  wrap: null,
  direction: null,
  vertical: null,
  centered: null,
  indent_offset: null,
  section_style: null,
  section_spacing: null,
  global_status_id: null,
  responsive: null,
  disabled: null,
  skeleton: null,
  class: null,

  skipContentWrapperIfNested: false,
  className: null,
  children: null,

  custom_element: null,
  custom_method: null
}

export default class FormRow extends React.PureComponent {
  static tagName = 'dnb-form-row'
  static contextType = Context

  static propTypes = {
    ...formRowPropTypes
  }

  static defaultProps = {
    ...formRowDefaultProps
  }

  static enableWebComponent() {
    registerElement(FormRow.tagName, FormRow, FormRow.defaultProps)
  }

  static getContent(props) {
    let label = null
    let children =
      typeof props.children === 'function'
        ? props.children(props)
        : props.children

    if (Array.isArray(props.children)) {
      children = children.reduce((pV, cV) => {
        if (cV && cV.type && cV.type.name === 'FormLabel') {
          label = cV.props.children
        } else {
          pV.push(cV)
        }
        return pV
      }, [])
    }

    return { label, children }
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway

    // Not used yet
    // this.isInsideFormSet =
    //   context.FormRow && context.FormRow.isInsideFormSet
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      FormRow.defaultProps,
      this.context.FormRow
    )

    let {
      label,
      label_direction,
      label_sr_only,
      label_id,
      label_class,
      no_fieldset,
      no_label,
      indent,
      direction,
      vertical,
      centered,
      indent_offset,
      section_style,
      section_spacing,
      global_status_id,
      responsive,
      disabled,
      skeleton,
      wrap,
      id: _id, // eslint-disable-line
      className,
      class: _className,
      skipContentWrapperIfNested,

      ...attributes
    } = props

    const isNested =
      this.context.FormRow && this.context.FormRow.itsMeAgain

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
          }-label`, // <-- has label
        indent &&
          !(
            isNested &&
            this.context.FormRow.hasLabel &&
            this.context.FormRow.indent
          ) &&
          `dnb-form-row__indent--${isTrue(indent) ? 'default' : indent}`,
        centered && 'dnb-form-row--centered',
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

    // NB: Update: Using hashSum on props i too CPU expensive
    // Sollution is to only check one dimention by using "false"
    // We could also check: if(this._cachedContext !== this.context)
    // but not with props. So it's not a sollution

    // NB: check if context has changed, if yes, then update the cache
    // 1. Modal inside a FormRow will open on rerender without: this._cachedContext !== this.context
    // 2. But then ToggleButton or any other props
    if (
      this._cachedContext !== hashSum(this.context, false) ||
      this._cachedProps !== hashSum(this.props, false)
    ) {
      this._cachedContext = hashSum(this.context, false)
      this._cachedProps = hashSum(this.props, false)

      const FormRow = {
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
        responsive,
        disabled,
        skeleton
      }
      this._contextWeUse = extend(this.context, {
        FormRow
      })
    }

    const useFieldset = !isTrue(no_fieldset) && hasLabel

    return (
      <Context.Provider value={this._contextWeUse}>
        <Fieldset useFieldset={useFieldset}>
          <div {...params}>
            <AlignmentHelper />

            {label && (
              <FormLabel
                className={classnames('dnb-form-row__label', label_class)}
                id={label_id ? label_id : id + '-label'}
                for_id={useFieldset ? null : id} // we don't use for_id, because we don't have a single element to target to
                text={label}
                element={useFieldset ? 'legend' : 'label'}
                label_direction={label_direction}
                sr_only={label_sr_only}
                disabled={disabled}
                skeleton={skeleton}
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
                    `dnb-form-row__content--${indent_offset || 'default'}`,
                  responsive && 'dnb-responsive-component'
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
  children: PropTypes.node,
  useFieldset: PropTypes.bool,
  className: PropTypes.string
}
Fieldset.defaultProps = {
  children: null,
  useFieldset: false,
  className: null
}

export const prepareFormRowContext = (props) => {
  if (typeof props.label_direction === 'undefined') {
    props.label_direction = isTrue(props.vertical)
      ? 'vertical'
      : props.label_direction
  }
  return props
}
