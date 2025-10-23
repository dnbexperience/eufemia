/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  withCamelCaseProps,
  IncludeCamelCase,
  convertCamelCasePropsToSnakeCase,
} from '../withCamelCaseProps'

type CustomType = {
  foo_bar: number
}

type OriginalProps = {
  snake_case?: boolean
  camel_case?: number
  is_class?: boolean
  optional?: string
  custom_type?: CustomType
  update_comp?: () => void
}

const Context = React.createContext(null)

describe('withCamelCaseProps', () => {
  const Original = (props: IncludeCamelCase<OriginalProps>) => {
    const context = React.useContext(Context)
    return (
      <div data-testid="content">
        <div data-testid="props">{JSON.stringify({ ...props })}</div>
        <div data-testid="context">{JSON.stringify({ ...context })}</div>
      </div>
    )
  }
  Original.property = 'thing'

  const Component = withCamelCaseProps(Original)

  it('will still expose a static property', () => {
    expect(Original.property).toBe('thing')

    expect(Component.property).toBe(Original.property)
    expect(Component.property).toBe('thing')

    // @ts-ignore
    expect(Original.propertyInvalid).toBeFalsy()

    // @ts-ignore
    expect(Component.propertyInvalid).toBeFalsy()
  })

  it('should have original name', () => {
    expect(Component.name).toBe('Original')
  })

  it('will render', () => {
    const { rerender, asFragment } = render(
      <Component snake_case={false} camelCase={1} />
    )

    rerender(
      <Component
        snake_case={false}
        camelCase={2}
        custom_type={{ foo_bar: 1 }}
        customType={{ fooBar: 1 }}
      />
    )

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"snake_case":false,"custom_type":{"fooBar":1},"camel_case":2}'
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-testid="content"
        >
          <div
            data-testid="props"
          >
            {"snake_case":false,"custom_type":{"fooBar":1},"camel_case":2}
          </div>
          <div
            data-testid="context"
          >
            {}
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('will handle className correctly', () => {
    type ExtraTypes = {
      className?: string
    }
    const Component = withCamelCaseProps(
      (props: IncludeCamelCase<OriginalProps> & ExtraTypes) => {
        return <Original {...props} />
      }
    )

    const { asFragment } = render(<Component className="value" />)

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"className":"value"}'
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-testid="content"
        >
          <div
            data-testid="props"
          >
            {"className":"value"}
          </div>
          <div
            data-testid="context"
          >
            {}
          </div>
        </div>
      </DocumentFragment>
    `)
  })

  it('will handle contextType', () => {
    const { asFragment } = render(
      <Context.Provider value={{ contextProp: 'context value' }}>
        <Component snake_case={false} camelCase={1} />
      </Context.Provider>
    )

    expect(screen.queryByTestId('context').textContent).toMatch(
      '{"contextProp":"context value"}'
    )

    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-testid="content"
        >
          <div
            data-testid="props"
          >
            {"snake_case":false,"camel_case":1}
          </div>
          <div
            data-testid="context"
          >
            {"contextProp":"context value"}
          </div>
        </div>
      </DocumentFragment>
    `)
  })
})

describe('convertCamelCasePropsToSnakeCase', () => {
  it('will convert', () => {
    const props = {
      fooBar: 'value',
      snakeCase: { fooBar: 123 },
    }
    const result = convertCamelCasePropsToSnakeCase(props)

    expect(result).toEqual({
      foo_bar: 'value',
      snake_case: { fooBar: 123 },
    })
  })

  it('should only convert props given in validProperties', () => {
    const validProperties = ['foo_bar']
    const props = {
      fooBar: 'value',
      snakeCase: 'not converted',
    }
    const result = convertCamelCasePropsToSnakeCase(props, validProperties)

    expect(result).toEqual({
      foo_bar: 'value',
      snakeCase: 'not converted',
    })
  })

  it('should not convert camelCase given props in validProperties', () => {
    const validProperties = ['foo_bar', 'snakeCase']
    const props = {
      fooBar: 'value',
      snakeCase: 'not converted',
    }
    const result = convertCamelCasePropsToSnakeCase(props, validProperties)

    expect(result).toEqual({
      foo_bar: 'value',
      snakeCase: 'not converted',
    })
  })

  it('should ignore non-array validProperties', () => {
    const validProperties = {} as Array<string>
    const props = {
      name: 'value',
      fooBar: 'value',
      snakeCase: 'not converted',
    }
    const result = convertCamelCasePropsToSnakeCase(props, validProperties)

    expect(result).toEqual({
      name: 'value',
      foo_bar: 'value',
      snake_case: 'not converted',
    })
  })

  it('will keep frozen object as frozen', () => {
    const props = Object.freeze({
      fooBar: 'value',
      snakeCase: { fooBar: 123 },
    })
    const result = convertCamelCasePropsToSnakeCase(props)

    expect(Object.isFrozen(result)).toBe(true)
  })
})
