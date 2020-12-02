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
  combineLabelledBy,
  combineDescribedBy,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import Button from '../button/Button'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import Context from '../../shared/Context'

export default class ModalContent extends React.PureComponent {
  static propTypes = {
    modal_content: PropTypes.node.isRequired,
    mode: PropTypes.oneOf(['modal', 'drawer']),
    hide: PropTypes.bool,
    id: PropTypes.string,
    root_id: PropTypes.string,
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
    id: null,
    root_id: null,
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
    this._id = makeUniqueId()
    this._ii = new InteractionInvalidation()
    this._ii.setBypassSelector([
      '.dnb-modal__content',
      `#dnb-modal-${props.root_id || 'root'}`
    ])
  }

  componentDidMount() {
    this.addToIndex()

    this.removeScrollPossibility()
    this._ii.activate()
    this.setFocus()
    this.setAndroidFocusHelper()

    const id = this.props.id
    dispatchCustomElementEvent(this, 'on_open', { id })
  }

  componentWillUnmount() {
    clearTimeout(this._focusTimeout)

    this.removeAndroidFocusHelper()
    this.removeFromIndex()

    if (getListOfModalRoots().length <= 1) {
      this.revertScrollPossibility()
      this._ii.revert()
    }

    const id = this.props.id
    dispatchCustomElementEvent(this, 'on_close', { id })
  }

  setAndroidFocusHelper() {
    if (
      typeof window !== 'undefined' &&
      typeof navigator !== 'undefined' &&
      /Android/.test(navigator.appVersion)
    ) {
      window.addEventListener('resize', this._androidFocusHelper)
    }
  }

  removeAndroidFocusHelper() {
    window.removeEventListener('resize', this._androidFocusHelper)
    clearTimeout(this._androidFocusTimeout)
  }

  _androidFocusHelper = () => {
    clearTimeout(this._androidFocusTimeout)
    this._androidFocusTimeout = setTimeout(() => {
      try {
        if (
          document.activeElement.tagName == 'INPUT' ||
          document.activeElement.tagName == 'TEXTAREA'
        ) {
          document.activeElement.scrollIntoView()
        }
      } catch (e) {
        //
      }
    }, 100) // Older Android needs a delay here
  }

  addToIndex() {
    if (typeof window !== 'undefined') {
      try {
        window.__modalStack = window.__modalStack || []
        window.__modalStack.push(this)
      } catch (e) {
        warn(e)
      }
    }
  }

  removeFromIndex() {
    if (typeof window !== 'undefined') {
      try {
        window.__modalStack = window.__modalStack || []
        window.__modalStack = window.__modalStack.filter(
          (cur) => cur !== this
        )
        if (!window.__modalStack.length) {
          delete window.__modalStack
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  setFocus() {
    if (this._contentRef.current) {
      clearTimeout(this._focusTimeout)
      this._focusTimeout = setTimeout(() => {
        try {
          this._contentRef.current.focus() // in case the button is disabled
          const focusElement = this._contentRef.current.querySelector(
            'h1:first-of-type, h2:first-of-type, .dnb-modal__close-button'
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

  onCloseClickHandler = (e) => {
    this.props.closeModal(e, { triggeredBy: 'button' })
  }

  onContentClickHandler = (e) => {
    this.props.closeModal(e, { triggeredBy: 'overlay', ifIsLatest: false })
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault()
        this.props.closeModal(e, {
          triggeredBy: 'keyboard'
        })
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
      closeModal, // eslint-disable-line
      className,
      class: _className,
      content_class,
      overlay_class,
      content_id,
      toggleOpenClose, // eslint-disable-line
      children, // eslint-disable-line
      ...rest
    } = this.props

    const id = content_id || this._id

    // ensure the min/max don't conflict
    let minWidth = min_width
    let maxWidth = max_width
    if (minWidth && !maxWidth && parseFloat(minWidth) > 0) {
      maxWidth = 0
    } else if (maxWidth && !minWidth && parseFloat(maxWidth) > 0) {
      minWidth = 0
    }

    const contentParams = {
      /**
       * VoiceOver has troubles with role="dialog" and "Modal in Modal",
       * the result is, only the first Modal gets focus (set by Safari)
       * so we only use "main" instead of "dialog"
       *
       */
      role: 'main',
      // 'aria-labelledby': id + '-title',
      'aria-labelledby': combineLabelledBy(
        this.props,
        title ? id + '-title' : null,
        labelled_by
      ),
      'aria-describedby': combineDescribedBy(this.props, id + '-content'),
      'aria-modal': 'true',
      className: classnames(
        'dnb-modal__content',
        mode && `dnb-modal__content--${mode}`,
        isTrue(hide) && 'dnb-modal__content--hide',
        isTrue(spacing) && 'dnb-modal__content--spacing',
        align_content && `dnb-modal__content__align--${align_content}`,
        container_placement || mode === 'drawer'
          ? `dnb-modal__content--${container_placement || 'right'}`
          : null,
        isTrue(fullscreen)
          ? 'dnb-modal__content--fullscreen'
          : fullscreen === 'auto' && 'dnb-modal__content--auto-fullscreen',
        isTrue(no_animation) && 'dnb-modal__content--no-animation',
        isTrue(no_animation_on_mobile) &&
          'dnb-modal__content--no-animation-on-mobile',
        content_class
      ),
      onClick: this.onContentClickHandler
    }

    const innerParams = {
      className: classnames(
        'dnb-modal__content__inner',
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

    const spacingParams = {
      tabIndex: -1,
      className: classnames('dnb-modal__content__spacing', 'dnb-no-focus')
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
        <div id={id} {...contentParams}>
          <ScrollView {...innerParams}>
            <div {...spacingParams} ref={this._contentRef}>
              {title && (
                <h1
                  id={id + '-title'}
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
                  on_click={this.onCloseClickHandler}
                  close_title={close_title}
                />
              )}
              <div id={id + '-content'} className="dnb-modal__wrapper">
                {modal_content}
              </div>
            </div>
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
      this.context.getTranslation(this.props).Modal
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

export function getListOfModalRoots(index = null) {
  if (typeof window !== 'undefined') {
    try {
      const stack = window.__modalStack || []
      if (index !== null) {
        if (index === -1 && stack.length) {
          return stack[stack.length - 1]
        } else if (index > -1) {
          return stack[index]
        }
      }

      return stack
    } catch (e) {
      warn(e)
    }
  }

  return []
}
