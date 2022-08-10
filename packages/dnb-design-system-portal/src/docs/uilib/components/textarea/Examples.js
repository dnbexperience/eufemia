/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

export const TextareaExampleRowsCols = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-default">
      {
        /* jsx */ `
<Textarea
  label="Default:"
  rows="2"
  cols="20"
  value="Textarea value\nNewline"
  on_change={({ value }) => { console.log('on_change', value) }}
  on_focus={() => { console.log('on_focus') }}
  on_blur={() => { console.log('on_blur') }}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExamplePlaceholder = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Placeholder:"
  placeholder="Placeholder text"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleVertical = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Vertical:"
  label_direction="vertical"
  rows="3"
  cols="33"
  value="Textarea value with more than 3 lines\nNewline\nNewline\nNewline\nNewline"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleStretched = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-stretch">
      {
        /* jsx */ `
<Textarea
  label="Horizontal:"
  stretch="true"
  rows="3"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleAutoresize = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Autogrow:"
  rows={1}
  autoresize={true}
  autoresize_max_rows={4}
  placeholder="Placeholder"
  on_key_down={({ rows, event }) => {
    if (rows >= 4 && event.key === 'Enter') {
      event.preventDefault()
    }
  }}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleMaxLength = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Length limit:"
  rows="3"
  cols="33"
  maxLength="20"
  required
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleFormStatus = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-error">
      {
        /* jsx */ `
<Textarea
  label="Error Message:"
  cols="33"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  status="Message to the user"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleError = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Show status:"
  status="error"
  value="Shows status with border only"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleDisabled = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Disabled:"
  disabled
  value="Nec litora inceptos vestibulum id interdum donec gravida."
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleSuffix = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* jsx */ `
<Textarea
  label="Textarea with suffix:"
  value="Nec litora inceptos vestibulum id interdum donec gravida."
  suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  width: 100%;
`
