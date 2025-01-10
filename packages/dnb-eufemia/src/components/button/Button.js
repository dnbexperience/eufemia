/**
 * Web Button Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  warn,
  makeUniqueId,
  isTrue,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import IconPrimary from '../icon-primary/IconPrimary'
import FormStatus from '../form-status/FormStatus'
import Anchor, { pickIcon, opensNewTab } from '../anchor/Anchor'
import { launch } from '../../icons'
import Tooltip from '../tooltip/Tooltip'

export const buttonVariantPropType = {
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiary',
    'signal',

    /**
     * For internal use only (as of now)
     */
    'unstyled',
  ]),
}

/**
 * The button component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a button should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
export default class Button extends React.PureComponent {
  static contextType = Context

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)

    this._id =
      props.id || ((props.status || props.tooltip) && makeUniqueId()) // cause we need an id anyway
    this._ref = React.createRef()

    this.state = { afterContent: null }
  }

  componentDidMount() {
    if (this.props.innerRef) {
      typeof this.props.innerRef === 'function'
        ? this.props.innerRef(this._ref.current)
        : (this.props.innerRef.current = this._ref.current)
    }
    if (this.props.inner_ref) {
      typeof this.props.innerRef === 'function'
        ? this.props.inner_ref(this._ref.current)
        : (this.props.inner_ref.current = this._ref.current)
    }
  }

  getOnClickHandler = (src) => (event) => {
    const afterContent = dispatchCustomElementEvent(src, 'on_click', {
      event,
    })
    if (afterContent && React.isValidElement(afterContent)) {
      this.setState({
        afterContent,
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Button.defaultProps,
      { skeleton: this.context?.skeleton },
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
      pickFormElementProps(this.context?.formElement),
      this.context.Button
    )

    const {
      class: classProp, // @deprecated – can be removed in v11
      className,
      variant,
      size,
      title,
      custom_content,
      tooltip,
      status,
      status_state,
      status_props,
      status_no_animation,
      globalStatus,
      id, // eslint-disable-line
      disabled,
      text: _text, // eslint-disable-line
      icon: _icon, // eslint-disable-line
      icon_position,
      icon_size,
      wrap,
      bounding, // eslint-disable-line
      stretch,
      skeleton,
      element,
      inner_ref, // eslint-disable-line
      innerRef, // eslint-disable-line
      ...attributes
    } = props

    const showStatus = getStatusState(status)

    let { text, icon } = props
    let usedVariant = variant
    let usedSize = size
    let iconSize = icon_size
    const content = Button.getContent(this.props)

    if (
      variant === 'tertiary' &&
      (text || content) &&
      !icon &&
      icon !== false
    ) {
      warn(
        `Icon required: A Tertiary Button requires an icon to be WCAG compliant in most cases, because variant tertiary has no underline.
(Override this warning using icon={false}, or consider using one of the other variants)`
      )
    }

    // if only has Icon, then resize it and define it as secondary
    const isIconOnly = Boolean(!text && !content && icon)
    if (isIconOnly) {
      if (!usedVariant) {
        usedVariant = 'secondary'
      }
      if (!iconSize && (usedSize === 'default' || usedSize === 'large')) {
        iconSize = 'medium'
      }
      if (!usedSize) {
        usedSize = 'medium'
      }
    } else if (content) {
      if (!usedVariant) {
        usedVariant = 'primary'
      }
      if (!usedSize) {
        usedSize = 'default'
      }
    }
    if (!iconSize && variant === 'tertiary' && icon_position === 'top') {
      iconSize = 'medium'
    }

    const Element = element
      ? element
      : props.href || props.to
      ? Anchor
      : 'button'
    if (Element === Anchor) {
      attributes.omitClass = true
      if (opensNewTab(props.target, props.href) && !icon) {
        icon = launch
      }
    }

    const classes = classnames(
      'dnb-button',
      `dnb-button--${usedVariant || 'primary'}`,
      usedSize && usedSize !== 'default' && `dnb-button--size-${usedSize}`,
      this.context?.theme?.darkBackground &&
        `dnb-button--on-dark-background`,
      icon && `dnb-button--icon-position-${icon_position}`,
      isTrue(stretch) && 'dnb-button--stretch',
      icon && iconSize && `dnb-button--icon-size-${iconSize}`,
      (text || content || custom_content) && 'dnb-button--has-text',
      icon && 'dnb-button--has-icon',
      wrap && 'dnb-button--wrap',
      status && `dnb-button__status--${status_state}`,
      createSkeletonClass(
        variant === 'tertiary' ? 'font' : 'shape',
        skeleton,
        this.context
      ),
      createSpacingClasses(props),
      classProp, // @deprecated – can be removed in v11
      className,
      props.href || props.to ? '' : null, // dnb-anchor--no-underline dnb-anchor--no-hover
      Element === Anchor && 'dnb-anchor--no-style'
    )

    const params = {
      className: classes,
      title,
      id: this._id,
      disabled: isTrue(disabled),
      ...attributes,
    }

    if (props.on_click || props.onClick) {
      params.onClick = this.getOnClickHandler(props)
    }

    if (Element !== Anchor && !params.type) {
      params.type = params.type === '' ? undefined : 'button'
    }
    if (isIconOnly) {
      params['aria-label'] = params['aria-label'] || title
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <>
        <Element ref={this._ref} {...params}>
          <Content
            {...this.props}
            icon={icon}
            icon_size={iconSize}
            content={text || content}
            custom_content={custom_content}
            isIconOnly={isIconOnly}
            skeleton={isTrue(skeleton)}
          />
        </Element>

        {this.state.afterContent}

        <FormStatus
          show={showStatus}
          id={this._id + '-form-status'}
          globalStatus={globalStatus}
          label={text}
          text={status}
          state={status_state}
          text_id={this._id + '-status'} // used for "aria-describedby"
          no_animation={status_no_animation}
          skeleton={skeleton}
          {...status_props}
        />

        {tooltip && this._ref && (
          <Tooltip
            id={this._id + '-tooltip'}
            targetElement={this._ref}
            tooltip={tooltip}
          />
        )}
      </>
    )
  }
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  type: PropTypes.string,
  title: PropTypes.string,
  variant: buttonVariantPropType.variant,
  size: PropTypes.oneOf(['default', 'small', 'medium', 'large']),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  icon_position: PropTypes.oneOf(['left', 'right', 'top']),
  icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node,
  ]),
  status_state: PropTypes.string,
  status_props: PropTypes.object,
  status_no_animation: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  globalStatus: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  }),
  id: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  rel: PropTypes.string,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
  custom_content: PropTypes.node,
  wrap: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  inner_ref: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  className: PropTypes.string,
  /**
   * @deprecated – use className instead. Will be removed in v11.
   */
  class: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  element: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node,
  ]),

  ...spacingPropTypes,

  on_click: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

Button.defaultProps = {
  type: null, // set the type because of the anchor/href situation – can be made more smart in future
  text: null,
  variant: null,
  size: null,
  title: null,
  icon: null,
  icon_position: 'right',
  icon_size: null,
  href: null,
  target: null,
  rel: null,
  to: null,
  id: null,
  custom_content: null,
  wrap: null,
  bounding: null,
  stretch: null,
  skeleton: null,
  disabled: null,
  tooltip: null,
  status: null,
  status_state: 'error',
  status_props: null,
  status_no_animation: null,
  globalStatus: null,
  inner_ref: null,

  className: null,
  /**
   * @deprecated – use className instead. Will be removed in v11.
   */
  class: null,
  innerRef: null,
  children: null,
  element: null,

  on_click: null,
  onClick: null,
}

function Content({
  title = null,
  content = null,
  custom_content = null,
  icon = null,
  icon_size = 'default',
  bounding = null,
  skeleton = null,
  isIconOnly = null,
}) {
  return (
    <>
      {isTrue(bounding) && (
        <span key="button-bounding" className="dnb-button__bounding" />
      )}

      {custom_content && (
        <React.Fragment key="button-custom-content">
          {custom_content}
        </React.Fragment>
      )}

      {content && (
        <>
          <span
            key="button-alignment"
            className="dnb-button__alignment"
            aria-hidden
          >
            &zwnj;
          </span>
          <span
            key="button-text"
            className="dnb-button__text dnb-skeleton--show-font"
          >
            {content}
          </span>
        </>
      )}

      {
        // on empty text, use a zero-width non-joiner
        // so the icon button gets vertical aligned
        // we need the dnb-button__text for alignment
        !content && icon && (
          <span
            key="button-alignment"
            className="dnb-button__alignment"
            aria-hidden
          >
            &zwnj;
          </span>
        )
      }

      {icon &&
        (pickIcon(icon, 'dnb-button__icon') || (
          <IconPrimary
            key="button-icon"
            className="dnb-button__icon"
            icon={icon}
            size={icon_size}
            aria-hidden={isIconOnly && !title ? null : true}
            skeleton={skeleton}
          />
        ))}
    </>
  )
}

Content.propTypes = {
  title: PropTypes.string,
  custom_content: PropTypes.node,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bounding: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.bool,
  isIconOnly: PropTypes.bool,
}

Button._formElement = true
Button._supportsSpacingProps = true
