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
          caption="The label should align the bottom"
          data-dnb-test="form-row-default"
        >
          {/* @jsx */ `
<FormRow direction="horizontal" size="default">
  <FormLabel for_id="alone-1">
    A long Vertical FormLabel with a lot of informative text and a default size:
  </FormLabel>
  <Checkbox id="alone-1" label="Checkbox" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox caption="The `label` property can be used to set a row label">
          {/* @jsx */ `
<FormRow
  section_style="mint-green"
  section_spacing="default"
  size={true}
  label="A long Vertical FormLabel with a lot of informative text and a default size:"
>
  <Checkbox label="Checkbox" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Customize the `.dnb-form-row` class"
          useRender
        >
          {/* @jsx */ `
const CustomRow = styled(FormRow)\`
  > .dnb-form-label {
    max-width: 12rem;
    background: var(--color-white);
    color: var(--color-cherry-red);
  }
\`
render(
  <CustomRow>
    <FormLabel for_id="alone-1">
      A long Vertical FormLabel with a lot of informative text and a max-width of 12rem:
    </FormLabel>
    <Checkbox id="alone-1" label="Checkbox" />
  </CustomRow>
)
          `}
        </ComponentBox>
        <ComponentBox caption="Default form-row">
          {/* @jsx */ `
<FormRow>
  <Input label="Default horizontal FormRow:" value="Input value ..." />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Vertical form-row"
          data-dnb-test="form-row-vertical"
        >
          {/* @jsx */ `
<FormRow direction="vertical">
  <Input label="Default vertical FormRow:" value="Input value ..." />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox caption="Vertical, and disabled, form-row without a `for_id`">
          {/* @jsx */ `
<FormRow vertical={true} disabled={true}>
  <FormLabel>Without for_id (select me):</FormLabel>
  <Checkbox label="Checkbox" />
</FormRow>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
