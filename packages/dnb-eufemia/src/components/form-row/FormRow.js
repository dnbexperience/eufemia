/**
 * Web FormRow Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendGracefully,
  extendPropsWithContextInClassComponent,
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'

import Context from '../../shared/Context'
import FormLabel from '../form-label/FormLabel'
import Section from '../section/Section'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'

export const formRowPropTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  label_direction: PropTypes.oneOf(['vertical', 'horizontal']),
  label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label_id: PropTypes.string,
  label_class: PropTypes.string,
  no_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  locale: PropTypes.string,
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  centered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  section_style: PropTypes.string,
  section_spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  globalStatus: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  responsive: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  skipContentWrapperIfNested: PropTypes.bool,

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
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
  locale: null,
  wrap: null,
  direction: null,
  vertical: null,
  centered: null,
  section_style: null,
  section_spacing: null,
  globalStatus: null,
  responsive: null,
  disabled: null,
  skeleton: null,

  skipContentWrapperIfNested: false,
  className: null,
  children: null,
}

export default class FormRow extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    ...formRowPropTypes,
  }

  static defaultProps = {
    ...formRowDefaultProps,
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

    // We may consider to use this later to check if we are inside FormSet
    // this.isInsideFormSet =
    //   context.FormRow && context.FormRow.isInsideFormSet
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      FormRow.defaultProps,
      this.context?.FormRow, // nested FormRow
      this.context?.formElement // nested formElement
    )

    const {
      label_direction,
      label_sr_only,
      label_id,
      label_class,
      no_fieldset,
      no_label,
      locale,
      direction,
      vertical,
      centered,
      section_style,
      section_spacing,
      globalStatus,
      responsive,
      disabled,
      skeleton,
      wrap,
      className,
      skipContentWrapperIfNested,

      id: _id, // eslint-disable-line
      label: _label, // eslint-disable-line

      ...attributes
    } = props

    let { label } = props

    const isNested =
      this.context?.FormRow?.itsMeAgain ||
      this.context?.formElement?.itsMeAgain

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
        centered && 'dnb-form-row--centered',
        isNested && 'dnb-form-row--nested',
        createSpacingClasses(props),
        className
      ),
      ...attributes,
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const formElement = {
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
      globalStatus,
      direction,
      vertical,
      label_direction: isTrue(vertical) ? 'vertical' : label_direction,
      responsive,
      disabled,
      skeleton,
    }

    const providerContext = extendGracefully(this.context, {
      locale: locale ? locale : this.context.locale,
      formElement,
      FormRow: formElement,
    })

    const useFieldset = !isTrue(no_fieldset) && hasLabel

    return (
      <Context.Provider value={providerContext}>
        <Fieldset useFieldset={useFieldset}>
          <Section
            style_type={section_style || 'transparent'}
            spacing={section_spacing}
            element="div"
            {...params}
          >
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
                  label && !isTrue(vertical) && direction !== 'vertical',
                  responsive && 'dnb-responsive-component'
                )}
              >
                {children}
              </div>
            )}
          </Section>
        </Fieldset>
      </Context.Provider>
    )
  }
}

const Fieldset = ({
  useFieldset,
  children,
  className = null,
  ...props
}) => {
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
  className: PropTypes.string,
}
Fieldset.defaultProps = {
  children: null,
  useFieldset: false,
  className: null,
}

FormRow._supportsSpacingProps = true
