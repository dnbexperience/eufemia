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
import { createSpacingClasses } from '../space/SpacingHelper'

const renderProps = {
  render_content: null
}

export const propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  label_direction: PropTypes.oneOf(['vertical', 'horizontal']),
  label_id: PropTypes.string,
  no_label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  indent: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  no_wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label_offset: PropTypes.string,
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
  label_direction: null,
  label_id: null,
  no_label: false,
  no_fieldset: null,
  indent: null,
  no_wrap: null,
  direction: null,
  vertical: null,
  label_offset: null,
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

    this._contentRef = React.createRef()
  }

  componentDidMount() {
    this.setLabelOffset()
  }
  componentWillUnmount() {
    clearTimeout(this.contentSizeDelay)
  }

  setLabelOffset() {
    clearTimeout(this.contentSizeDelay)
    this.contentSizeDelay = setTimeout(() => {
      const { label, vertical, direction, label_offset } = this.props
      if (
        (label,
        !isTrue(vertical) &&
          direction !== 'vertical' &&
          label_offset === 'auto' &&
          this._contentRef.current)
      ) {
        try {
          const height = this._contentRef.current.offsetHeight
          const restBoundingBoxHeight = 12
          const pixelsToMove =
            height - (height / 2 - restBoundingBoxHeight)
          let rem = pixelsToMove / 16

          // beaucse we don't have components witch needs heigher than that
          // e.g. <Input size="large" has a label centered to that value
          if (rem > 2.25) {
            rem = 2.25
          }
          this._contentRef.current.style.marginTop = `-${rem}rem`
          // console.warn('setLabelOffset', rem)
        } catch (e) {
          console.log('Error on setLabelOffset', e)
        }
      }
    }, 1)
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
      no_fieldset,
      no_label,
      indent,
      direction,
      vertical,
      label_offset,
      section_style,
      section_spacing,
      disabled,
      no_wrap,
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
        label &&
          !isTrue(vertical) &&
          direction !== 'vertical' &&
          `dnb-form-row__content--${label_offset || 'medium'}`,
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
        isTrue(no_wrap) && 'dnb-form-row--no_wrap',
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
            return `dnb-form-row-${Math.round(Math.random() * 999)}` // cause we need an id anyway
          }
          this.isIsUsed = true
          return id
        },
        itsMeAgain: true,
        hasLabel: label,
        indent,
        direction,
        vertical,
        // label_direction,
        label_direction: isTrue(vertical) ? 'vertical' : label_direction,
        disabled
      }
    })

    const useFieldset = !isTrue(no_fieldset)

    this.setLabelOffset()

    return (
      <Context.Provider value={context}>
        <Fieldset useFieldset={label && useFieldset}>
          <div {...params}>
            {label && (
              <FormLabel
                className="dnb-form-row__label"
                id={(label_id ? label_id : id) + '-label'}
                for_id={!useFieldset ? id : null} // we don't use for_id, because we don't have a single element to target to
                text={label}
                element={!useFieldset ? 'label' : 'legend'}
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
            {isNested ? (
              children
            ) : (
              <div
                className="dnb-form-row__content"
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
    <div className={className} {...props}>
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
