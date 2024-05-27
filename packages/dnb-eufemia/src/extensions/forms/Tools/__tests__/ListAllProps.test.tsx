import React from 'react'
import { render } from '@testing-library/react'
import { Field, Form, Tools, Value } from '../../'
import { ListAllPropsProps } from '../ListAllProps'

type GenerateRef = ListAllPropsProps['generateRef']['current']

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
          errorMessages: {
            maxLength:
              'Verdien kan ikke være lengre enn {maxLength} tegn.',
            minLength:
              'Verdien kan ikke være kortere enn {minLength} tegn.',
            pattern: 'Verdien er ugyldig.',
            required: 'Dette feltet må fylles ut.',
          },
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
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Verdien er ugyldig.",
            "required": "Dette feltet må fylles ut.",
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
            "errorMessages": {
              "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
              "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
              "pattern": "Verdien er ugyldig.",
              "required": "Dette feltet må fylles ut.",
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
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Verdien er ugyldig.",
            "required": "Dette feltet må fylles ut.",
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
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Verdien er ugyldig.",
            "required": "Dette feltet må fylles ut.",
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
            "errorMessages": {
              "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
              "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
              "pattern": "Verdien er ugyldig.",
              "required": "Dette feltet må fylles ut.",
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
            "errorMessages": {
              "exclusiveMaximum": "Verdien må være mindre enn {exclusiveMaximum}.",
              "exclusiveMinimum": "Verdien må være større enn {exclusiveMinimum}.",
              "maximum": "Verdien må være maksimalt {maximum}.",
              "minimum": "Verdien må være minst {minimum}.",
              "multipleOf": "Verdien må være et multiplum av {multipleOf}.",
              "required": "Dette feltet må fylles ut.",
            },
            "path": "/myNumber",
            "schema": {
              "exclusiveMaximum": undefined,
              "exclusiveMinimum": undefined,
              "maximum": undefined,
              "minimum": undefined,
              "multipleOf": undefined,
              "type": "number",
            },
            "valueType": "number",
            "width": "medium",
          },
          "myString": {
            "errorMessages": {
              "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
              "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
              "pattern": "Verdien er ugyldig.",
              "required": "Dette feltet må fylles ut.",
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

  it('should generate schema with various properties', () => {
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
            "errorMessages": {
              "exclusiveMaximum": "Verdien må være mindre enn {exclusiveMaximum}.",
              "exclusiveMinimum": "Verdien må være større enn {exclusiveMinimum}.",
              "maximum": "Verdien må være maksimalt {maximum}.",
              "minimum": "Verdien må være minst {minimum}.",
              "multipleOf": "Verdien må være et multiplum av {multipleOf}.",
              "required": "Dette feltet må fylles ut.",
            },
            "exclusiveMaximum": 25,
            "exclusiveMinimum": 15,
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
              "errorMessages": {
                "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
                "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
                "pattern": "Verdien er ugyldig.",
                "required": "Dette feltet må fylles ut.",
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
            "errorMessages": {
              "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
              "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
              "pattern": "Verdien er ugyldig.",
              "required": "Dette feltet må fylles ut.",
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

  it('should generate schema with nested paths', () => {
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
                "errorMessages": {
                  "exclusiveMaximum": "Verdien må være mindre enn {exclusiveMaximum}.",
                  "exclusiveMinimum": "Verdien må være større enn {exclusiveMinimum}.",
                  "maximum": "Verdien må være maksimalt {maximum}.",
                  "minimum": "Verdien må være minst {minimum}.",
                  "multipleOf": "Verdien må være et multiplum av {multipleOf}.",
                  "required": "Dette feltet må fylles ut.",
                },
                "exclusiveMaximum": 25,
                "exclusiveMinimum": 15,
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
              "errorMessages": {
                "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
                "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
                "pattern": "Verdien er ugyldig.",
                "required": "Dette feltet må fylles ut.",
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

  it('should generate schema with required', () => {
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
              "errorMessages": {
                "exclusiveMaximum": "Verdien må være mindre enn {exclusiveMaximum}.",
                "exclusiveMinimum": "Verdien må være større enn {exclusiveMinimum}.",
                "maximum": "Verdien må være maksimalt {maximum}.",
                "minimum": "Verdien må være minst {minimum}.",
                "multipleOf": "Verdien må være et multiplum av {multipleOf}.",
                "required": "Dette feltet må fylles ut.",
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
              "errorMessages": {
                "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
                "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
                "pattern": "Verdien er ugyldig.",
                "required": "Dette feltet må fylles ut.",
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
            "errorMessages": {
              "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
              "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
              "pattern": "Verdien er ugyldig.",
              "required": "Dette feltet må fylles ut.",
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
})
