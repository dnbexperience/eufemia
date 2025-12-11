/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { spyOnEufemiaWarn } from '../../../../../core/jest/jestSetup'
import { fireEvent, render, waitFor } from '@testing-library/react'
import {
  Field,
  Form,
  JSONSchema,
  makeAjvInstance,
  Tools,
  Value,
  z,
} from '../../..'
import { SectionProps } from '../Section'
import { Props as FieldNameProps } from '../../../Field/Name'
import FieldPropsProvider from '../../../Field/Provider'
import { GenerateRef as GeneratePropsRef } from '../../../Tools/ListAllProps'
import { GenerateRef as GenerateSchemaRef } from '../../../Tools/GenerateSchema'
import DataContext from '../../../DataContext/Context'

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
          "exportValidators": {
            "nameValidator": [Function],
          },
          "innerRef": {
            "current": <input
              autocomplete="given-name"
              class="dnb-input__input"
              id="id-r1b"
              name="firstName"
              type="text"
            />,
          },
          "label": "Fornavn",
          "minLength": 1,
          "path": "/firstName",
          "trim": true,
          "width": "large",
        },
        "lastName": {
          "autoComplete": "family-name",
          "errorMessages": {
            "Field.errorPattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "Field.errorRequired": "Du må fylle inn etternavn.",
          },
          "exportValidators": {
            "nameValidator": [Function],
          },
          "innerRef": {
            "current": <input
              aria-required="true"
              autocomplete="family-name"
              class="dnb-input__input"
              id="id-r1h"
              name="lastName"
              type="text"
            />,
          },
          "label": "Etternavn",
          "minLength": 2,
          "path": "/lastName",
          "required": true,
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
    expect(schema.properties.lastName).not.toHaveProperty('minLength')
    expect(schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "firstName": {
            "minLength": 1,
            "type": "string",
          },
          "lastName": {
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

  it('should stay in view mode when disableEditing is true', () => {
    render(
      <Form.Section disableEditing={true}>
        <Form.Section.ViewContainer>
          View content
        </Form.Section.ViewContainer>
        <Form.Section.EditContainer>
          Edit content
        </Form.Section.EditContainer>
      </Form.Section>
    )

    const viewBlock = document.querySelector(
      '.dnb-forms-section-view-block'
    )
    expect(viewBlock).toBeInTheDocument()
    expect(viewBlock?.querySelector('button')).not.toBeInTheDocument()
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
      expect(onChange).toHaveBeenLastCalledWith('bar', expect.anything())
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

    it('should change minimum via overwrite props for Number field', () => {
      const MyNumberSection = (props: SectionProps<{ amount: any }>) => (
        <Form.Section {...props}>
          <Field.Number path="/amount" />
        </Form.Section>
      )

      render(
        <Form.Handler>
          <MyNumberSection
            path="/mySection"
            overwriteProps={{
              amount: {
                minimum: 30,
                value: 5,
                validateInitially: true,
              },
            }}
          />
        </Form.Handler>
      )

      const statusMessage = document.querySelector('.dnb-form-status')
      expect(statusMessage).toHaveTextContent(
        nb.NumberField.errorMinimum.replace('{minimum}', '30')
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
        expect(onChange).toHaveBeenLastCalledWith('bar', expect.anything())
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

  it('should change minimum via overwrite props in nested section for Number field', () => {
    const MyOuterNumberSection = (
      props: SectionProps<{ innerSection: { amount: any } }>
    ) => (
      <Form.Section {...props}>
        <Form.Section path="/innerSection">
          <Field.Number path="/amount" />
        </Form.Section>
      </Form.Section>
    )

    render(
      <Form.Handler>
        <MyOuterNumberSection
          path="/mySection"
          overwriteProps={{
            innerSection: {
              amount: {
                minimum: 30,
                value: 5,
                validateInitially: true,
              },
            },
          }}
        />
      </Form.Handler>
    )

    const statusMessage = document.querySelector('.dnb-form-status')
    expect(statusMessage).toHaveTextContent(
      nb.NumberField.errorMinimum.replace('{minimum}', '30')
    )
  })

  describe('Form.Handler schema', () => {
    it('should set "required" for firstName', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['mySection/firstName'],
      }

      render(
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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
        <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
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

  describe('schema', () => {
    const ErrorsTracker = ({
      onUpdate,
      schemaPathsTracker,
    }: {
      onUpdate: jest.Mock
      schemaPathsTracker?: jest.Mock
    }) => {
      const { errors, sectionSchemaPathsRef } =
        React.useContext(DataContext)
      React.useEffect(() => {
        onUpdate(errors)
      }, [errors, onUpdate])
      React.useEffect(() => {
        if (schemaPathsTracker && sectionSchemaPathsRef?.current) {
          schemaPathsTracker(Array.from(sectionSchemaPathsRef.current))
        }
      }, [sectionSchemaPathsRef, schemaPathsTracker])
      return null
    }

    it('validates section-level JSON schema when provided', () => {
      const sectionSchema: JSONSchema = {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            minLength: 3,
          },
        },
        required: ['firstName'],
      }

      const onSubmitRequest = jest.fn()

      render(
        <Form.Handler
          ajvInstance={makeAjvInstance()}
          onSubmitRequest={onSubmitRequest}
        >
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      const input = document.querySelector('input[name="firstName"]')
      const form = document.querySelector('form')

      expect(input).not.toBeNull()
      expect(form).not.toBeNull()

      fireEvent.change(input as HTMLInputElement, {
        target: { value: 'Jo' },
      })
      fireEvent.submit(form as HTMLFormElement)

      expect(onSubmitRequest).toHaveBeenCalled()

      const errors = onSubmitRequest.mock.calls[0][0].getErrors()

      expect(
        errors.some(({ path }) => path === '/customer/firstName')
      ).toBe(true)
    })

    it('validates section-level Zod schema when provided', () => {
      const sectionSchema = z.object({
        firstName: z.string().min(3),
      })

      const onErrors = jest.fn()
      const schemaPathsTracker = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker
            onUpdate={onErrors}
            schemaPathsTracker={schemaPathsTracker}
          />
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      expect(schemaPathsTracker).toHaveBeenCalledWith(
        expect.arrayContaining(['/customer'])
      )

      const input = document.querySelector('input[name="firstName"]')
      const form = document.querySelector('form')

      expect(input).not.toBeNull()
      expect(form).not.toBeNull()

      fireEvent.change(input as HTMLInputElement, {
        target: { value: 'Jo' },
      })
      fireEvent.submit(form as HTMLFormElement)

      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const errors = lastCall[0]
      expect(errors).toBeDefined()
      expect(errors?.['/customer/firstName']).toBeInstanceOf(Error)
    })

    it('validates multiple Zod section schemas at the same time', () => {
      const customerSchema = z.object({
        firstName: z.string().min(3),
      })
      const addressSchema = z.object({
        lastName: z.string().min(3),
      })

      const onErrors = jest.fn()
      const schemaPathsTracker = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker
            onUpdate={onErrors}
            schemaPathsTracker={schemaPathsTracker}
          />
          <Form.Section path="/customer" schema={customerSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
          <Form.Section path="/address" schema={addressSchema}>
            <Field.String path="/lastName" label="Surname" />
          </Form.Section>
        </Form.Handler>
      )

      expect(schemaPathsTracker).toHaveBeenCalledWith(
        expect.arrayContaining(['/customer', '/address'])
      )

      const firstInput = document.querySelector(
        'input[name="firstName"]'
      ) as HTMLInputElement
      const secondInput = document.querySelector(
        'input[name="lastName"]'
      ) as HTMLInputElement
      const form = document.querySelector('form') as HTMLFormElement

      fireEvent.change(firstInput, { target: { value: 'Jo' } })
      fireEvent.change(secondInput, { target: { value: 'Li' } })
      fireEvent.submit(form)

      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const errors = lastCall[0]
      expect(errors?.['/customer/firstName']).toBeInstanceOf(Error)
      expect(errors?.['/address/lastName']).toBeInstanceOf(Error)
    })

    it('validates nested Zod section schemas', () => {
      const parentSchema = z.object({
        parentField: z.string().min(4),
      })
      const childSchema = z.object({
        city: z.string().min(5),
      })

      const onErrors = jest.fn()
      const schemaPathsTracker = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker
            onUpdate={onErrors}
            schemaPathsTracker={schemaPathsTracker}
          />
          <Form.Section path="/parent" schema={parentSchema}>
            <Field.String path="/parentField" label="Parent field" />
            <Form.Section path="/child" schema={childSchema}>
              <Field.String path="/city" label="City" />
            </Form.Section>
          </Form.Section>
        </Form.Handler>
      )

      expect(schemaPathsTracker).toHaveBeenCalledWith(
        expect.arrayContaining(['/parent', '/parent/child'])
      )

      fireEvent.change(
        document.querySelector(
          'input[name="parentField"]'
        ) as HTMLInputElement,
        { target: { value: 'abc' } }
      )
      fireEvent.change(
        document.querySelector('input[name="city"]') as HTMLInputElement,
        { target: { value: 'Os' } }
      )
      fireEvent.submit(document.querySelector('form') as HTMLFormElement)

      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const errors = lastCall[0]
      expect(errors?.['/parent/parentField']).toBeInstanceOf(Error)
      expect(errors?.['/parent/child/city']).toBeInstanceOf(Error)
    })

    it('validates section-level schema as a function', () => {
      const sectionSchema = () => {
        return z.object({
          firstName: z.string().min(3),
        })
      }

      const onErrors = jest.fn()
      const schemaPathsTracker = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker
            onUpdate={onErrors}
            schemaPathsTracker={schemaPathsTracker}
          />
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      expect(schemaPathsTracker).toHaveBeenCalledWith(
        expect.arrayContaining(['/customer'])
      )

      const input = document.querySelector('input[name="firstName"]')
      const form = document.querySelector('form')

      fireEvent.change(input as HTMLInputElement, {
        target: { value: 'Jo' },
      })
      fireEvent.submit(form as HTMLFormElement)

      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const errors = lastCall[0]
      expect(errors?.['/customer/firstName']).toBeInstanceOf(Error)
    })

    it('validates section-level JSON schema as a function', () => {
      const sectionSchema = (): JSONSchema => ({
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
            minLength: 3,
          },
        },
        required: ['firstName'],
      })

      const onSubmitRequest = jest.fn()

      render(
        <Form.Handler
          ajvInstance={makeAjvInstance()}
          onSubmitRequest={onSubmitRequest}
        >
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      const input = document.querySelector('input[name="firstName"]')
      const form = document.querySelector('form')

      fireEvent.change(input as HTMLInputElement, {
        target: { value: 'Jo' },
      })
      fireEvent.submit(form as HTMLFormElement)

      expect(onSubmitRequest).toHaveBeenCalled()

      const errors = onSubmitRequest.mock.calls[0][0].getErrors()
      expect(
        errors.some(({ path }) => path === '/customer/firstName')
      ).toBe(true)
    })

    it('handles schema function that throws gracefully', () => {
      const sectionSchema = () => {
        throw new Error('Schema function error')
      }

      const onErrors = jest.fn()
      const schemaPathsTracker = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker
            onUpdate={onErrors}
            schemaPathsTracker={schemaPathsTracker}
          />
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      const lastCall =
        schemaPathsTracker.mock.calls[
          schemaPathsTracker.mock.calls.length - 1
        ]
      expect(lastCall[0]).not.toContain('/customer')
    })

    it('validates successfully when data matches schema', () => {
      const sectionSchema = z.object({
        firstName: z.string().min(3),
      })

      const onErrors = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <ErrorsTracker onUpdate={onErrors} />
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
          <Form.SubmitButton />
        </Form.Handler>
      )

      const input = document.querySelector('input[name="firstName"]')
      const form = document.querySelector('form')

      fireEvent.change(input as HTMLInputElement, {
        target: { value: 'John' },
      })
      fireEvent.submit(form as HTMLFormElement)

      expect(onSubmit).toHaveBeenCalled()

      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const contextErrors = lastCall[0]
      expect(contextErrors?.['/customer/firstName']).toBeUndefined()
    })

    it('validates section schema without path (root level)', () => {
      const sectionSchema = z.object({
        firstName: z.string().min(3),
      })

      const onErrors = jest.fn()
      const schemaPathsTracker = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker
            onUpdate={onErrors}
            schemaPathsTracker={schemaPathsTracker}
          />
          <Form.Section schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      expect(schemaPathsTracker).toHaveBeenCalledWith(
        expect.arrayContaining(['/'])
      )

      const input = document.querySelector('input[name="firstName"]')
      const form = document.querySelector('form')

      fireEvent.change(input as HTMLInputElement, {
        target: { value: 'Jo' },
      })
      fireEvent.submit(form as HTMLFormElement)

      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const errors = lastCall[0]
      expect(errors?.['/firstName']).toBeInstanceOf(Error)
    })

    it('accepts zod schema on Form.Section without Form.Handler', async () => {
      const sectionSchema = z.object({
        firstName: z
          .string()
          .min(4, 'StringField.errorMinLength')
          .optional()
          .refine((val) => val !== undefined, {
            message: 'FirstName.errorRequired',
          }),
        lastName: z
          .string()
          .min(5, 'StringField.errorMinLength')
          .optional()
          .refine((val) => val !== undefined, {
            message: 'LastName.errorRequired',
          }),
      })

      render(
        <Form.Section path="/customer" schema={sectionSchema}>
          <Field.String path="/firstName" label="Given name" />
          <Field.String path="/lastName" label="Surname" />
        </Form.Section>
      )

      const firstInput = document.querySelector(
        'input[name="firstName"]'
      ) as HTMLInputElement

      // Enter one character
      fireEvent.change(firstInput, { target: { value: 'J' } })

      // Remove it and blur - should show required error
      fireEvent.change(firstInput, { target: { value: '' } })
      fireEvent.blur(firstInput)

      await waitFor(() => {
        const statusMessage = document.querySelector('.dnb-form-status')
        expect(statusMessage).toHaveTextContent(nb.FirstName.errorRequired)
      })

      // Enter 3 characters - should show minLength error (min is 4)
      fireEvent.change(firstInput, { target: { value: 'Joh' } })
      fireEvent.blur(firstInput)

      await waitFor(() => {
        const statusMessage = document.querySelector('.dnb-form-status')
        expect(statusMessage).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '4')
        )
      })

      // Enter 4 characters - should show no error
      fireEvent.change(firstInput, { target: { value: 'John' } })
      fireEvent.blur(firstInput)

      await waitFor(() => {
        const statusMessage = document.querySelector('.dnb-form-status')
        expect(statusMessage).not.toBeInTheDocument()
      })
    })

    it('validates zod schema on Form.Section with Form.Handler on submit', async () => {
      const sectionSchema = z.object({
        firstName: z
          .string()
          .min(4, 'StringField.errorMinLength')
          .optional()
          .refine((val) => val !== undefined, {
            message: 'FirstName.errorRequired',
          }),
        lastName: z
          .string()
          .min(5, 'StringField.errorMinLength')
          .optional()
          .refine((val) => val !== undefined, {
            message: 'LastName.errorRequired',
          }),
      })

      render(
        <Form.Handler>
          <Form.Section path="/customer" schema={sectionSchema}>
            <Field.String path="/firstName" label="Given name" />
            <Field.String path="/lastName" label="Surname" />
          </Form.Section>
          <Form.SubmitButton />
        </Form.Handler>
      )

      const firstInput = document.querySelector(
        'input[name="firstName"]'
      ) as HTMLInputElement
      const lastInput = document.querySelector(
        'input[name="lastName"]'
      ) as HTMLInputElement
      const form = document.querySelector('form') as HTMLFormElement

      // Enter one character and submit - should show required error
      fireEvent.change(firstInput, { target: { value: 'J' } })
      fireEvent.change(firstInput, { target: { value: '' } })
      fireEvent.submit(form)

      await waitFor(() => {
        const statusMessage = document.querySelector('.dnb-form-status')
        expect(statusMessage).toHaveTextContent(nb.FirstName.errorRequired)
      })

      // Enter 3 characters and submit - should show minLength error (min is 4)
      fireEvent.change(firstInput, { target: { value: 'Joh' } })
      fireEvent.submit(form)

      await waitFor(() => {
        const statusMessage = document.querySelector('.dnb-form-status')
        expect(statusMessage).toHaveTextContent(
          nb.StringField.errorMinLength.replace('{minLength}', '4')
        )
      })

      // Enter 4 characters and submit - should show no error
      fireEvent.change(firstInput, { target: { value: 'John' } })
      fireEvent.change(lastInput, { target: { value: 'Something' } })
      fireEvent.submit(form)

      await waitFor(() => {
        const statusMessage = document.querySelector('.dnb-form-status')
        expect(statusMessage).not.toBeInTheDocument()
      })
    })

    it('validates nested JSON section schemas', () => {
      const parentSchema: JSONSchema = {
        type: 'object',
        properties: {
          parentField: {
            type: 'string',
            minLength: 4,
          },
        },
      }
      const childSchema: JSONSchema = {
        type: 'object',
        properties: {
          city: {
            type: 'string',
            minLength: 5,
          },
        },
      }

      const onSubmitRequest = jest.fn()

      render(
        <Form.Handler
          ajvInstance={makeAjvInstance()}
          onSubmitRequest={onSubmitRequest}
        >
          <Form.Section path="/parent" schema={parentSchema}>
            <Field.String path="/parentField" label="Parent field" />
            <Form.Section path="/child" schema={childSchema}>
              <Field.String path="/city" label="City" />
            </Form.Section>
          </Form.Section>
        </Form.Handler>
      )

      fireEvent.change(
        document.querySelector(
          'input[name="parentField"]'
        ) as HTMLInputElement,
        { target: { value: 'abc' } }
      )
      fireEvent.change(
        document.querySelector('input[name="city"]') as HTMLInputElement,
        { target: { value: 'Os' } }
      )
      fireEvent.submit(document.querySelector('form') as HTMLFormElement)

      expect(onSubmitRequest).toHaveBeenCalled()

      const errors = onSubmitRequest.mock.calls[0][0].getErrors()
      expect(
        errors.some(({ path }) => path === '/parent/parentField')
      ).toBe(true)
      expect(
        errors.some(({ path }) => path === '/parent/child/city')
      ).toBe(true)
    })

    it('validates section schema with validateInitially', () => {
      const sectionSchema = z.object({
        firstName: z.string().min(3),
      })

      const onErrors = jest.fn()

      render(
        <Form.Handler>
          <ErrorsTracker onUpdate={onErrors} />
          <Form.Section
            path="/customer"
            schema={sectionSchema}
            validateInitially
          >
            <Field.String path="/firstName" label="Given name" />
          </Form.Section>
        </Form.Handler>
      )

      // Errors should be present initially due to validateInitially
      const lastCall =
        onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
      const errors = lastCall[0]
      expect(errors?.['/customer/firstName']).toBeInstanceOf(Error)
    })

    describe('errorPrioritization', () => {
      it('prioritizes handler schema (contextSchema) over section schema when contextSchema is first', () => {
        // Handler schema requires minLength: 5
        const handlerSchema: JSONSchema = {
          type: 'object',
          properties: {
            customer: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  minLength: 5,
                },
              },
            },
          },
        }

        // Section schema requires minLength: 3
        const sectionSchema: JSONSchema = {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              minLength: 3,
            },
          },
        }

        const onSubmitRequest = jest.fn()

        render(
          <Form.Handler
            schema={handlerSchema}
            ajvInstance={makeAjvInstance()}
            onSubmitRequest={onSubmitRequest}
          >
            <Form.Section
              path="/customer"
              schema={sectionSchema}
              errorPrioritization={['contextSchema', 'sectionSchema']}
            >
              <Field.String path="/firstName" label="Given name" />
            </Form.Section>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="firstName"]')
        const form = document.querySelector('form')

        // Value "John" (4 chars) should fail handler schema (minLength: 5) but pass section schema (minLength: 3)
        fireEvent.change(input as HTMLInputElement, {
          target: { value: 'John' },
        })
        fireEvent.submit(form as HTMLFormElement)

        expect(onSubmitRequest).toHaveBeenCalled()
        const errors = onSubmitRequest.mock.calls[0][0].getErrors()
        // Should have error from handler schema (minLength: 5), not section schema
        expect(
          errors.some(({ path }) => path === '/customer/firstName')
        ).toBe(true)
      })

      it('prioritizes section schema over handler schema when sectionSchema is first', () => {
        // Handler schema requires minLength: 2
        const handlerSchema: JSONSchema = {
          type: 'object',
          properties: {
            customer: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  minLength: 2,
                },
              },
            },
          },
        }

        // Section schema requires minLength: 5
        const sectionSchema: JSONSchema = {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              minLength: 5,
            },
          },
        }

        const onSubmitRequest = jest.fn()

        render(
          <Form.Handler
            schema={handlerSchema}
            ajvInstance={makeAjvInstance()}
            onSubmitRequest={onSubmitRequest}
          >
            <Form.Section
              path="/customer"
              schema={sectionSchema}
              errorPrioritization={['sectionSchema', 'contextSchema']}
            >
              <Field.String path="/firstName" label="Given name" />
            </Form.Section>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="firstName"]')
        const form = document.querySelector('form')

        // Value "Jo" (2 chars) passes handler schema (minLength: 2) but fails section schema (minLength: 5)
        // Section schema is prioritized, so section schema error should be shown
        fireEvent.change(input as HTMLInputElement, {
          target: { value: 'Jo' },
        })
        fireEvent.submit(form as HTMLFormElement)

        expect(onSubmitRequest).toHaveBeenCalled()
        const errors = onSubmitRequest.mock.calls[0][0].getErrors()
        // Section schema fails (minLength: 5), so error should be present
        // This verifies that section schema validation runs even when handler schema would pass
        expect(
          errors.some(({ path }) => path === '/customer/firstName')
        ).toBe(true)
      })

      it('prioritizes handler Zod schema over section Zod schema when contextSchema is first', () => {
        // Handler schema requires minLength: 5
        const handlerSchema = z.object({
          customer: z.object({
            firstName: z.string().min(5, 'Handler schema error'),
          }),
        })

        // Section schema requires minLength: 3
        const sectionSchema = z.object({
          firstName: z.string().min(3, 'Section schema error'),
        })

        const onErrors = jest.fn()

        render(
          <Form.Handler schema={handlerSchema}>
            <ErrorsTracker onUpdate={onErrors} />
            <Form.Section
              path="/customer"
              schema={sectionSchema}
              errorPrioritization={['contextSchema', 'sectionSchema']}
            >
              <Field.String path="/firstName" label="Given name" />
            </Form.Section>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="firstName"]')
        const form = document.querySelector('form')

        // Value "John" (4 chars) should fail handler schema (minLength: 5) but pass section schema (minLength: 3)
        fireEvent.change(input as HTMLInputElement, {
          target: { value: 'John' },
        })
        fireEvent.submit(form as HTMLFormElement)

        const lastCall =
          onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
        const errors = lastCall[0]
        // Should have error from handler schema
        expect(errors?.['/customer/firstName']).toBeInstanceOf(Error)
      })

      it('prioritizes section Zod schema over handler Zod schema when sectionSchema is first', () => {
        // Handler schema requires minLength: 2
        const handlerSchema = z.object({
          customer: z.object({
            firstName: z.string().min(2, 'Handler schema error'),
          }),
        })

        // Section schema requires minLength: 5
        const sectionSchema = z.object({
          firstName: z.string().min(5, 'Section schema error'),
        })

        const onErrors = jest.fn()

        render(
          <Form.Handler schema={handlerSchema}>
            <ErrorsTracker onUpdate={onErrors} />
            <Form.Section
              path="/customer"
              schema={sectionSchema}
              errorPrioritization={['sectionSchema', 'contextSchema']}
            >
              <Field.String path="/firstName" label="Given name" />
            </Form.Section>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="firstName"]')
        const form = document.querySelector('form')

        // Value "Jo" (2 chars) passes handler schema (minLength: 2) but fails section schema (minLength: 5)
        // Section schema is prioritized, so section schema error should be shown
        fireEvent.change(input as HTMLInputElement, {
          target: { value: 'Jo' },
        })
        fireEvent.submit(form as HTMLFormElement)

        const lastCall =
          onErrors.mock.calls[onErrors.mock.calls.length - 1] || []
        const errors = lastCall[0]
        // Section schema fails (minLength: 5), so error should be present
        // This verifies that section schema validation runs even when handler schema would pass
        expect(errors?.['/customer/firstName']).toBeInstanceOf(Error)
      })

      it('uses handler schema when only handler schema exists and contextSchema is prioritized', () => {
        // Handler schema requires minLength: 5
        const handlerSchema: JSONSchema = {
          type: 'object',
          properties: {
            customer: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  minLength: 5,
                },
              },
            },
          },
        }

        const onSubmitRequest = jest.fn()

        render(
          <Form.Handler
            schema={handlerSchema}
            ajvInstance={makeAjvInstance()}
            onSubmitRequest={onSubmitRequest}
          >
            <Form.Section
              path="/customer"
              errorPrioritization={['contextSchema', 'sectionSchema']}
            >
              <Field.String path="/firstName" label="Given name" />
            </Form.Section>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="firstName"]')
        const form = document.querySelector('form')

        fireEvent.change(input as HTMLInputElement, {
          target: { value: 'John' },
        })
        fireEvent.submit(form as HTMLFormElement)

        expect(onSubmitRequest).toHaveBeenCalled()
        const errors = onSubmitRequest.mock.calls[0][0].getErrors()
        // Should have error from handler schema
        expect(
          errors.some(({ path }) => path === '/customer/firstName')
        ).toBe(true)
      })

      it('uses section schema when only section schema exists and sectionSchema is prioritized', () => {
        // Section schema requires minLength: 3
        const sectionSchema: JSONSchema = {
          type: 'object',
          properties: {
            firstName: {
              type: 'string',
              minLength: 3,
            },
          },
        }

        const onSubmitRequest = jest.fn()

        render(
          <Form.Handler
            ajvInstance={makeAjvInstance()}
            onSubmitRequest={onSubmitRequest}
          >
            <Form.Section
              path="/customer"
              schema={sectionSchema}
              errorPrioritization={['sectionSchema', 'contextSchema']}
            >
              <Field.String path="/firstName" label="Given name" />
            </Form.Section>
          </Form.Handler>
        )

        const input = document.querySelector('input[name="firstName"]')
        const form = document.querySelector('form')

        fireEvent.change(input as HTMLInputElement, {
          target: { value: 'Jo' },
        })
        fireEvent.submit(form as HTMLFormElement)

        expect(onSubmitRequest).toHaveBeenCalled()
        const errors = onSubmitRequest.mock.calls[0][0].getErrors()
        // Should have error from section schema
        expect(
          errors.some(({ path }) => path === '/customer/firstName')
        ).toBe(true)
      })
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

    it('should fallback to translations keys when locale to section is missing', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation()

      const globalTranslations = {
        'sv-SE': { something: { foo: 'bar' } },
      }

      const sectionTranslations = {
        'nb-NO': {
          MyComponent: {
            title: 'Title nb',
          },
        },
        // 'sv-SE' is not defined here to test the fallback
      }

      type SectionTranslation =
        (typeof sectionTranslations)[keyof typeof sectionTranslations]

      const MySectionContent = () => {
        const tr = Form.useTranslation<SectionTranslation>()
        return <output>{tr.MyComponent.title}</output>
      }

      const MySection = () => {
        return (
          <Form.Section translations={sectionTranslations}>
            <MySectionContent />
          </Form.Section>
        )
      }

      render(
        <Form.Handler locale="sv-SE" translations={globalTranslations}>
          <MySection />
        </Form.Handler>
      )

      expect(document.querySelector('output')).toHaveTextContent(
        'MyComponent.title'
      )

      // Should have warned about missing translations
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.any(String), // Eufemia styling prefix
        expect.stringContaining(
          'Form.useTranslation: No translations found for locale "sv-SE"!'
        )
      )

      consoleSpy.mockRestore()
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
