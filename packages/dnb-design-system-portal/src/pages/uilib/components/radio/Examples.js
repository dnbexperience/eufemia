/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  onChangeHandler = state => {
    console.log('onChangeHandler', state)
  }

  render() {
    const { onChangeHandler: onChange } = this
    return (
      <Fragment>
        <ComponentBox
          caption="Unchecked Radio (default state)"
          data-dnb-test="radio-default"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Radio
  label="Label:"
  on_change={onChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Radio"
          data-dnb-test="radio-checked"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Radio
  label="Label:"
  title="Ths is the title"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Checked Radio with error message"
          data-dnb-test="radio-error"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Radio
  label="Label:"
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
      default_state
      checked={radioIsEnabled}
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
