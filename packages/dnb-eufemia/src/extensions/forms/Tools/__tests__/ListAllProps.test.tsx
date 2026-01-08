import React from 'react'
import { render } from '@testing-library/react'
import { Field, Form, Iterate, Tools, Value } from '../../'
import type { GenerateRef } from '../ListAllProps'

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
          schema: expect.objectContaining({
            def: expect.objectContaining({
              type: 'string',
            }),
            '~standard': expect.objectContaining({
              vendor: 'zod',
              version: 1,
            }),
          }),
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
              id="id-ra"
              name="myField"
              type="text"
            />,
          },
          "label": "My field",
          "path": "/myField",
          "width": "large",
        },
        "nested": {
          "myString": {
            "innerRef": {
              "current": <input
                aria-required="true"
                class="dnb-input__input"
                id="id-rg"
                name="nested/myString"
                type="text"
              />,
            },
            "minLength": 2,
            "path": "/nested/myString",
            "required": true,
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
              id="id-ra"
              name="myString"
              type="text"
            />,
          },
          "label": "My field",
          "path": "/myField",
          "width": "large",
        },
        "myString": {
          "innerRef": {
            "current": <input
              aria-required="true"
              class="dnb-input__input"
              id="id-ra"
              name="myString"
              type="text"
            />,
          },
          "minLength": 2,
          "path": "/myString",
          "required": true,
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
                id="id-r12"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "path": "/myNumber",
            "valueType": "number",
            "width": "medium",
          },
          "myString": {
            "innerRef": {
              "current": <input
                class="dnb-input__input"
                id="id-rs"
                name="myString"
                type="text"
              />,
            },
            "path": "/myString",
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
                id="id-r2a"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "maximum": 20,
            "minimum": 10,
            "multipleOf": 2,
            "path": "/myNumber",
            "valueType": "number",
            "width": "medium",
          },
          "myObject": {
            "withString": {
              "innerRef": {
                "current": <input
                  class="dnb-input__input"
                  id="id-r1t"
                  name="myObject/withString"
                  type="text"
                />,
              },
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "pattern": "^[a-z]{2}[0-9]+",
              "width": "large",
            },
          },
          "myString": {
            "innerRef": {
              "current": <input
                class="dnb-input__input"
                id="id-r1n"
                name="myString"
                type="text"
              />,
            },
            "maxLength": 5,
            "minLength": 5,
            "path": "/myString",
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
                    id="id-r2n"
                    inputmode="decimal"
                    name="myObject/nested/withNumber"
                    type="text"
                  />,
                },
                "maximum": 20,
                "minimum": 10,
                "multipleOf": 2,
                "path": "/myObject/nested/withNumber",
                "valueType": "number",
                "width": "medium",
              },
            },
            "withString": {
              "innerRef": {
                "current": <input
                  class="dnb-input__input"
                  id="id-r2h"
                  name="myObject/withString"
                  type="text"
                />,
              },
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
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
                  id="id-r3h"
                  inputmode="decimal"
                  name="myObject/withNumber"
                  type="text"
                />,
              },
              "maximum": 20,
              "minimum": 10,
              "path": "/myObject/withNumber",
              "required": true,
              "valueType": "number",
              "width": "medium",
            },
            "withString": {
              "innerRef": {
                "current": <input
                  aria-required="true"
                  class="dnb-input__input"
                  id="id-r34"
                  name="myObject/withString"
                  type="text"
                />,
              },
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "required": true,
              "width": "large",
            },
          },
          "myString": {
            "innerRef": {
              "current": <input
                aria-required="true"
                class="dnb-input__input"
                id="id-r2u"
                name="myString"
                type="text"
              />,
            },
            "path": "/myString",
            "required": true,
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
                  id="id-r3u"
                  inputmode="decimal"
                  name="id-r3u"
                  role="spinbutton"
                  step="1"
                  type="text"
                />,
              },
              "itemPath": "/item",
              "label": "My field",
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
                  id="id-r44"
                  inputmode="decimal"
                  name="id-r44"
                  role="spinbutton"
                  step="1"
                  type="text"
                />,
              },
              "itemPath": "/item",
              "label": "My field",
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
