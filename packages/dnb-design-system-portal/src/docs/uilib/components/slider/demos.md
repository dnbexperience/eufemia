---
showTabs: true
---

import ComponentBox from 'Tags/ComponentBox'
import 'dnb-ui-lib/src/components/slider/style/dnb-range.scss'

## Demos

### Default Slider

<ComponentBox data-visual-test="slider-default">
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

### Vertical slider with steps of 10

<ComponentBox data-visual-test="slider-vertical" useRender>
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

### Horizontal and vertical slider in sync with input field

<ComponentBox useRender>
	{/* @jsx */ `
const Component = () => {
  const [value, setValue] = React.useState(70)
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

### Slider with suffix

<ComponentBox>
	{/* @jsx */ `
<Slider
  min={0}
  max={100}
  value={70}
  label="Slider with suffix:"
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
	`}
</ComponentBox>

### Native Range Slider

In order to get the styles, import also: `dnb-ui-lib/components/slider/style/dnb-range.min.css`

<ComponentBox>
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
