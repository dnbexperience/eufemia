import React from 'react'
import { List, Section } from '../../../../../components'
import { Field, Form, Value } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/ArraySelection',
}

export function NestingWithLogic() {
  return (
    <Form.Handler>
      <Form.Card>
        <Field.ArraySelection
          // variant="checkbox"
          // variant="button"
          label="Make a selection"
          path="/mySelection"
          // defaultValue={['showInput']}
        >
          <Field.Option
            value="nothing"
            title="Nothing"
            help={{
              title: 'Help title',
              content: 'Help content',
            }}
          />

          <Field.Option value="showInput" title="Show an input" />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value: string[]) => {
                return Boolean(value?.includes('showInput'))
              },
            }}
            compensateForGap="auto"
          >
            <Section variant="info" innerSpace>
              <Field.String placeholder="Enter some value" />
            </Section>
          </Form.Visibility>

          <Field.Option
            value="showAdditionalOption"
            title="Show additional option"
          />
          <Form.Visibility
            animate
            visibleWhen={{
              path: '/mySelection',
              hasValue: (value: string[]) =>
                Boolean(value?.includes('showAdditionalOption')),
            }}
            compensateForGap="auto"
          >
            <Field.Option
              value="showMeMore"
              title="Show even more"
              bottom="x-small"
            />
            <Form.Visibility
              animate
              visibleWhen={{
                path: '/mySelection',
                hasValue: (value: string[]) => {
                  return Boolean(value?.includes('showMeMore'))
                },
              }}
            >
              <Section variant="info" innerSpace>
                <Field.String placeholder="Enter more info" />
              </Section>
            </Form.Visibility>
          </Form.Visibility>
        </Field.ArraySelection>
      </Form.Card>
    </Form.Handler>
  )
}

export function SelectUpToThree() {
  const data = [
    { value: 'oslo', title: 'Oslo' },
    { value: 'stockholm', title: 'Stockholm' },
    { value: 'copenhagen', title: 'Copenhagen' },
    { value: 'helsinki', title: 'Helsinki' },
    { value: 'reykjavik', title: 'Reykjavik' },
    { value: 'antananarivo', title: 'Antananarivo' },
    { value: 'nuuk', title: 'Nuuk' },
    { value: 'nairobi', title: 'Nairobi' },
    { value: 'tokyo', title: 'Tokyo' },
  ]

  return (
    <Form.Card>
      <Field.ArraySelection
        label={
          <>
            Which capitals would you most like to visit?
            <br />
            <em style={{ fontSize: '0.8em' }}>
              Select between two and three
            </em>
          </>
        }
        required
        optionsLayout="horizontal"
        variant="button"
        data={data}
        schema={{
          type: 'array',
          minItems: 2,
          maxItems: 3,
        }}
        errorMessages={{
          minItems: 'You must select at least two',
          maxItems: 'You can only select up to three',
        }}
      />
    </Form.Card>
  )
}

export function CheckboxListProposalUsingList() {
  const options = [
    { value: 'foo', title: 'Foo!', amount: 1234 },
    { value: 'bar', title: 'Baar!', amount: 5678 },
    { value: 'baz', title: 'Baz!', amount: 9999 },
  ]

  return (
    <Form.Card>
      <Field.ArraySelection
        label="Select one or more options"
        variant="checkbox"
        value={['bar']}
      >
        {({ value = [] }) => {
          return (
            <List.Container>
              {options.map(({ value: optionValue, title, amount }) => {
                return (
                  <List.Item.Basic
                    key={optionValue}
                    selected={value.includes(optionValue)}
                  >
                    <List.Cell.Title>
                      <Field.Option
                        key={optionValue}
                        value={optionValue}
                        title={title}
                      />
                    </List.Cell.Title>
                    <List.Cell.End>
                      <Value.Currency value={amount} />
                    </List.Cell.End>
                  </List.Item.Basic>
                )
              })}
            </List.Container>
          )
        }}
      </Field.ArraySelection>
    </Form.Card>
  )
}
