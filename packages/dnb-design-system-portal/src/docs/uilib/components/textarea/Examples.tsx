/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import { Textarea, HelpButton, Flex } from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const RowsCols = () => (
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

export const Placeholder = () => (
  <Wrapper>
    <ComponentBox>
      <Textarea label="Placeholder" placeholder="Placeholder text" />
    </ComponentBox>
  </Wrapper>
)

export const Vertical = () => (
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

export const CharacterCounter = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-character-counter">
      <Textarea
        label="Count characters"
        label_direction="vertical"
        autoresize
        value="Textarea value\nNewline"
        status="Message to the user"
        characterCounter={40}
      />
    </ComponentBox>
  </Wrapper>
)

export const Stretched = () => (
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

export const Autoresize = () => (
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

export const FormStatus = () => (
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

export const Disabled = () => (
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

export const Suffix = () => (
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

export const Sizes = () => (
  <Wrapper>
    <ComponentBox data-visual-test="textarea-sizes">
      <Flex.Stack>
        <Textarea placeholder="Small size" size="small" rows={1} />
        <Textarea placeholder="Medium size" size="medium" rows={1} />
        <Textarea placeholder="Large size" size="large" rows={1} />
      </Flex.Stack>
    </ComponentBox>
  </Wrapper>
)

export const MaxLength = () => (
  <Wrapper>
    <ComponentBox hideCode>
      <Form.Handler>
        <Form.Card>
          <Field.String
            label="Label"
            placeholder="Write more than 3 characters to demonstrate the limit"
            multiline
            maxLength={3}
            required
            characterCounter={{ max: 3, variant: 'up' }}
          />
          <Form.SubmitButton text="Test" />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  </Wrapper>
)

const Wrapper = styled.div`
  display: block;
  width: 100%;
`
