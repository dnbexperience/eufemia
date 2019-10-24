/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
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
        <ComponentBox
          caption="Default Slider"
          data-dnb-test="slider-default"
        >
          {/* @jsx */ `
<Slider
  min={0}
  max={100}
  value={70}
  label="Default Slider:"
  on_change={({ value }) => console.log('on_change:', value)}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Vertical slider with steps of 10"
          data-dnb-test="slider-vertical"
          useRender
        >
          {/* @jsx */ `
const VerticalWrapper = styled.div\`
  display: inline-flex;
  flex-direction: column;
  height: 12rem;/* max-height works fine except in Safari */
\`
render(<VerticalWrapper>
  <Slider
    min="0"
    max="100"
    value="20"
    step="10"
    vertical="true"
    label="Vertical slider:"
    label_direction="vertical"
    on_change={({ value }) => console.log('on_change:', value)}
  />
</VerticalWrapper>)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Horizontal and vertical slider in sync with input field"
          useRender
        >
          {/* @jsx */ `
const Component = () => {
  const [value, setValue] = useState(70)
  return (<>
    <Slider
      value={value}
      step={10}
      hide_buttons="true"
      label="Slider A:"
      on_change={({ value }) => setValue(value)}
    />
    <VerticalWrapper>
      <Slider
        value={value}
        vertical={true}
        hide_buttons={true}
        use_scrollwheel={true}
        step={1}
        label="Slider B:"
        label_direction="vertical"
        on_change={({ value }) => setValue(value)}
      />
      <Input
        align="center"
        selectall
        value={String(value)}
        on_change={({ value }) => setValue(parseFloat(value))}
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
          `}
        </ComponentBox>
        <ComponentBox caption="Native Range Slider. In order to get the styles, import also: `dnb-ui-lib/components/slider/style/dnb-range.min.css`">
          {/* @jsx */ `
<FormRow>
  <FormLabel for_id="range-slider">
    Native Range Slider
  </FormLabel>
  <input
    id="range-slider"
    type="range"
    min="0"
    max="100"
    step="5"
    defaultValue="20"
    onChange={(event) => console.log(event.currentTarget.value)}
  />
</FormRow>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
