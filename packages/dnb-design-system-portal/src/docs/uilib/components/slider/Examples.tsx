/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import { format } from '@dnb/eufemia/src/components/number-format/NumberUtils'

export const SliderExampleDefault = () => (
  <ComponentBox data-visual-test="slider-default">
    {
      /* jsx */ `
<Slider
  min={0}
  max={100}
  value={70}
  label="Default Slider:"
  numberFormat={{ currency: 'EUR' }}
  tooltip={true}
  onChange={({ value }) => console.log('onChange:', value)}
/>
  `
    }
  </ComponentBox>
)

export const SliderExampleMultiButtons = () => (
  <ComponentBox data-visual-test="slider-multi" scope={{ format }}>
    {
      /* jsx */ `
<FormRow vertical>
  <Slider
    min={0}
    max={100}
    value={[30, 70]}
    step={5}
    label="Range with steps:"
    numberFormat={{ currency: 'USD' }}
    tooltip
    onChange={({ value }) => console.log('onChange:', value)}
    bottom
    />
    <Slider
    min={0}
    max={100}
    value={[10, 30, 50, 70]}
    label="Multi thumbs:"
    numberFormat={(value) => format(value, { percent: true, decimals: 0 })}
    tooltip
    onChange={({ value, number }) => console.log('onChange:', value, number)}
  />
</FormRow>
  `
    }
  </ComponentBox>
)

export const SliderExampleMultiButtonsThumbBehavior = () => (
  <ComponentBox>
    {
      /* jsx */ `
<FormRow vertical>
  <Slider
    multiThumbBehavior="omit"
    value={[30, 70]}
    label="Omit behavior:"
    numberFormat={{ currency: 'EUR' }}
    tooltip={true}
    onChange={({ value }) => console.log('onChange:', value)}
    bottom
    />
    <Slider
    multiThumbBehavior="push"
    value={[10,  50, 70]}
    step={1}
    label="Push behavior:"
    numberFormat={{ currency: true }}
    tooltip={true}
    onChange={({ value, number }) => console.log('onChange:', value, number)}
  />
</FormRow>
  `
    }
  </ComponentBox>
)

export const SliderExampleHorizontalSync = () => (
  <ComponentBox useRender scope={{ format }}>
    {
      /* jsx */ `
const Component = () => {
  const [value, setValue] = React.useState(70)
  return (<>
    <Slider
      value={value}
      step={1}
      hideButtons
      label="Slider A:"
      numberFormat={{ currency: 'EUR' }}
      tooltip={true}
      onChange={({ value }) => setValue(value)}
    />
    <VerticalWrapper>
      <Slider
        value={value}
        vertical={true}
        hideButtons={true}
        step={10}
        label="Slider B:"
        labelDirection="vertical"
        numberFormat={(value) => format(value, { currency: 'NOK' })}
        tooltip
        alwaysShowTooltip
        onChange={({ value }) => setValue(value)}
      />
      <Input
        align="center"
        selectall
        value={String(value)}
        onChange={({ value }) => setValue(value)}
      />
    </VerticalWrapper>
  </>)
}
const VerticalWrapper = styled.div\`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 20rem;/* max-height works fine except in Safari */
  margin-top: 1rem;
  background: rgba(0,0,0,0.1);
  .dnb-input {
    width: 4rem;
    margin-top: 1rem;
  }
\`
render(<Component />)
  `
    }
  </ComponentBox>
)

export const SliderExampleSuffix = () => (
  <ComponentBox>
    {
      /* jsx */ `
<Slider
  min={0}
  max={100}
  value={70}
  label="Slider with suffix:"
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
  `
    }
  </ComponentBox>
)

export const SliderVerticalWithSteps = () => (
  <ComponentBox data-visual-test="slider-vertical" useRender>
    {
      /* jsx */ `
const VerticalWrapper = styled.div\`
  display: inline-flex;
  flex-direction: column;
  height: 12rem;/* max-height works fine except in Safari */
\`
render(<VerticalWrapper>
  <Slider
    min={0}
    max={100}
    value={20}
    step={10}
    vertical={true}
    label="Vertical slider:"
    labelDirection="vertical"
    onChange={({ value }) => console.log('onChange:', value)}
  />
</VerticalWrapper>)
  `
    }
  </ComponentBox>
)
