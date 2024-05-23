/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { TextCounter } from '@dnb/eufemia/src/fragments'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'
import type { TextCounterProps } from '@dnb/eufemia/src/fragments/text-counter/TextCounter'

export function CountCharactersDown() {
  return (
    <ComponentBox data-visual-test="text-counter-down">
      <TextCounter variant="down" text="test" max={10} />
    </ComponentBox>
  )
}

export function CountCharactersUp() {
  return (
    <ComponentBox data-visual-test="text-counter-up">
      <TextCounter variant="up" text="test" max={10} />
    </ComponentBox>
  )
}

export function CountCharactersExceeded() {
  return (
    <ComponentBox data-visual-test="text-counter-exceeded">
      <TextCounter text="test" max={2} />
    </ComponentBox>
  )
}

export function CountCharactersInteractive() {
  return (
    <ComponentBox>
      {() => {
        const text = 'Count me!'
        const variant: TextCounterProps['variant'] = 'down'

        const Counter = () => {
          const { data } = Form.useData('text-counter', {
            max: 10,
            variant,
            text,
          })
          return (
            <Flex.Stack divider="line">
              <Flex.Vertical gap="x-small">
                <Field.String
                  label="Text"
                  path="/text"
                  maxLength={data.max}
                />
                <TextCounter
                  variant={data.variant}
                  text={data.text}
                  max={data.max}
                />
              </Flex.Vertical>
              <Field.Toggle
                valueOn="down"
                valueOff="up"
                textOn="Down"
                textOff="Up"
                variant="buttons"
                label="Variant"
                path="/variant"
              />
            </Flex.Stack>
          )
        }

        return (
          <Form.Handler id="text-counter">
            <Counter />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
