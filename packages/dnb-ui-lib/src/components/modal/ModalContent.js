/**
 * Web Modal Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from '../../shared/libs/bodyScrollLock'
import {
  warn,
  isTrue,
  makeUniqueId,
  InteractionInvalidation,
  extendPropsWithContext,
  validateDOMAttributes
} from '../../shared/component-helper'
import Button from '../button/Button'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import Context from '../../shared/Context'

export default class ModalContent extends React.PureComponent {
  static propTypes = {
    modal_content: PropTypes.node.isRequired,
    hide: PropTypes.bool,
    mode: PropTypes.string,
    labelled_by: PropTypes.string,
    content_id: PropTypes.string,
    title: PropTypes.node,
    close_title: PropTypes.string,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_close: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_core_style: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    animation_duration: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation_on_mobile: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    min_width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    max_width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fullscreen: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    align_content: PropTypes.string,
    container_placement: PropTypes.string,
    class: PropTypes.string,
    content_class: PropTypes.string,
    overlay_class: PropTypes.string,

    closeModal: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    mode: null,
    hide: null,
    labelled_by: null,
    content_id: null,
    title: null,
    close_title: null,
    hide_close_button: null,
    spacing: null,
    prevent_close: null,
    prevent_core_style: null,
    animation_duration: null,
    no_animation: null,
    no_animation_on_mobile: null,
    min_width: null,
    max_width: null,
    fullscreen: null,
    align_content: null,
    container_placement: null,
    class: null,
    overlay_class: null,
    content_class: null,

    closeModal: null,
    className: null,
    children: null
  }

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
    this._id = props.content_id || makeUniqueId()
    this._ii = new InteractionInvalidation().setBypassSelector(
      '.dnb-modal__content'
    )
  }

  componentDidMount() {
    this.removeScrollPossibility()
    this._ii.activate()
    this.setFocus()
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimeout)
    this.revertScrollPossibility()
    this._ii.revert()
  }

  setFocus() {
    if (this._contentRef.current) {
      clearTimeout(this._focusTimeout)
      this._focusTimeout = setTimeout(() => {
        try {
          this._contentRef.current.focus() // in case the button is disabled
          const focusElement = this._contentRef.current.querySelector(
            '.dnb-h--xx-large:first-of-type, .dnb-h--large:first-of-type, .dnb-modal__close-button'
          )
          if (focusElement) {
            focusElement.focus()
          }
        } catch (e) {
          warn(e)
        }
      }, parseFloat(this.props.animation_duration)) // with this delay, the user can press esc without an focus action first
    }
  }

  removeScrollPossibility() {
    if (this._contentRef.current) {
      disableBodyScroll(this._contentRef.current)
    }
  }

  revertScrollPossibility() {
    enableBodyScroll(this._contentRef.current)
    clearAllBodyScrollLocks()
  }

  preventClick = (e) => {
    if (e) {
      e.stopPropagation()
    }
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault()
        this.props.closeModal(e, { ifIsLatest: true })
        break
    }
  }

  render() {
    const {
      mode,
      hide,
      title,
      labelled_by,
      modal_content,
      close_title,
      hide_close_button,
      spacing,
      prevent_close, // eslint-disable-line
      open_delay, // eslint-disable-line
      prevent_core_style,
      animation_duration, // eslint-disable-line
      no_animation,
      no_animation_on_mobile,
      min_width,
      max_width,
      fullscreen,
      align_content,
      container_placement,
      closeModal,
      className,
      class: _className,
      content_class,
      overlay_class,
      content_id, // eslint-disable-line
      toggleOpenClose, // eslint-disable-line
      children, // eslint-disable-line
      ...rest
    } = this.props

    const id = this._id

    // ensure the min/max don't conflict
    let minWidth = min_width
    let maxWidth = max_width
    if (minWidth && !maxWidth && parseFloat(minWidth) > 0) {
      maxWidth = 0
    } else if (maxWidth && !minWidth && parseFloat(maxWidth) > 0) {
      minWidth = 0
    }

    const contentParams = {
      role: 'dialog',
      'aria-modal': 'true',
      className: classnames(
        'dnb-modal__content',
        mode && `dnb-modal__content--${mode}`,
        isTrue(hide) && 'dnb-modal__content--hide',
        isTrue(spacing) && 'dnb-modal__content--spacing',
        align_content && `dnb-modal__content__align--${align_content}`,
        container_placement &&
          `dnb-modal__content--${container_placement}`,
        isTrue(fullscreen)
          ? 'dnb-modal__content--fullscreen'
          : fullscreen === 'auto' && 'dnb-modal__content--auto-fullscreen',
        isTrue(no_animation) && 'dnb-modal__content--no-animation',
        isTrue(no_animation_on_mobile) &&
          'dnb-modal__content--no-animation-on-mobile',
        content_class
      ),
      onClick: closeModal
    }

    const innerParams = {
      id,
      tabIndex: -1,
      className: classnames(
        'dnb-modal__content__inner',
        'dnb-no-focus',
        !isTrue(prevent_core_style) && 'dnb-core-style',
        className,
        _className
      ),
      style: (minWidth || maxWidth) && { minWidth, maxWidth },
      onClick: this.preventClick,
      onTouchStart: this.preventClick,
      onKeyDown: this.onKeyDownHandler,
      ...rest
    }

    if (labelled_by) {
      contentParams['aria-describedby'] = labelled_by
    }
    const overlayParams = {
      className: classnames(
        'dnb-modal__overlay',
        hide && 'dnb-modal__overlay--hide',
        mode && `dnb-modal__overlay--${mode}`,
        isTrue(no_animation) && 'dnb-modal__overlay--no-animation',
        isTrue(no_animation_on_mobile) &&
          'dnb-modal__overlay--no-animation-on-mobile',
        overlay_class
      )
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, innerParams)

    return (
      <>
        <div {...contentParams}>
          <ScrollView {...innerParams} ref={this._contentRef}>
            {title && (
              <h1
                className={classnames(
                  'dnb-modal__title',
                  mode === 'drawer' ? 'dnb-h--x-large' : 'dnb-h--large'
                )}
              >
                {title}
              </h1>
            )}
            {!isTrue(hide_close_button) && (
              <CloseButton
                on_click={closeModal}
                close_title={close_title}
              />
            )}
            <div className="dnb-modal__wrapper">{modal_content}</div>
          </ScrollView>
        </div>
        <span {...overlayParams} aria-hidden="true" />
      </>
    )
  }
}

export class CloseButton extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    style_type: PropTypes.oneOf(['button', 'cross']),
    on_click: PropTypes.func.isRequired,
    close_title: PropTypes.string,
    className: PropTypes.string
  }
  static defaultProps = {
    style_type: null,
    close_title: null,
    className: null
  }

  render() {
    // use only the props from context, who are available here anyway
    const {
      on_click,
      style_type,
      close_title,
      className = null,
      ...rest
    } = extendPropsWithContext(
      this.props,
      CloseButton.defaultProps,
      this.context.formRow,
      this.context.translation.Modal
    )

    if (style_type === 'cross') {
      rest.icon_size = 'medium'
    } else {
      rest.size = 'large'
      rest.icon_size = 'basis'
      rest.text = close_title
    }

    return (
      <Button
        type="button"
        variant="secondary"
        className={classnames(
          'dnb-modal__close-button',
          style_type && `dnb-modal__close-button--${style_type}`,
          className
        )}
        icon="close"
        on_click={on_click}
        {...rest}
      />
    )
  }
}
