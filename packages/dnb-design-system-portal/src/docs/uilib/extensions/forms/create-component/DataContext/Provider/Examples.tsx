import { JSONSchema7 } from 'json-schema'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  Form,
  DataContext,
  Field,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import { Layout } from '@dnb/eufemia/src'

export const TestdataSchema: JSONSchema7 = {
  type: 'object',
  properties: {
    requiredString: { type: 'string' },
    string: { type: 'string', minLength: 3 },
    number: { type: 'number', minimum: 42 },
    boolean: { type: 'boolean' },
    email: { type: 'string' /* , format: 'email'*/ },
    nested: {
      type: 'object',
      properties: {
        nestedText: { type: 'string' },
        nestedNumber: { type: 'number', minimum: 50 },
      },
    },
    list: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          itemText: { type: 'string' },
          itemNumber: { type: 'number', minimum: 50 },
        },
      },
    },
  },
  required: ['requiredString'],
}

export interface Testdata {
  requiredString: string
  string?: string
  number?: number
  boolean?: boolean
  email?: string
  nested?: {
    nestedText: string
    nestedNumber: number
  }
  list: Array<{
    itemText: string
    itemNumber: number
  }>
}

export const testdata: Testdata = {
  requiredString: 'This is a text',
  string: 'String value',
  number: 123,
  boolean: true,
  email: 'm@il.com',
  nested: {
    nestedText: 'Nested text',
    nestedNumber: 42,
  },
  list: [
    {
      itemText: 'Item text',
      itemNumber: 1001,
    },
    {
      itemText: 'Item text 2',
      itemNumber: 1002,
    },
  ],
}

export const Default = () => {
  return (
    <ComponentBox
      scope={{
        Form,
        DataContext,
        Field,
        Value,
        testdata,
        TestdataSchema,
      }}
    >
      <DataContext.Provider
        data={testdata}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
        onSubmitRequest={() => console.log('onSubmitRequest')}
      >
        <Layout.Stack>
          <Layout.Card>
            <Layout.Vertical divider="line" spacing="small">
              <Field.String
                path="/requiredString"
                label="Required string"
                required
              />
              <Field.String path="/hmm" label="Invalid path" />
              <Field.String path="/string" label="String value" />
              <Field.String path="/string" label="String value (copy)" />
              <Field.Number path="/number" label="Number value" />
              <Field.String
                path="/number"
                label="Number with Field.String"
              />
              <Field.Boolean
                path="/boolean"
                label="Boolean - Checkbox"
                variant="checkbox"
              />
              <Field.Boolean
                path="/boolean"
                label="Boolean - Toggle"
                variant="button"
              />
              <div>
                <Field.String
                  path="/nested/nestedText"
                  label="Nested text"
                />
                <Field.Number
                  path="/nested/nestedNumber"
                  label="Nested number (minimum 50)"
                  minimum={50}
                />
              </div>
              <div className="hmm">
                <Layout.Horizontal>
                  <Field.String
                    path="/list/0/itemText"
                    label="Item text"
                  />
                  <Field.Number
                    path="/list/0/itemNumber"
                    label="Item number"
                  />
                </Layout.Horizontal>
                <Layout.Horizontal>
                  <Field.String
                    path="/list/1/itemText"
                    label="Item text"
                  />
                  <Field.Number
                    path="/list/1/itemNumber"
                    label="Item number"
                  />
                </Layout.Horizontal>
              </div>
              <Form.ButtonRow>
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Layout.Vertical>
          </Layout.Card>
        </Layout.Stack>
      </DataContext.Provider>
    </ComponentBox>
  )
}

export const ValidationWithJsonSchema = () => {
  return (
    <ComponentBox
      scope={{
        Form,
        DataContext,
        Field,
        Value,
        testdata,
        TestdataSchema,
      }}
    >
      <DataContext.Provider
        data={testdata}
        schema={TestdataSchema}
        onChange={(data) => console.log('onChange', data)}
        onPathChange={(path, value) =>
          console.log('onPathChange', path, value)
        }
        onSubmit={(data) => console.log('onSubmit', data)}
        onSubmitRequest={() => console.log('onSubmitRequest')}
      >
        <Layout.Stack>
          <Layout.Card>
            <Layout.Vertical divider="line" spacing="small">
              <Field.String
                path="/requiredString"
                label="Required string"
              />
              <Field.String path="/hmm" label="Invalid path" />
              <Field.String path="/string" label="String value" />
              <Field.String path="/string" label="String value (copy)" />
              <Field.Number path="/number" label="Number value" />
              <Field.String
                path="/number"
                label="Number with Field.String"
              />
              <Field.Boolean
                path="/boolean"
                label="Boolean - Checkbox"
                variant="checkbox"
              />
              <Field.Boolean
                path="/boolean"
                label="Boolean - Toggle"
                variant="button"
              />
              <div>
                <Field.String
                  path="/nested/nestedText"
                  label="Nested text"
                />
                <Field.Number
                  path="/nested/nestedNumber"
                  label="Nested number"
                />
              </div>
              <div className="hmm">
                <Layout.Horizontal>
                  <Field.String
                    path="/list/0/itemText"
                    label="Item text"
                  />
                  <Field.Number
                    path="/list/0/itemNumber"
                    label="Item number"
                  />
                </Layout.Horizontal>
                <Layout.Horizontal>
                  <Field.String
                    path="/list/1/itemText"
                    label="Item text"
                  />
                  <Field.Number
                    path="/list/1/itemNumber"
                    label="Item number"
                  />
                </Layout.Horizontal>
              </div>
              <Form.ButtonRow>
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Layout.Vertical>
          </Layout.Card>
        </Layout.Stack>
      </DataContext.Provider>
    </ComponentBox>
  )
}
