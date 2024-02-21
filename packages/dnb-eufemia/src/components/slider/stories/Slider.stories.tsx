/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { Slider, ToggleButton, Input, FormLabel, Flex } from '../../'
import { format } from '../../number-format/NumberUtils'
import { Provider } from '../../../shared'
import SliderMarker from '../SliderMarker'

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

export function Marker() {
  return (
    <>
      <Slider
        extensions={{
          marker: {
            instance: SliderMarker,
            value: 50,
          },
        }}
        label="Label with some text"
        labelDirection="vertical"
        min={-40}
        max={100}
        stretch
        numberFormat={(value) => format(value, { currency: 'USD' })}
        tooltip
      />
      <div style={{ height: '20rem' }}>
        <Slider
          extensions={{
            marker: {
              instance: SliderMarker,
              value: 50,
              text: 'Custom text',
            },
          }}
          label="Label with some text"
          labelDirection="vertical"
          min={-40}
          max={100}
          stretch
          tooltip
          vertical
        />
      </div>
    </>
  )
}

export function NegativeValues() {
  const [value, setValue] = React.useState<Array<number>>([-20, 50])

  return (
    <FixedSizeWrapper>
      <Slider
        top="x-large"
        label="Label with some text"
        labelDirection="vertical"
        multiThumbBehavior="push"
        // multiThumbBehavior="omit"
        // vertical
        // reverse
        // step={10}
        value={value}
        min={-40}
        max={100}
        stretch
        numberFormat={(value) => format(value, { currency: 'USD' })}
        tooltip
        onChange={({ value, number }) => {
          console.log('onChange:', value, number)
          setValue(value as Array<number>)
        }}
      />
      <code>{value.join(' | ')}</code>
    </FixedSizeWrapper>
  )
}

export function MultiButtons() {
  const [value, setValue] = React.useState<Array<number>>([100, 400, 800])
  const [valueSecond, setValueSecond] = React.useState<number>(800)

  return (
    <>
      <FixedSizeWrapper>
        <Slider
          top="x-large"
          label="Label with some text"
          labelDirection="vertical"
          multiThumbBehavior="push"
          // multiThumbBehavior="omit"
          // vertical
          // reverse
          value={value}
          min={100}
          max={1000}
          step={10}
          stretch
          numberFormat={(value) => format(value, { currency: 'USD' })}
          tooltip
          onChange={({ value, number }) => {
            // console.log('onChange:', value, number)
            setValue(value as Array<number>)
          }}
        />
        <code>{value.join(' | ')}</code>
      </FixedSizeWrapper>

      <FixedSizeWrapper>
        <Slider
          top="x-large"
          label="Label with some text"
          labelDirection="vertical"
          value={valueSecond}
          min={100}
          max={1000}
          step={10}
          stretch
          vertical
          // reverse
          numberFormat={{
            decimals: 2,
            currency: 'EUR',
            currency_display: 'symbol',
          }}
          tooltip
          onChange={({ value, number }) => {
            // console.log('onChange:', value, number)
            setValueSecond(value as number)
          }}
        />
        <code>{valueSecond}</code>
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
          numberFormat={{ currency: true }}
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
            on_change={({ value }) => {
              setValue(value as number)
            }}
          />
        </VerticalWrapper>
      </Box>
      <Box>
        <Slider label="Disabled:" value={20} reverse disabled={true} />
      </Box>
      <Box>
        <Flex.Horizontal align="baseline">
          <FormLabel
            id="range-slider-label"
            for_id="range-slider"
            text="Native Range Slider"
          />
          <Slider label="Label" value={5} />
        </Flex.Horizontal>
      </Box>
    </Wrapper>
  )
}

const DisabledState = () => {
  const [isDisabled, setDisabled] = React.useState(false)
  return (
    <Provider formElement={{ direction: 'horizontal' }}>
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
    </Provider>
  )
}

export const Sliders = () => <SliderStory />
