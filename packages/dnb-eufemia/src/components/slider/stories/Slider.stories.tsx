/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import {
  Slider,
  ToggleButton,
  Input,
  FormRow,
  FormLabel,
  Tooltip,
} from '../../'

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
const FixedSizeWrapper = styled.div`
  width: 20rem;
  height: 20rem;
  margin-bottom: 1rem;
`

export function MultiButtons() {
  const [value, setValue] = React.useState<Array<number>>([10, 40, 80])

  return (
    <>
      <FixedSizeWrapper>
        <Tooltip active show>
          Tooltip
        </Tooltip>
        <Slider
          label="Label2:"
          value={value}
          stretch
          numberFormat={{ decimals: 2, currency: true }}
          onChange={({ value, number }) => {
            console.log('onChange:', value, number)
            setValue(value as Array<number>)
          }}
        />
        <code>{value.join(' | ')}</code>
      </FixedSizeWrapper>

      <FixedSizeWrapper>
        <Slider value={80} step={1} stretch />
      </FixedSizeWrapper>
    </>
  )
}

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
          // hideButtons
          label="Label:"
          suffix="123"
          // min={'50'}
          max={100}
          value={value}
          step={0.05}
          numberFormat={{ decimals: 2, currency: true }}
          // reverse
          onChange={({ value, number, rawValue }) => {
            console.log('onChange:', { value, number, rawValue })
            setValue(value as number)
          }}
          status="Long status message Lobortis lacus ac ligula vehicula Metus nullam ut at pellentesque"
        />
      </Box>
      <Box>
        <VerticalWrapper>
          <Slider
            label="Label Lobortis lacus ac ligula vehicula Metus nullam ut at pellentesque:"
            labelDirection="vertical"
            suffix="123"
            min={0}
            max={100}
            value={value}
            step={1}
            vertical
            onChange={({ value }) => {
              console.log('onChange:', value)
              setValue(value as number)
            }}
            status="Long status message Lobortis lacus ac ligula vehicula"
          />
          <Input
            align="center"
            value={String(value)}
            onChange={({ value }) => {
              setValue(value as number)
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
        onChange={() => setDisabled((s) => !s)}
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
