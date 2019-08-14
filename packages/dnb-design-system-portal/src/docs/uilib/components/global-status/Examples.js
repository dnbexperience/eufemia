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
          caption="GlobalStatus displaying error status"
          data-dnb-test="global-status"
        >
          {/* @jsx */ `
<GlobalStatus
  text="Failure text"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="GlobalStatus displaying info status"
          data-dnb-test="global-status-info"
        >
          {/* @jsx */ `
<GlobalStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="info"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="A form status, used by the Input Component">
          {/* @jsx */ `
<Input
  label="Input with status:"
  status="You have to fill in this field"
  value="Input value"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="A form status, with a custom styled content"
          data-dnb-test="global-status-custom"
          useRender
        >
          {/* @jsx */ `
const CustomStatus = () => (
  <>
    My info
    <Link href="/">with a link</Link>
    and more text
  </>
)
render(
  <Input
    label="Input with custom status:"
    status={ <CustomStatus /> }
    status_state="info"
    value="Input value"
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="A form status with plain text/HTML"
          useRender
        >
          {/* @jsx */ `
const myHTML = \`
  My HTML
  <a class="dnb-anchor" href="/" target="_blank">with a link</a>
  and more text
\`
const CustomStatus = () => <span dangerouslySetInnerHTML={{ __html: myHTML }} />
render(
  <GlobalStatus state="info">
    <CustomStatus />
  </GlobalStatus>
)
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
