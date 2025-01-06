/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { spyOnEufemiaWarn } from '../../../../../core/jest/jestSetup'
import { fireEvent, render } from '@testing-library/react'
import { Field, Form, JSONSchema, Tools, Value } from '../../..'
import { SectionProps } from '../Section'
import { Props as FieldNameProps } from '../../../Field/Name'
import FieldPropsProvider from '../../../Field/Provider'
import { GenerateRef as GeneratePropsRef } from '../../../Tools/ListAllProps'
import { GenerateRef as GenerateSchemaRef } from '../../../Tools/GenerateSchema'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Form.Section', () => {
  const MySection = ({
    children,
    ...props
  }: SectionProps<{ lastName: FieldNameProps }> & {
    children?: React.ReactNode
  }) => {
    return (
      <Form.Section {...props}>
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" required minLength={2} />
        {children}
      </Form.Section>
    )
  }

  const MyOuterSection = ({
    children,
    ...props
  }: SectionProps<{
    innerSection: { lastName: FieldNameProps }
  }> & {
    children?: React.ReactNode
  }) => {
    return (
      <Form.Section {...props}>
        <MySection path="/innerSection" />
        <Field.String path="/otherField" />
        {children}
      </Form.Section>
    )
  }

  it('should have constant of _supportsSpacingProps="undefined"', () => {
    expect(Form.Section._supportsSpacingProps).toBeUndefined()
  })

  it('should throw then "path" without slash was given', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    const renderComponent = () => {
      render(<MySection path="withoutSlash" />)
    }

    expect(renderComponent).toThrow(
      'path="withoutSlash" must start with a slash'
    )

    log.mockRestore()
  })

  it('should render section with children', () => {
    render(<MySection />)

    const [first, last] = Array.from(document.querySelectorAll('input'))

    expect(first).toBeInTheDocument()
    expect(last).toBeInTheDocument()
  })

  it('should make all fields required when required is true', () => {
    render(<MySection required />)

    expect(
      document.querySelector('input[name="firstName"]')
    ).toHaveAttribute('aria-required')
    expect(
      document.querySelector('input[name="lastName"]')
    ).toHaveAttribute('aria-required', 'true')
  })

  it('should mark fields given in children as required', () => {
    render(
      <MySection required>
        <Field.String path="/customChild" required />
      </MySection>
    )

    expect(
      document.querySelector('input[name="customChild"]')
    ).toHaveAttribute('aria-required', 'true')
  })

  it('should match snapshot', () => {
    const generateRef = React.createRef<GeneratePropsRef>()
    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateRef}>
          <MySection />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    const { propsOfFields, propsOfValues } = generateRef.current()

    expect(propsOfFields).toMatchInlineSnapshot(`
      {
        "firstName": {
          "autoComplete": "given-name",
          "errorMessages": {
            "Field.errorPattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "Field.errorRequired": "Du må fylle inn fornavn.",
          },
          "id": "id-r1b",
          "innerRef": {
            "current": <input
              autocomplete="given-name"
              class="dnb-input__input"
              id="id-r1b"
              name="firstName"
              type="text"
              value=""
            />,
          },
          "label": "Fornavn",
          "path": "/firstName",
          "pattern": "^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$",
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": "^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$",
            "type": "string",
          },
          "trim": true,
          "width": "large",
        },
        "lastName": {
          "autoComplete": "family-name",
          "errorMessages": {
            "Field.errorPattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "Field.errorRequired": "Du må fylle inn etternavn.",
          },
          "id": "id-r1h",
          "innerRef": {
            "current": <input
              aria-required="true"
              autocomplete="family-name"
              class="dnb-input__input"
              id="id-r1h"
              name="lastName"
              type="text"
              value=""
            />,
          },
          "label": "Etternavn",
          "minLength": 2,
          "path": "/lastName",
          "pattern": "^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$",
          "required": true,
          "schema": {
            "maxLength": undefined,
            "minLength": 2,
            "pattern": "^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$",
            "type": "string",
          },
          "trim": true,
          "width": "large",
        },
      }
    `)
    expect(propsOfValues).toMatchInlineSnapshot(`{}`)
  })

  it('should match schema snapshot with prop change', () => {
    const generateRef = React.createRef<GenerateSchemaRef>()
    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateRef}>
          <MySection
            overwriteProps={{
              firstName: { required: true },
              lastName: { minLength: 0 },
            }}
          />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    const { schema } = generateRef.current()

    expect(schema.required).toEqual(['firstName', 'lastName'])
    expect(schema.properties.lastName).not.toContain('minLength')
    expect(schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "firstName": {
            "pattern": "^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$",
            "type": "string",
          },
          "lastName": {
            "pattern": "^(?!.*[\\-\\s]{2})[\\p{L}]+([ \\-][\\p{L}]+)*$",
            "type": "string",
          },
        },
        "required": [
          "firstName",
          "lastName",
        ],
        "type": "object",
      }
    `)
  })

  describe('onChange', () => {
    it('should call onChange without path', () => {
      const onChange = jest.fn()

      render(<MySection onChange={onChange} />)

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })

      expect(onChange).toHaveBeenLastCalledWith(
        {
          firstName: 'foo',
        },
        expect.anything()
      )

      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          firstName: 'foo',
          lastName: 'bar',
        },
        expect.anything()
      )
    })

    it('should call onChange with path', () => {
      const onChange = jest.fn()

      render(<MySection path="/mySection" onChange={onChange} />)

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })

      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: { firstName: 'foo' },
        },
        expect.anything()
      )

      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: { firstName: 'foo', lastName: 'bar' },
        },
        expect.anything()
      )
    })

    it('should call onChange on Form.Handler without a path', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <MySection />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })
      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        { firstName: 'foo' },
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        {
          firstName: 'foo',
          lastName: 'bar',
        },
        expect.anything()
      )
    })

    it('should call onChange on Form.Handler with a path', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <MySection path="/mySection" />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })
      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        {
          mySection: { firstName: 'foo' },
        },
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        {
          mySection: { firstName: 'foo', lastName: 'bar' },
        },
        expect.anything()
      )
    })

    it('should call onChange from nested fields', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler>
          <MyOuterSection path="/mySection" onChange={onChange} />
        </Form.Handler>
      )

      const [first, last, addition] = Array.from(
        document.querySelectorAll('input')
      )

      fireEvent.change(first, { target: { value: 'foo' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: {
            innerSection: {
              firstName: 'foo',
            },
          },
        },
        expect.anything()
      )

      fireEvent.change(last, { target: { value: 'bar' } })
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: {
            innerSection: {
              firstName: 'foo',
              lastName: 'bar',
            },
          },
        },
        expect.anything()
      )

      fireEvent.change(addition, { target: { value: 'baz' } })
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: {
            innerSection: {
              firstName: 'foo',
              lastName: 'bar',
            },
            otherField: 'baz',
          },
        },
        expect.anything()
      )
    })

    it('should support onChange without Form.Handler', () => {
      const onChange = jest.fn()

      render(<MyOuterSection path="/mySection" onChange={onChange} />)

      const [first, last, addition] = Array.from(
        document.querySelectorAll('input')
      )

      fireEvent.change(first, { target: { value: 'foo' } })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: {
            innerSection: {
              firstName: 'foo',
            },
          },
        },
        expect.anything()
      )

      fireEvent.change(last, { target: { value: 'bar' } })
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: {
            innerSection: {
              firstName: 'foo',
              lastName: 'bar',
            },
          },
        },
        expect.anything()
      )

      fireEvent.change(addition, { target: { value: 'baz' } })
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          mySection: {
            innerSection: {
              firstName: 'foo',
              lastName: 'bar',
            },
            otherField: 'baz',
          },
        },
        expect.anything()
      )
    })
  })

  describe('overwriteProps', () => {
    it('should include correct types', () => {
      render(
        <Form.Handler>
          <MySection
            path="/mySection"
            overwriteProps={{
              firstName: {
                label: 'Custom',
                value: 'Foo',
                required: true,

                // @ts-expect-error
                something: 'else',
              },
              lastName: {
                label: 'Custom',
                value: 'Bar',
                required: true,

                // @ts-expect-error
                something: 'else',
              },

              // @ts-expect-error
              label: 'Custom',
            }}
          />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(document.querySelector('label')).toHaveTextContent('Custom')
    })

    it('should overwrite "label"', () => {
      render(
        <Form.Handler>
          <MySection
            path="/mySection"
            overwriteProps={{
              firstName: { label: 'Label A' },
              lastName: { label: 'Label B' },
            }}
          />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('label'))
      expect(first).toHaveTextContent('Label A')
      expect(last).toHaveTextContent('Label B')
    })

    it('should add "onChange" event to field', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler>
          <MySection
            overwriteProps={{
              lastName: { onChange },
            }}
          />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first)
      expect(onChange).toHaveBeenCalledTimes(0)

      fireEvent.change(last, { target: { value: 'bar' } })
      expect(onChange).toHaveBeenLastCalledWith('bar')
    })

    it('should overwrite "required"', () => {
      const { rerender } = render(
        <Form.Handler>
          <MySection path="/mySection" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).not.toHaveAttribute('aria-required')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')

      rerender(
        <Form.Handler>
          <MySection
            path="/mySection"
            overwriteProps={{
              firstName: { required: true },
              lastName: { required: false },
            }}
          />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).not.toHaveAttribute('aria-required')
    })

    it('should set "required" prop via FieldProps', () => {
      render(
        <Form.Handler>
          <FieldPropsProvider required>
            <MySection path="/mySection" />
          </FieldPropsProvider>
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should not overwrite "required" prop via FieldProps', () => {
      render(
        <Form.Handler>
          <FieldPropsProvider required={false}>
            <MySection path="/mySection" />
          </FieldPropsProvider>
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).not.toHaveAttribute('aria-required')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should disable "required" via overwrite props', () => {
      render(
        <Form.Handler>
          <MySection
            path="/mySection"
            overwriteProps={{
              firstName: { required: false },
              lastName: { required: false },
            }}
          />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).not.toHaveAttribute('aria-required')
      expect(
        document.querySelector('input[name="lastName"]')
      ).not.toHaveAttribute('aria-required')
    })

    it('should change minLength via overwrite props', () => {
      render(
        <Form.Handler>
          <MySection
            path="/mySection"
            overwriteProps={{
              lastName: {
                minLength: 30,
                value: 'f',
                validateInitially: true,
              },
            }}
          />
        </Form.Handler>
      )

      const statusMessage = document.querySelector('.dnb-form-status')

      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '30')
      )
    })

    it('should overwrite "path"', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <MySection
            path="/mySection"
            overwriteProps={{
              firstName: { path: '/foo' },
              lastName: { path: '/bar' },
            }}
          />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })
      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        {
          mySection: { bar: undefined, foo: 'foo' },
        },
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        {
          mySection: { bar: 'bar', foo: 'foo' },
        },
        expect.anything()
      )
    })

    describe('nested', () => {
      it('should include correct types', () => {
        render(
          <Form.Handler>
            <MyOuterSection
              path="/mySection"
              overwriteProps={{
                innerSection: {
                  firstName: {
                    label: 'Custom',
                    value: 'Foo',
                    required: true,

                    // @ts-expect-error
                    something: 'else',
                  },
                },
              }}
            />
          </Form.Handler>
        )

        expect(
          document.querySelector('input[name="firstName"]')
        ).toHaveAttribute('aria-required', 'true')
        expect(document.querySelector('label')).toHaveTextContent('Custom')
      })

      it('should overwrite "label"', () => {
        render(
          <Form.Handler>
            <MyOuterSection
              path="/mySection"
              overwriteProps={{
                innerSection: {
                  firstName: { label: 'Label A' },
                  lastName: { label: 'Label B' },
                },
              }}
            />
          </Form.Handler>
        )

        const [first, last] = Array.from(
          document.querySelectorAll('label')
        )
        expect(first).toHaveTextContent('Label A')
        expect(last).toHaveTextContent('Label B')
      })

      it('should add "onChange" event to field', () => {
        const onChange = jest.fn()

        render(
          <Form.Handler>
            <MyOuterSection
              overwriteProps={{
                innerSection: {
                  lastName: { onChange },
                },
              }}
            />
          </Form.Handler>
        )

        const [first, last] = Array.from(
          document.querySelectorAll('input')
        )

        fireEvent.change(first)
        expect(onChange).toHaveBeenCalledTimes(0)

        fireEvent.change(last, { target: { value: 'bar' } })
        expect(onChange).toHaveBeenLastCalledWith('bar')
      })

      it('should overwrite "required"', () => {
        const { rerender } = render(
          <Form.Handler>
            <MyOuterSection path="/mySection" />
          </Form.Handler>
        )

        expect(
          document.querySelector('input[name="firstName"]')
        ).not.toHaveAttribute('aria-required')
        expect(
          document.querySelector('input[name="lastName"]')
        ).toHaveAttribute('aria-required', 'true')

        rerender(
          <Form.Handler>
            <MyOuterSection
              path="/mySection"
              overwriteProps={{
                innerSection: {
                  firstName: { required: true },
                  lastName: { required: false },
                },
              }}
            />
          </Form.Handler>
        )

        expect(
          document.querySelector('input[name="firstName"]')
        ).toHaveAttribute('aria-required', 'true')
        expect(
          document.querySelector('input[name="lastName"]')
        ).not.toHaveAttribute('aria-required')
      })

      it('should set "required" prop via FieldProps', () => {
        render(
          <Form.Handler>
            <FieldPropsProvider required>
              <MyOuterSection path="/mySection" />
            </FieldPropsProvider>
          </Form.Handler>
        )

        expect(
          document.querySelector('input[name="firstName"]')
        ).toHaveAttribute('aria-required', 'true')
        expect(
          document.querySelector('input[name="lastName"]')
        ).toHaveAttribute('aria-required', 'true')
      })

      it('should not overwrite "required" prop via FieldProps', () => {
        render(
          <Form.Handler>
            <FieldPropsProvider required={false}>
              <MyOuterSection path="/mySection" />
            </FieldPropsProvider>
          </Form.Handler>
        )

        expect(
          document.querySelector('input[name="firstName"]')
        ).not.toHaveAttribute('aria-required')
        expect(
          document.querySelector('input[name="lastName"]')
        ).toHaveAttribute('aria-required', 'true')
      })

      it('should disable "required" via overwrite props', () => {
        render(
          <Form.Handler>
            <MyOuterSection
              path="/mySection"
              overwriteProps={{
                innerSection: {
                  firstName: { required: false },
                  lastName: { required: false },
                },
              }}
            />
          </Form.Handler>
        )

        expect(
          document.querySelector('input[name="firstName"]')
        ).not.toHaveAttribute('aria-required')
        expect(
          document.querySelector('input[name="lastName"]')
        ).not.toHaveAttribute('aria-required')
      })

      it('should change minLength via overwrite props', () => {
        render(
          <Form.Handler>
            <MyOuterSection
              path="/mySection"
              overwriteProps={{
                innerSection: {
                  lastName: {
                    minLength: 30,
                    value: 'f',
                    validateInitially: true,
                  },
                },
              }}
            />
          </Form.Handler>
        )

        const statusMessage = document.querySelector('.dnb-form-status')

        expect(statusMessage).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '30')
        )
      })

      it('should overwrite "path"', () => {
        const onChange = jest.fn()

        render(
          <Form.Handler onChange={onChange}>
            <MyOuterSection
              path="/mySection"
              overwriteProps={{
                innerSection: {
                  firstName: { path: '/foo' },
                  lastName: { path: '/bar' },
                },
              }}
            />
          </Form.Handler>
        )

        const [first, last, addition] = Array.from(
          document.querySelectorAll('input')
        )

        fireEvent.change(first, { target: { value: 'foo' } })
        fireEvent.change(last, { target: { value: 'bar' } })
        fireEvent.change(addition, { target: { value: 'baz' } })

        expect(onChange).toHaveBeenCalledTimes(3)
        expect(onChange).toHaveBeenNthCalledWith(
          1,
          {
            mySection: {
              innerSection: {
                bar: undefined,
                foo: 'foo',
              },
              otherField: undefined,
            },
          },
          expect.anything()
        )
        expect(onChange).toHaveBeenNthCalledWith(
          2,
          {
            mySection: {
              innerSection: {
                bar: 'bar',
                foo: 'foo',
              },
              otherField: undefined,
            },
          },
          expect.anything()
        )
        expect(onChange).toHaveBeenNthCalledWith(
          3,
          {
            mySection: {
              innerSection: {
                bar: 'bar',
                foo: 'foo',
              },
              otherField: 'baz',
            },
          },
          expect.anything()
        )
      })
    })
  })

  describe('schema', () => {
    it('should set "required" for firstName', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['mySection/firstName'],
      }

      render(
        <Form.Handler schema={schema}>
          <MySection path="/mySection" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should set "required" for the whole section', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['mySection'],
      }

      render(
        <Form.Handler schema={schema}>
          <MySection path="/mySection" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should set "required" in schema with section', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          mySection: {
            type: 'object',
            properties: {
              firstName: {
                type: 'string',
              },
            },
            required: ['firstName'],
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <MySection path="/mySection" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should set "required" in schema with section in nested object', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myObject: {
            type: 'object',
            properties: {
              mySection: {
                type: 'object',
                properties: {
                  firstName: {
                    type: 'string',
                  },
                },
                required: ['firstName'],
              },
            },
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <MySection path="/myObject/mySection" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should set "required" in schema with section of the same name', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          firstName: {
            type: 'object',
            properties: {
              firstName: {
                type: 'string',
              },
            },
            required: ['firstName'],
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <MySection path="/firstName" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should not set "required" for field path that matches a schema path', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['longPath_with_firstName_inside'],
        properties: {
          longPath_with_firstName_inside: {
            type: 'string',
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <MySection path="/firstName" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).not.toHaveAttribute('aria-required')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should overwrite minLength', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          mySection: {
            type: 'object',
            properties: {
              lastName: {
                type: 'string',
                minLength: 30,
              },
            },
          },
        },
      }

      render(
        <Form.Handler schema={schema}>
          <MySection
            path="/mySection"
            overwriteProps={{
              lastName: {
                value: 'f',
                validateInitially: true,
              },
            }}
          />
        </Form.Handler>
      )

      const statusMessage = document.querySelector('.dnb-form-status')

      expect(statusMessage).toHaveTextContent(
        nb.StringField.errorMinLength.replace('{minLength}', '30')
      )
    })
  })

  describe('Value', () => {
    const MyValueSection = ({
      children,
      ...props
    }: SectionProps & {
      children?: React.ReactNode
    }) => {
      return (
        <Form.Section {...props}>
          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
          {children}
        </Form.Section>
      )
    }

    it('should not render children when data is given', () => {
      render(<MyValueSection />)
      expect(document.body).toHaveTextContent('')
    })

    it('should render section without path', () => {
      render(
        <Form.Handler
          data={{
            firstName: 'foo',
            lastName: 'bar',
          }}
        >
          <MyValueSection />
        </Form.Handler>
      )

      const [first, last] = Array.from(
        document.querySelectorAll('.dnb-forms-value-block__content')
      )
      expect(first).toHaveTextContent('foo')
      expect(last).toHaveTextContent('bar')
    })

    it('should render section with path', () => {
      render(
        <Form.Handler
          data={{
            mySection: {
              firstName: 'foo',
              lastName: 'bar',
            },
          }}
        >
          <MyValueSection path="/mySection" />
        </Form.Handler>
      )

      const [first, last] = Array.from(
        document.querySelectorAll('.dnb-forms-value-block__content')
      )
      expect(first).toHaveTextContent('foo')
      expect(last).toHaveTextContent('bar')
    })
  })

  describe('translations', () => {
    it('should handle nested translations', () => {
      const sectionTranslations = {
        'nb-NO': { MySection: { CustomField: { label: 'Section nb' } } },
        'en-GB': { MySection: { CustomField: { label: 'Section en' } } },
      }
      type SectionTranslation =
        (typeof sectionTranslations)[keyof typeof sectionTranslations]

      const MySectionContent = () => {
        const { MySection } = Form.useTranslation<SectionTranslation>()
        return (
          <Field.String
            label={MySection.CustomField.label}
            path="/myField"
          />
        )
      }

      const MySection = () => {
        return (
          <Form.Section translations={sectionTranslations}>
            <MySectionContent />
          </Form.Section>
        )
      }

      const { rerender } = render(
        <Form.Handler>
          <MySection />
        </Form.Handler>
      )

      const label = document.querySelector('label')

      expect(label).toHaveTextContent('Section nb')

      const formTranslations = {
        'nb-NO': { MySection: { CustomField: { label: 'Form nb' } } },
        'en-GB': { MySection: { CustomField: { label: 'Form en' } } },
      }

      rerender(
        <Form.Handler locale="en-GB" translations={formTranslations}>
          <MySection />
        </Form.Handler>
      )

      expect(label).toHaveTextContent('Form en')
    })

    it('should replace translations gracefully from Form.Handler', () => {
      const myTranslations = {
        'en-GB': {
          FirstName: { label: 'Custom label' },
        },
      }

      render(
        <Form.Handler translations={myTranslations} locale="en-GB">
          <MySection path="/should-not-matter" />
        </Form.Handler>
      )

      const [first, second] = Array.from(
        document.querySelectorAll('label')
      )
      expect(first).toHaveTextContent('Custom label')
      expect(second).toHaveTextContent('Surname')
    })

    it('should not mutate translations object', () => {
      const log = spyOnEufemiaWarn()

      const sectionTranslations = {
        'nb-NO': { MySection: { CustomField: { label: 'Section nb' } } },
        'en-GB': { MySection: { CustomField: { label: 'Section en' } } },
      }
      type SectionTranslation =
        (typeof sectionTranslations)[keyof typeof sectionTranslations]

      const MySectionContent = () => {
        const { MySection } = Form.useTranslation<SectionTranslation>()
        return (
          <Field.String
            label={MySection.CustomField.label}
            path="/myField"
          />
        )
      }

      const MySection = () => {
        return (
          <Form.Section translations={sectionTranslations}>
            <MySectionContent />
          </Form.Section>
        )
      }

      const formTranslations = {
        'nb-NO': { MySection: { CustomField: { label: 'Form nb' } } },
        'en-GB': { MySection: { CustomField: { label: 'Form en' } } },
      }

      render(
        <Form.Handler translations={formTranslations}>
          <MySection />
          <MySection />
          <MySection />
        </Form.Handler>
      )

      {
        const [label1, label2] = Array.from(
          document.querySelectorAll('label')
        )
        expect(label1).toHaveTextContent('Form nb')
        expect(label2).toHaveTextContent('Form nb')
      }

      expect(
        sectionTranslations['nb-NO'].MySection.CustomField.label
      ).toBe('Section nb')
      expect(
        sectionTranslations['en-GB'].MySection.CustomField.label
      ).toBe('Section en')

      log.mockRestore()
    })
  })

  describe('data', () => {
    it('should support data context', () => {
      const { rerender } = render(
        <Form.Section
          data={{
            myField: 'foo',
          }}
        >
          <Field.String path="/myField" />
        </Form.Section>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('foo')

      rerender(
        <Form.Section
          data={{
            myField: 'bar',
          }}
        >
          <Field.String path="/myField" />
        </Form.Section>
      )

      expect(input).toHaveValue('bar')
    })

    it('should support defaultData context', () => {
      const { rerender } = render(
        <Form.Section
          defaultData={{
            myField: 'foo',
          }}
        >
          <Field.String path="/myField" />
        </Form.Section>
      )

      const input = document.querySelector('input')

      expect(input).toHaveValue('foo')

      rerender(
        <Form.Section
          defaultData={{
            myField: 'ignore-me',
          }}
        >
          <Field.String path="/myField" />
        </Form.Section>
      )

      expect(input).toHaveValue('foo')
    })
  })
})
