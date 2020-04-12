/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          title="Default form-label"
          data-dnb-test="form-label-default"
        >
          {/* @jsx */ `
<FormLabel for_id="alone-1">
  Default horizontal FormLabel:
</FormLabel>
<Checkbox id="alone-1" label="Checkbox" />
          `}
        </ComponentBox>
        <ComponentBox
          title="Vertical form-label"
          data-dnb-test="form-label-vertical"
        >
          {/* @jsx */ `
<FormLabel for_id="alone-2" direction="vertical">
  Vertical FormLabel:
</FormLabel>
<Checkbox id="alone-2" label="Checkbox" />
          `}
        </ComponentBox>
        <ComponentBox title="Vertical form-label without a `for_id`">
          {/* @jsx */ `
<FormLabel vertical={true}>
  Without for_id (select me):
</FormLabel>
<Checkbox label="Checkbox" />
          `}
        </ComponentBox>
        <ComponentBox title="A form-label using `.dnb-form` (pattern)">
          {/* @jsx */ `
<form className="dnb-form">
  <div className="dnb-form__item">
    <div className="dnb-form__cell">
      <FormLabel
        for_id="switch-1"
        text="Form Label Text (click me):"
      />
    </div>
    <div className="dnb-form__cell">
      <Switch
        id="switch-1"
        value="Value of switch"
      />
    </div>
  </div>
</form>
          `}
        </ComponentBox>
      </React.Fragment>
    )
  }
}

export default Example
