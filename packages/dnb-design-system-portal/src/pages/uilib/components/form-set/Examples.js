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
          caption="Use the `FormSet` as a Provider for `FormRow`"
          data-dnb-test="form-set-default"
        >
          {/* @jsx */ `
<FormSet size direction="horizontal">
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
<FormRow direction="vertical">
  <FormRow no_label>
    <H2>A h2 in a FormRow without a label</H2>
  </FormRow>
  <FormRow>
    <Checkbox label="Checkbox" />
  </FormRow>
</FormRow>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
