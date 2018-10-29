/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import { css } from 'react-emotion'
import Slider from './Slider'
import Input from '../input/Input'
import FormLabel from '../../components/form-label/FormLabel'

class Example extends Component {
  onChangeHandler = ({ value }) => {
    console.log('on_change', value)
  }
  render() {
    return (
      <Fragment>
        <Slider
          min={0}
          max={100}
          value={70}
          step={10}
          on_change={this.onChangeHandler}
          attributes={{
            'data-fake:on_change': 'SliderDemo.onChangeHandler()',
            'data-fake:on_state_update':
              'SliderDemo.onStateUpdateHandler()'
          }}
        />
        <Slider value="70" max="100" disabled />
      </Fragment>
    )
  }
}

class AditionalExample extends Component {
  state = {
    value: 5908000
  }

  render() {
    return (
      <div
        css={css`
          .dnb-form {
            padding-top: 2em;
          }

          .dnb-slider__slider-row {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            align-content: center;

            .dnb-slider {
              width: 100%;
            }

            .dnb-slider__input-container {
              margin: 0.2rem 0 0 0;
              flex: 3;
            }
            .dnb-slider__output-container {
              margin: 0 0 0 0.5rem;
              flex: 2;
            }
            .dnb-slider__input {
              margin: 0 0.25rem;
            }
          }
        `}
      >
        <Example />
        <form className="dnb-form">
          <div className="dnb-form__item">
            <div className="dnb-form__cell">
              <FormLabel
                for_id="slider-2"
                text="Hvor mye ønsker du å kjøpe bolig for?"
              />
            </div>
            <div className="dnb-form__cell dnb-slider__slider-row">
              <div className="dnb-slider__input-container">
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
              </div>
              <div className="dnb-slider__output-container">
                <Input
                  type="text"
                  value={this.state.value}
                  font_class="typo-light typo-number--old-style"
                  description="Kr"
                  extra_information="Maksimumsbeløpet inkluderer eventuell fellesgjeld og omkostninger ved kjøp."
                  on_change={({ value }) => {
                    this.setState({ value: parseFloat(value) })
                  }}
                />
              </div>
            </div>
            <div
              className="dnb-form__cell"
              css={css`
                height: 10rem;
              `}
            >
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
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export { Example }
export default AditionalExample
