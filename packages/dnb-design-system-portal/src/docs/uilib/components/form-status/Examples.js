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

export const FormStatusDefault = () => (
  <ComponentBox data-visual-test="form-status">
    {
      /* @jsx */ `
<FormStatus
  text="Failure text"
/>
  `
    }
  </ComponentBox>
)

export const FormStatusWithInfo = () => (
  <ComponentBox data-visual-test="form-status-info">
    {
      /* @jsx */ `
<FormStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="info"
/>
  `
    }
  </ComponentBox>
)

export const FormSetDefaultInput = () => (
  <ComponentBox>
    {
      /* @jsx */ `
<Input
  label="Input with status:"
  status="You have to fill in this field"
  value="Input value"
/>
  `
    }
  </ComponentBox>
)

export const FormStatusCustom = () => (
  <ComponentBox data-visual-test="form-status-custom" useRender>
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const FormStatusPlain = () => (
  <ComponentBox useRender>
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const FormStatusWithIcons = () => (
  <ComponentBox
    scope={{ InfoIcon, ErrorIcon }}
    data-visual-test="form-status-icons"
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
)
