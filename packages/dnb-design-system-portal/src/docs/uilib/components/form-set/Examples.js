/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const FormSetDefault = () => (
  <ComponentBox data-visual-test="form-set-default">
    {() => /* jsx */ `
<FormSet indent="true">
  <FormRow no_label>
    <H2>A semantic h2 in a FormRow without a label</H2>
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
)

export const FormSetVertical = () => (
  <ComponentBox data-visual-test="form-set-vertical">
    {() => /* jsx */ `
<FormSet direction="vertical">
  <FormRow label={<Space element="span" className="dnb-h--large">Custom Legend:</Space>}>
    <Input label="Label:" bottom />
    <Input label="Label:" />
  </FormRow>
</FormSet>
`}
  </ComponentBox>
)

export const FormSetSubmit = () => (
  <ComponentBox data-visual-test="form-set-submit">
    {() => /* jsx */ `
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
)
