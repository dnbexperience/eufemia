/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import AllComponents from 'dnb-ui-lib/src/components/form-row/AllComponents'
// import { FormRow } from 'dnb-ui-lib/src/components'
// import AllComponents from './AllComponents'

const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
const TestStyles = IS_TEST
  ? styled.div`
      /* // make sure our input gets an explicit width, because of mac/linux rendering differences */
      .dnb-input {
        &__inner {
          width: 8rem;
        }
      }
    `
  : styled.div``
const WidthLimit = styled.div`
  width: 40rem;
`

class Example extends PureComponent {
  render() {
    const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
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
        <ComponentBox
          caption="Several components inside a horizontal `FormRow` with a couple of words inside their labels and `no_wrap`"
          data-dnb-test="form-row-horizontal-no_wrap"
        >
          {/* @jsx */ `
<FormRow
  label="A long horizontal FormLabel with a lot of informative text:"
  indent="true"
  content_size="large"
  no_wrap="true"
  direction="horizontal"
>
  <Input label="Input label A:" />
  <Input
    label="Input label B:"
    left="small"
  />
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
        {IS_TEST && (
          <>
            <Global
              styles={css`
                #___gatsby {
                  display: flex;
                }
                .dnb-app-content-inner {
                  overflow: visible;
                }
              `}
            ></Global>
            <ComponentBox
              caption="Horizontal direction"
              scope={{ AllComponents }}
              data-dnb-test="form-row-all-horizontal-direction"
            >
              {/* @jsx */ `
<FormRow
  // label="Horizontal:"
  // indent="true"
  no_wrap="true"
  direction="horizontal"
  content_size="large"
>
  <AllComponents horizontal />
</FormRow>
          `}
            </ComponentBox>
            <ComponentBox
              caption="Vertical direction"
              scope={{ AllComponents, WidthLimit }}
              data-dnb-test="form-row-all-vertical-direction"
            >
              {/* @jsx */ `
<WidthLimit>
  <FormRow label="Vertical direction:" direction="vertical">
    <AllComponents />
  </FormRow>
</WidthLimit>
          `}
            </ComponentBox>
            <ComponentBox
              caption="Vertical everything"
              scope={{ AllComponents, WidthLimit }}
              data-dnb-test="form-row-all-vertical-everything"
            >
              {/* @jsx */ `
<WidthLimit>
  <FormRow label="Vertical everything:" vertical="true">
    <AllComponents />
  </FormRow>
</WidthLimit>
          `}
            </ComponentBox>
            <ComponentBox
              caption="Vertical label direction"
              scope={{ AllComponents }}
              data-dnb-test="form-row-all-vertical-label-direction"
            >
              {/* @jsx */ `
<FormRow label="Vertical label direction:" label_direction="vertical">
  <AllComponents horizontal />
</FormRow>
          `}
            </ComponentBox>
          </>
        )}
      </TestStyles>
    )
  }
}

export { Example }
export default () => <Example />
