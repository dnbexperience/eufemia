/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  onChangeHandler = state => {
    console.log('onChangeHandler', state)
  }

  render() {
    const { onChangeHandler: onChange } = this
    return (
      <Fragment>
        <ComponentBox
          caption="Unchecked Checkbox (default state)"
          data-dnb-test="checkbox-default"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Checkbox
  label="Checkbox"
  on_change={onChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Checkbox, left label position"
          data-dnb-test="checkbox-checked"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Checkbox
  label="Label:"
  label_position="left"
  title="Ths is the title"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Checkbox with error message"
          data-dnb-test="checkbox-error"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Checkbox
  label="Checkbox"
  checked
  status="Error message"
/>
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
      <ComponentBox data-dnb-test="checkbox-disabled">
        {/* @jsx */ `
<Checkbox
  checked
  disabled
/>
`}
      </ComponentBox>
    ) : (
      <ComponentBox
        caption="Disabled Checkbox in checked state"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [checkboxIsEnabled, setState] = React.useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => setState(!checkboxIsEnabled), 1e3)
    return () => clearTimeout(timer)
  })
  return (<>
    <FormLabel
      id="checkbox-1-label"
      for_id="checkbox-1"
      text="Checkbox label:"
    />
    <Checkbox
      id="checkbox-1"
      aria-labelledby="checkbox-1-label"
      default_state
      checked={checkboxIsEnabled}
      on_state_update={({checked}) => {}}
      disabled
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
