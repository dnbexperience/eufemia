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
        <ComponentBox
          caption="Defualt Slider"
          data-dnb-test="slider-default"
        >
          {/* @jsx */ `
<Slider
  min={0}
  max={100}
  value={70}
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
  min-height: 12rem;
\`
render(<VerticalWrapper>
  <Slider
    min="0"
    max="100"
    value="20"
    step="10"
    vertical="true"
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
      on_change={({ value }) => setValue(value)}
    />
    <VerticalWrapper>
      <Slider
        value={value}
        vertical={true}
        hide_buttons={true}
        step={1}
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
  min-height: 20rem;

  .dnb-input {
    width: 4rem;
    margin-top: 1rem;
  }
\`
render(<Component />)
          `}
        </ComponentBox>
        <ComponentBox caption="Native Range Slider">
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
