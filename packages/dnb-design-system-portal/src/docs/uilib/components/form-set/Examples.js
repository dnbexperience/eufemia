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
          title="Use the `FormSet` as a Provider for `FormRow`"
          data-dnb-test="form-set-default"
        >
          {/* @jsx */ `
<FormSet indent="true">
  <FormRow no_label>
    <H2>A h2 in a FormRow without a label</H2>
  </FormRow>
  <FormRow section_style="default" section_spacing label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:">
    <Radio.Group
      value="first"
    >
      <Radio label="First" value="first" />
      <Radio label="Second" value="second" />
      <Radio label="Third" value="third" />
    </Radio.Group>
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox
          title="FormSet where FormRow inherits the direction"
          data-dnb-test="form-set-vertical"
        >
          {/* @jsx */ `
<FormSet direction="vertical">
  <FormRow label={<H2>Custom Legend:</H2>}>
    <Input label="Label:" bottom />
    <Input label="Label:" />
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox
          title="FormSet with `on_submit` event and `prevent_submit` set to true"
          data-dnb-test="form-set-submit"
        >
          {/* @jsx */ `
<FormSet
    direction="horizontal"
    on_submit={({ event }) => console.log('on_submit', event)}
    prevent_submit={true}
  >
  <FormRow>
    <Input label="Search Input:" type="search" value="Search text ..." right="small" />
    <Button type="submit" text="Trigger submit" />
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
      </React.Fragment>
    )
  }
}

export default Example
