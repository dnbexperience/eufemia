import React from 'react'
import { render } from '@testing-library/react'
import H, { SharedHProps } from '../H'
import H1 from '../H1'
import H2 from '../H2'
import H3 from '../H3'
import H4 from '../H4'
import H5 from '../H5'
import H6 from '../H6'

describe('Heading', () => {
  it('renders with props as an object', () => {
    const props: SharedHProps = {}

    render(<H {...props} />)
    expect(document.querySelector('h1')).toBeInTheDocument()
  })

  const headings = [
    {
      selector: '.dnb-h--xx-large',
      component: H,
    },
    {
      selector: '.dnb-h--xx-large',
      component: H1,
    },
    {
      selector: '.dnb-h--large',
      component: H2,
    },
    {
      selector: '.dnb-h--medium',
      component: H3,
    },
    {
      selector: '.dnb-h--basis',
      component: H4,
    },
    {
      selector: '.dnb-h--small',
      component: H5,
    },
    {
      selector: '.dnb-h--x-small',
      component: H6,
    },
  ]

  it.each(headings)(
    '%s should support className',
    ({ component: Component, selector }) => {
      render(<Component className="custom-class" />)

      const element = document.querySelector(selector)

      expect(Array.from(element.classList)).toEqual([
        'custom-class',
        selector.replace(/^\./, ''),
      ])
    }
  )

  it.each(headings)(
    '%s should support spacing props',
    ({ component: Component, selector }) => {
      render(<Component top="2rem" />)

      const element = document.querySelector(selector)

      expect(Array.from(element.classList)).toContain(
        'dnb-space__top--large'
      )
    }
  )

  it.each(headings)(
    '%s should use given size prop and keep element name',
    ({ component: Component }) => {
      render(<Component size="large" />)

      const element = document.querySelector('.dnb-h--large')

      expect(Array.from(element.classList)).toEqual(['dnb-h--large'])

      if (Component.name === 'H') {
        expect(element.tagName).toEqual('H1')
      } else {
        expect(element.tagName).toEqual(Component.name)
      }
    }
  )

  it.each(headings)(
    '%s forward custom attributes',
    ({ component: Component, selector }) => {
      render(<Component aria-label="custom-label" />)

      const element = document.querySelector(selector)
      const attributes = Array.from(element.attributes).map(
        (attr) => attr.name
      )

      expect(attributes).toEqual(['class', 'aria-label'])
    }
  )
})
