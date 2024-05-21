import React from 'react'
import { render } from '@testing-library/react'
import { Ajv, Field, Form } from '../../..'
import { GenerateSchemaProps } from '../GenerateSchema'

type GenerateRef = GenerateSchemaProps['generateRef']['current']

describe('Form.Tools.GenerateSchema', () => {
  it('should generate a schema', () => {
    const generateSchemaRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    const { schema } = generateSchemaRef.current()

    expect(schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "myString": {
            "type": "string",
          },
        },
        "type": "object",
      }
    `)
  })

  it('should return data with local value', () => {
    const generateSchemaRef = React.createRef<GenerateRef>()

    const { rerender } = render(
      <Form.Handler data={{ myString: 'my string' }}>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateSchemaRef.current().data).toMatchInlineSnapshot(`
      {
        "myString": "my string",
      }
    `)

    rerender(
      <Form.Handler data={{ myString: 'my string' }}>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" value="local value" />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateSchemaRef.current().data).toMatchInlineSnapshot(`
      {
        "myString": "local value",
      }
    `)
  })

  it('should generate schema with different types', () => {
    const generateSchemaRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" />
          <Field.Number path="/myNumber" />
          <Field.Boolean path="/myBoolean" />
          <Field.Toggle
            path="/myToggle"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateSchemaRef.current().schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "myBoolean": {
            "type": "boolean",
          },
          "myNumber": {
            "type": "number",
          },
          "myString": {
            "type": "string",
          },
          "myToggle": {
            "type": "string",
          },
        },
        "type": "object",
      }
    `)
  })

  const generateSchemaRef = React.createRef<GenerateRef>()

  it('should generate schema with various properties', () => {
    render(
      <Form.Handler>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" minLength={5} maxLength={5} />
          <Field.String
            path="/myObject/withString"
            minLength={10}
            maxLength={10}
            pattern="^[a-z]{2}[0-9]+"
          />
          <Field.Boolean path="/myBoolean" />
          <Field.Number
            path="/myNumber"
            minimum={10}
            maximum={20}
            multipleOf={2}
            exclusiveMinimum={15}
            exclusiveMaximum={25}
          />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateSchemaRef.current().schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "myBoolean": {
            "type": "boolean",
          },
          "myNumber": {
            "exclusiveMaximum": 25,
            "exclusiveMinimum": 15,
            "multipleOf": 2,
            "type": "number",
          },
          "myObject": {
            "properties": {
              "withString": {
                "maxLength": 10,
                "minLength": 10,
                "pattern": "^[a-z]{2}[0-9]+",
                "type": "string",
              },
            },
            "type": "object",
          },
          "myString": {
            "maxLength": 5,
            "minLength": 5,
            "type": "string",
          },
        },
        "type": "object",
      }
    `)
  })

  it('should generate schema with nested paths', () => {
    const generateSchemaRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String
            path="/myObject/withString"
            minLength={10}
            maxLength={10}
          />
          <Field.Number
            path="/myObject/nested/withNumber"
            minimum={10}
            maximum={20}
            multipleOf={2}
            exclusiveMinimum={15}
            exclusiveMaximum={25}
          />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateSchemaRef.current().schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "myObject": {
            "properties": {
              "nested": {
                "properties": {
                  "withNumber": {
                    "exclusiveMaximum": 25,
                    "exclusiveMinimum": 15,
                    "multipleOf": 2,
                    "type": "number",
                  },
                },
                "type": "object",
              },
              "withString": {
                "maxLength": 10,
                "minLength": 10,
                "type": "string",
              },
            },
            "type": "object",
          },
        },
        "type": "object",
      }
    `)
  })

  it('should generate schema with required', () => {
    const generateSchemaRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" required />
          <Field.String
            path="/myObject/withString"
            minLength={10}
            maxLength={10}
            required
          />
          <Field.Boolean path="/myBoolean" required />
          <Field.Number
            path="/myObject/withNumber"
            minimum={10}
            maximum={20}
            required
          />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateSchemaRef.current().schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "myBoolean": {
            "type": "boolean",
          },
          "myObject": {
            "properties": {
              "withNumber": {
                "type": "number",
              },
              "withString": {
                "maxLength": 10,
                "minLength": 10,
                "type": "string",
              },
            },
            "required": [
              "withNumber",
              "withString",
            ],
            "type": "object",
          },
          "myString": {
            "type": "string",
          },
        },
        "required": [
          "myString",
          "myBoolean",
        ],
        "type": "object",
      }
    `)
  })

  it('should validate with generated schema', () => {
    const generateSchemaRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler
        data={{
          myString: 'my string',
          myObject: {
            withString: 'my string',
            withNumber: 15,
          },
          myBoolean: true,
        }}
      >
        <Form.Tools.GenerateSchema generateRef={generateSchemaRef}>
          <Field.String path="/myString" required />
          <Field.String
            path="/myObject/withString"
            minLength={2}
            maxLength={10}
            required
          />
          <Field.Boolean path="/myBoolean" required />
          <Field.Number
            path="/myObject/withNumber"
            minimum={10}
            maximum={20}
            required
          />
        </Form.Tools.GenerateSchema>
      </Form.Handler>
    )

    const { schema, data } = generateSchemaRef.current()

    expect(data).toMatchInlineSnapshot(`
      {
        "myBoolean": true,
        "myObject": {
          "withNumber": 15,
          "withString": "my string",
        },
        "myString": "my string",
      }
    `)
    expect(schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "myBoolean": {
            "type": "boolean",
          },
          "myObject": {
            "properties": {
              "withNumber": {
                "type": "number",
              },
              "withString": {
                "maxLength": 10,
                "minLength": 2,
                "type": "string",
              },
            },
            "required": [
              "withNumber",
              "withString",
            ],
            "type": "object",
          },
          "myString": {
            "type": "string",
          },
        },
        "required": [
          "myString",
          "myBoolean",
        ],
        "type": "object",
      }
    `)

    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    const valid = validate(data)

    expect(validate.errors).toMatchInlineSnapshot(`null`)
    expect(valid).toBe(true)
  })
})
