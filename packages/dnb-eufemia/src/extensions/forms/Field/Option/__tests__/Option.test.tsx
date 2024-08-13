import React from 'react'
import { axeComponent } from '../../../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import { makeOptions, Props } from '..'
import { Field } from '../../..'

describe('Field.Option', () => {
  const props: Props = {}

  it('should render with props', () => {
    render(<Field.Option {...props} />)
    const option = document.querySelector('[role="option"]')
    expect(option).toBeInTheDocument()
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

describe('makeOptions', () => {
  it('should render with props', () => {
    const result = makeOptions([
      <Field.Option key="a" value="foo" title="Foo!" />,
      <Field.Option key="b" value="bar" title="Baar!" />,
    ])

    expect(result).toEqual([
      { selectedKey: 'foo', content: 'Foo!' },
      { selectedKey: 'bar', content: 'Baar!' },
    ])
  })

  it('should render "Untitled" when no title is given', () => {
    const result = makeOptions(<Field.Option />)

    expect(result).toEqual([
      { content: <em>Untitled</em>, selectedKey: '' },
    ])
  })

  it('title can be given by children', () => {
    const result = makeOptions(
      <Field.Option value="foo">Foo</Field.Option>
    )

    expect(result).toEqual([{ content: 'Foo', selectedKey: 'foo' }])
  })

  it('should support extra text in title', () => {
    const result = makeOptions(
      <Field.Option value="foo" text="Text">
        Foo
      </Field.Option>
    )

    expect(result).toEqual([
      { content: ['Foo', 'Text'], selectedKey: 'foo' },
    ])
  })
})
