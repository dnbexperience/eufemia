/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  withCamelCaseProps,
  classWithCamelCaseProps,
  IncludeCamelCase,
} from '../withCamelCaseProps'
import { mount, attachToBody, toJson } from '../../../core/jest/jestSetup'

type OriginalProps = {
  snake_case?: boolean
  camel_case?: number
  is_class?: boolean
  optional?: string
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

    rerender(<Component snake_case={false} camelCase={2} />)

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"snake_case":false,"camel_case":2}'
    )
    expect(asFragment()).toMatchInlineSnapshot(`
        <DocumentFragment>
          <div
            data-testid="content"
          >
            <div
              data-testid="props"
            >
              {"snake_case":false,"camel_case":2}
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
    const Comp = mount(<Component snake_case={false} camelCase={1} />)

    expect(toJson(Comp)).toMatchInlineSnapshot(`
        <Original
          camelCase={1}
          snake_case={false}
        >
          <Original
            camel_case={1}
            snake_case={false}
          >
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
        <Component snake_case={false} camelCase={1} />
      </Context.Provider>
    )

    expect(
      Comp.find(Original).find('[data-testid="context"]').text()
    ).toBe('{"contextProp":"context value"}')
    expect(toJson(Comp)).toMatchInlineSnapshot(`
        <Original
          camelCase={1}
          snake_case={false}
        >
          <Original
            camel_case={1}
            snake_case={false}
          >
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
          </Original>
        </Original>
      `)
  })
})

describe('classWithCamelCaseProps', () => {
  type OriginalState = {
    someState: boolean
  }

  class Original extends React.PureComponent<
    IncludeCamelCase<OriginalProps>,
    OriginalState
  > {
    static contextType = Context
    state = {
      someState: true,
    }
    static property = 'thing'

    componentDidUpdate(prevProps: IncludeCamelCase<OriginalProps>) {
      if (
        prevProps !== this.props &&
        this.props.update_comp !== undefined
      ) {
        this.props.update_comp()
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

  const Component = classWithCamelCaseProps(Original)

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

    rerender(<Component snake_case={false} camelCase={2} />)

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"snake_case":false,"camel_case":2}'
    )
    expect(asFragment()).toMatchInlineSnapshot(`
              <DocumentFragment>
                <div
                  data-testid="content"
                >
                  <div
                    data-testid="props"
                  >
                    {"snake_case":false,"camel_case":2}
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

  it('will render with enzyme', () => {
    const Comp = mount(<Component snake_case={false} camelCase={1} />)

    expect(toJson(Comp)).toMatchInlineSnapshot(`
              <Original
                camelCase={1}
                snake_case={false}
              >
                <Original
                  camel_case={1}
                  snake_case={false}
                >
                  <div
                    data-testid="content"
                  >
                    <div
                      data-testid="props"
                    >
                      {"snake_case":false,"camel_case":1}
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
    const Comp = mount(
      <Context.Provider value={{ contextProp: 'context value' }}>
        <Component snake_case={false} camelCase={1} />
      </Context.Provider>
    )

    expect(
      Comp.find(Original).find('[data-testid="context"]').text()
    ).toBe('{"contextProp":"context value"}')
    expect(toJson(Comp)).toMatchInlineSnapshot(`
              <Original
                camelCase={1}
                snake_case={false}
              >
                <Original
                  camel_case={1}
                  snake_case={false}
                >
                  <div
                    data-testid="content"
                  >
                    <div
                      data-testid="props"
                    >
                      {"snake_case":false,"camel_case":1}
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
    const Comp = mount(<Component />, { attachTo: attachToBody() })
    Comp.setProps({
      newProp: 'hello',
    })

    expect(Comp.find(Original).find('[data-testid="props"]').text()).toBe(
      '{"new_prop":"hello"}'
    )

    Comp.unmount()
  })

  it('should not update prop object when props are unchanged', () => {
    const on_update = jest.fn()

    const { rerender } = render(
      <Component
        snake_case={false}
        camelCase={1}
        update_comp={on_update}
      />
    )

    rerender(
      <Component
        snake_case={false}
        camelCase={1}
        update_comp={on_update}
      />
    )
    expect(on_update).toHaveBeenCalledTimes(0)

    rerender(
      <Component snake_case={true} camelCase={1} update_comp={on_update} />
    )
    expect(on_update).toHaveBeenCalledTimes(2)
  })
})
