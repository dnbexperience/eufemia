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
          "schema": ZodString {
            "and": [Function],
            "array": [Function],
            "base64": [Function],
            "base64url": [Function],
            "brand": [Function],
            "catch": [Function],
            "check": [Function],
            "cidrv4": [Function],
            "cidrv6": [Function],
            "clone": [Function],
            "cuid": [Function],
            "cuid2": [Function],
            "date": [Function],
            "datetime": [Function],
            "def": {
              "checks": [
                $ZodCheck {},
              ],
              "type": "string",
            },
            "default": [Function],
            "describe": [Function],
            "duration": [Function],
            "e164": [Function],
            "email": [Function],
            "emoji": [Function],
            "endsWith": [Function],
            "format": null,
            "guid": [Function],
            "includes": [Function],
            "ipv4": [Function],
            "ipv6": [Function],
            "isNullable": [Function],
            "isOptional": [Function],
            "jwt": [Function],
            "ksuid": [Function],
            "length": [Function],
            "lowercase": [Function],
            "max": [Function],
            "maxLength": null,
            "meta": [Function],
            "min": [Function],
            "minLength": null,
            "nanoid": [Function],
            "nonempty": [Function],
            "nonoptional": [Function],
            "normalize": [Function],
            "nullable": [Function],
            "nullish": [Function],
            "optional": [Function],
            "or": [Function],
            "overwrite": [Function],
            "parse": [Function],
            "parseAsync": [Function],
            "pipe": [Function],
            "prefault": [Function],
            "readonly": [Function],
            "refine": [Function],
            "regex": [Function],
            "register": [Function],
            "safeParse": [Function],
            "safeParseAsync": [Function],
            "spa": [Function],
            "startsWith": [Function],
            "superRefine": [Function],
            "time": [Function],
            "toLowerCase": [Function],
            "toUpperCase": [Function],
            "transform": [Function],
            "trim": [Function],
            "ulid": [Function],
            "uppercase": [Function],
            "url": [Function],
            "uuid": [Function],
            "uuidv4": [Function],
            "uuidv6": [Function],
            "uuidv7": [Function],
            "xid": [Function],
            "~standard": {
              "validate": [Function],
              "vendor": "zod",
              "version": 1,
            },
          },
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
            "schema": ZodString {
              "and": [Function],
              "array": [Function],
              "base64": [Function],
              "base64url": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "cidrv4": [Function],
              "cidrv6": [Function],
              "clone": [Function],
              "cuid": [Function],
              "cuid2": [Function],
              "date": [Function],
              "datetime": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "string",
              },
              "default": [Function],
              "describe": [Function],
              "duration": [Function],
              "e164": [Function],
              "email": [Function],
              "emoji": [Function],
              "endsWith": [Function],
              "format": null,
              "guid": [Function],
              "includes": [Function],
              "ipv4": [Function],
              "ipv6": [Function],
              "isNullable": [Function],
              "isOptional": [Function],
              "jwt": [Function],
              "ksuid": [Function],
              "length": [Function],
              "lowercase": [Function],
              "max": [Function],
              "maxLength": null,
              "meta": [Function],
              "min": [Function],
              "minLength": null,
              "nanoid": [Function],
              "nonempty": [Function],
              "nonoptional": [Function],
              "normalize": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "regex": [Function],
              "register": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "startsWith": [Function],
              "superRefine": [Function],
              "time": [Function],
              "toLowerCase": [Function],
              "toUpperCase": [Function],
              "transform": [Function],
              "trim": [Function],
              "ulid": [Function],
              "uppercase": [Function],
              "url": [Function],
              "uuid": [Function],
              "uuidv4": [Function],
              "uuidv6": [Function],
              "uuidv7": [Function],
              "xid": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
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
              id="id-ra"
              name="myString"
              type="text"
            />,
          },
          "label": "My field",
          "path": "/myField",
          "schema": ZodString {
            "and": [Function],
            "array": [Function],
            "base64": [Function],
            "base64url": [Function],
            "brand": [Function],
            "catch": [Function],
            "check": [Function],
            "cidrv4": [Function],
            "cidrv6": [Function],
            "clone": [Function],
            "cuid": [Function],
            "cuid2": [Function],
            "date": [Function],
            "datetime": [Function],
            "def": {
              "checks": [
                $ZodCheck {},
              ],
              "type": "string",
            },
            "default": [Function],
            "describe": [Function],
            "duration": [Function],
            "e164": [Function],
            "email": [Function],
            "emoji": [Function],
            "endsWith": [Function],
            "format": null,
            "guid": [Function],
            "includes": [Function],
            "ipv4": [Function],
            "ipv6": [Function],
            "isNullable": [Function],
            "isOptional": [Function],
            "jwt": [Function],
            "ksuid": [Function],
            "length": [Function],
            "lowercase": [Function],
            "max": [Function],
            "maxLength": null,
            "meta": [Function],
            "min": [Function],
            "minLength": null,
            "nanoid": [Function],
            "nonempty": [Function],
            "nonoptional": [Function],
            "normalize": [Function],
            "nullable": [Function],
            "nullish": [Function],
            "optional": [Function],
            "or": [Function],
            "overwrite": [Function],
            "parse": [Function],
            "parseAsync": [Function],
            "pipe": [Function],
            "prefault": [Function],
            "readonly": [Function],
            "refine": [Function],
            "regex": [Function],
            "register": [Function],
            "safeParse": [Function],
            "safeParseAsync": [Function],
            "spa": [Function],
            "startsWith": [Function],
            "superRefine": [Function],
            "time": [Function],
            "toLowerCase": [Function],
            "toUpperCase": [Function],
            "transform": [Function],
            "trim": [Function],
            "ulid": [Function],
            "uppercase": [Function],
            "url": [Function],
            "uuid": [Function],
            "uuidv4": [Function],
            "uuidv6": [Function],
            "uuidv7": [Function],
            "xid": [Function],
            "~standard": {
              "validate": [Function],
              "vendor": "zod",
              "version": 1,
            },
          },
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
          "schema": ZodString {
            "and": [Function],
            "array": [Function],
            "base64": [Function],
            "base64url": [Function],
            "brand": [Function],
            "catch": [Function],
            "check": [Function],
            "cidrv4": [Function],
            "cidrv6": [Function],
            "clone": [Function],
            "cuid": [Function],
            "cuid2": [Function],
            "date": [Function],
            "datetime": [Function],
            "def": {
              "checks": [
                $ZodCheck {},
              ],
              "type": "string",
            },
            "default": [Function],
            "describe": [Function],
            "duration": [Function],
            "e164": [Function],
            "email": [Function],
            "emoji": [Function],
            "endsWith": [Function],
            "format": null,
            "guid": [Function],
            "includes": [Function],
            "ipv4": [Function],
            "ipv6": [Function],
            "isNullable": [Function],
            "isOptional": [Function],
            "jwt": [Function],
            "ksuid": [Function],
            "length": [Function],
            "lowercase": [Function],
            "max": [Function],
            "maxLength": null,
            "meta": [Function],
            "min": [Function],
            "minLength": null,
            "nanoid": [Function],
            "nonempty": [Function],
            "nonoptional": [Function],
            "normalize": [Function],
            "nullable": [Function],
            "nullish": [Function],
            "optional": [Function],
            "or": [Function],
            "overwrite": [Function],
            "parse": [Function],
            "parseAsync": [Function],
            "pipe": [Function],
            "prefault": [Function],
            "readonly": [Function],
            "refine": [Function],
            "regex": [Function],
            "register": [Function],
            "safeParse": [Function],
            "safeParseAsync": [Function],
            "spa": [Function],
            "startsWith": [Function],
            "superRefine": [Function],
            "time": [Function],
            "toLowerCase": [Function],
            "toUpperCase": [Function],
            "transform": [Function],
            "trim": [Function],
            "ulid": [Function],
            "uppercase": [Function],
            "url": [Function],
            "uuid": [Function],
            "uuidv4": [Function],
            "uuidv6": [Function],
            "uuidv7": [Function],
            "xid": [Function],
            "~standard": {
              "validate": [Function],
              "vendor": "zod",
              "version": 1,
            },
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
            "schema": ZodString {
              "and": [Function],
              "array": [Function],
              "base64": [Function],
              "base64url": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "cidrv4": [Function],
              "cidrv6": [Function],
              "clone": [Function],
              "cuid": [Function],
              "cuid2": [Function],
              "date": [Function],
              "datetime": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "string",
              },
              "default": [Function],
              "describe": [Function],
              "duration": [Function],
              "e164": [Function],
              "email": [Function],
              "emoji": [Function],
              "endsWith": [Function],
              "format": null,
              "guid": [Function],
              "includes": [Function],
              "ipv4": [Function],
              "ipv6": [Function],
              "isNullable": [Function],
              "isOptional": [Function],
              "jwt": [Function],
              "ksuid": [Function],
              "length": [Function],
              "lowercase": [Function],
              "max": [Function],
              "maxLength": null,
              "meta": [Function],
              "min": [Function],
              "minLength": null,
              "nanoid": [Function],
              "nonempty": [Function],
              "nonoptional": [Function],
              "normalize": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "regex": [Function],
              "register": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "startsWith": [Function],
              "superRefine": [Function],
              "time": [Function],
              "toLowerCase": [Function],
              "toUpperCase": [Function],
              "transform": [Function],
              "trim": [Function],
              "ulid": [Function],
              "uppercase": [Function],
              "url": [Function],
              "uuid": [Function],
              "uuidv4": [Function],
              "uuidv6": [Function],
              "uuidv7": [Function],
              "xid": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
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
                id="id-r12"
                inputmode="decimal"
                name="myNumber"
                type="text"
              />,
            },
            "path": "/myNumber",
            "schema": ZodNumber {
              "and": [Function],
              "array": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "clone": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "number",
              },
              "default": [Function],
              "describe": [Function],
              "finite": [Function],
              "format": null,
              "gt": [Function],
              "gte": [Function],
              "int": [Function],
              "isFinite": true,
              "isInt": false,
              "isNullable": [Function],
              "isOptional": [Function],
              "lt": [Function],
              "lte": [Function],
              "max": [Function],
              "maxValue": Infinity,
              "meta": [Function],
              "min": [Function],
              "minValue": -Infinity,
              "multipleOf": [Function],
              "negative": [Function],
              "nonnegative": [Function],
              "nonoptional": [Function],
              "nonpositive": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "positive": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "register": [Function],
              "safe": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "step": [Function],
              "superRefine": [Function],
              "transform": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
            },
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
            "schema": ZodString {
              "and": [Function],
              "array": [Function],
              "base64": [Function],
              "base64url": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "cidrv4": [Function],
              "cidrv6": [Function],
              "clone": [Function],
              "cuid": [Function],
              "cuid2": [Function],
              "date": [Function],
              "datetime": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "string",
              },
              "default": [Function],
              "describe": [Function],
              "duration": [Function],
              "e164": [Function],
              "email": [Function],
              "emoji": [Function],
              "endsWith": [Function],
              "format": null,
              "guid": [Function],
              "includes": [Function],
              "ipv4": [Function],
              "ipv6": [Function],
              "isNullable": [Function],
              "isOptional": [Function],
              "jwt": [Function],
              "ksuid": [Function],
              "length": [Function],
              "lowercase": [Function],
              "max": [Function],
              "maxLength": null,
              "meta": [Function],
              "min": [Function],
              "minLength": null,
              "nanoid": [Function],
              "nonempty": [Function],
              "nonoptional": [Function],
              "normalize": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "regex": [Function],
              "register": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "startsWith": [Function],
              "superRefine": [Function],
              "time": [Function],
              "toLowerCase": [Function],
              "toUpperCase": [Function],
              "transform": [Function],
              "trim": [Function],
              "ulid": [Function],
              "uppercase": [Function],
              "url": [Function],
              "uuid": [Function],
              "uuidv4": [Function],
              "uuidv6": [Function],
              "uuidv7": [Function],
              "xid": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
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
            "schema": ZodNumber {
              "and": [Function],
              "array": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "clone": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "number",
              },
              "default": [Function],
              "describe": [Function],
              "finite": [Function],
              "format": null,
              "gt": [Function],
              "gte": [Function],
              "int": [Function],
              "isFinite": true,
              "isInt": false,
              "isNullable": [Function],
              "isOptional": [Function],
              "lt": [Function],
              "lte": [Function],
              "max": [Function],
              "maxValue": Infinity,
              "meta": [Function],
              "min": [Function],
              "minValue": -Infinity,
              "multipleOf": [Function],
              "negative": [Function],
              "nonnegative": [Function],
              "nonoptional": [Function],
              "nonpositive": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "positive": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "register": [Function],
              "safe": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "step": [Function],
              "superRefine": [Function],
              "transform": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
            },
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
              "schema": ZodString {
                "and": [Function],
                "array": [Function],
                "base64": [Function],
                "base64url": [Function],
                "brand": [Function],
                "catch": [Function],
                "check": [Function],
                "cidrv4": [Function],
                "cidrv6": [Function],
                "clone": [Function],
                "cuid": [Function],
                "cuid2": [Function],
                "date": [Function],
                "datetime": [Function],
                "def": {
                  "checks": [
                    $ZodCheck {},
                  ],
                  "type": "string",
                },
                "default": [Function],
                "describe": [Function],
                "duration": [Function],
                "e164": [Function],
                "email": [Function],
                "emoji": [Function],
                "endsWith": [Function],
                "format": null,
                "guid": [Function],
                "includes": [Function],
                "ipv4": [Function],
                "ipv6": [Function],
                "isNullable": [Function],
                "isOptional": [Function],
                "jwt": [Function],
                "ksuid": [Function],
                "length": [Function],
                "lowercase": [Function],
                "max": [Function],
                "maxLength": null,
                "meta": [Function],
                "min": [Function],
                "minLength": null,
                "nanoid": [Function],
                "nonempty": [Function],
                "nonoptional": [Function],
                "normalize": [Function],
                "nullable": [Function],
                "nullish": [Function],
                "optional": [Function],
                "or": [Function],
                "overwrite": [Function],
                "parse": [Function],
                "parseAsync": [Function],
                "pipe": [Function],
                "prefault": [Function],
                "readonly": [Function],
                "refine": [Function],
                "regex": [Function],
                "register": [Function],
                "safeParse": [Function],
                "safeParseAsync": [Function],
                "spa": [Function],
                "startsWith": [Function],
                "superRefine": [Function],
                "time": [Function],
                "toLowerCase": [Function],
                "toUpperCase": [Function],
                "transform": [Function],
                "trim": [Function],
                "ulid": [Function],
                "uppercase": [Function],
                "url": [Function],
                "uuid": [Function],
                "uuidv4": [Function],
                "uuidv6": [Function],
                "uuidv7": [Function],
                "xid": [Function],
                "~standard": {
                  "validate": [Function],
                  "vendor": "zod",
                  "version": 1,
                },
              },
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
            "schema": ZodString {
              "and": [Function],
              "array": [Function],
              "base64": [Function],
              "base64url": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "cidrv4": [Function],
              "cidrv6": [Function],
              "clone": [Function],
              "cuid": [Function],
              "cuid2": [Function],
              "date": [Function],
              "datetime": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "string",
              },
              "default": [Function],
              "describe": [Function],
              "duration": [Function],
              "e164": [Function],
              "email": [Function],
              "emoji": [Function],
              "endsWith": [Function],
              "format": null,
              "guid": [Function],
              "includes": [Function],
              "ipv4": [Function],
              "ipv6": [Function],
              "isNullable": [Function],
              "isOptional": [Function],
              "jwt": [Function],
              "ksuid": [Function],
              "length": [Function],
              "lowercase": [Function],
              "max": [Function],
              "maxLength": null,
              "meta": [Function],
              "min": [Function],
              "minLength": null,
              "nanoid": [Function],
              "nonempty": [Function],
              "nonoptional": [Function],
              "normalize": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "regex": [Function],
              "register": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "startsWith": [Function],
              "superRefine": [Function],
              "time": [Function],
              "toLowerCase": [Function],
              "toUpperCase": [Function],
              "transform": [Function],
              "trim": [Function],
              "ulid": [Function],
              "uppercase": [Function],
              "url": [Function],
              "uuid": [Function],
              "uuidv4": [Function],
              "uuidv6": [Function],
              "uuidv7": [Function],
              "xid": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
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
                "schema": ZodNumber {
                  "and": [Function],
                  "array": [Function],
                  "brand": [Function],
                  "catch": [Function],
                  "check": [Function],
                  "clone": [Function],
                  "def": {
                    "checks": [
                      $ZodCheck {},
                    ],
                    "type": "number",
                  },
                  "default": [Function],
                  "describe": [Function],
                  "finite": [Function],
                  "format": null,
                  "gt": [Function],
                  "gte": [Function],
                  "int": [Function],
                  "isFinite": true,
                  "isInt": false,
                  "isNullable": [Function],
                  "isOptional": [Function],
                  "lt": [Function],
                  "lte": [Function],
                  "max": [Function],
                  "maxValue": Infinity,
                  "meta": [Function],
                  "min": [Function],
                  "minValue": -Infinity,
                  "multipleOf": [Function],
                  "negative": [Function],
                  "nonnegative": [Function],
                  "nonoptional": [Function],
                  "nonpositive": [Function],
                  "nullable": [Function],
                  "nullish": [Function],
                  "optional": [Function],
                  "or": [Function],
                  "overwrite": [Function],
                  "parse": [Function],
                  "parseAsync": [Function],
                  "pipe": [Function],
                  "positive": [Function],
                  "prefault": [Function],
                  "readonly": [Function],
                  "refine": [Function],
                  "register": [Function],
                  "safe": [Function],
                  "safeParse": [Function],
                  "safeParseAsync": [Function],
                  "spa": [Function],
                  "step": [Function],
                  "superRefine": [Function],
                  "transform": [Function],
                  "~standard": {
                    "validate": [Function],
                    "vendor": "zod",
                    "version": 1,
                  },
                },
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
              "schema": ZodString {
                "and": [Function],
                "array": [Function],
                "base64": [Function],
                "base64url": [Function],
                "brand": [Function],
                "catch": [Function],
                "check": [Function],
                "cidrv4": [Function],
                "cidrv6": [Function],
                "clone": [Function],
                "cuid": [Function],
                "cuid2": [Function],
                "date": [Function],
                "datetime": [Function],
                "def": {
                  "checks": [
                    $ZodCheck {},
                  ],
                  "type": "string",
                },
                "default": [Function],
                "describe": [Function],
                "duration": [Function],
                "e164": [Function],
                "email": [Function],
                "emoji": [Function],
                "endsWith": [Function],
                "format": null,
                "guid": [Function],
                "includes": [Function],
                "ipv4": [Function],
                "ipv6": [Function],
                "isNullable": [Function],
                "isOptional": [Function],
                "jwt": [Function],
                "ksuid": [Function],
                "length": [Function],
                "lowercase": [Function],
                "max": [Function],
                "maxLength": null,
                "meta": [Function],
                "min": [Function],
                "minLength": null,
                "nanoid": [Function],
                "nonempty": [Function],
                "nonoptional": [Function],
                "normalize": [Function],
                "nullable": [Function],
                "nullish": [Function],
                "optional": [Function],
                "or": [Function],
                "overwrite": [Function],
                "parse": [Function],
                "parseAsync": [Function],
                "pipe": [Function],
                "prefault": [Function],
                "readonly": [Function],
                "refine": [Function],
                "regex": [Function],
                "register": [Function],
                "safeParse": [Function],
                "safeParseAsync": [Function],
                "spa": [Function],
                "startsWith": [Function],
                "superRefine": [Function],
                "time": [Function],
                "toLowerCase": [Function],
                "toUpperCase": [Function],
                "transform": [Function],
                "trim": [Function],
                "ulid": [Function],
                "uppercase": [Function],
                "url": [Function],
                "uuid": [Function],
                "uuidv4": [Function],
                "uuidv6": [Function],
                "uuidv7": [Function],
                "xid": [Function],
                "~standard": {
                  "validate": [Function],
                  "vendor": "zod",
                  "version": 1,
                },
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
              "schema": ZodNumber {
                "and": [Function],
                "array": [Function],
                "brand": [Function],
                "catch": [Function],
                "check": [Function],
                "clone": [Function],
                "def": {
                  "checks": [
                    $ZodCheck {},
                  ],
                  "type": "number",
                },
                "default": [Function],
                "describe": [Function],
                "finite": [Function],
                "format": null,
                "gt": [Function],
                "gte": [Function],
                "int": [Function],
                "isFinite": true,
                "isInt": false,
                "isNullable": [Function],
                "isOptional": [Function],
                "lt": [Function],
                "lte": [Function],
                "max": [Function],
                "maxValue": Infinity,
                "meta": [Function],
                "min": [Function],
                "minValue": -Infinity,
                "multipleOf": [Function],
                "negative": [Function],
                "nonnegative": [Function],
                "nonoptional": [Function],
                "nonpositive": [Function],
                "nullable": [Function],
                "nullish": [Function],
                "optional": [Function],
                "or": [Function],
                "overwrite": [Function],
                "parse": [Function],
                "parseAsync": [Function],
                "pipe": [Function],
                "positive": [Function],
                "prefault": [Function],
                "readonly": [Function],
                "refine": [Function],
                "register": [Function],
                "safe": [Function],
                "safeParse": [Function],
                "safeParseAsync": [Function],
                "spa": [Function],
                "step": [Function],
                "superRefine": [Function],
                "transform": [Function],
                "~standard": {
                  "validate": [Function],
                  "vendor": "zod",
                  "version": 1,
                },
              },
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
              "schema": ZodString {
                "and": [Function],
                "array": [Function],
                "base64": [Function],
                "base64url": [Function],
                "brand": [Function],
                "catch": [Function],
                "check": [Function],
                "cidrv4": [Function],
                "cidrv6": [Function],
                "clone": [Function],
                "cuid": [Function],
                "cuid2": [Function],
                "date": [Function],
                "datetime": [Function],
                "def": {
                  "checks": [
                    $ZodCheck {},
                  ],
                  "type": "string",
                },
                "default": [Function],
                "describe": [Function],
                "duration": [Function],
                "e164": [Function],
                "email": [Function],
                "emoji": [Function],
                "endsWith": [Function],
                "format": null,
                "guid": [Function],
                "includes": [Function],
                "ipv4": [Function],
                "ipv6": [Function],
                "isNullable": [Function],
                "isOptional": [Function],
                "jwt": [Function],
                "ksuid": [Function],
                "length": [Function],
                "lowercase": [Function],
                "max": [Function],
                "maxLength": null,
                "meta": [Function],
                "min": [Function],
                "minLength": null,
                "nanoid": [Function],
                "nonempty": [Function],
                "nonoptional": [Function],
                "normalize": [Function],
                "nullable": [Function],
                "nullish": [Function],
                "optional": [Function],
                "or": [Function],
                "overwrite": [Function],
                "parse": [Function],
                "parseAsync": [Function],
                "pipe": [Function],
                "prefault": [Function],
                "readonly": [Function],
                "refine": [Function],
                "regex": [Function],
                "register": [Function],
                "safeParse": [Function],
                "safeParseAsync": [Function],
                "spa": [Function],
                "startsWith": [Function],
                "superRefine": [Function],
                "time": [Function],
                "toLowerCase": [Function],
                "toUpperCase": [Function],
                "transform": [Function],
                "trim": [Function],
                "ulid": [Function],
                "uppercase": [Function],
                "url": [Function],
                "uuid": [Function],
                "uuidv4": [Function],
                "uuidv6": [Function],
                "uuidv7": [Function],
                "xid": [Function],
                "~standard": {
                  "validate": [Function],
                  "vendor": "zod",
                  "version": 1,
                },
              },
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
            "schema": ZodString {
              "and": [Function],
              "array": [Function],
              "base64": [Function],
              "base64url": [Function],
              "brand": [Function],
              "catch": [Function],
              "check": [Function],
              "cidrv4": [Function],
              "cidrv6": [Function],
              "clone": [Function],
              "cuid": [Function],
              "cuid2": [Function],
              "date": [Function],
              "datetime": [Function],
              "def": {
                "checks": [
                  $ZodCheck {},
                ],
                "type": "string",
              },
              "default": [Function],
              "describe": [Function],
              "duration": [Function],
              "e164": [Function],
              "email": [Function],
              "emoji": [Function],
              "endsWith": [Function],
              "format": null,
              "guid": [Function],
              "includes": [Function],
              "ipv4": [Function],
              "ipv6": [Function],
              "isNullable": [Function],
              "isOptional": [Function],
              "jwt": [Function],
              "ksuid": [Function],
              "length": [Function],
              "lowercase": [Function],
              "max": [Function],
              "maxLength": null,
              "meta": [Function],
              "min": [Function],
              "minLength": null,
              "nanoid": [Function],
              "nonempty": [Function],
              "nonoptional": [Function],
              "normalize": [Function],
              "nullable": [Function],
              "nullish": [Function],
              "optional": [Function],
              "or": [Function],
              "overwrite": [Function],
              "parse": [Function],
              "parseAsync": [Function],
              "pipe": [Function],
              "prefault": [Function],
              "readonly": [Function],
              "refine": [Function],
              "regex": [Function],
              "register": [Function],
              "safeParse": [Function],
              "safeParseAsync": [Function],
              "spa": [Function],
              "startsWith": [Function],
              "superRefine": [Function],
              "time": [Function],
              "toLowerCase": [Function],
              "toUpperCase": [Function],
              "transform": [Function],
              "trim": [Function],
              "ulid": [Function],
              "uppercase": [Function],
              "url": [Function],
              "uuid": [Function],
              "uuidv4": [Function],
              "uuidv6": [Function],
              "uuidv7": [Function],
              "xid": [Function],
              "~standard": {
                "validate": [Function],
                "vendor": "zod",
                "version": 1,
              },
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
              "schema": ZodNumber {
                "and": [Function],
                "array": [Function],
                "brand": [Function],
                "catch": [Function],
                "check": [Function],
                "clone": [Function],
                "def": {
                  "checks": [
                    $ZodCheck {},
                  ],
                  "type": "number",
                },
                "default": [Function],
                "describe": [Function],
                "finite": [Function],
                "format": null,
                "gt": [Function],
                "gte": [Function],
                "int": [Function],
                "isFinite": true,
                "isInt": false,
                "isNullable": [Function],
                "isOptional": [Function],
                "lt": [Function],
                "lte": [Function],
                "max": [Function],
                "maxValue": Infinity,
                "meta": [Function],
                "min": [Function],
                "minValue": -Infinity,
                "multipleOf": [Function],
                "negative": [Function],
                "nonnegative": [Function],
                "nonoptional": [Function],
                "nonpositive": [Function],
                "nullable": [Function],
                "nullish": [Function],
                "optional": [Function],
                "or": [Function],
                "overwrite": [Function],
                "parse": [Function],
                "parseAsync": [Function],
                "pipe": [Function],
                "positive": [Function],
                "prefault": [Function],
                "readonly": [Function],
                "refine": [Function],
                "register": [Function],
                "safe": [Function],
                "safeParse": [Function],
                "safeParseAsync": [Function],
                "spa": [Function],
                "step": [Function],
                "superRefine": [Function],
                "transform": [Function],
                "~standard": {
                  "validate": [Function],
                  "vendor": "zod",
                  "version": 1,
                },
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
              "schema": ZodNumber {
                "and": [Function],
                "array": [Function],
                "brand": [Function],
                "catch": [Function],
                "check": [Function],
                "clone": [Function],
                "def": {
                  "checks": [
                    $ZodCheck {},
                  ],
                  "type": "number",
                },
                "default": [Function],
                "describe": [Function],
                "finite": [Function],
                "format": null,
                "gt": [Function],
                "gte": [Function],
                "int": [Function],
                "isFinite": true,
                "isInt": false,
                "isNullable": [Function],
                "isOptional": [Function],
                "lt": [Function],
                "lte": [Function],
                "max": [Function],
                "maxValue": Infinity,
                "meta": [Function],
                "min": [Function],
                "minValue": -Infinity,
                "multipleOf": [Function],
                "negative": [Function],
                "nonnegative": [Function],
                "nonoptional": [Function],
                "nonpositive": [Function],
                "nullable": [Function],
                "nullish": [Function],
                "optional": [Function],
                "or": [Function],
                "overwrite": [Function],
                "parse": [Function],
                "parseAsync": [Function],
                "pipe": [Function],
                "positive": [Function],
                "prefault": [Function],
                "readonly": [Function],
                "refine": [Function],
                "register": [Function],
                "safe": [Function],
                "safeParse": [Function],
                "safeParseAsync": [Function],
                "spa": [Function],
                "step": [Function],
                "superRefine": [Function],
                "transform": [Function],
                "~standard": {
                  "validate": [Function],
                  "vendor": "zod",
                  "version": 1,
                },
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
