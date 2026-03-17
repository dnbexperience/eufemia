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

    expect(log).toHaveBeenCalledWith(
      expect.objectContaining({
        propsOfFields: expect.objectContaining({
          myString: expect.objectContaining({
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
            ref: {
              current: expect.any(Object),
            },
          }),
        }),
        propsOfValues: {},
      })
    )

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
          "label": "My field",
          "path": "/myField",
          "ref": {
            "current": <input
              autocomplete="off"
              class="dnb-input__input"
              id="id-rb"
              name="myField"
              type="text"
            />,
          },
          "width": "large",
        },
        "nested": {
          "myString": {
            "minLength": 2,
            "path": "/nested/myString",
            "ref": {
              "current": <input
                aria-required="true"
                autocomplete="off"
                class="dnb-input__input"
                id="id-ri"
                name="nested/myString"
                type="text"
              />,
            },
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
          "label": "My field",
          "path": "/myField",
          "ref": {
            "current": <input
              aria-required="true"
              autocomplete="off"
              class="dnb-input__input"
              id="id-rb"
              name="myString"
              type="text"
            />,
          },
          "width": "large",
        },
        "myString": {
          "minLength": 2,
          "path": "/myString",
          "ref": {
            "current": <input
              aria-required="true"
              autocomplete="off"
              class="dnb-input__input"
              id="id-rb"
              name="myString"
              type="text"
            />,
          },
          "required": true,
          "value": "local value",
          "width": "large",
        },
        "nested": {
          "myString": {
            "minLength": 2,
            "path": "/nested/myString",
            "ref": {
              "current": null,
            },
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
            "path": "/myNumber",
            "ref": {
              "current": <input
                autocomplete="off"
                class="dnb-input__input"
                id="id-r16"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "valueType": "number",
            "width": "medium",
          },
          "myString": {
            "path": "/myString",
            "ref": {
              "current": <input
                autocomplete="off"
                class="dnb-input__input"
                id="id-rv"
                name="myString"
                type="text"
              />,
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
            "maximum": 20,
            "minimum": 10,
            "multipleOf": 2,
            "path": "/myNumber",
            "ref": {
              "current": <input
                autocomplete="off"
                class="dnb-input__input"
                id="id-r2h"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "valueType": "number",
            "width": "medium",
          },
          "myObject": {
            "withString": {
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "pattern": "^[a-z]{2}[0-9]+",
              "ref": {
                "current": <input
                  autocomplete="off"
                  class="dnb-input__input"
                  id="id-r23"
                  name="myObject/withString"
                  type="text"
                />,
              },
              "width": "large",
            },
          },
          "myString": {
            "maxLength": 5,
            "minLength": 5,
            "path": "/myString",
            "ref": {
              "current": <input
                autocomplete="off"
                class="dnb-input__input"
                id="id-r1s"
                name="myString"
                type="text"
              />,
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
                "maximum": 20,
                "minimum": 10,
                "multipleOf": 2,
                "path": "/myObject/nested/withNumber",
                "ref": {
                  "current": <input
                    autocomplete="off"
                    class="dnb-input__input"
                    id="id-r30"
                    inputmode="decimal"
                    name="myObject/nested/withNumber"
                    type="text"
                  />,
                },
                "valueType": "number",
                "width": "medium",
              },
            },
            "withString": {
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "ref": {
                "current": <input
                  autocomplete="off"
                  class="dnb-input__input"
                  id="id-r2p"
                  name="myObject/withString"
                  type="text"
                />,
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
              "maximum": 20,
              "minimum": 10,
              "path": "/myObject/withNumber",
              "ref": {
                "current": <input
                  aria-required="true"
                  autocomplete="off"
                  class="dnb-input__input"
                  id="id-r3t"
                  inputmode="decimal"
                  name="myObject/withNumber"
                  type="text"
                />,
              },
              "required": true,
              "valueType": "number",
              "width": "medium",
            },
            "withString": {
              "maxLength": 10,
              "minLength": 10,
              "path": "/myObject/withString",
              "ref": {
                "current": <input
                  aria-required="true"
                  autocomplete="off"
                  class="dnb-input__input"
                  id="id-r3f"
                  name="myObject/withString"
                  type="text"
                />,
              },
              "required": true,
              "width": "large",
            },
          },
          "myString": {
            "path": "/myString",
            "ref": {
              "current": <input
                aria-required="true"
                autocomplete="off"
                class="dnb-input__input"
                id="id-r38"
                name="myString"
                type="text"
              />,
            },
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
              "itemPath": "/item",
              "label": "My field",
              "ref": {
                "current": <input
                  aria-valuemax="9007199254740991"
                  aria-valuemin="-9007199254740991"
                  aria-valuenow="0"
                  aria-valuetext="0"
                  autocomplete="off"
                  class="dnb-input__input"
                  id="id-r4b"
                  inputmode="decimal"
                  name="id-r4b"
                  role="spinbutton"
                  step="1"
                  type="text"
                  value="0suffix"
                />,
              },
              "showStepControls": true,
              "suffix": "suffix",
              "valueType": "number",
              "width": "medium",
            },
          },
          "1": {
            "item": {
              "itemPath": "/item",
              "label": "My field",
              "ref": {
                "current": <input
                  aria-valuemax="9007199254740991"
                  aria-valuemin="-9007199254740991"
                  aria-valuenow="1"
                  aria-valuetext="1"
                  autocomplete="off"
                  class="dnb-input__input"
                  id="id-r4i"
                  inputmode="decimal"
                  name="id-r4i"
                  role="spinbutton"
                  step="1"
                  type="text"
                  value="1suffix"
                />,
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
