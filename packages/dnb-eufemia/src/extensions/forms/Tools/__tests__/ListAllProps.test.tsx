import React from 'react'
import { render } from '@testing-library/react'
import { Field, Form, Iterate, Tools, Value } from '../../'
import { GenerateRef } from '../ListAllProps'

describe('Tools.ListAllProps', () => {
  it('should console log a all props', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <Form.Handler>
        <Tools.ListAllProps log>
          <Field.String
            path="/myString"
            pattern="^[a-z]{2}[0-9]+$"
            required
          />
          <Value.String value="local value" placeholder="-" />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(log).toHaveBeenCalledWith({
      propsOfFields: {
        myString: {
          path: '/myString',
          pattern: '^[a-z]{2}[0-9]+$',
          required: true,
          schema: {
            maxLength: undefined,
            minLength: undefined,
            pattern: '^[a-z]{2}[0-9]+$',
            type: 'string',
          },
          width: 'large',
          innerRef: {
            current: expect.any(Object),
          },
        },
      },
      propsOfValues: {},
    })

    log.mockRestore()
  })

  it('should return "propsOfFields" with object that contains all props', () => {
    const generateRef = React.createRef<GenerateRef>()

    const { rerender } = render(
      <Form.Handler data={{ nested: { myString: 'my string' } }}>
        <Tools.ListAllProps generateRef={generateRef}>
          <Field.String path="/myField" label="My field" />
          <Field.String path="/nested/myString" required minLength={2} />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(generateRef.current().propsOfFields).toMatchInlineSnapshot(`
      {
        "myField": {
          "innerRef": {
            "current": <input
              class="dnb-input__input"
              id="id-r9"
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
                id="id-rf"
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
        <Tools.ListAllProps generateRef={generateRef}>
          <Field.String
            path="/myString"
            value="local value"
            required
            minLength={2}
          />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(generateRef.current().propsOfFields).toMatchInlineSnapshot(`
      {
        "myField": {
          "innerRef": {
            "current": <input
              aria-required="true"
              class="dnb-input__input"
              id="id-r9"
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
              id="id-r9"
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
        <Tools.ListAllProps generateRef={generateRef}>
          <Value.String path="/myValue" label="My field" />
          <Value.String path="/nested/myString" placeholder="-" />
        </Tools.ListAllProps>
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
        <Tools.ListAllProps generateRef={generateRef}>
          <Value.String path="/myString" value="local value" />
        </Tools.ListAllProps>
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

  it('should generate list of all props with different types', () => {
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateRef}>
          <Field.String path="/myString" />
          <Field.Number path="/myNumber" />
          <Field.Boolean path="/myBoolean" />
          <Field.Toggle
            path="/myToggle"
            valueOn="checked"
            valueOff="unchecked"
          />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(generateRef.current()).toMatchInlineSnapshot(`
      {
        "propsOfFields": {
          "myBoolean": {
            "path": "/myBoolean",
            "textOff": "Nei",
            "textOn": "Ja",
            "valueOff": false,
            "valueOn": true,
            "valueType": "boolean",
          },
          "myNumber": {
            "innerRef": {
              "current": <input
                class="dnb-input__input"
                id="id-rv"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "path": "/myNumber",
            "schema": {
              "exclusiveMaximum": undefined,
              "exclusiveMinimum": undefined,
              "maximum": 9007199254740991,
              "minimum": -9007199254740991,
              "multipleOf": undefined,
              "type": "number",
            },
            "valueType": "number",
            "width": "medium",
          },
          "myString": {
            "innerRef": {
              "current": <input
                class="dnb-input__input"
                id="id-rp"
                name="myString"
                type="text"
                value=""
              />,
            },
            "path": "/myString",
            "schema": {
              "maxLength": undefined,
              "minLength": undefined,
              "pattern": undefined,
              "type": "string",
            },
            "width": "large",
          },
          "myToggle": {
            "path": "/myToggle",
            "valueOff": "unchecked",
            "valueOn": "checked",
          },
        },
        "propsOfValues": {},
      }
    `)
  })

  const generateRef = React.createRef<GenerateRef>()

  it('should generate props object with various properties', () => {
    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateRef}>
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
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(generateRef.current()).toMatchInlineSnapshot(`
      {
        "propsOfFields": {
          "myBoolean": {
            "path": "/myBoolean",
            "textOff": "Nei",
            "textOn": "Ja",
            "valueOff": false,
            "valueOn": true,
            "valueType": "boolean",
          },
          "myNumber": {
            "exclusiveMaximum": 25,
            "exclusiveMinimum": 15,
            "innerRef": {
              "current": <input
                class="dnb-input__input"
                id="id-r27"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "maximum": 20,
            "minimum": 10,
            "multipleOf": 2,
            "path": "/myNumber",
            "schema": {
              "exclusiveMaximum": 25,
              "exclusiveMinimum": 15,
              "maximum": 20,
              "minimum": 10,
              "multipleOf": 2,
              "type": "number",
            },
            "valueType": "number",
            "width": "medium",
          },
          "myObject": {
            "withString": {
              "innerRef": {
                "current": <input
                  class="dnb-input__input"
                  id="id-r1q"
                  name="myObject/withString"
                  type="text"
                  value=""
                />,
              },
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "pattern": "^[a-z]{2}[0-9]+",
              "schema": {
                "maxLength": 10,
                "minLength": 10,
                "pattern": "^[a-z]{2}[0-9]+",
                "type": "string",
              },
              "width": "large",
            },
          },
          "myString": {
            "innerRef": {
              "current": <input
                class="dnb-input__input"
                id="id-r1k"
                name="myString"
                type="text"
                value=""
              />,
            },
            "maxLength": 5,
            "minLength": 5,
            "path": "/myString",
            "schema": {
              "maxLength": 5,
              "minLength": 5,
              "pattern": undefined,
              "type": "string",
            },
            "width": "large",
          },
        },
        "propsOfValues": {},
      }
    `)
  })

  it('should generate props object with nested paths', () => {
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateRef}>
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
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(generateRef.current()).toMatchInlineSnapshot(`
      {
        "propsOfFields": {
          "myObject": {
            "nested": {
              "withNumber": {
                "exclusiveMaximum": 25,
                "exclusiveMinimum": 15,
                "innerRef": {
                  "current": <input
                    class="dnb-input__input"
                    id="id-r2k"
                    inputmode="decimal"
                    name="myObject/nested/withNumber"
                    type="text"
                  />,
                },
                "maximum": 20,
                "minimum": 10,
                "multipleOf": 2,
                "path": "/myObject/nested/withNumber",
                "schema": {
                  "exclusiveMaximum": 25,
                  "exclusiveMinimum": 15,
                  "maximum": 20,
                  "minimum": 10,
                  "multipleOf": 2,
                  "type": "number",
                },
                "valueType": "number",
                "width": "medium",
              },
            },
            "withString": {
              "innerRef": {
                "current": <input
                  class="dnb-input__input"
                  id="id-r2e"
                  name="myObject/withString"
                  type="text"
                  value=""
                />,
              },
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "schema": {
                "maxLength": 10,
                "minLength": 10,
                "pattern": undefined,
                "type": "string",
              },
              "width": "large",
            },
          },
        },
        "propsOfValues": {},
      }
    `)
  })

  it('should generate props object with required', () => {
    const generateRef = React.createRef<GenerateRef>()

    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateRef}>
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
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(generateRef.current()).toMatchInlineSnapshot(`
      {
        "propsOfFields": {
          "myBoolean": {
            "path": "/myBoolean",
            "required": true,
            "textOff": "Nei",
            "textOn": "Ja",
            "valueOff": false,
            "valueOn": true,
            "valueType": "boolean",
          },
          "myObject": {
            "withNumber": {
              "innerRef": {
                "current": <input
                  aria-required="true"
                  class="dnb-input__input"
                  id="id-r3e"
                  inputmode="decimal"
                  name="myObject/withNumber"
                  type="text"
                />,
              },
              "maximum": 20,
              "minimum": 10,
              "path": "/myObject/withNumber",
              "required": true,
              "schema": {
                "exclusiveMaximum": undefined,
                "exclusiveMinimum": undefined,
                "maximum": 20,
                "minimum": 10,
                "multipleOf": undefined,
                "type": "number",
              },
              "valueType": "number",
              "width": "medium",
            },
            "withString": {
              "innerRef": {
                "current": <input
                  aria-required="true"
                  class="dnb-input__input"
                  id="id-r31"
                  name="myObject/withString"
                  type="text"
                  value=""
                />,
              },
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "required": true,
              "schema": {
                "maxLength": 10,
                "minLength": 10,
                "pattern": undefined,
                "type": "string",
              },
              "width": "large",
            },
          },
          "myString": {
            "innerRef": {
              "current": <input
                aria-required="true"
                class="dnb-input__input"
                id="id-r2r"
                name="myString"
                type="text"
                value=""
              />,
            },
            "path": "/myString",
            "required": true,
            "schema": {
              "maxLength": undefined,
              "minLength": undefined,
              "pattern": undefined,
              "type": "string",
            },
            "width": "large",
          },
        },
        "propsOfValues": {},
      }
    `)
  })

  it('should filter out React elements', () => {
    const generateRef = React.createRef<
      GenerateRef<{
        items: {
          children: {
            type: {
              name: string
            }
          }
        }
      }>
    >()

    render(
      <Form.Handler data={{ count: 2 }}>
        <Tools.ListAllProps generateRef={generateRef}>
          <Iterate.Array
            path="/items"
            countPath="/count"
            countPathTransform={({ value, index }) => {
              return 'item' in (value || {}) ? value : { item: index }
            }}
          >
            <Field.Number
              itemPath="/item"
              label="My field"
              suffix="suffix"
              showStepControls
            />
          </Iterate.Array>
        </Tools.ListAllProps>
      </Form.Handler>
    )

    expect(
      generateRef.current().propsOfFields?.items?.children?.type?.name
    ).not.toBe('NumberComponent')
    expect(generateRef.current().propsOfFields).toMatchInlineSnapshot(`
      {
        "items": {
          "0": {
            "item": {
              "innerRef": {
                "current": <input
                  aria-valuemax="9007199254740991"
                  aria-valuemin="-9007199254740991"
                  aria-valuenow="0"
                  aria-valuetext="0"
                  class="dnb-input__input"
                  id="id-r3q"
                  inputmode="decimal"
                  name="id-r3q"
                  role="spinbutton"
                  step="1"
                  type="text"
                />,
              },
              "itemPath": "/item",
              "label": "My field",
              "schema": {
                "exclusiveMaximum": undefined,
                "exclusiveMinimum": undefined,
                "maximum": 9007199254740991,
                "minimum": -9007199254740991,
                "multipleOf": undefined,
                "type": "number",
              },
              "showStepControls": true,
              "suffix": "suffix",
              "valueType": "number",
              "width": "medium",
            },
          },
          "1": {
            "item": {
              "innerRef": {
                "current": <input
                  aria-valuemax="9007199254740991"
                  aria-valuemin="-9007199254740991"
                  aria-valuenow="1"
                  aria-valuetext="1"
                  class="dnb-input__input"
                  id="id-r40"
                  inputmode="decimal"
                  name="id-r40"
                  role="spinbutton"
                  step="1"
                  type="text"
                />,
              },
              "itemPath": "/item",
              "label": "My field",
              "schema": {
                "exclusiveMaximum": undefined,
                "exclusiveMinimum": undefined,
                "maximum": 9007199254740991,
                "minimum": -9007199254740991,
                "multipleOf": undefined,
                "type": "number",
              },
              "showStepControls": true,
              "suffix": "suffix",
              "valueType": "number",
              "width": "medium",
            },
          },
          "countPath": "/count",
          "path": "/items",
          "required": false,
          "value": [
            {
              "item": 0,
            },
            {
              "item": 1,
            },
          ],
        },
      }
    `)
  })
})
