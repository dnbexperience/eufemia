import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from '../../../DataContext'
import Visibility from '../Visibility'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'
import { P } from '../../../../../elements'

describe('Visibility', () => {
  it('renders children when no props is given', () => {
    render(<Visibility>Child</Visibility>)
    expect(screen.getByText('Child')).toBeInTheDocument()
  })

  it('should have constant of _supportsSpacingProps="children"', () => {
    expect(Visibility._supportsSpacingProps).toBe('children')
  })

  describe('visibility', () => {
    it('renders children when visible is true', () => {
      render(<Visibility visible={true}>Child</Visibility>)
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when visible is false', () => {
      render(<Visibility visible={false}>Child</Visibility>)
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('keepInDOM', () => {
    it('should keep content in the DOM surrounded with a hidden span', () => {
      render(
        <Visibility keepInDOM visible={false}>
          Child
        </Visibility>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
      const element = document.querySelector('.dnb-forms-visibility')
      expect(element).toBeInTheDocument()
      expect(element).toHaveAttribute('hidden')
      expect(element).toHaveTextContent('Child')
    })

    it('use HeightAnimation keepInDOM feature', () => {
      render(
        <Visibility keepInDOM animate visible={false}>
          Child
        </Visibility>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
      const element = document.querySelector('.dnb-forms-visibility')
      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('dnb-height-animation--hidden')
      expect(element).toHaveTextContent('Child')
    })
  })

  describe('pathDefined', () => {
    it('renders children when target path is defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathDefined="/isDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathDefined="/notDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathUndefined', () => {
    it('renders children when target path is defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathUndefined="/isDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ isDefined: 'foo' }}>
          <Visibility pathUndefined="/notDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })
  })

  describe('pathTruthy', () => {
    it('renders children when target path is truthy', () => {
      render(
        <Provider data={{ isTruthy: 'value' }}>
          <Visibility pathTruthy="/isTruthy">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not truthy', () => {
      render(
        <Provider data={{ isFalsy: null }}>
          <Visibility pathTruthy="/isFalsy">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('does not render children when target path is not defined', () => {
      render(
        <Provider data={{ isFalse: false }}>
          <Visibility pathTruthy="/isNotDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('pathFalsy', () => {
    it('renders children when target path is falsy', () => {
      render(
        <Provider data={{ isFalsy: null }}>
          <Visibility pathFalsy="/isFalsy">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('renders children when target path is not defined', () => {
      render(
        <Provider data={{ isFalse: false }}>
          <Visibility pathFalsy="/isNotDefined">Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path is not falsy', () => {
      render(
        <Provider data={{ isTruthy: 'value' }}>
          <Visibility pathFalsy="/isTruthy">Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  describe('inferData', () => {
    it('renders children when infer-function returns true', () => {
      // eslint-disable-next-line no-unused-vars
      const inferData = jest.fn((data) => true)
      render(
        <Provider data={{ foo: 'bar' }}>
          <Visibility inferData={inferData}>Child</Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when infer-function return false', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const inferData = jest.fn((data) => false)
      render(
        <Provider data={{ foo: 'bar' }}>
          <Visibility inferData={inferData}>Child</Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
      expect(inferData).toHaveBeenCalledTimes(1)
      expect(inferData).toHaveBeenLastCalledWith({ foo: 'bar' })
    })
  })

  describe('pathValue', () => {
    it('renders children when target path and value matches', () => {
      render(
        <Provider data={{ myPath: 'checked' }}>
          <Visibility pathValue="/myPath" whenValue="checked">
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('does not render children when target path not not value matches', () => {
      render(
        <Provider data={{ myPath: 'checked' }}>
          <Visibility pathValue="/myPath" whenValue="not-checked">
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).toBeNull()
    })
  })

  describe('visibleWhen', () => {
    it('should render children when hasValue matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility visibleWhen={{ path: '/myPath', hasValue: 'foo' }}>
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('should not render children when hasValue not matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility visibleWhen={{ path: '/myPath', hasValue: 'bar' }}>
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('should render children when withValue matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility
            visibleWhen={{
              path: '/myPath',
              withValue: (value) => value === 'foo',
            }}
          >
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('should not render children when withValue not matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility
            visibleWhen={{
              path: '/myPath',
              withValue: (value) => value === 'bar',
            }}
          >
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })
  })

  it('should be supported by Flex.Container', async () => {
    render(
      <Form.Handler>
        <Flex.Stack>
          <Field.Boolean path="/toggleValue" />
          <Form.Visibility pathTrue="/toggleValue">
            <P>This is visible 1</P>
            <P>This is visible 2</P>
          </Form.Visibility>
        </Flex.Stack>
      </Form.Handler>
    )

    const checkbox = document.querySelector('input[type="checkbox"]')

    expect(document.querySelectorAll('p')).toHaveLength(0)

    await userEvent.click(checkbox)

    expect(document.querySelectorAll('p')).toHaveLength(2)

    const [first, second] = Array.from(document.querySelectorAll('p'))
    expect(first).toHaveClass(
      'dnb-p dnb-space__top--zero dnb-space__bottom--zero'
    )
    expect(second).toHaveClass(
      'dnb-p dnb-space__top--medium dnb-space__bottom--zero'
    )

    const container = document.querySelector(
      '.dnb-flex-container > .dnb-flex-container'
    )
    expect(container).toMatchInlineSnapshot(`
      <section
        class="dnb-space dnb-space__top--medium dnb-space__bottom--zero dnb-flex-container dnb-flex-stack dnb-flex-container--direction-vertical dnb-flex-container--justify-flex-start dnb-flex-container--align-stretch dnb-flex-container--align-self-stretch dnb-flex-container--spacing-medium dnb-flex-container--wrap dnb-flex-container--divider-space"
      >
        <p
          class="dnb-p dnb-space__top--zero dnb-space__bottom--zero"
        >
          This is visible 1
        </p>
        <p
          class="dnb-p dnb-space__top--medium dnb-space__bottom--zero"
        >
          This is visible 2
        </p>
      </section>
    `)
  })

  it('should have "height-animation" wrapper when animate is true', async () => {
    render(
      <Provider data={{ myPath: 'checked' }}>
        <Visibility
          visibleWhen={{
            path: '/myPath',
            hasValue: 'checked',
          }}
          animate
        >
          Child
        </Visibility>
      </Provider>
    )

    const element = document.querySelector('.dnb-height-animation')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass(
      'dnb-space dnb-height-animation dnb-height-animation--is-in-dom dnb-height-animation--parallax'
    )
  })

  it('should use given "element"', () => {
    render(
      <Provider data={{ myPath: 'checked' }}>
        <Visibility
          visibleWhen={{
            path: '/myPath',
            hasValue: 'checked',
          }}
          animate
          element="span"
        >
          Child
        </Visibility>
      </Provider>
    )

    const element = document.querySelector('.dnb-height-animation')
    expect(element.tagName).toBe('SPAN')
  })

  describe('fieldPropsWhenHidden', () => {
    it('should disable children when target visibility is false', () => {
      const { rerender } = render(
        <Visibility
          visible={true}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String />
        </Visibility>
      )

      expect(document.querySelector('input')).not.toBeDisabled()

      rerender(
        <Visibility
          visible={false}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String />
        </Visibility>
      )

      expect(document.querySelector('input')).toBeDisabled()

      rerender(
        <Visibility
          visible={true}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String />
        </Visibility>
      )

      expect(document.querySelector('input')).not.toBeDisabled()
    })

    it('should not overwrite component properties', () => {
      const { rerender } = render(
        <Visibility
          visible={true}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String />
        </Visibility>
      )

      expect(document.querySelector('input')).not.toBeDisabled()

      rerender(
        <Visibility
          visible={false}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String disabled />
        </Visibility>
      )

      expect(document.querySelector('input')).toBeDisabled()

      rerender(
        <Visibility
          visible={true}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String disabled />
        </Visibility>
      )

      expect(document.querySelector('input')).toBeDisabled()

      rerender(
        <Visibility
          visible={true}
          keepInDOM
          fieldPropsWhenHidden={{ disabled: true }}
        >
          <Field.String disabled={false} />
        </Visibility>
      )

      expect(document.querySelector('input')).not.toBeDisabled()
    })

    it('should not overwrite data context properties', () => {
      const { rerender } = render(
        <Form.Handler disabled>
          <Visibility
            visible={true}
            keepInDOM
            fieldPropsWhenHidden={{ disabled: false }}
          >
            <Field.String />
          </Visibility>
        </Form.Handler>
      )

      expect(document.querySelector('input')).toBeDisabled()

      rerender(
        <Form.Handler disabled>
          <Visibility
            visible={false}
            keepInDOM
            fieldPropsWhenHidden={{ disabled: false }}
          >
            <Field.String />
          </Visibility>
        </Form.Handler>
      )

      expect(document.querySelector('input')).not.toBeDisabled()

      rerender(
        <Form.Handler disabled>
          <Visibility
            visible={false}
            keepInDOM
            fieldPropsWhenHidden={{ disabled: true }}
          >
            <Field.String disabled />
          </Visibility>
        </Form.Handler>
      )

      expect(document.querySelector('input')).toBeDisabled()

      rerender(
        <Form.Handler disabled>
          <Visibility
            visible={true}
            keepInDOM
            fieldPropsWhenHidden={{ disabled: true }}
          >
            <Field.String disabled={false} />
          </Visibility>
        </Form.Handler>
      )

      expect(document.querySelector('input')).not.toBeDisabled()
    })

    it('should forward data-* attributes', () => {
      const { rerender } = render(
        <Visibility
          visible={true}
          keepInDOM
          fieldPropsWhenHidden={{ 'data-exclude-field': true }}
        >
          <Field.String />
        </Visibility>
      )

      expect(document.querySelector('input')).not.toHaveAttribute(
        'data-exclude-field'
      )

      rerender(
        <Visibility
          visible={false}
          keepInDOM
          fieldPropsWhenHidden={{ 'data-exclude-field': true }}
        >
          <Field.String disabled />
        </Visibility>
      )

      expect(document.querySelector('input')).toHaveAttribute(
        'data-exclude-field'
      )
    })
  })

  describe('filterData', () => {
    it('should filter data', async () => {
      let result = undefined

      const filterDataHandler = (path, value, props) => {
        return !props['data-exclude-field']
      }

      const MockForm = () => {
        const { filterData } = Form.useData('my-form')

        const Output = React.useCallback(() => {
          result = filterData(filterDataHandler)
          return null
        }, [filterData])

        return (
          <Form.Handler id="my-form">
            <Field.Boolean
              label="Toggle"
              variant="button"
              path="/isVisible"
              data-exclude-field
            />
            <Form.Visibility
              visible
              pathTrue="/isVisible"
              keepInDOM
              fieldPropsWhenHidden={{ 'data-exclude-field': true }}
            >
              <Field.Selection
                label="Choose"
                variant="radio"
                path="/mySelection"
                value="less"
              >
                <Field.Option value="less" title="Less" />
                <Field.Option value="more" title="More" />
              </Field.Selection>

              <Form.Visibility
                visible
                visibleWhen={{
                  path: '/mySelection',
                  hasValue: 'more',
                }}
                keepInDOM
                fieldPropsWhenHidden={{ 'data-exclude-field': true }}
              >
                <Field.String
                  label="My String"
                  path="/myString"
                  value="foo"
                />
              </Form.Visibility>
            </Form.Visibility>

            <Output />
          </Form.Handler>
        )
      }

      render(<MockForm />)

      expect(result).toMatchObject({})

      await userEvent.click(screen.getByText('Toggle'))

      expect(result).toMatchObject({ mySelection: 'less' })

      await userEvent.click(screen.getByText('More'))

      expect(result).toMatchObject({
        mySelection: 'more',
        myString: 'foo',
      })

      await userEvent.click(screen.getByText('Less'))

      expect(result).toMatchObject({ mySelection: 'less' })

      await userEvent.click(screen.getByText('Toggle'))

      expect(result).toMatchObject({})
    })

    it('should use filtered data based on given filterData handler', async () => {
      const filterDataHandler = jest.fn((path, value) => {
        if (path === '/isVisible' && value === true) {
          return false
        }
      })

      render(
        <Form.Handler defaultData={{ isVisible: false }}>
          <Field.Boolean path="/isVisible" />

          <Form.Visibility
            pathTrue="/isVisible"
            filterData={filterDataHandler}
            keepInDOM
          >
            <output data-is-hidden />
          </Form.Visibility>

          <Form.Visibility pathTrue="/isVisible" keepInDOM>
            <output data-is-visible />
          </Form.Visibility>
        </Form.Handler>
      )

      const [first, second] = Array.from(
        document.querySelectorAll('.dnb-forms-visibility')
      )

      expect(first).toHaveAttribute('hidden', '')
      expect(second).toHaveAttribute('hidden', '')
      expect(filterDataHandler).toHaveBeenCalledTimes(1)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/isVisible',
        false,
        expect.any(Object),
        expect.any(Object)
      )

      await userEvent.click(document.querySelector('input'))

      // First will be kept as hidden, second will be visible
      expect(first).toHaveAttribute('hidden', '')
      expect(second).not.toHaveAttribute('hidden')
      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenLastCalledWith(
        '/isVisible',
        true,
        expect.any(Object),
        expect.any(Object)
      )
    })
  })
})
