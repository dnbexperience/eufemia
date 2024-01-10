/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Textarea, HelpButton } from '@dnb/eufemia/src'

export const TextareaExampleRowsCols = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-default">
      <Textarea
        label="Default"
        rows="2"
        cols="20"
        value="Textarea value\nNewline"
        spellCheck={false}
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
        on_focus={() => {
          console.log('on_focus')
        }}
        on_blur={() => {
          console.log('on_blur')
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExamplePlaceholder = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea label="Placeholder" placeholder="Placeholder text" />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleVertical = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Vertical"
        label_direction="vertical"
        rows="3"
        cols="33"
        value="Textarea value with more than 3 lines\nNewline\nNewline\nNewline\nNewline"
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaCharacterCounter = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-character-counter">
      <Textarea
        label="Count characters"
        label_direction="vertical"
        autoresize
        value="Textarea value\nNewline"
        status="Message to the user"
        characterCounter
        maxLength={40}
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleStretched = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-stretch">
      <Textarea
        label="Horizontal"
        stretch={true}
        rows="3"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleAutoresize = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Autogrow"
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
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleMaxLength = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Length limit"
        rows="3"
        cols="33"
        maxLength={20}
        required
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleFormStatus = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-error">
      <Textarea
        label="Error Message"
        cols="33"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
        status="Message to the user"
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleDisabled = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Disabled"
        disabled
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>
)

export const TextareaExampleSuffix = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Textarea with suffix"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
        suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
      />
    </ComponentBox>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  width: 100%;
`
