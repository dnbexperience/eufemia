/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import {
  InfoIcon,
  WarnIcon,
  ErrorIcon,
} from '@dnb/eufemia/src/components/form-status/FormStatus'

export const FormStatusDefault = () => (
  <ComponentBox data-visual-test="form-status">
    {() => /* jsx */ `
<FormStatus
  text="Failure text"
/>
`}
  </ComponentBox>
)

export const FormStatusWithInfo = () => (
  <ComponentBox data-visual-test="form-status-info">
    {() => /* jsx */ `
<FormStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="info"
/>
`}
  </ComponentBox>
)

export const FormStatusWithStretch = () => (
  <ComponentBox data-visual-test="form-status-stretch">
    {() => /* jsx */ `
<FormStatus
  stretch={true}
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="warn"
/>
`}
  </ComponentBox>
)

export const FormStatusWithWarn = () => (
  <ComponentBox data-visual-test="form-status-warn">
    {() => /* jsx */ `
<FormStatus state="warn" variant="outlined">
  Warningmessage. Take notice!
</FormStatus>
`}
  </ComponentBox>
)

export const FormStatusInput = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Input
  label="Input with status:"
  status="You have to fill in this field"
  value="Input value"
/>
`}
  </ComponentBox>
)

export const FormStatusAnimation = () => (
  <ComponentBox useRender>
    {() => /* jsx */ `
const ToggleAnimation = () => {
  const [status, setStatus] = React.useState(null)
  const toggleStatus = () => {
    setStatus((s) => (!s ? 'You have to fill in this field' : null))
  }
  return (
    <FormRow vertical={false}>
      <Input
        label="Input with status:"
        status={status}
        value="Input value"
        right
      />
      <ToggleButton top on_change={toggleStatus}>
        Toggle
      </ToggleButton>
    </FormRow>
  )
}
render(<ToggleAnimation />)
`}
  </ComponentBox>
)

export const FormStatusCustom = () => (
  <ComponentBox data-visual-test="form-status-custom" useRender>
    {() => /* jsx */ `
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
)

export const FormStatusLarge = () => (
  <ComponentBox useRender>
    {() => /* jsx */ `
const myHTML = \`
  My HTML
  <a class="dnb-anchor" href="/" target="_blank">with a link</a>
  and more text
\`
const CustomStatus = () => <span dangerouslySetInnerHTML={{ __html: myHTML }} />
render(
  <FormStatus state="info" size="large" variant="outlined">
    <CustomStatus />
  </FormStatus>
)
`}
  </ComponentBox>
)

export const FormStatusWithIcons = () => (
  <ComponentBox
    scope={{ InfoIcon, WarnIcon, ErrorIcon }}
    data-visual-test="form-status-icons"
  >
    {`
<Icon
	icon={InfoIcon}
	size="medium"
	title="Some title"
  inherit_color={false}
	right
/>
<Icon
	icon={WarnIcon}
	size="medium"
	title="Some title"
  inherit_color={false}
  right
/>
<Icon
	icon={ErrorIcon}
	size="medium"
	title="Some title"
  inherit_color={false}
/>
`}
  </ComponentBox>
)
