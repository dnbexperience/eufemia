import React from 'react'
import { Card, Section } from '../../../../../components'
import { Field, Form } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/ArraySelection',
}

export function NestingWithLogic() {
  return (
    <Form.Handler>
      <Card stack>
        <Field.ArraySelection
          // variant="checkbox"
          // variant="button"
          label="Make a selection"
          path="/mySelection"
          // defaultValue={['showInput']}
        >
          <Field.Option value="nothing" title="Nothing" />

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
      </Card>
    </Form.Handler>
  )
}
