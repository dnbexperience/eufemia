// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import createTextMaskInputElement from './text-mask/createTextMaskInputElement'
import InputModeNumber from './text-mask/InputModeNumber'
import { isNil } from './text-mask/utilities'

export type TextMaskMask =
  | any[]
  | ((...args: any[]) => any)
  | boolean
  | {
      mask?: any[] | ((...args: any[]) => any)
      pipe?: (...args: any[]) => any
    }
export type TextMaskInputElement =
  | React.ReactNode
  | ((...args: any[]) => any)
export type TextMaskValue = string | number
export interface TextMaskProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
  mask: TextMaskMask
  inputRef?: React.MutableRefObject<HTMLInputElement>
  inputElement?: TextMaskInputElement
  onChange?: (...args: any[]) => any
  guide?: boolean
  value?: TextMaskValue
  pipe?: (...args: any[]) => any
  placeholderChar?: string
  keepCharPositions?: boolean
  showMask?: boolean
}

export default class TextMask extends React.PureComponent<
  TextMaskProps,
  any
> {
  static propTypes = {
    mask: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.func,
      PropTypes.bool,
      PropTypes.shape({
        mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        pipe: PropTypes.func,
      }),
    ]).isRequired,
    inputRef: PropTypes.object,
    inputElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onChange: PropTypes.func,
    guide: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    pipe: PropTypes.func,
    placeholderChar: PropTypes.string,
    keepCharPositions: PropTypes.bool,
    showMask: PropTypes.bool,
  }

  static defaultProps = {
    inputElement: null,
    inputRef: null,
    onChange: null,
    guide: null,
    value: null,
    pipe: null,
    placeholderChar: null,
    keepCharPositions: null,
    showMask: null,
  }

  constructor(props) {
    super(props)

    this.inputRef = props.inputRef || React.createRef()
  }

  componentDidMount() {
    this.initTextMask()
  }

  componentWillUnmount() {
    this.inputMode?.remove()
  }

  initTextMask() {
    const {
      props,
      props: { value, inputMode },
    } = this

    const inputElement = this.inputRef.current
    this.textMaskInputElement = createTextMaskInputElement({
      ...props,
      inputElement,
    })
    this.textMaskInputElement.update(value)

    if (!inputMode && inputMode !== 'none') {
      this.inputMode = new InputModeNumber()
    }

    this.inputMode?.setElement(inputElement)
  }

  onChange = (event) => {
    this.textMaskInputElement.update()

    if (typeof this.props.onChange === 'function') {
      return this.props.onChange(event)
    }
  }

  componentDidUpdate(prevProps) {
    // Getting props affecting value
    const { value, pipe, mask, guide, placeholderChar, showMask } =
      this.props

    // Сalculate that settings was changed:
    // - `pipe` converting to string, to compare function content
    // - `mask` converting to string, to compare values or function content
    // - `keepCharPositions` excludes, because it affect only cursor position
    const settings = { guide, placeholderChar, showMask }
    const isPipeChanged =
      typeof pipe === 'function' && typeof prevProps.pipe === 'function'
        ? pipe.toString() !== prevProps.pipe.toString()
        : (isNil(pipe) && !isNil(prevProps.pipe)) ||
          (!isNil(pipe) && isNil(prevProps.pipe))
    const isMaskChanged = mask.toString() !== prevProps.mask.toString()
    const isSettingChanged =
      Object.keys(settings).some(
        (prop) => settings[prop] !== prevProps[prop]
      ) ||
      isMaskChanged ||
      isPipeChanged

    // Сalculate that value was changed
    const isValueChanged =
      value !== this.inputRef.current.value || prevProps.value !== value

    // Check value and settings to prevent duplicating update() call
    if (isValueChanged || isSettingChanged) {
      this.initTextMask()
    }
  }

  render(): JSX.Element {
    const {
      inputElement,
      inputRef, // eslint-disable-line
      mask, // eslint-disable-line
      guide, // eslint-disable-line
      pipe, // eslint-disable-line
      placeholderChar, // eslint-disable-line
      keepCharPositions, // eslint-disable-line
      value, // eslint-disable-line
      onChange, // eslint-disable-line
      showMask, // eslint-disable-line

      ...props
    } = this.props

    const params = {
      onChange: this.onChange,
      ...props,
    }

    return inputElement ? (
      React.cloneElement(inputElement, params)
    ) : (
      <input ref={this.inputRef} {...params} />
    )
  }
}
