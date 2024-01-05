import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Option, { Props } from '..'
import Selection from '../../Selection'

describe('Field.Option', () => {
  const props: Props = {}

  it('should render with props', () => {
    render(<Option {...props} />)
  })

  it('should validate with ARIA rules', async () => {
    const element = render(
      <Selection>
        <Option value="foo" title="Foo!" />
        <Option value="bar" title="Baar!" />
      </Selection>
    )

    expect(await axeComponent(element)).toHaveNoViolations()
  })
})
