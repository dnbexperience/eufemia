/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import * as Composite from '../../'
import { Field, Form, JSONSchema, Tools, Value } from '../../..'
import { BlockProps } from '../Block'
import { Props as FieldNameProps } from '../../../Field/Name'
import FieldPropsProvider from '../../../Form/FieldProps'
import { ListAllPropsProps } from '../../../Tools/ListAllProps'
import { GenerateSchemaProps } from '../../../Tools/GenerateSchema'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Composite.Block', () => {
  const MyBlock = ({
    children,
    ...props
  }: BlockProps<{ lastName: FieldNameProps }> & {
    children?: React.ReactNode
  }) => {
    return (
      <Composite.Block {...props}>
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" required minLength={2} />
        {children}
      </Composite.Block>
    )
  }

  const MyOuterBlock = ({
    children,
    ...props
  }: BlockProps<{
    innerBlock: { lastName: FieldNameProps }
  }> & {
    children?: React.ReactNode
  }) => {
    return (
      <Composite.Block {...props}>
        <MyBlock path="/innerBlock" />
        <Field.String path="/otherField" />
        {children}
      </Composite.Block>
    )
  }

  it('should throw then "path" without slash was given', () => {
    const log = jest.spyOn(console, 'error').mockImplementation()

    const renderComponent = () => {
      render(<MyBlock path="withoutSlash" />)
    }

    expect(renderComponent).toThrow(
      'path="withoutSlash" must start with a slash'
    )

    log.mockRestore()
  })

  it('should render block with children', () => {
    render(<MyBlock />)

    const [first, last] = Array.from(document.querySelectorAll('input'))

    expect(first).toBeInTheDocument()
    expect(last).toBeInTheDocument()
  })

  it('should make all fields required when required is true', () => {
    render(<MyBlock required />)

    expect(
      document.querySelector('input[name="firstName"]')
    ).toHaveAttribute('aria-required')
    expect(
      document.querySelector('input[name="lastName"]')
    ).toHaveAttribute('aria-required', 'true')
  })

  it('should mark fields given in children as required', () => {
    render(
      <MyBlock required>
        <Field.String path="/customChild" required />
      </MyBlock>
    )

    expect(
      document.querySelector('input[name="customChild"]')
    ).toHaveAttribute('aria-required', 'true')
  })

  it('should match snapshot', () => {
    const generateSchemaRef =
      React.createRef<ListAllPropsProps['generateRef']['current']>()
    render(
      <Form.Handler>
        <Tools.ListAllProps generateRef={generateSchemaRef}>
          <MyBlock />
        </Tools.ListAllProps>
      </Form.Handler>
    )

    const { propsOfFields, propsOfValues } = generateSchemaRef.current()

    expect(propsOfFields).toMatchInlineSnapshot(`
      {
        "firstName": {
          "autoComplete": "given-name",
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "required": "Du må fylle inn fornavn.",
          },
          "label": "Fornavn",
          "path": "/firstName",
          "pattern": "^[\\p{L}\\p{M} \\-]+$",
          "schema": {
            "maxLength": undefined,
            "minLength": undefined,
            "pattern": "^[\\p{L}\\p{M} \\-]+$",
            "type": "string",
          },
          "trim": true,
          "width": "large",
        },
        "lastName": {
          "autoComplete": "family-name",
          "errorMessages": {
            "maxLength": "Verdien kan ikke være lengre enn {maxLength} tegn.",
            "minLength": "Verdien kan ikke være kortere enn {minLength} tegn.",
            "pattern": "Kun bokstaver og tegn som bindestrek og mellomrom er tillatt.",
            "required": "Du må fylle inn etternavn.",
          },
          "label": "Etternavn",
          "minLength": 2,
          "path": "/lastName",
          "pattern": "^[\\p{L}\\p{M} \\-]+$",
          "required": true,
          "schema": {
            "maxLength": undefined,
            "minLength": 2,
            "pattern": "^[\\p{L}\\p{M} \\-]+$",
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
    const generateSchemaRef =
      React.createRef<GenerateSchemaProps['generateRef']['current']>()
    render(
      <Form.Handler>
        <Tools.GenerateSchema generateRef={generateSchemaRef}>
          <MyBlock
            overwriteProps={{
              firstName: { required: true },
              lastName: { minLength: 0 },
            }}
          />
        </Tools.GenerateSchema>
      </Form.Handler>
    )

    const { schema } = generateSchemaRef.current()

    expect(schema.required).toEqual(['firstName', 'lastName'])
    expect(schema.properties.lastName).not.toContain('minLength')
    expect(schema).toMatchInlineSnapshot(`
      {
        "properties": {
          "firstName": {
            "pattern": "^[\\p{L}\\p{M} \\-]+$",
            "type": "string",
          },
          "lastName": {
            "pattern": "^[\\p{L}\\p{M} \\-]+$",
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

      render(<MyBlock onChange={onChange} />)

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })

      expect(onChange).toHaveBeenLastCalledWith({
        firstName: 'foo',
      })

      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith({
        firstName: 'foo',
        lastName: 'bar',
      })
    })

    it('should call onChange with path', () => {
      const onChange = jest.fn()

      render(<MyBlock path="/myBlock" onChange={onChange} />)

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })

      expect(onChange).toHaveBeenLastCalledWith({
        myBlock: { firstName: 'foo' },
      })

      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith({
        myBlock: { firstName: 'foo', lastName: 'bar' },
      })
    })

    it('should call onChange on Form.Handler without a path', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <MyBlock />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })
      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(1, { firstName: 'foo' })
      expect(onChange).toHaveBeenNthCalledWith(2, {
        firstName: 'foo',
        lastName: 'bar',
      })
    })

    it('should call onChange on Form.Handler with a path', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <MyBlock path="/myBlock" />
        </Form.Handler>
      )

      const [first, last] = Array.from(document.querySelectorAll('input'))

      fireEvent.change(first, { target: { value: 'foo' } })
      fireEvent.change(last, { target: { value: 'bar' } })

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(1, {
        myBlock: { firstName: 'foo' },
      })
      expect(onChange).toHaveBeenNthCalledWith(2, {
        myBlock: { firstName: 'foo', lastName: 'bar' },
      })
    })

    it('should call onChange from nested fields', () => {
      const onChange = jest.fn()

      render(
        <Form.Handler>
          <MyOuterBlock path="/myBlock" onChange={onChange} />
        </Form.Handler>
      )

      const [first, last, addition] = Array.from(
        document.querySelectorAll('input')
      )

      fireEvent.change(first, { target: { value: 'foo' } })
      expect(onChange).toHaveBeenLastCalledWith({
        myBlock: {
          innerBlock: {
            firstName: 'foo',
          },
        },
      })

      fireEvent.change(last, { target: { value: 'bar' } })
      expect(onChange).toHaveBeenLastCalledWith({
        myBlock: {
          innerBlock: {
            firstName: 'foo',
            lastName: 'bar',
          },
        },
      })

      fireEvent.change(addition, { target: { value: 'baz' } })
      expect(onChange).toHaveBeenLastCalledWith({
        myBlock: {
          innerBlock: {
            firstName: 'foo',
            lastName: 'bar',
          },
          otherField: 'baz',
        },
      })

      expect(onChange).toHaveBeenCalledTimes(3)
    })
  })

  describe('overwriteProps', () => {
    it('should include correct types', () => {
      render(
        <Form.Handler>
          <MyBlock
            path="/myBlock"
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
          <MyBlock
            path="/myBlock"
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
          <MyBlock
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
          <MyBlock path="/myBlock" />
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
          <MyBlock
            path="/myBlock"
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
            <MyBlock path="/myBlock" />
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
            <MyBlock path="/myBlock" />
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
          <MyBlock
            path="/myBlock"
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
          <MyBlock
            path="/myBlock"
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
          <MyBlock
            path="/myBlock"
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
      expect(onChange).toHaveBeenNthCalledWith(1, {
        myBlock: { bar: undefined, foo: 'foo' },
      })
      expect(onChange).toHaveBeenNthCalledWith(2, {
        myBlock: { bar: 'bar', foo: 'foo' },
      })
    })

    describe('nested', () => {
      it('should include correct types', () => {
        render(
          <Form.Handler>
            <MyOuterBlock
              path="/myBlock"
              overwriteProps={{
                innerBlock: {
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
            <MyOuterBlock
              path="/myBlock"
              overwriteProps={{
                innerBlock: {
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
            <MyOuterBlock
              overwriteProps={{
                innerBlock: {
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
            <MyOuterBlock path="/myBlock" />
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
            <MyOuterBlock
              path="/myBlock"
              overwriteProps={{
                innerBlock: {
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
              <MyOuterBlock path="/myBlock" />
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
              <MyOuterBlock path="/myBlock" />
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
            <MyOuterBlock
              path="/myBlock"
              overwriteProps={{
                innerBlock: {
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
            <MyOuterBlock
              path="/myBlock"
              overwriteProps={{
                innerBlock: {
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
            <MyOuterBlock
              path="/myBlock"
              overwriteProps={{
                innerBlock: {
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
        expect(onChange).toHaveBeenNthCalledWith(1, {
          myBlock: {
            innerBlock: {
              bar: undefined,
              foo: 'foo',
            },
            otherField: undefined,
          },
        })
        expect(onChange).toHaveBeenNthCalledWith(2, {
          myBlock: {
            innerBlock: {
              bar: 'bar',
              foo: 'foo',
            },
            otherField: undefined,
          },
        })
        expect(onChange).toHaveBeenNthCalledWith(3, {
          myBlock: {
            innerBlock: {
              bar: 'bar',
              foo: 'foo',
            },
            otherField: 'baz',
          },
        })
      })
    })
  })

  describe('schema', () => {
    it('should set "required" for firstName', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['myBlock/firstName'],
      }

      render(
        <Form.Handler schema={schema}>
          <MyBlock path="/myBlock" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should set "required" for the whole block', () => {
      const schema: JSONSchema = {
        type: 'object',
        required: ['myBlock'],
      }

      render(
        <Form.Handler schema={schema}>
          <MyBlock path="/myBlock" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should set "required" for firstName with nested schema', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myBlock: {
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
          <MyBlock path="/myBlock" />
        </Form.Handler>
      )

      expect(
        document.querySelector('input[name="firstName"]')
      ).toHaveAttribute('aria-required', 'true')
      expect(
        document.querySelector('input[name="lastName"]')
      ).toHaveAttribute('aria-required', 'true')
    })

    it('should overwrite minLength', () => {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          myBlock: {
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
          <MyBlock
            path="/myBlock"
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
    const MyValueBlock = ({
      children,
      ...props
    }: BlockProps & {
      children?: React.ReactNode
    }) => {
      return (
        <Composite.Block {...props}>
          <Value.SummaryList>
            <Value.Name.First path="/firstName" />
            <Value.Name.Last path="/lastName" />
          </Value.SummaryList>
          {children}
        </Composite.Block>
      )
    }

    it('should not render children when data is given', () => {
      render(<MyValueBlock />)
      expect(document.body).toHaveTextContent('')
    })

    it('should render block without path', () => {
      render(
        <Form.Handler
          data={{
            firstName: 'foo',
            lastName: 'bar',
          }}
        >
          <MyValueBlock />
        </Form.Handler>
      )

      const [first, last] = Array.from(
        document.querySelectorAll('.dnb-forms-value-block__content')
      )
      expect(first).toHaveTextContent('foo')
      expect(last).toHaveTextContent('bar')
    })

    it('should render block with path', () => {
      render(
        <Form.Handler
          data={{
            myBlock: {
              firstName: 'foo',
              lastName: 'bar',
            },
          }}
        >
          <MyValueBlock path="/myBlock" />
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
      const blockTranslations = {
        'nb-NO': { MyBlock: { CustomField: { label: 'Block nb' } } },
        'en-GB': { MyBlock: { CustomField: { label: 'Block en' } } },
      }
      type BlockTranslation =
        (typeof blockTranslations)[keyof typeof blockTranslations]

      const MyBlockContent = () => {
        const { MyBlock } = Form.useTranslation<BlockTranslation>()
        return (
          <Field.String
            label={MyBlock.CustomField.label}
            path="/myField"
          />
        )
      }

      const MyBlock = () => {
        return (
          <Composite.Block translations={blockTranslations}>
            <MyBlockContent />
          </Composite.Block>
        )
      }

      const formTranslations = {
        'nb-NO': { MyBlock: { CustomField: { label: 'Form nb' } } },
        'en-GB': { MyBlock: { CustomField: { label: 'Form en' } } },
      }

      const { rerender } = render(
        <Form.Handler>
          <MyBlock />
        </Form.Handler>
      )

      const label = document.querySelector('label')

      expect(label).toHaveTextContent('Block nb')

      rerender(
        <Form.Handler locale="en-GB" translations={formTranslations}>
          <MyBlock />
        </Form.Handler>
      )

      expect(label).toHaveTextContent('Form en')
    })
  })
})
