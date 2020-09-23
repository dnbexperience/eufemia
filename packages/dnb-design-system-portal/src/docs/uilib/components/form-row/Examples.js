/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
// import { isCI } from 'ci-info'
import AllComponents from 'dnb-ui-lib/src/components/form-row/AllComponents'
// import { FormRow } from 'dnb-ui-lib/src/components'
// import AllComponents from './AllComponents'

const TestStyles = styled.div`
  /* make sure our input gets an explicit width, because of mac/linux rendering differences */
  :not(.dnb-input--stretch) .dnb-input__input {
    width: 12rem;
  }
`
const WidthLimit = styled.div`
  width: 40rem;
`

class Example extends React.PureComponent {
  render() {
    const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
    return (
      <TestStyles>
        <ComponentBox
          title="Only the labels are vertical aligned - while the input labels are still horizontal."
          data-dnb-test="form-row-vertical-label"
        >
          {
            /* @jsx */ `
<FormRow
    label={
      <Ingress top="0" bottom="small">
        Custom legend:
      </Ingress>
    }
    label_direction="vertical"
>
  <Input label="Label A:" value="Input A" right="small" />
  <Input label="Label B:" value="Input B" />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="The label should align the bottom"
          data-dnb-test="form-row-default"
        >
          {
            /* @jsx */ `
<FormRow indent="default" label="A long horizontal legend (FormLabel) with a lot of informative text and a default indent:">
  <Checkbox id="alone-1" label="Checkbox" />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox title="The `label` property can be used to set a row label as well as the `section_style` is supported">
          {
            /* @jsx */ `
<FormRow
  section_style="mint-green"
  section_spacing="default"
  indent={true}
  label="A long horizontal legend (FormLabel) with a lot of informative text and a default indent:"
>
  <Checkbox label="Checkbox" />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Combine both vertical and horizontal FormRow's"
          data-dnb-test="form-row-combined"
          useRender
        >
          {
            /* @jsx */ `
// 1. In the nested FormRow we reset the layout to not be vertical
// 2. So we can use a different diretion ("label_direction")
render(
  <FormRow
    label={
      <Space element="span" className="dnb-h--large" top={false} bottom="large" no_collapse={true} >
        Custom vertical legend:
      </Space>
    }
    vertical
  >
    <Input label="Vertical input A" />
    <Input label="Vertical input B" top="medium" />
    <FormRow
      vertical="false"
      label_direction="horizontal"
      top="medium"
    >
      <Input label="Horizontal input A" right="small" />
      <Input label="Horizontal input B" />
    </FormRow>
    <Input label="Vertical input C" top="medium" />
  </FormRow>
)
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Customize the `.dnb-form-row` styles. Instead of using the build in `indent` property."
          useRender
        >
          {
            /* @jsx */ `
const CustomRow = styled(FormRow)\`
  align-items: flex-end;
  > .dnb-form-label {
    max-width: 12rem;
    background: var(--color-white);
    color: var(--color-fire-red);
  }
\`
render(
  <CustomRow label="A long horizontal legend (FormLabel) with a lot of informative text and a max-width of 12rem:">
    <Checkbox label="Checkbox" />
  </CustomRow>
)
          `
          }
        </ComponentBox>
        <ComponentBox title="Default `FormRow`">
          {
            /* @jsx */ `
<FormRow>
  <Input label="Default horizontal FormRow:" placeholder="Input ..." />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Vertical `FormRow`"
          data-dnb-test="form-row-vertical"
        >
          {
            /* @jsx */ `
<FormRow direction="vertical" label="Label legend for the inputs:">
  <Input label="Vertical direction:" placeholder="Input A ..." />
  <Input label="Vertical direction:" placeholder="Input B ..." top="small" />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Vertical label direction in combination with a button"
          data-dnb-test="form-row-vertical-label-button"
          useRender
        >
          {
            /* @jsx */ `
const CustomRow = styled(FormRow)\`
  .dnb-form-row__content .dnb-button {
    align-self: flex-end;
    transform: translateY(0.25rem); /* 4px down */
  }
\`
render(
<CustomRow
  label={ <Space element="span" className="dnb-h--large" top="0" bottom="0">Legend</Space> }
  label_direction="vertical"
>
  <Input label="Vertical input label" value="Input" right="small" />
  <Button text="Button" />
</CustomRow>
)
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Several components inside a horizontal `FormRow` - not wrapping"
          data-dnb-test="form-row-horizontal-no_wrap"
        >
          {
            /* @jsx */ `
<FormRow
  label="A long horizontal legend (FormLabel) with a lot of informative text:"
  indent="true"
  indent_offset="large"
  direction="horizontal"
>
  <Input label="Input label A:" right="small"  />
  <Input label="Input label B:"  />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Several components inside a wrapping (`wrap`) horizontal `FormRow`"
          data-dnb-test="form-row-horizontal-wrap"
        >
          {
            /* @jsx */ `
<FormRow
  label="Long label labwl Adipiscing mauris dis proin nec Condimentum egestas class blandit netus non a suscipit id urna:"
  indent
  indent_offset="x-large"
  wrap
  direction="horizontal"
>
  <Input label="Input A:" top="small" right="small" />
  <Input label="Input B:" top="small" right="small" />
  <Input label="Input C:" top="small" right="small" />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox title="FormRow with `label` (legend)">
          {
            /* @jsx */ `
<FormSet label_direction="vertical">
  <FormRow label="Label legend for the inputs:" >
    <Input label="Vertical label direction:" placeholder="Input A ..." right="small" />
    <Input label="Vertical label direction:" placeholder="Input B ..." />
  </FormRow>
  <FormRow label="Checkbox legend:" top="medium">
    <Checkbox label="Checkbox" />
  </FormRow>
</FormSet>
          `
          }
        </ComponentBox>
        <ComponentBox title="Vertical direction and disabled">
          {
            /* @jsx */ `
<FormRow vertical={true} disabled={true}>
  <Input label="Vertical input A:" placeholder="Input A ..." />
  <Input label="Vertical input B:" placeholder="Input B ..." top="medium" />
</FormRow>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Combining different components and directions"
          useRender
        >
          {
            /* @jsx */ `
const PhoneRow = styled(FormRow)\`
.dnb-dropdown__shell,
.dnb-dropdown__list {
  width: auto;
  min-width: 6rem;
}
@media screen and (max-width: 40em) {
  .dnb-dropdown {
    margin-bottom: 0.5rem;
  }
\`
render(
<FormRow vertical={true}>
  <Input
    label="Input"
    placeholder="Input ..."
    bottom
  />
  <PhoneRow
    label="Phone number"
    label_direction="vertical"
    vertical={false}
  >
    <Dropdown
      right="small"
      title="Country code"
      data={['+47', '+48', '+49']}
      value={0}
    />
    <Input placeholder="Your phone number" />
  </PhoneRow>
</FormRow>
)
      `
          }
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
              title="Horizontal direction"
              scope={{ AllComponents }}
              data-dnb-test="form-row-all-horizontal-direction"
            >
              {
                /* @jsx */ `
<FormRow
  // label="Horizontal:"
  // indent="true"
  // indent_offset="large"
  direction="horizontal"
>
  <AllComponents horizontal />
</FormRow>
          `
              }
            </ComponentBox>
            <ComponentBox
              title="Vertical direction"
              scope={{ AllComponents, WidthLimit }}
              data-dnb-test="form-row-all-vertical-direction"
            >
              {
                /* @jsx */ `
<WidthLimit>
  <FormRow label="Vertical direction:" direction="vertical">
    <AllComponents />
  </FormRow>
</WidthLimit>
          `
              }
            </ComponentBox>
            <ComponentBox
              title="Vertical everything"
              scope={{ AllComponents, WidthLimit }}
              data-dnb-test="form-row-all-vertical-everything"
            >
              {
                /* @jsx */ `
<WidthLimit>
  <FormRow label="Vertical everything:" vertical="true">
    <AllComponents />
  </FormRow>
</WidthLimit>
          `
              }
            </ComponentBox>
            <ComponentBox
              title="Vertical label direction"
              scope={{ AllComponents }}
              data-dnb-test="form-row-all-vertical-label-direction"
            >
              {
                /* @jsx */ `
<FormRow label="Vertical label direction:" label_direction="vertical">
  <AllComponents horizontal />
</FormRow>
          `
              }
            </ComponentBox>
            <ComponentBox
              title="Vertical label direction, no labels"
              scope={{ AllComponents }}
              data-dnb-test="form-row-all-vertical-label-direction-no-label"
            >
              {
                /* @jsx */ `
<FormRow label="Vertical label direction, no labels:" label_direction="vertical">
  <AllComponents horizontal hideLabel />
</FormRow>
          `
              }
            </ComponentBox>
          </>
        )}
      </TestStyles>
    )
  }
}

export default Example
