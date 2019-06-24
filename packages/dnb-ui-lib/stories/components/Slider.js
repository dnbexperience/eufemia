/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Slider, FormRow, FormLabel } from '../../src/components'

import '../../src/components/slider/style/dnb-range.scss'

export default [
  'Slider',
  () => (
    <Wrapper>
      <Box>
        <Slider
          min={0}
          max={100}
          value={70}
          step={10}
          on_change={({ value }) => {
            console.log('value:', value)
          }}
          // attributes={{
          //   'data-fake:on_change': 'SliderDemo.onChangeHandler()',
          //   'data-fake:on_state_update':
          //     'SliderDemo.onStateUpdateHandler()'
          // }}
        />
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
]
