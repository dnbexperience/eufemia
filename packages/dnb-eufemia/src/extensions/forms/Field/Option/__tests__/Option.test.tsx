import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import { Props } from '..'
import { Field } from '../../..'

describe('Field.Option', () => {
  const props: Props = {}

  it('should render with props', () => {
    const { container } = render(<Field.Option {...props} />)
    expect(container).toBeEmptyDOMElement()
  })

  describe('ARIA', () => {
    it('should validate with ARIA rules', async () => {
      const result = render(
        <Field.Selection>
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
      )

      expect(await axeComponent(result)).toHaveNoViolations()
    })
  })
})
