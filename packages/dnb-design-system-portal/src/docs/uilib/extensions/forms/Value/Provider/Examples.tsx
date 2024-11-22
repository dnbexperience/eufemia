import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export function InheritVisibility() {
  return (
    <ComponentBox>
      <Form.Handler>
        <Form.Card>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible" animate>
            <Field.Name.First path="/foo" defaultValue="foo" />
            <Field.Name.Last path="/bar" defaultValue="bar" />
          </Form.Visibility>

          <Value.Provider inheritVisibility>
            <Value.SummaryList>
              <Value.Name.First path="/foo" />
              <Value.Name.First path="/bar" />
            </Value.SummaryList>
          </Value.Provider>
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
