/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Unchecked Radio (default state)"
          data-dnb-test="radio-default"
        >
          {/* @jsx */ `
<Radio
  label="Single Radio:"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Radio"
          data-dnb-test="radio-checked"
        >
          {/* @jsx */ `
<Radio
  label="Checked Radio:"
  title="Ths is the title"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Radio group" data-dnb-test="radio-group">
          {/* @jsx */ `
<Radio.Group
  label="Radio Group:"
  title="Give me a Title"
  on_change={({ value }) => { console.log('on_change', value) }}
  value="first"
>
  <Radio label="First" value="first" label_position="right" />
  <Radio label="Second" value="second" label_position="right" />
  <Radio
    label="Third"
    value="third"
    label_position="right"
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Vertical aligned Radio group"
          data-dnb-test="radio-group-vertical"
        >
          {/* @jsx */ `
<Radio.Group
  label="Vertical Group:"
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <Radio label="First" value="first" label_position="right" />
  <Radio label="Second" value="second" label_position="right" />
  <Radio
    label="Third"
    value="third"
    checked
    label_position="right"
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Radio group with status messages"
          data-dnb-test="radio-group-status"
        >
          {/* @jsx */ `
<Radio.Group
  label="Radio Group with status:"
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <Radio label="First" value="first" label_position="right" status="error" />
  <Radio
    label="Second"
    value="second"
    label_position="right"
    status="Error message"
  />
  <Radio
    label="Third"
    value="third"
    checked
    label_position="right"
    status="Info message"
    status_state="info"
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Plain Radio group. Without `<Radio.Group>`"
          data-dnb-test="radio-group-plain"
        >
          {/* @jsx */ `
<p className="dnb-p dnb-radio-group">
  <FormLabel id="MyRadioGroup">Plain Radio group:</FormLabel>
  <Radio
    value="first"
    label="First"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
  <Radio
    checked
    value="second"
    label="Second"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
  <Radio
    checked
    value="third"
    label="Third"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
</p>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Disabled Radio group"
          data-dnb-test="radio-group-disabled"
        >
          {/* @jsx */ `
<Radio.Group
  label="Disabled Group:"
  disabled
  name="MyGroup" // The Group Name
>
  <Radio label="First" value="first" label_position="right" />
  <Radio label="Second" value="second" label_position="right" />
  <Radio
    label="Third"
    value="third"
    label_position="right"
    checked
  />
</Radio.Group>
          `}
        </ComponentBox>
        <StateDemo />
      </Fragment>
    )
  }
}

class StateDemo extends PureComponent {
  render() {
    return typeof window !== 'undefined' && window.IS_TEST ? (
      <ComponentBox data-dnb-test="radio-disabled">
        {/* @jsx */ `
<Radio
  checked
  disabled
/>
`}
      </ComponentBox>
    ) : (
      <ComponentBox
        caption="Disabled Radio in checked state"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [radioIsEnabled, setState] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => setState(!radioIsEnabled), 1e3)
    return () => clearTimeout(timer)
  })
  return (<>
    <FormLabel
      id="radio-1-label"
      for_id="radio-1"
      text="Radio label:"
    />
    <Radio
      id="radio-1"
      title_positive="Yes"
      title_negative="No"
      aria-labelledby="radio-1-label"
      checked={radioIsEnabled}
      on_state_update={({checked}) => {}}
      readOnly
    />
  </>)
}
        `}
      </ComponentBox>
    )
  }
}

export { Example }
export default () => <Example />
