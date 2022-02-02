/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  withCamelCaseProps,
  IncludeCamelCase,
  classWithCamelCaseProps,
} from '../withCamelCaseProps'
import { mount, attachToBody } from '../../../core/jest/jestSetup'

type OriginalProps = {
  snake_case?: boolean
  camel_case?: number
  is_class?: boolean
  optional?: string
}

type OriginalState = {
  someState: boolean
}

// class Original extends React.PureComponent<OriginalProps> {
class Original extends React.PureComponent<
  IncludeCamelCase<OriginalProps>,
  OriginalState
> {
  state = {
    someState: true,
  }
  static property = 'thing'
  render() {
    return (
      <div data-testid="content">
        <div data-testid="props">{JSON.stringify({ ...this.props })}</div>
        <div data-testid="state">{JSON.stringify({ ...this.state })}</div>
      </div>
    )
  }
}

const Component = withCamelCaseProps(Original)
const ClassComponent = classWithCamelCaseProps(Original)

describe('withCamelCaseProps', () => {
  it('will render', () => {
    const { rerender, unmount } = render(
      <Component snake_case={false} camelCase={1} />
    )
    rerender(<Component snake_case={false} camelCase={2} />)

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"snake_case":false,"camel_case":2}'
    )
    unmount()
  })

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
})

describe('classWithCamelCaseProps', () => {
  it('will render', () => {
    const { rerender } = render(
      <ClassComponent snake_case={false} camelCase={1} is_class={true} />
    )

    rerender(<ClassComponent snake_case={false} camelCase={2} />)

    expect(screen.queryByTestId('props').textContent).toMatch(
      '{"snake_case":false,"camel_case":2}'
    )
  })

  it('will still expose a static property', () => {
    expect(Original.property).toBe('thing')

    expect(ClassComponent.property).toBe(Original.property)
    expect(ClassComponent.property).toBe('thing')

    // @ts-ignore
    expect(Original.propertyInvalid).toBeFalsy()

    // @ts-ignore
    expect(ClassComponent.propertyInvalid).toBeFalsy()
  })

  it('should have original name', () => {
    expect(ClassComponent.name).toBe('Original')
  })

  it('should set state with enzyme', () => {
    const Comp = mount(<ClassComponent />, { attachTo: attachToBody() })
    Comp.find(Original).setState({
      someState: false,
    })

    expect(Comp.find(Original).state().someState).toBe(false)
    expect(Comp.find(Original).find('[data-testid="state"]').text()).toBe(
      '{"someState":false}'
    )

    Comp.unmount()
  })
})
