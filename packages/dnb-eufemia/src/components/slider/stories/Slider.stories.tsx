/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { Slider, ToggleButton, Input, FormRow, FormLabel } from '../../'

import '../../slider/style/dnb-range.scss'

export default {
  title: 'Eufemia/Components/Slider',
}

const VerticalWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: column;

  max-width: 10rem;

  .dnb-slider__inner {
    height: 20rem; /* max-height works fine except in Safari */
  }

  .dnb-input {
    width: 4rem;
    margin-top: 1rem;
  }
`

const SliderStory = () => {
  const [value, setValue] = React.useState(70)
  return (
    <Wrapper>
      <Box>
        <DisabledState />
      </Box>
      <Box>
        Text
        <Slider
          // hide_buttons
          label="Label:"
          suffix="123"
          // min={'50'}
          max={100}
          value={value}
          step={0.05}
          number_format={{ decimals: 2, currency: true }}
          // reverse
          on_change={({ value, number, rawValue }) => {
            console.log('on_change:', { value, number, rawValue })
            setValue(value)
          }}
          status="Long status message Lobortis lacus ac ligula vehicula Metus nullam ut at pellentesque"
        />
      </Box>
      <Box>
        <VerticalWrapper>
          <Slider
            label="Label Lobortis lacus ac ligula vehicula Metus nullam ut at pellentesque:"
            label_direction="vertical"
            suffix="123"
            min={0}
            max={100}
            value={value}
            step={1}
            vertical
            on_change={({ value }) => {
              console.log('on_change:', value)
              setValue(value)
            }}
            status="Long status message Lobortis lacus ac ligula vehicula"
          />
          <Input
            align="center"
            value={String(value)}
            on_change={({ value }) => {
              setValue(value)
            }}
          />
        </VerticalWrapper>
      </Box>
      <Box>
        <Slider label="Disabled:" value={20} reverse disabled={true} />
      </Box>
      <Box>
        <FormRow>
          <FormLabel
            id="range-slider-label"
            for_id="range-slider"
            text="Native Range Slider"
          />
          <Slider label="Label" value={5} />
          <input
            id="range-slider"
            type="range"
            min="0"
            max="100"
            step="5"
            defaultValue={20}
            onChange={(event) => {
              console.log('range-slider:', event.currentTarget.value)
            }}
          />
        </FormRow>
      </Box>
    </Wrapper>
  )
}

const DisabledState = () => {
  const [isDisabled, setDisabled] = React.useState(false)
  return (
    <FormRow direction="horizontal" centered>
      <ToggleButton
        checked={isDisabled}
        right
        on_change={() => setDisabled((s) => !s)}
      >
        Set as disabled
      </ToggleButton>
      <Slider
        min={0}
        max={100}
        value={70}
        label="Default Slider:"
        disabled={isDisabled}
      />
    </FormRow>
  )
}

export const Sliders = () => <SliderStory />
