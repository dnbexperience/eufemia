/**
 * Web RangeSlider Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes
} from '../../shared/component-helper'
// import './style/dnb-range-slider.scss' // no good solution to import the style here
import Slider from '../../components/slider/Slider'
import Input from '../../components/input/Input'
import Modal from '../../components/modal/Modal'
import FormLabel from '../../components/form-label/FormLabel'

export default class RangeSlider extends React.PureComponent {
  static tagName = 'dnb-range-slider'

  static propTypes = {
    label_text: PropTypes.string.isRequired,
    range_min: PropTypes.number.isRequired,
    range_max: PropTypes.number.isRequired,
    range_val: PropTypes.number.isRequired,
    range_step: PropTypes.number.isRequired,
    range_output_description: PropTypes.string.isRequired,
    range_output_extra_information: PropTypes.string.isRequired,
    range_trigger_text: PropTypes.string.isRequired,
    range_modal_text: PropTypes.string.isRequired,
    class: PropTypes.string,
    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    title: null,
    text: null,
    descriptionListData: null,
    descriptionListInfo: null,
    class: null,
    /** React props */
    className: null,
    children: null
  }

  state = { value: null }

  static enableWebComponent() {
    registerElement(
      RangeSlider.tagName,
      RangeSlider,
      RangeSlider.defaultProps
    )
  }

  constructor(props) {
    super(props)
    this.state.value = props.range_val
  }

  render() {
    const {
      range_min,
      range_max,
      // range_val,
      range_step,
      label_text,
      range_output_description,
      range_output_extra_information,
      range_trigger_text,
      range_modal_text,
      className,
      class: _className
    } = this.props

    const params = {
      className: classnames('dnb-range-slider', className, _className)
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div {...params}>
        <div className="dnb-range-slider__label">
          <div className="dnb-range-slider__label__inner">
            <FormLabel for_id="range-slider" text={label_text} />
          </div>
        </div>
        <div className="dnb-range-slider__slider">
          <div className="dnb-range-slider__input-container">
            <Slider
              id="range-slider"
              min={range_min}
              max={range_max}
              value={this.state.value}
              step={range_step}
              on_init={({ value }) => {
                this.setState({ value })
              }}
              on_change={({ value }) => {
                this.setState({ value })
              }}
            />
          </div>
          <div className="dnb-range-slider__output-container">
            <Input
              type="text"
              size="large"
              value={this.state.value}
              description={range_output_description}
              status={range_output_extra_information}
              status_state="info"
              on_change={({ value }) => {
                this.setState({ value: parseFloat(value) })
              }}
            />
          </div>
          <div className="dnb-range-slider__slider__modal">
            <Modal
              type="button"
              trigger_text={range_trigger_text}
              modal_content={range_modal_text}
            />
          </div>
        </div>
      </div>
    )
  }
}
