import React from 'react'
import { render } from '@testing-library/react'
import { Ajv, Field, Form, Value, Tools } from '../../'
import { GenerateRef } from '../GenerateSchema'

describe('Tools.GenerateSchema', () => {
  it('should generate a schema', () => {
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Field.String path="/myString" />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    const { schema } = generateRef.current()

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

  it('should console log a schema', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <Form.Handler>
        <Tools.GenerateSchema log>
          <Field.String
            path="/myString"
            pattern="^[a-z]{2}[0-9]+$"
            required
          />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(log).toHaveBeenCalledWith({
      properties: {
        myString: { type: 'string', pattern: '^[a-z]{2}[0-9]+$' },
      },
      required: ['myString'],
      type: 'object',
    })

    log.mockRestore()
  })

  it('should return "data" with local value', () => {
    const generateRef = React.createRef<GenerateRef>()

    const { rerender } = render(
      <Form.Handler data={{ myString: 'my string' }}>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Field.String path="/myString" />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().data).toMatchInlineSnapshot(`
      {
        "myString": "my string",
      }
    `)

    rerender(
      <Form.Handler data={{ myString: 'my string' }}>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Field.String path="/myString" value="local value" />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().data).toMatchInlineSnapshot(`
      {
        "myString": "local value",
      }
    `)
  })

  it('should return "propsOfFields" with object that contains all props', () => {
    const generateRef = React.createRef<GenerateRef>()

    const { rerender } = render(
      <Form.Handler data={{ nested: { myString: 'my string' } }}>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Field.String path="/myField" label="My field" />
          <Field.String path="/nested/myString" required minLength={2} />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().propsOfFields).toMatchInlineSnapshot(`
      {
        "myField": {
          "innerRef": {
            "current": <input
              class="dnb-input__input"
              id="id-rp"
              name="myField"
              type="text"
              value=""
            />,
          },
          "label": "My field",
          "path": "/myField",
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": undefined,
            "type": "string",
          },
          "width": "large",
        },
        "nested": {
          "myString": {
            "innerRef": {
              "current": <input
                aria-required="true"
                class="dnb-input__input"
                id="id-r10"
                name="nested/myString"
                type="text"
                value="my string"
              />,
            },
            "minLength": 2,
            "path": "/nested/myString",
            "required": true,
            "schema": {
              "maxLength": undefined,
              "minLength": 2,
              "pattern": undefined,
              "type": "string",
            },
            "width": "large",
          },
        },
      }
    `)

    rerender(
      <Form.Handler data={{ myString: 'my string' }}>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Field.String
            path="/myString"
            value="local value"
            required
            minLength={2}
          />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().propsOfFields).toMatchInlineSnapshot(`
      {
        "myField": {
          "innerRef": {
            "current": <input
              aria-required="true"
              class="dnb-input__input"
              id="id-rp"
              name="myString"
              type="text"
              value="local value"
            />,
          },
          "label": "My field",
          "path": "/myField",
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": undefined,
            "type": "string",
          },
          "width": "large",
        },
        "myString": {
          "innerRef": {
            "current": <input
              aria-required="true"
              class="dnb-input__input"
              id="id-rp"
              name="myString"
              type="text"
              value="local value"
            />,
          },
          "minLength": 2,
          "path": "/myString",
          "required": true,
          "schema": {
            "maxLength": undefined,
            "minLength": 2,
            "pattern": undefined,
            "type": "string",
          },
          "value": "local value",
          "width": "large",
        },
        "nested": {
          "myString": {
            "innerRef": {
              "current": null,
            },
            "minLength": 2,
            "path": "/nested/myString",
            "required": true,
            "schema": {
              "maxLength": undefined,
              "minLength": 2,
              "pattern": undefined,
              "type": "string",
            },
            "width": "large",
          },
        },
      }
    `)
  })

  it('should return "propsOfValues" with object that contains all props', () => {
    const generateRef = React.createRef<GenerateRef>()

    const { rerender } = render(
      <Form.Handler data={{ nested: { myString: 'my string' } }}>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Value.String path="/myValue" label="My field" />
          <Value.String path="/nested/myString" placeholder="-" />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().propsOfValues).toMatchInlineSnapshot(`
      {
        "myValue": {
          "label": "My field",
          "path": "/myValue",
        },
        "nested": {
          "myString": {
            "path": "/nested/myString",
            "placeholder": "-",
          },
        },
      }
    `)

    rerender(
      <Form.Handler data={{ myString: 'my string' }}>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Value.String path="/myString" value="local value" />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().propsOfValues).toMatchInlineSnapshot(`
      {
        "myString": {
          "path": "/myString",
          "value": "local value",
        },
        "myValue": {
          "label": "My field",
          "path": "/myValue",
        },
        "nested": {
          "myString": {
            "path": "/nested/myString",
            "placeholder": "-",
          },
        },
      }
    `)
  })

  it('should generate schema with different types', () => {
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateRef}>
          <Field.String path="/myString" />
          <Field.Number path="/myNumber" />
          <Field.Boolean path="/myBoolean" />
          <Field.Toggle
            path="/myToggle"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().schema).toMatchInlineSnapshot(`
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

  const generateRef = React.createRef<GenerateRef>()

  it('should generate schema with various properties', () => {
    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateRef}>
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
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().schema).toMatchInlineSnapshot(`
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
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateRef}>
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
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().schema).toMatchInlineSnapshot(`
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
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateRef}>
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
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    expect(generateRef.current().schema).toMatchInlineSnapshot(`
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
    const generateRef = React.createRef<GenerateRef>()

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
        <Tools.GenerateSchema generateRef={generateRef}>
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
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    const { schema, data } = generateRef.current()

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
