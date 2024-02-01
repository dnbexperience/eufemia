/**
 * UI lib Component Example
 *
 */

import styled from '@emotion/styled'
import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { format } from '@dnb/eufemia/src/components/number-format/NumberUtils'
import { Slider, HelpButton, Input, Flex } from '@dnb/eufemia/src'
import { Provider } from '@dnb/eufemia/src/shared'

export const SliderExampleDefault = () => (
  <ComponentBox data-visual-test="slider-default">
    <Slider
      min={0}
      max={100}
      value={70}
      label="Default Slider"
      numberFormat={{ currency: 'EUR' }}
      tooltip={true}
      onChange={({ value }) => console.log('onChange:', value)}
    />
  </ComponentBox>
)

export const SliderExampleMultiButtons = () => (
  <ComponentBox data-visual-test="slider-multi" scope={{ format }}>
    <Provider formElement={{ label_direction: 'vertical' }}>
      <Flex.Vertical align="stretch">
        <Slider
          min={0}
          max={100}
          value={[30, 70]}
          step={5}
          label="Range with steps"
          numberFormat={{ currency: 'USD' }}
          tooltip
          onChange={({ value }) => console.log('onChange:', value)}
        />
        <Slider
          min={0}
          max={100}
          value={[10, 30, 50, 70]}
          label="Multi thumbs"
          numberFormat={(value) =>
            format(value, { percent: true, decimals: 0 })
          }
          tooltip
          onChange={({ value, number }) =>
            console.log('onChange:', value, number)
          }
        />
      </Flex.Vertical>
    </Provider>
  </ComponentBox>
)

export const SliderExampleMultiButtonsThumbBehavior = () => (
  <ComponentBox>
    <Provider formElement={{ label_direction: 'vertical' }}>
      <Flex.Vertical align="stretch">
        <Slider
          multiThumbBehavior="omit"
          value={[30, 70]}
          label="Omit behavior"
          numberFormat={{ currency: 'EUR' }}
          tooltip={true}
          onChange={({ value }) => console.log('onChange:', value)}
        />
        <Slider
          multiThumbBehavior="push"
          min={-40}
          value={[-10, 50, 70]}
          step={1}
          label="Push behavior"
          numberFormat={{ currency: true }}
          tooltip={true}
          onChange={({ value, number }) =>
            console.log('onChange:', value, number)
          }
        />
      </Flex.Vertical>
    </Provider>
  </ComponentBox>
)

export const SliderExampleHorizontalSync = () => (
  <ComponentBox scope={{ format }}>
    {() => {
      const Component = () => {
        const [value, setValue] = React.useState(70)
        return (
          <>
            <Slider
              value={value}
              step={1}
              hideButtons
              label="Slider A"
              numberFormat={{ currency: 'EUR' }}
              tooltip={true}
              onChange={({ value }) => setValue(parseFloat(String(value)))}
            />
            <VerticalWrapper>
              <Slider
                value={value}
                vertical={true}
                hideButtons={true}
                step={10}
                label="Slider B"
                labelDirection="vertical"
                numberFormat={(value) =>
                  format(value, { currency: 'NOK' })
                }
                tooltip
                alwaysShowTooltip
                onChange={({ value }) =>
                  setValue(parseFloat(String(value)))
                }
              />
              <Input
                align="center"
                selectall
                value={String(value)}
                on_change={({ value }) => setValue(value)}
              />
            </VerticalWrapper>
          </>
        )
      }
      const VerticalWrapper = styled.div`
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        height: 20rem; /* max-height works fine except in Safari */
        margin-top: 1rem;
        padding: 1rem;
        background: dimgray;
        .dnb-input {
          width: 4rem;
          margin-top: 1rem;
        }
      `
      return <Component />
    }}
  </ComponentBox>
)

export const SliderExampleSuffix = () => (
  <ComponentBox>
    <Slider
      min={0}
      max={100}
      value={70}
      label="Slider with suffix"
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    />
  </ComponentBox>
)

export const SliderVerticalWithSteps = () => (
  <ComponentBox data-visual-test="slider-vertical">
    {() => {
      const VerticalWrapper = styled.div`
        display: inline-flex;
        flex-direction: column;
        height: 12rem; /* max-height works fine except in Safari */
      `
      return (
        <VerticalWrapper>
          <Slider
            min={0}
            max={100}
            value={20}
            step={10}
            vertical={true}
            label="Vertical slider"
            labelDirection="vertical"
            onChange={({ value }) => console.log('onChange:', value)}
          />
        </VerticalWrapper>
      )
    }}
  </ComponentBox>
)

export const SliderExampleMarker = () => (
  <ComponentBox data-visual-test="slider-marker">
    <Slider
      min={0}
      max={100}
      value={50}
      marker={{ value: 20, text: 'Default value' }}
      label="Slider with marker"
    />
  </ComponentBox>
)
