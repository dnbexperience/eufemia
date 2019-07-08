/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'

const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
const TestStyles = IS_TEST
  ? styled.div`
      .dnb-form-row:not(.dnb-form-row--vertical).dnb-form-row__indent--default
        > .dnb-form-label {
        width: 20rem;
        max-width: none;
      }
    `
  : styled.div``

class Example extends PureComponent {
  render() {
    return (
      <TestStyles>
        <ComponentBox
          caption="The label should align the bottom"
          data-dnb-test="form-row-vertical-label"
          useRender
        >
          {/* @jsx */ `
const CustomRow = styled(FormRow)\`
  .dnb-input {
    width: 4rem;
    color:red;
    & + .dnb-input {
      margin-left: 2rem;
    }
  }
\`
render(
  <CustomRow
      label="Vertical legend label:"
      label_direction="vertical"
  >
    <Input label="A:" />
    <Input label="B:" />
  </CustomRow>
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="The label should align the bottom"
          data-dnb-test="form-row-default"
        >
          {/* @jsx */ `
<FormRow indent="default" label="A long horizontal FormLabel with a lot of informative text and a default indent:">
  <Checkbox id="alone-1" label="Checkbox" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox caption="The `label` property can be used to set a row label">
          {/* @jsx */ `
<FormRow
  section_style="mint-green"
  section_spacing="default"
  indent={true}
  label="A long horizontal FormLabel with a lot of informative text and a default indent:"
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
      A long horizontal FormLabel with a lot of informative text and a max-width of 12rem:
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
      </TestStyles>
    )
  }
}

export { Example }
export default () => <Example />
