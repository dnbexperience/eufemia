/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
const TestStyles = IS_TEST
  ? styled.div`
      /* // make sure our input gets an explicit width, because of mac/linux rendering differences */
      .dnb-input {
        &__inner {
          width: 8rem;
        }
      }
      ${'' /* .dnb-form-row:not(.dnb-form-row--vertical).dnb-form-row__indent--default
        > .dnb-form-label {
        width: 20rem;
        max-width: none;
      } */}
    `
  : styled.div``

class Example extends PureComponent {
  render() {
    return (
      <TestStyles>
        <ComponentBox
          caption="Only the labels are vertical aligned - while the input labels are still horizontal."
          data-dnb-test="form-row-vertical-label"
          useRender
        >
          {/* @jsx */ `
const CustomRow = styled(FormRow)\`
  .dnb-input {
    &__inner {
      width: 8rem;
    }
  }
\`
render(
  <CustomRow
      label="Vertical legend label:"
      label_direction="vertical"
  >
    <Input label="Label A:" value="Input A" />
    <Input label="Label B:" value="Input B" left="small" />
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
        <ComponentBox caption="The `label` property can be used to set a row label as well as the `section_style` is supported">
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
          caption="Customize the `.dnb-form-row` styles. Instead of using the build in `indent` property."
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
        <ComponentBox caption="Default `FormRow`">
          {/* @jsx */ `
<FormRow>
  <Input label="Default horizontal FormRow:" placeholder="Input ..." />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Vertical `FormRow`"
          data-dnb-test="form-row-vertical"
        >
          {/* @jsx */ `
<FormRow direction="vertical" label="Label legend for the inputs:">
  <Input label="Vertical direction:" placeholder="Input A ..." />
  <Input label="Vertical direction:" placeholder="Input B ..." top="small" />
</FormRow>
          `}
        </ComponentBox>
        <ComponentBox caption="FormRow with `label` (legend)">
          {/* @jsx */ `
<FormSet label_direction="vertical">
  <FormRow label="Label legend for the inputs:" >
    <Input label="Vertical label direction:" placeholder="Input A ..." />
    <Input label="Vertical label direction:" placeholder="Input B ..." left="small" />
  </FormRow>
  <FormRow label="Checkbox legend:" top="medium">
    <Checkbox label="Checkbox" />
  </FormRow>
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox caption="Vertical direction and disabled">
          {/* @jsx */ `
<FormRow vertical={true} disabled={true}>
  <Input label="Vertical input A:" placeholder="Input A ..." />
  <Input label="Vertical input B:" placeholder="Input B ..." top="medium" />
</FormRow>
          `}
        </ComponentBox>
      </TestStyles>
    )
  }
}

export { Example }
export default () => <Example />
