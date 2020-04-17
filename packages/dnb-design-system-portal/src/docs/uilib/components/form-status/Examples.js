/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import {
  InfoIcon,
  ErrorIcon
} from 'dnb-ui-lib/src/components/form-status/FormStatus'

export default function () {
  return (
    <>
      <ComponentBox
        title="FormStatus displaying error status"
        data-dnb-test="form-status"
      >
        {/* @jsx */ `
<FormStatus
  text="Failure text"
/>
        `}
      </ComponentBox>
      <ComponentBox
        title="FormStatus displaying info status"
        data-dnb-test="form-status-info"
      >
        {/* @jsx */ `
<FormStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="info"
/>
        `}
      </ComponentBox>
      <ComponentBox title="A form status, used by the Input Component">
        {/* @jsx */ `
<Input
  label="Input with status:"
  status="You have to fill in this field"
  value="Input value"
/>
        `}
      </ComponentBox>
      <ComponentBox
        title="A form status, with a custom styled content"
        data-dnb-test="form-status-custom"
        useRender
      >
        {/* @jsx */ `
const CustomStatus = () => (
<>My info <Link href="/">with a link</Link> and more text</>
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
      <ComponentBox title="A form status with plain text/HTML" useRender>
        {/* @jsx */ `
const myHTML = \`
My HTML
<a class="dnb-anchor" href="/" target="_blank">with a link</a>
and more text
\`
const CustomStatus = () => <span dangerouslySetInnerHTML={{ __html: myHTML }} />
render(
<FormStatus state="info">
  <CustomStatus />
</FormStatus>
)
        `}
      </ComponentBox>
      <ComponentBox
        scope={{ InfoIcon, ErrorIcon }}
        data-dnb-test="form-status-icons"
        title="In combination with the Icon component"
      >
        {`
<Icon
	icon={InfoIcon}
	size="medium"
	title="Some title"
	right
/>
<Icon
	icon={ErrorIcon}
	size="medium"
	title="Some title"
	color="var(--color-fire-red)"
/>
`}
      </ComponentBox>
    </>
  )
}
