/**
 * Web Textarea Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  registerElement,
  validateDOMAttributes,
  processChildren,
  getStatusState,
  combineDescribedBy,
  warn,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { includeValidProps } from '../form-row/FormRowHelpers'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

/**
 * The textarea component is an umbrella component for all textareas which share the same style as the classic `text` textarea field.
 */
export default class Textarea extends React.PureComponent {
  static tagName = 'dnb-textarea'
  static contextType = Context

  static propTypes = {
    value: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    textarea_state: PropTypes.string,
    status_state: PropTypes.string,
    status_props: PropTypes.object,
    status_no_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    global_status_id: PropTypes.string,
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    placeholder: PropTypes.string,
    align: PropTypes.oneOf(['left', 'right']),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoresize: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoresize_max_rows: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    class: PropTypes.string,
    textarea_class: PropTypes.string,
    textarea_attributes: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    cols: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inner_ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    ...spacingPropTypes,

    className: PropTypes.string,
    textarea_element: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,

    on_change: PropTypes.func,
    on_focus: PropTypes.func,
    on_blur: PropTypes.func,
    on_key_down: PropTypes.func,
    on_state_update: PropTypes.func,
  }

  static defaultProps = {
    value: 'initval',
    id: null,
    label: null,
    label_direction: null,
    label_sr_only: null,
    status: null,
    textarea_state: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    global_status_id: null,
    suffix: null,
    placeholder: null,
    align: null,
    stretch: null,
    disabled: null,
    skeleton: null,
    autoresize: null,
    autoresize_max_rows: null,
    textarea_class: null,
    class: null,
    textarea_attributes: null,
    readOnly: false,
    rows: null,
    cols: null,
    inner_ref: null,

    className: null,
    textarea_element: null,
    children: null,

    custom_element: null,
    custom_method: null,

    on_change: null,
    on_focus: null,
    on_blur: null,
    on_key_down: null,
    on_state_update: null,
  }

  static enableWebComponent() {
    registerElement(Textarea?.tagName, Textarea, Textarea.defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    const value = Textarea.getValue(props)
    if (
      state._listenForPropChanges &&
      value !== 'initval' &&
      value !== state.value
    ) {
      if (
        value !== state.value &&
        value !== state._value &&
        typeof props.on_state_update === 'function'
      ) {
        dispatchCustomElementEvent({ props }, 'on_state_update', { value })
      }
      state.value = value
    }
    if (props.textarea_state) {
      state.textareaState = props.textarea_state
    }
    state._listenForPropChanges = true
    return state
  }

  static hasValue(value) {
    return (
      ((typeof value === 'string' || typeof value === 'number') &&
        String(value).length > 0) ||
      false
    )
  }

  static getValue(props) {
    const value = processChildren(props)
    if (value === '' || Textarea.hasValue(value)) {
      return value
    }
    return props.value
  }

  state = {
    textareaState: 'virgin',
    value: null,
    _value: null,
  }

  constructor(props) {
    super(props)

    this._ref = props.inner_ref || React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway

    // make sure we don't trigger getDerivedStateFromProps on startup
    this.state._listenForPropChanges = true
    if (props.textarea_state) {
      this.state.textareaState = props.textarea_state
    }
    this.state._value = props.value
  }
  componentDidMount() {
    if (isTrue(this.props.autoresize) && typeof window !== 'undefined') {
      this.setAutosize()
      try {
        this.resizeObserver = new ResizeObserver(this.setAutosize)
        this.resizeObserver.observe(document.body)
      } catch (e) {
        window.addEventListener('resize', this.setAutosize)
      }
    }
  }
  componentWillUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
      this.resizeObserver = null
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.setAutosize)
    }
  }
  onFocusHandler = (event) => {
    const { value } = this._ref.current
    this.setState({
      value,
      _listenForPropChanges: false,
      textareaState: 'focus',
    })
    dispatchCustomElementEvent(this, 'on_focus', { value, event })
  }
  onBlurHandler = (event) => {
    const { value } = event.target
    this.setState({
      value,
      _listenForPropChanges: false,
      textareaState: Textarea.hasValue(value) ? 'dirty' : 'initial',
    })
    dispatchCustomElementEvent(this, 'on_blur', { value, event })
  }
  onChangeHandler = (event) => {
    const { value } = event.target

    if (isTrue(this.props.autoresize)) {
      this.prepareAutosize()
    }

    const rows = this.getRows(value)

    const ret = dispatchCustomElementEvent(this, 'on_change', {
      value,
      rows,
      event,
    })
    if (ret !== false) {
      this.setState({ value, _listenForPropChanges: false })
      if (isTrue(this.props.autoresize)) {
        this.setAutosize(rows)
      }
    }
  }
  onKeyDownHandler = (event) => {
    const rows = this.getRows()
    const { value } = event.target
    dispatchCustomElementEvent(this, 'on_key_down', {
      value,
      rows,
      event,
    })
  }
  prepareAutosize = () => {
    const elem = this._ref.current
    if (!elem) {
      return // stop here if no element was gotten
    }
    try {
      elem.style.height = 'auto'
    } catch (e) {
      warn(e)
    }
  }
  setAutosize = (rows = null) => {
    const elem = this._ref.current
    if (!elem) {
      return // stop here if no element was gotten
    }
    try {
      if (typeof this._heightOffset === 'undefined') {
        this._heightOffset = elem.offsetHeight - elem.clientHeight
      }

      elem.style.height = 'auto'

      // get rows after we set height to auto, this way we get 100% correct rows
      const lineHeight = this.getLineHeight()
      let newHeight = elem.scrollHeight + this._heightOffset
      if (!rows) {
        rows = this.getRows()
      }

      if (rows === 1) {
        if (newHeight > lineHeight) {
          newHeight = lineHeight
        }
      }

      const maxRows = parseFloat(this.props.autoresize_max_rows)
      if (maxRows > 0) {
        const maxHeight = maxRows * lineHeight

        if (rows > maxRows || newHeight > maxHeight) {
          newHeight = maxHeight
        }
      }

      elem.style.height = newHeight + 'px'
    } catch (e) {
      warn(e)
    }
  }
  getRows() {
    return (
      Math.floor(this._ref.current.scrollHeight / this.getLineHeight()) ||
      1
    )
  }
  getLineHeight() {
    return parseFloat(getComputedStyle(this._ref.current).lineHeight) || 0
  }
  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Textarea.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Textarea,
      includeValidProps(this.context.FormRow),
      this.context.Textarea
    )

    const {
      label,
      label_direction,
      label_sr_only,
      status,
      status_state,
      status_props,
      status_no_animation,
      global_status_id,
      suffix,
      disabled,
      skeleton,
      stretch,
      placeholder,
      align,
      textarea_class,
      readOnly,
      textarea_attributes,
      class: _className,
      className,

      autoresize,
      autoresize_max_rows, //eslint-disable-line
      id: _id, //eslint-disable-line
      children, //eslint-disable-line
      value: _value, //eslint-disable-line
      textarea_element: _textarea_element, //eslint-disable-line

      ...attributes
    } = props

    const { value, textareaState } = this.state

    const id = this._id
    const showStatus = getStatusState(status)
    const hasValue = Textarea.hasValue(value)

    // pass along all props we wish to have as params
    let { textarea_element: TextareaElement } = props

    const textareaAttributes = textarea_attributes
      ? typeof textarea_attributes === 'string'
        ? JSON.parse(textarea_attributes)
        : textarea_attributes
      : {}

    const textareaParams = {
      className: classnames('dnb-textarea__textarea', textarea_class),
      role: 'textbox',
      value: hasValue ? value : '',
      id,
      disabled: isTrue(disabled) || isTrue(skeleton),
      name: id,
      'aria-placeholder': placeholder,
      ...attributes,
      ...textareaAttributes,
      onChange: this.onChangeHandler,
      onFocus: this.onFocusHandler,
      onBlur: this.onBlurHandler,
      // onPaste: this.onChangeHandler,
      onKeyDown: this.onKeyDownHandler,
    }

    // we may considder using: aria-details
    if (showStatus || suffix) {
      textareaParams['aria-describedby'] = combineDescribedBy(
        textareaParams,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }
    if (readOnly) {
      textareaParams['aria-readonly'] = textareaParams.readOnly = true
    }

    const mainParams = {
      className: classnames(
        'dnb-textarea',
        `dnb-textarea--${textareaState}`,
        hasValue && 'dnb-textarea--has-content',
        align && `dnb-textarea__align--${align}`,
        status && `dnb-textarea__status--${status_state}`,
        autoresize && 'dnb-textarea__autoresize',
        label_direction && `dnb-textarea--${label_direction}`,
        isTrue(stretch) && `dnb-textarea--stretch`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        _className,
        className
      ),
    }

    const innerParams = {
      className: classnames(
        'dnb-textarea__inner',
        createSkeletonClass('shape', skeleton, this.context)
      ),
    }

    const shellParams = {
      className: classnames('dnb-textarea__shell'),
    }

    if (isTrue(disabled) || isTrue(skeleton)) {
      shellParams['aria-disabled'] = true
    }

    // to show the ending dots on a placeholder, if the text is longer
    const placeholderStyle =
      parseFloat(this.props.rows) > 0
        ? {
            '--textarea-rows': parseFloat(this.props.rows),
            // '--textarea-cols': parseFloat(this.props.cols)
          }
        : null

    skeletonDOMAttributes(innerParams, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, textareaParams)
    validateDOMAttributes(null, innerParams)
    validateDOMAttributes(null, shellParams)

    if (TextareaElement && typeof TextareaElement === 'function') {
      TextareaElement = TextareaElement(textareaParams, this._ref)
    } else if (!TextareaElement && _textarea_element) {
      TextareaElement = _textarea_element
    }

    return (
      <span {...mainParams}>
        {label && (
          <FormLabel
            id={id + '-label'}
            for_id={id}
            text={label}
            label_direction={label_direction}
            sr_only={label_sr_only}
            disabled={disabled}
            skeleton={skeleton}
          />
        )}

        <span {...innerParams}>
          <AlignmentHelper />

          <FormStatus
            show={showStatus}
            id={id + '-form-status'}
            global_status_id={global_status_id}
            label={label}
            text_id={id + '-status'} // used for "aria-describedby"
            text={status}
            status={status_state}
            no_animation={status_no_animation}
            skeleton={skeleton}
            {...status_props}
          />

          <span className="dnb-textarea__row">
            <span {...shellParams}>
              {TextareaElement || (
                <textarea ref={this._ref} {...textareaParams} />
              )}

              {placeholder && (
                <span
                  aria-hidden
                  className={classnames(
                    'dnb-textarea__placeholder',
                    align ? `dnb-textarea__align--${align}` : null
                  )}
                  style={placeholderStyle}
                >
                  {placeholder}
                </span>
              )}

              <span className="dnb-textarea__state" />
            </span>

            {suffix && (
              <Suffix
                className="dnb-textarea__suffix"
                id={id + '-suffix'} // used for "aria-describedby"
                context={props}
              >
                {suffix}
              </Suffix>
            )}
          </span>
        </span>
      </span>
    )
  }
}
