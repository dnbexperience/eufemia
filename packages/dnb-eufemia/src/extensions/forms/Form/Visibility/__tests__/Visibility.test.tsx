import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FilterData, Provider } from '../../../DataContext'
import Visibility from '../Visibility'
import useVisibility from '../useVisibility'
import { Field, Form, Iterate } from '../../..'
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

    it('should not render children when path not matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility
            visibleWhen={{ path: '/nonExistingPath', hasValue: 'foo' }}
          >
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('should render children when withValue matches', () => {
      const log = jest.spyOn(console, 'warn').mockImplementation()

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

      log.mockRestore()
    })

    it('should not render children when withValue does not match', () => {
      const log = jest.spyOn(console, 'warn').mockImplementation()

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

      log.mockRestore()
    })

    describe('Iterate', () => {
      it('should render with whole path', async () => {
        render(
          <Form.Handler>
            <Iterate.Array path="/myList" defaultValue={[{}]}>
              <Field.Name.First
                className="firstName"
                itemPath="/firstName"
              />

              <Form.Visibility
                visibleWhen={{
                  path: '/myList/0/firstName',
                  hasValue: (value: string) => value?.length > 0,
                }}
              >
                <Field.Name.Last
                  className="lastName"
                  itemPath="/lastName"
                />
              </Form.Visibility>
            </Iterate.Array>
          </Form.Handler>
        )

        expect(document.querySelector('.firstName')).toBeInTheDocument()
        expect(document.querySelector('.lastName')).toBeNull()

        await userEvent.type(
          document.querySelector('.firstName input'),
          'foo'
        )

        expect(document.querySelector('.lastName')).toBeInTheDocument()
      })

      it('should render with itemPath', async () => {
        const log = jest.spyOn(console, 'warn').mockImplementation()

        render(
          <Form.Handler>
            <Iterate.Array path="/myList" defaultValue={[{}]}>
              <Field.Name.First
                className="firstName"
                itemPath="/firstName"
              />

              <Form.Visibility
                visibleWhen={{
                  itemPath: '/firstName',
                  hasValue: (value: string) => value?.length > 0,
                }}
              >
                <Field.Name.Last
                  className="lastName"
                  itemPath="/lastName"
                />
              </Form.Visibility>
            </Iterate.Array>
          </Form.Handler>
        )

        expect(document.querySelector('.firstName')).toBeInTheDocument()
        expect(document.querySelector('.lastName')).toBeNull()

        await userEvent.type(
          document.querySelector('.firstName input'),
          'foo'
        )

        expect(document.querySelector('.lastName')).toBeInTheDocument()

        log.mockRestore()
      })
    })
  })

  describe('visibleWhenNot', () => {
    it('should render children when hasValue matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility
            visibleWhenNot={{ path: '/myPath', hasValue: 'foo' }}
          >
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('should not render children when hasValue not matches', () => {
      render(
        <Provider data={{ myPath: 'foo' }}>
          <Visibility
            visibleWhenNot={{ path: '/myPath', hasValue: 'bar' }}
          >
            Child
          </Visibility>
        </Provider>
      )
      expect(screen.getByText('Child')).toBeInTheDocument()
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

  describe('events', () => {
    it('should not call onVisible initially', async () => {
      const onVisible = jest.fn()

      render(
        <Form.Handler
          defaultData={{
            toggleValue: false,
          }}
        >
          <Field.Boolean path="/toggleValue" />
          <Form.Visibility pathTrue="/toggleValue" onVisible={onVisible}>
            content
          </Form.Visibility>
        </Form.Handler>
      )

      const checkbox = document.querySelector('input[type="checkbox"]')

      expect(onVisible).toHaveBeenCalledTimes(0)

      await userEvent.click(checkbox)

      expect(onVisible).toHaveBeenCalledTimes(1)
      expect(onVisible).toHaveBeenLastCalledWith(true)
    })

    it('should call onVisible when visible again', async () => {
      const onVisible = jest.fn()

      render(
        <Form.Handler
          defaultData={{
            toggleValue: false,
          }}
        >
          <Field.Boolean path="/toggleValue" />
          <Form.Visibility pathTrue="/toggleValue" onVisible={onVisible}>
            content
          </Form.Visibility>
        </Form.Handler>
      )

      const checkbox = document.querySelector('input[type="checkbox"]')

      expect(onVisible).toHaveBeenCalledTimes(0)

      await userEvent.click(checkbox)
      expect(onVisible).toHaveBeenCalledTimes(1)
      expect(onVisible).toHaveBeenLastCalledWith(true)

      await userEvent.click(checkbox)
      expect(onVisible).toHaveBeenCalledTimes(2)
      expect(onVisible).toHaveBeenLastCalledWith(false)
    })

    it('should call onAnimationEnd when animation is done', async () => {
      const onAnimationEnd = jest.fn()

      render(
        <Form.Handler
          defaultData={{
            toggleValue: false,
          }}
        >
          <Field.Boolean path="/toggleValue" />
          <Form.Visibility
            pathTrue="/toggleValue"
            onAnimationEnd={onAnimationEnd}
            animate
          >
            content
          </Form.Visibility>
        </Form.Handler>
      )

      const checkbox = document.querySelector('input[type="checkbox"]')

      expect(onAnimationEnd).toHaveBeenCalledTimes(0)

      await userEvent.click(checkbox)
      await waitFor(() => {
        expect(onAnimationEnd).toHaveBeenCalledTimes(1)
        expect(onAnimationEnd).toHaveBeenLastCalledWith('opened')
      })

      await userEvent.click(checkbox)
      await waitFor(() => {
        expect(onAnimationEnd).toHaveBeenLastCalledWith('closed')
      })

      await userEvent.click(checkbox)
      await waitFor(() => {
        expect(onAnimationEnd).toHaveBeenLastCalledWith('opened')
      })
    })

    it('should not call onAnimationEnd when "animation" is false', async () => {
      const onAnimationEnd = jest.fn()

      render(
        <Form.Handler
          defaultData={{
            toggleValue: false,
          }}
        >
          <Field.Boolean path="/toggleValue" />
          <Form.Visibility
            pathTrue="/toggleValue"
            onAnimationEnd={onAnimationEnd}
            animate
          >
            content
          </Form.Visibility>
        </Form.Handler>
      )

      const checkbox = document.querySelector('input[type="checkbox"]')

      expect(onAnimationEnd).toHaveBeenCalledTimes(0)

      await userEvent.click(checkbox)

      expect(() => {
        expect(onAnimationEnd).toHaveBeenCalledTimes(0)
      }).toNeverResolve()
    })
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
    it('should filter data with filterDataHandler based on props', async () => {
      let result = undefined

      const filterDataHandler: FilterData = ({ props }) => {
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
                visibleWhen={{ path: '/mySelection', hasValue: 'more' }}
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

    it('should use filtered data based on given filterData handler and mounted field path', async () => {
      const filterDataHandler: FilterData = jest.fn(({ path, value }) => {
        if (path === '/isVisible' && value === true) {
          return false
        }
      })

      render(
        <Form.Handler defaultData={{ isVisible: false }}>
          <Field.Boolean label="Label" path="/isVisible" />

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
      expect(filterDataHandler).toHaveBeenLastCalledWith({
        path: '/isVisible',
        value: false,
        displayValue: 'Nei',
        label: 'Label',
        data: {
          isVisible: false,
        },
        props: expect.objectContaining({
          path: '/isVisible',
        }),
        internal: {
          error: undefined,
        },
      })

      await userEvent.click(document.querySelector('input'))

      // First will be kept as hidden, second will be visible
      expect(first).toHaveAttribute('hidden', '')
      expect(second).not.toHaveAttribute('hidden')
      expect(filterDataHandler).toHaveBeenCalledTimes(2)
      expect(filterDataHandler).toHaveBeenLastCalledWith({
        path: '/isVisible',
        value: true,
        displayValue: 'Ja',
        label: 'Label',
        data: {
          isVisible: true,
        },
        props: expect.objectContaining({
          path: '/isVisible',
        }),
        internal: {
          error: undefined,
        },
      })
    })

    it('should use filtered data based on given filterData paths', () => {
      const filterDataPaths: FilterData = {
        '/isVisible': false,
      }

      const { rerender } = render(
        <Form.Handler data={{ isVisible: false }}>
          <Form.Visibility
            pathTrue="/isVisible"
            filterData={filterDataPaths}
          >
            has filter
          </Form.Visibility>

          <Form.Visibility pathTrue="/isVisible">
            has no filter
          </Form.Visibility>
        </Form.Handler>
      )

      expect(screen.queryByText('has filter')).not.toBeInTheDocument()
      expect(screen.queryByText('has no filter')).not.toBeInTheDocument()

      rerender(
        <Form.Handler data={{ isVisible: true }}>
          <Form.Visibility
            pathTrue="/isVisible"
            filterData={filterDataPaths}
          >
            has filter
          </Form.Visibility>

          <Form.Visibility pathTrue="/isVisible">
            has no filter
          </Form.Visibility>
        </Form.Handler>
      )

      expect(screen.queryByText('has filter')).not.toBeInTheDocument()
      expect(screen.getByText('has no filter')).toBeInTheDocument()
    })
  })

  describe('with section context', () => {
    it('should combine section path and field path', () => {
      render(
        <Form.Handler
          data={{
            mySection: {
              myField: 'value',
            },
          }}
        >
          <Form.Section path="/mySection">
            <Field.String path="/myField" />
            <Form.Visibility pathDefined="/myField">
              inside section
            </Form.Visibility>
          </Form.Section>
          <Form.Visibility pathDefined="/myField">
            outside section
          </Form.Visibility>
        </Form.Handler>
      )

      expect(screen.getByRole('textbox')).toHaveValue('value')
      expect(screen.getByText('inside section')).toBeInTheDocument()
      expect(screen.queryByText('outside section')).not.toBeInTheDocument()
    })

    it('visibleWhen', () => {
      render(
        <Form.Handler>
          <Form.Section path="/mySection">
            <Field.String path="/myField" value="foo" />
            <Form.Visibility
              visibleWhen={{ path: '/myField', hasValue: 'foo' }}
            >
              Child
            </Form.Visibility>
          </Form.Section>
        </Form.Handler>
      )

      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('pathTrue', () => {
      render(
        <Form.Handler>
          <Form.Section path="/mySection">
            <Field.Boolean path="/myField" value={true} />
            <Form.Visibility pathTrue="/myField">Child</Form.Visibility>
          </Form.Section>
        </Form.Handler>
      )

      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('pathFalse', () => {
      render(
        <Form.Handler>
          <Form.Section path="/mySection">
            <Field.Boolean path="/myField" value={false} />
            <Form.Visibility pathFalse="/myField">Child</Form.Visibility>
          </Form.Section>
        </Form.Handler>
      )

      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('pathTruthy', () => {
      render(
        <Form.Handler>
          <Form.Section path="/mySection">
            <Field.Number path="/myField" value={1} />
            <Form.Visibility pathTruthy="/myField">Child</Form.Visibility>
          </Form.Section>
        </Form.Handler>
      )

      expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('pathFalsy', () => {
      render(
        <Form.Handler>
          <Form.Section path="/mySection">
            <Field.String path="/myField" value={null} />
            <Form.Visibility pathFalsy="/myField">Child</Form.Visibility>
          </Form.Section>
        </Form.Handler>
      )

      expect(screen.getByText('Child')).toBeInTheDocument()
    })
  })

  describe('visibleWhen with "isValid"', () => {
    it('should return only false when field path is non existent', () => {
      const collectResult = []

      const MockComponent = () => {
        const result = useVisibility().check({
          visibleWhen: {
            path: '/non-existent-path',
            isValid: true,
          },
        })
        collectResult.push(result)
        return null
      }

      render(
        <Provider>
          <MockComponent />
        </Provider>
      )

      expect(collectResult).toEqual([false])
    })

    it('should return only false on first render', () => {
      const collectResult = []

      const MockComponent = () => {
        const result = useVisibility().check({
          visibleWhen: {
            path: '/myPath',
            isValid: true,
          },
        })
        collectResult.push(result)
        return null
      }

      render(
        <Provider>
          <Field.Number path="/myPath" required minimum={2} />
          <MockComponent />
        </Provider>
      )

      expect(collectResult).toEqual([false, false, false])

      fireEvent.focus(document.querySelector('input'))
      fireEvent.change(document.querySelector('input'), {
        target: { value: '2' },
      })
      expect(collectResult).toEqual([false, false, false, false])

      fireEvent.blur(document.querySelector('input'))
      expect(collectResult).toEqual([false, false, false, false, true])
    })

    it('should support fields without focus and blur events', async () => {
      const collectResult = []

      const MockComponent = () => {
        const result = useVisibility().check({
          visibleWhen: {
            path: '/myPath',
            isValid: true,
          },
        })
        collectResult.push(result)
        return null
      }

      render(
        <Provider>
          <Field.Boolean path="/myPath" required />
          <MockComponent />
        </Provider>
      )

      expect(collectResult).toEqual([false, false, false])

      await userEvent.click(document.querySelector('input'))
      expect(collectResult).toEqual([false, false, false, true])

      // Should have no effect
      fireEvent.focus(document.querySelector('input'))
      fireEvent.blur(document.querySelector('input'))
      expect(collectResult).toEqual([false, false, false, true])
    })
  })
})
