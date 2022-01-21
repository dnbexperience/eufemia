/* eslint-disable @typescript-eslint/ban-ts-comment */

import { render, screen } from '@testing-library/react'
import React from 'react'
import { withCamelCaseProps, ToCamelCase } from '../withCamelCaseProps'

type OriginalProps = {
  snake_case?: boolean
  camel_case?: number
  optional?: string
}

// class Original extends React.PureComponent<OriginalProps> {
class Original extends React.PureComponent<
  OriginalProps & ToCamelCase<OriginalProps>
> {
  static property = 'thing'
  render() {
    return <div data-testid="content">{JSON.stringify(this.props)}</div>
  }
}

const Component = withCamelCaseProps(Original)

describe('withCamelCaseProps', () => {
  it('will render', () => {
    render(<Component snake_case={false} camelCase={1} />)

    expect(screen.queryByTestId('content').textContent).toMatch(
      '{"snake_case":false,"camel_case":1}'
    )
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
