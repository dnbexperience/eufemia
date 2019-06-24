/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Slider, FormRow, FormLabel } from '../../src/components'

import '../../src/components/slider/style/dnb-range.scss'

const VerticalHeight = styled.div`
  height: 10rem;
`

const SliderStory = () => {
  const [value, setValue] = useState(70)
  return (
    <Wrapper>
      <Box>
        <Slider
          min={0}
          max={100}
          value={value}
          step={10}
          reverse
          on_change={({ value, raw_value }) => {
            console.log('on_change:', value, raw_value)
            setValue(value)
          }}
          // on_state_update={({ value }) => {
          //   console.log('on_state_update:', value)
          // }}
          // attributes={{
          //   'data-fake:on_change': 'SliderDemo.onChangeHandler()',
          //   'data-fake:on_state_update':
          //     'SliderDemo.onStateUpdateHandler()'
          // }}
        />
      </Box>
      <Box>
        <VerticalHeight>
          <Slider
            min={0}
            max={100}
            value={value}
            // step={10}
            reverse
            vertical
            on_change={({ value, raw_value }) => {
              console.log('on_change:', value, raw_value)
              setValue(value)
            }}
            // on_state_update={({ value }) => {
            //   console.log('on_state_update:', value)
            // }}
            // attributes={{
            //   'data-fake:on_change': 'SliderDemo.onChangeHandler()',
            //   'data-fake:on_state_update':
            //     'SliderDemo.onStateUpdateHandler()'
            // }}
          />
        </VerticalHeight>
      </Box>
      <Box>
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
            on_change={({ value }) => {
              console.log('value:', value)
            }}
          />
        </FormRow>
      </Box>
    </Wrapper>
  )
}

export default ['Slider', () => <SliderStory />]
