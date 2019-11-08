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
          caption="Unchecked Switch (default state)"
          data-dnb-test="switch-default"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Switch
  label="Switch"
  on_change={onChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Switch"
          data-dnb-test="switch-checked"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Switch
  label="Label:"
  label_position="left"
  title="Ths is the title"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Switch with error message"
          data-dnb-test="switch-error"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Switch
  label="Switch"
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
      <ComponentBox data-dnb-test="switch-disabled">
        {/* @jsx */ `
<Switch
  checked
  disabled
  label="Disabled"
/>
`}
      </ComponentBox>
    ) : (
      <ComponentBox
        caption="Disabled Switch in checked state"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [switchIsEnabled, setState] = React.useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => setState(!switchIsEnabled), 1e3)
    return () => clearInterval(timer)
  })
  return (<>
    <FormLabel
      id="switch-1-label"
      for_id="switch-1"
      text="Switch label:"
    />
    <Switch
      id="switch-1"
      aria-labelledby="switch-1-label"
      default_state={true}
      checked={switchIsEnabled}
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
