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
          data-dnb-test="form-set-default"
        >
          {/* @jsx */ `
<FormSet direction="horizontal" size="default">
  <FormLabel for_id="alone-1">
    A long Vertical FormLabel with a lot of informative text and a default size:
  </FormLabel>
  <Checkbox id="alone-1" label="Checkbox" />
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Customize the `.dnb-form-set` class"
          useRender
        >
          {/* @jsx */ `
const CustomRow = styled(FormSet)\`
  > .dnb-form-label {
    max-width: 12rem;
    background: var(--color-white);
    color: var(--color-cherry-red);
  }
\`
render(<>
  <CustomRow>
    <FormLabel for_id="alone-1">
      A long Vertical FormLabel with a lot of informative text and a max-width of 12rem:
    </FormLabel>
    <Checkbox id="alone-1" label="Checkbox" />
  </CustomRow>
</>)
          `}
        </ComponentBox>
        <ComponentBox caption="Default form-set">
          {/* @jsx */ `
<FormSet>
  <Input label="Default horizontal FormSet:" value="Input value ..." />
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Vertical form-set"
          data-dnb-test="form-set-vertical"
        >
          {/* @jsx */ `
<FormSet vertical="true">
  <Input label="Default vertical FormSet:" value="Input value ..." />
</FormSet>
          `}
        </ComponentBox>
        <ComponentBox caption="Vertical form-set without a `for_id`">
          {/* @jsx */ `
<FormLabel vertical={true}>
  Without for_id (select me):
</FormLabel>
<Checkbox label="Checkbox" />
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
