/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
// import styled from '@emotion/styled'

// import the native range slider as well
import 'dnb-ui-lib/src/components/slider/style/dnb-range.scss'

class Example extends PureComponent {
  onChangeHandler = ({ value }) => {
    console.log('on_change', value)
  }

  render() {
    return (
      <Fragment>
        <ComponentBox caption="Defualt Slider">
          {/* @jsx */ `
<Slider
  min={0}
  max={100}
  value={70}
  step={10}
  // on_change={this.onChangeHandler}
  // attributes={{
  //   'data-fake:on_change': 'SliderDemo.onChangeHandler()',
  //   'data-fake:on_state_update':
  //     'SliderDemo.onStateUpdateHandler()'
  // }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Horizontal slider - two states: active (above) and disabled (below)">
          {/* @jsx */ `
<Slider value="70" max="100" disabled />
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

class AditionalExample extends PureComponent {
  state = {
    value: 5908000
  }
  handleRangeChange = ({ target: { value } }) => {
    console.log(value)
  }
  render() {
    return (
      <>
        <Example />
        <ComponentBox caption="Defualt Slider">
          {/* @jsx */ `
{/* <FormLabel
  for_id="slider-2"
  text="Hvor mye ønsker du å kjøpe bolig for?"
/> */}
<Slider
  id="slider-2"
  min={1000000}
  max={8000000}
  value={this.state.value}
  step={100000}
  on_init={({ value }) => {
    this.setState({ value })
  }}
  on_change={({ value }) => {
    this.setState({ value })
  }}
/>
<Input
  type="text"
  value={this.state.value}
  input_class="dnb-typo-number--old-style"
  // input_class="dnb-typo-number--lining"
  description="Kr"
  extra_information="Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp."
  on_change={({ value }) => {
    this.setState({ value: parseFloat(value) })
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Sliders (horizontal and vertical) with value input field">
          {/* @jsx */ `
<Slider
  id="slider-3"
  min={1000000}
  max={8000000}
  value={this.state.value}
  step={10}
  vertical
  reverse
  on_change={({ value }) => {
    this.setState({ value })
  }}
  on_state_update={({ value }) => {
    console.log('on_state_update', value)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Sliders (horizontal and vertical) with value input field">
          {/* @jsx */ `
<FormRow>
  <FormLabel
    id="range-slider-label"
    for_id="range-slider"
    text="Native Range Slider"
  />
  <input
    id="range-slider"
    type="range"
    min="0"
    max="100"
    step="5"
    defaultValue="20"
    onChange={this.handleRangeChange}
  />
</FormRow>
          `}
        </ComponentBox>
        {/* <div className="example-box">
          <form className="dnb-form">
            <div className="dnb-form__item">
form
            </div>
            <div className="dnb-form__item">
              <div className="dnb-slider__slider-row">
                <div className="dnb-slider__input-container">
slider
                </div>
                <div className="dnb-slider__output-container">
input
                </div>
              </div>
            </div>
            <Cell className="dnb-form__item">

            </Cell>
          </form>
          <p className="example-caption">
          </p>
        </div>
        <div className="example-box">

        </div> */}
      </>
    )
  }
}

// const Wrapper = styled.div`
//   .dnb-form {
//     padding-top: 2em;
//   }
//
//   .dnb-slider__slider-row {
//     display: flex;
//     align-items: flex-start;
//     justify-content: center;
//     align-content: center;
//
//     .dnb-slider {
//       width: 100%;
//     }
//
//     .dnb-slider__input-container {
//       flex: 3;
//     }
//     .dnb-slider__output-container {
//       margin: 0 0 0 0.5rem;
//       flex: 2;
//     }
//     .dnb-slider__input {
//       margin: 0 0.25rem;
//     }
//   }
// `

export { Example }
export default AditionalExample
