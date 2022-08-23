/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  withSnakeCaseProps,
  classWithSnakeCaseProps,
  IncludeSnakeCase,
} from '../withSnakeCaseProps'
import { mount, attachToBody, toJson } from '../../../core/jest/jestSetup'

type CustomType = {
  fooBar: number
}

type OriginalProps = {
  camelCase?: boolean
  snake_case?: number
  is_class?: boolean
  optional?: string
  customType?: CustomType
  updateComp?: () => void
}

const Context = React.createContext(null)

describe('withSnakeCaseProps', () => {
  const Original = (props: IncludeSnakeCase<OriginalProps>) => {
    const context = React.useContext(Context)
    return (
      <div data-testid="content">
        <div data-testid="props">{JSON.stringify({ ...props })}</div>
        <div data-testid="context">{JSON.stringify({ ...context })}</div>
      </div>
    )
  }
  Original.property = 'thing'

  const Component = withSnakeCaseProps(Original)

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
      <Component snake_case={1} camelCase={false} />
    )

    rerender(
      <Component
        camelCase={false}
        snake_case={2}
        customType={{ fooBar: 1 }}
        custom_type={{ foo_bar: 1 }}
      />
    )

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"camelCase":false,"customType":{"foo_bar":1},"snakeCase":2}'
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-testid="content"
        >
          <div
            data-testid="props"
          >
            {"camelCase":false,"customType":{"foo_bar":1},"snakeCase":2}
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

  it('will render with enzyme', () => {
    const Comp = mount(<Component camelCase={false} snake_case={1} />)

    expect(toJson(Comp)).toMatchInlineSnapshot(`
      <Original
        camelCase={false}
        snake_case={1}
      >
        <Original
          camelCase={false}
          snakeCase={1}
        >
          <div
            data-testid="content"
          >
            <div
              data-testid="props"
            >
              {"camelCase":false,"snakeCase":1}
            </div>
            <div
              data-testid="context"
            >
              {}
            </div>
          </div>
        </Original>
      </Original>
    `)
  })

  it('will handle contextType', () => {
    const Comp = mount(
      <Context.Provider value={{ contextProp: 'context value' }}>
        <Component camelCase={false} snake_case={1} />
      </Context.Provider>
    )

    expect(
      Comp.find(Original).find('[data-testid="context"]').text()
    ).toBe('{"contextProp":"context value"}')
    expect(toJson(Comp)).toMatchInlineSnapshot(`
      <Original
        camelCase={false}
        snake_case={1}
      >
        <Original
          camelCase={false}
          snakeCase={1}
        >
          <div
            data-testid="content"
          >
            <div
              data-testid="props"
            >
              {"camelCase":false,"snakeCase":1}
            </div>
            <div
              data-testid="context"
            >
              {"contextProp":"context value"}
            </div>
          </div>
        </Original>
      </Original>
    `)
  })
})

describe('classWithSnakeCaseProps', () => {
  type OriginalState = {
    someState: boolean
  }

  class Original extends React.PureComponent<
    IncludeSnakeCase<OriginalProps>,
    OriginalState
  > {
    static contextType = Context
    state = {
      someState: true,
    }
    static property = 'thing'

    constructor(props: IncludeSnakeCase<OriginalProps>) {
      super(props)
    }

    componentDidMount() {
      //
    }

    componentDidUpdate(prevProps: IncludeSnakeCase<OriginalProps>) {
      if (
        prevProps !== this.props &&
        this.props.updateComp !== undefined
      ) {
        this.props.updateComp()
      }
    }

    render() {
      return (
        <div data-testid="content">
          <div data-testid="props">
            {JSON.stringify({ ...this.props })}
          </div>
          <div data-testid="state">
            {JSON.stringify({ ...this.state })}
          </div>
          <div data-testid="context">
            {JSON.stringify({ ...this.context })}
          </div>
        </div>
      )
    }
  }

  it('will still expose a static property', () => {
    const Component = classWithSnakeCaseProps(Original)

    expect(Original.property).toBe('thing')

    expect(Component.property).toBe(Original.property)
    expect(Component.property).toBe('thing')

    // @ts-ignore
    expect(Original.propertyInvalid).toBeFalsy()

    // @ts-ignore
    expect(Component.propertyInvalid).toBeFalsy()
  })

  it('should have original name', () => {
    const Component = classWithSnakeCaseProps(Original)

    expect(Component.name).toBe('Original')
  })

  it('will render', () => {
    const Component = classWithSnakeCaseProps(Original)

    const { rerender, asFragment } = render(
      <Component camelCase={false} snake_case={1} />
    )

    rerender(<Component camelCase={false} snake_case={2} />)

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"camelCase":false,"snakeCase":2}'
    )
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          data-testid="content"
        >
          <div
            data-testid="props"
          >
            {"camelCase":false,"snakeCase":2}
          </div>
          <div
            data-testid="state"
          >
            {"someState":true}
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

  it('will call componentDidMount once', () => {
    const componentDidMount = jest.fn()

    class CopyOfOriginal extends Original {
      componentDidMount() {
        componentDidMount()
      }
    }

    const Component = classWithSnakeCaseProps(CopyOfOriginal)

    const { rerender } = render(
      <Component camelCase={false} snake_case={1} />
    )

    rerender(<Component camelCase={false} snake_case={2} />)

    expect(componentDidMount).toHaveBeenCalledTimes(1)
  })

  it('will render with enzyme', () => {
    const Component = classWithSnakeCaseProps(Original)

    const Comp = mount(<Component camelCase={false} snake_case={1} />)

    expect(toJson(Comp)).toMatchInlineSnapshot(`
      <Original
        camelCase={false}
        snake_case={1}
      >
        <Original
          camelCase={false}
          snakeCase={1}
        >
          <div
            data-testid="content"
          >
            <div
              data-testid="props"
            >
              {"camelCase":false,"snakeCase":1}
            </div>
            <div
              data-testid="state"
            >
              {"someState":true}
            </div>
            <div
              data-testid="context"
            >
              {}
            </div>
          </div>
        </Original>
      </Original>
    `)
  })

  it('will handle contextType', () => {
    const Component = classWithSnakeCaseProps(Original)

    const Comp = mount(
      <Context.Provider value={{ contextProp: 'context value' }}>
        <Component camelCase={false} snake_case={1} />
      </Context.Provider>
    )

    expect(
      Comp.find(Original).find('[data-testid="context"]').text()
    ).toBe('{"contextProp":"context value"}')
    expect(toJson(Comp)).toMatchInlineSnapshot(`
      <Original
        camelCase={false}
        snake_case={1}
      >
        <Original
          camelCase={false}
          snakeCase={1}
        >
          <div
            data-testid="content"
          >
            <div
              data-testid="props"
            >
              {"camelCase":false,"snakeCase":1}
            </div>
            <div
              data-testid="state"
            >
              {"someState":true}
            </div>
            <div
              data-testid="context"
            >
              {"contextProp":"context value"}
            </div>
          </div>
        </Original>
      </Original>
    `)
  })

  it('should setState with enzyme', () => {
    const Component = classWithSnakeCaseProps(Original)

    const Comp = mount(<Component />, { attachTo: attachToBody() })
    Comp.find(Original).setState({
      someState: false,
    })

    expect(Comp.find(Original).state().someState).toBe(false)
    expect(Comp.find(Original).find('[data-testid="state"]').text()).toBe(
      '{"someState":false}'
    )

    Comp.unmount()
  })

  it('should setProps with enzyme', () => {
    const Component = classWithSnakeCaseProps(Original)

    const Comp = mount(<Component />, { attachTo: attachToBody() })
    Comp.setProps({
      new_prop: 'hello',
    })

    expect(Comp.find(Original).find('[data-testid="props"]').text()).toBe(
      '{"newProp":"hello"}'
    )

    Comp.unmount()
  })

  it('should not update prop object when props are unchanged', () => {
    const Component = classWithSnakeCaseProps(Original)

    const onUpdate = jest.fn()

    const { rerender } = render(
      <Component camelCase={false} snake_case={1} updateComp={onUpdate} />
    )

    rerender(
      <Component camelCase={false} snake_case={1} updateComp={onUpdate} />
    )
    expect(onUpdate).toHaveBeenCalledTimes(0)

    rerender(
      <Component camelCase={true} snake_case={1} updateComp={onUpdate} />
    )
    expect(onUpdate).toHaveBeenCalledTimes(2)
  })
})
