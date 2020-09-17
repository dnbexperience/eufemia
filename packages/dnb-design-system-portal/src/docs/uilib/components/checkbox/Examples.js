/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  onChangeHandler = (state) => {
    console.log('onChangeHandler', state)
  }

  render() {
    const { onChangeHandler: onChange } = this
    return (
      <React.Fragment>
        <ComponentBox
          title="Unchecked Checkbox (default state)"
          data-dnb-test="checkbox-default"
          scope={{ onChange }}
        >
          {
            /* @jsx */ `
<Checkbox
  label="Checkbox"
  on_change={onChange}
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Checked Checkbox, left label position"
          data-dnb-test="checkbox-checked"
          scope={{ onChange }}
        >
          {
            /* @jsx */ `
<Checkbox
  label="Label:"
  label_position="left"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Checked Checkbox with error message"
          data-dnb-test="checkbox-error"
          scope={{ onChange }}
        >
          {
            /* @jsx */ `
<Checkbox
  label="Checkbox"
  checked
  status="Error message"
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Checkbox with suffix" scope={{ onChange }}>
          {
            /* @jsx */ `
<Checkbox
  label="Checkbox"
  checked
  suffix={<Modal title="Modal Title">Modal content</Modal>}
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="With different sizes"
          desciption="As for now, there are two sizes. `medium` is the default size."
          data-dnb-test="checkbox-sizes"
        >
          {
            /* @jsx */ `
<Checkbox size="medium" label="Medium" right="large" checked />
<Checkbox size="large" label="Large" checked />
          `
          }
        </ComponentBox>
        <ComponentBox data-dnb-test="checkbox-disabled">
          {
            /* @jsx */ `
<Checkbox
  checked
  disabled
/>
`
          }
        </ComponentBox>
      </React.Fragment>
    )
  }
}

export { Example }
export default Example
