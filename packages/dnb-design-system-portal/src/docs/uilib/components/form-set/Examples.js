/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Use the `FormSet` as a Provider for `FormRow`"
          data-dnb-test="form-set-default"
        >
          {/* @jsx */ `
<FormSet indent="true" direction="horizontal">
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
          caption="Vertical form-set"
          data-dnb-test="form-set-vertical"
        >
          {/* @jsx */ `
<FormSet direction="vertical">
  <FormRow no_label>
    <H2>A h2 in a FormRow without a label</H2>
  </FormRow>
  <FormRow>
    <Checkbox label="Checkbox" />
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox
          caption="FormSet with `on_submit` event and `prevent_submit` set to true"
          data-dnb-test="form-set-submit"
        >
          {/* @jsx */ `
<FormSet
    direction="horizontal"
    on_submit={({ event }) => console.log('on_submit', event)}
    prevent_submit={true}
  >
  <FormRow>
    <Input label="Search Input:" type="search" value="Search text ..." />
    <Button type="submit" text="Trigger submit" left="small" />
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
