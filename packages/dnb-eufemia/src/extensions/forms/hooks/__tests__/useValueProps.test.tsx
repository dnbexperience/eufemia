import React from 'react'
import { render, renderHook, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useValueProps from '../useValueProps'
import Provider from '../../DataContext/Provider'
import { Field, Form, Value, Wizard } from '../..'

import nbNO from '../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('useValueProps', () => {
  describe('transformIn', () => {
    it('should prepare value', () => {
      const value = 1

      const transformIn = (value) => value + 1
      const { result } = renderHook(() =>
        useValueProps({ value, transformIn })
      )

      expect(result.current.value).toBe(2)
    })

    it('should prepare value when function instance changes', () => {
      const { result, rerender } = renderHook(useValueProps, {
        initialProps: {
          value: 1,
          transformIn: (value: number) => value + 1,
        },
      })

      expect(result.current.value).toBe(2)

      rerender({ value: 2, transformIn: (value: number) => value + 2 })

      expect(result.current.value).toBe(4)
    })

    it('should prepare value from context', () => {
      const path = '/contextValue'

      const transformIn = (value) => value + 1
      const { result } = renderHook(
        () => useValueProps({ path, transformIn }),
        {
          wrapper: ({ children }) => (
            <Provider
              data={{
                contextValue: 1,
              }}
            >
              {children}
            </Provider>
          ),
        }
      )

      expect(result.current.value).toBe(2)
    })
  })

  it('should call use "toInput" to prepare value', () => {
    const value = 1

    const toInput = (value) => value + 1
    const { result } = renderHook(() => useValueProps({ value, toInput }))

    expect(result.current.value).toBe(2)
  })

  it('should call use "fromExternal" to prepare value', () => {
    const value = 1

    const fromExternal = (value) => value + 1
    const { result } = renderHook(() =>
      useValueProps({ value, fromExternal })
    )

    expect(result.current.value).toBe(2)
  })

  it('should handle "undefined" value', () => {
    const value = undefined

    const { result } = renderHook(() => useValueProps({ value }))

    expect(result.current.value).toBe(undefined)
  })

  it('given "value" should take precedence over data context value', () => {
    const givenValue = 'given value'
    const value = 'use this value'

    const { result } = renderHook(
      () => useValueProps({ path: '/foo', value }),
      {
        wrapper: (props) => (
          <Provider data={{ foo: givenValue }} {...props} />
        ),
      }
    )

    expect(result.current.value).toBe(value)
  })

  it('given "defaultValue" should not take precedence over data context value', () => {
    const givenValue = 'given value'
    const defaultValue = 'use this value'

    const { result, rerender } = renderHook(useValueProps, {
      initialProps: {
        path: '/foo',
        value: defaultValue,
        defaultValue: undefined,
      },
      wrapper: (props) => (
        <Provider data={{ foo: givenValue }} {...props} />
      ),
    })

    expect(result.current.value).toBe(defaultValue)

    rerender({ path: '/foo', value: undefined, defaultValue })

    expect(result.current.value).toBe(givenValue)
  })

  it('changed "defaultValue" should update value', () => {
    const defaultValue = 'use this value'
    const changedValue = 'changed value'

    const { result, rerender } = renderHook(useValueProps, {
      initialProps: {
        defaultValue,
      },
    })

    expect(result.current.value).toBe(defaultValue)

    rerender({ defaultValue: changedValue })

    expect(result.current.value).toBe(changedValue)
  })

  it('should forward other props', () => {
    const value = 'value'

    const { result } = renderHook(() =>
      useValueProps({ value, foo: 'foo', bar: 'bar' })
    )

    expect(result.current.value).toBe('value')
    expect(result.current.foo).toBe('foo')
    expect(result.current.bar).toBe('bar')
  })

  it('should use "toInput" to prepare value from context', () => {
    const path = '/contextValue'

    const toInput = (value) => value + 1
    const { result } = renderHook(() => useValueProps({ path, toInput }), {
      wrapper: ({ children }) => (
        <Provider
          data={{
            contextValue: 1,
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.value).toBe(2)
  })

  it('should get value from data context', () => {
    const path = '/contextValue'

    const { result } = renderHook(() => useValueProps({ path }), {
      wrapper: ({ children }) => (
        <Provider
          data={{
            contextValue: 'foo',
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.value).toBe('foo')
  })

  it('should overwrite data context value with local value', () => {
    const path = '/contextValue'
    const value = 2

    const { result } = renderHook(() => useValueProps({ value, path }), {
      wrapper: ({ children }) => (
        <Provider
          data={{
            contextValue: 1,
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.value).toBe(2)
  })

  describe('inheritLabel', () => {
    it('renders label from field with same path', () => {
      render(
        <Form.Handler
          data={{
            myPath: 'A value',
          }}
        >
          <Field.String path="/myPath" label="The label" />
          <Value.String path="/myPath" inheritLabel />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })

    it('renders label from field with same path when rendered before the field', async () => {
      render(
        <Form.Handler data={{ myPath: 'A value' }}>
          <Value.String path="/myPath" inheritLabel />
          <Field.String path="/myPath" label="The label" />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-forms-value-string')
        ).toHaveTextContent('The label')
      })

      expect(
        document.querySelector('.dnb-forms-value-string')
          .nextElementSibling.className
      ).toContain('dnb-forms-field-string')
    })

    it('should only show optional label on the field label if required={false}', () => {
      render(
        <Form.Handler
          data={{
            myPath: 'A value',
          }}
        >
          <Field.String
            path="/myPath"
            label="The label"
            required={false}
          />
          <Value.String path="/myPath" inheritLabel />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent(`The label ${nb.Field.optionalLabelSuffix}`)
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).not.toHaveTextContent(nb.Field.optionalLabelSuffix)
    })

    it('should not use label from field with same path when label is false', () => {
      render(
        <Form.Handler
          data={{
            myPath: 'A value',
          }}
        >
          <Field.String path="/myPath" label="The label" />
          <Value.String path="/myPath" />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).not.toHaveTextContent('The label')
    })

    it('should render different label from field with same path', () => {
      render(
        <Form.Handler>
          <Field.String path="/myPath" label="A field" />
          <Value.String
            path="/myPath"
            label="A value"
            inheritLabel
            showEmpty
          />
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('A field')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('A value')
    })

    it('renders label from field with same path inside a Section', () => {
      render(
        <Form.Handler
          data={{
            section: {
              myPath: 'A value',
            },
          }}
        >
          <Form.Section path="/section">
            <Field.String path="/myPath" label="The label" />
            <Value.String path="/myPath" inheritLabel />
          </Form.Section>
        </Form.Handler>
      )
      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')
      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })

    it('renders label from field with same path inside a Wizard', async () => {
      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step>
              <Field.String path="/myPath" label="The label" />
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step>
              <Value.String path="/myPath" inheritLabel showEmpty />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-forms-field-string')
      ).toHaveTextContent('The label')

      await userEvent.click(
        document.querySelector('.dnb-forms-next-button')
      )

      expect(
        document.querySelector('.dnb-forms-value-string')
      ).toHaveTextContent('The label')
    })

    it('should not inherit labelSuffix in value label', () => {
      render(
        <Form.Handler required>
          <Field.String
            path="/myPath"
            label="The label"
            required={false}
          />
          <Value.String path="/myPath" inheritLabel showEmpty />
        </Form.Handler>
      )

      expect(document.querySelector('label').textContent).toBe(
        `The label${' '}${nb.Field.optionalLabelSuffix}`
      )
      expect(
        document.querySelector('.dnb-forms-value-string').textContent
      ).toBe('The label')
    })
  })

  describe('inheritVisibility', () => {
    it('renders value when visibility of field is initially true', () => {
      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Value.Selection path="/myValue" inheritVisibility />

          <Form.Visibility pathTrue="/isVisible" animate>
            <Field.Selection
              variant="radio"
              path="/myValue"
              defaultValue="foo"
            >
              <Field.Option value="foo" title="Foo" />
              <Field.Option value="bar" title="Bar" />
            </Field.Selection>
          </Form.Visibility>

          <Value.Selection path="/myValue" inheritVisibility />
        </Form.Handler>
      )

      const [valueElementBefore, valueElementAfter] = Array.from(
        document.querySelectorAll('.dnb-forms-value-string')
      )

      expect(
        valueElementBefore.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('Foo')
      expect(
        valueElementAfter.querySelector('.dnb-forms-value-block__content')
      ).toHaveTextContent('Foo')
    })

    it('renders value visibility when field visibility changes', async () => {
      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Value.Selection path="/myValue" inheritVisibility />

          <Form.Visibility pathTrue="/isVisible">
            <Field.Selection
              variant="radio"
              path="/myValue"
              defaultValue="foo"
            >
              <Field.Option value="foo" title="Foo" />
              <Field.Option value="bar" title="Bar" />
            </Field.Selection>
          </Form.Visibility>

          <Value.Selection path="/myValue" inheritVisibility />
        </Form.Handler>
      )

      {
        const [valueElementBefore, valueElementAfter] = Array.from(
          document.querySelectorAll('.dnb-forms-value-string')
        )

        expect(valueElementBefore).toBeInTheDocument()
        expect(valueElementAfter).toBeInTheDocument()
      }

      await userEvent.click(document.querySelector('button'))

      {
        const [valueElementBefore, valueElementAfter] = Array.from(
          document.querySelectorAll('.dnb-forms-value-string')
        )

        expect(valueElementBefore).toBeInTheDocument()
        expect(valueElementAfter).toBeInTheDocument()

        await waitFor(() => {
          expect(valueElementBefore).not.toBeInTheDocument()
          expect(valueElementAfter).not.toBeInTheDocument()
        })
      }

      await userEvent.click(document.querySelector('button'))

      await waitFor(() => {
        const [valueElementBefore, valueElementAfter] = Array.from(
          document.querySelectorAll('.dnb-forms-value-string')
        )
        expect(valueElementBefore).toBeInTheDocument()
        expect(valueElementAfter).toBeInTheDocument()
      })
    })

    it('renders value visibility changes without Form.Visibility', async () => {
      const MyForm = () => {
        const [count, increment] = React.useReducer(
          (state) => state + 1,
          1
        )

        return (
          <Form.Handler>
            <button type="button" onClick={increment}>
              {count}
            </button>

            <Value.Selection path="/myValue" inheritVisibility />

            {count % 2 ? (
              <Field.Selection
                variant="radio"
                path="/myValue"
                defaultValue="foo"
              >
                <Field.Option value="foo" title="Foo" />
                <Field.Option value="bar" title="Bar" />
              </Field.Selection>
            ) : null}

            <Value.Selection path="/myValue" inheritVisibility />
          </Form.Handler>
        )
      }
      render(<MyForm />)

      {
        const [valueElementBefore, valueElementAfter] = Array.from(
          document.querySelectorAll('.dnb-forms-value-string')
        )

        expect(valueElementBefore).toBeInTheDocument()
        expect(valueElementAfter).toBeInTheDocument()
      }

      await userEvent.click(document.querySelector('button'))

      {
        const [valueElementBefore, valueElementAfter] = Array.from(
          document.querySelectorAll('.dnb-forms-value-string')
        )

        expect(valueElementBefore).toBeInTheDocument()
        expect(valueElementAfter).toBeInTheDocument()

        await waitFor(() => {
          expect(valueElementBefore).not.toBeInTheDocument()
          expect(valueElementAfter).not.toBeInTheDocument()
        })
      }

      await userEvent.click(document.querySelector('button'))

      await waitFor(() => {
        const [valueElementBefore, valueElementAfter] = Array.from(
          document.querySelectorAll('.dnb-forms-value-string')
        )
        expect(valueElementBefore).toBeInTheDocument()
        expect(valueElementAfter).toBeInTheDocument()
      })
    })

    it('renders value visibility inside a Wizard', async () => {
      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step>
              <output>Step 1</output>

              <Field.Boolean
                variant="button"
                path="/isVisible"
                defaultValue={true}
              />

              <Form.Visibility pathTrue="/isVisible">
                <Field.Selection
                  variant="radio"
                  path="/myValue"
                  defaultValue="foo"
                >
                  <Field.Option value="foo" title="Foo" />
                  <Field.Option value="bar" title="Bar" />
                </Field.Selection>
              </Form.Visibility>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step>
              <output>Step 2</output>
              <Value.Selection path="/myValue" inheritVisibility />

              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const output = () => document.querySelector('output')

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(
        document.querySelector('.dnb-forms-next-button')
      )
      expect(output()).toHaveTextContent('Step 2')

      {
        const valueElements = document.querySelectorAll(
          '.dnb-forms-value-string'
        )
        expect(valueElements).toHaveLength(1)
        expect(valueElements[0]).toBeInTheDocument()
        expect(valueElements[0]).toHaveTextContent('Foo')
      }

      await userEvent.click(
        document.querySelector('.dnb-forms-previous-button')
      )
      expect(output()).toHaveTextContent('Step 1')

      // Change the visibility
      await userEvent.click(
        document.querySelector('.dnb-toggle-button button')
      )

      await userEvent.click(
        document.querySelector('.dnb-forms-next-button')
      )
      expect(output()).toHaveTextContent('Step 2')

      {
        const valueElements = document.querySelectorAll(
          '.dnb-forms-value-string'
        )
        expect(valueElements).toHaveLength(0)
      }

      await userEvent.click(
        document.querySelector('.dnb-forms-previous-button')
      )
      expect(output()).toHaveTextContent('Step 1')

      // Change the visibility
      await userEvent.click(
        document.querySelector('.dnb-toggle-button button')
      )

      await userEvent.click(
        document.querySelector('.dnb-forms-next-button')
      )
      expect(output()).toHaveTextContent('Step 2')

      {
        const valueElements = document.querySelectorAll(
          '.dnb-forms-value-string'
        )
        expect(valueElements).toHaveLength(1)
        expect(valueElements[0]).toBeInTheDocument()
        expect(valueElements[0]).toHaveTextContent('Foo')
      }
    })
  })
})
