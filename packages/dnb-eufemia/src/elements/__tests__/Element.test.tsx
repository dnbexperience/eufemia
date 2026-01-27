/**
 * Element Test
 *
 */

import React from 'react'
import { axeComponent } from '../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Element, { defaultProps, ElementAllProps } from '../Element'
import { Provider } from '../../shared'

const myPElement = (props) => <p {...props} />

const props: ElementAllProps = {
  as: 'p',
  skeletonMethod: 'font',
  skeleton: true,
}

describe('Element', () => {
  it('should merge className', () => {
    const { container } = render(
      <Element {...props} className="extra">
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'extra dnb-skeleton dnb-skeleton--font dnb-p'
    )
  })

  it('should support spacing props', () => {
    render(
      <Element as="p" top="medium">
        text
      </Element>
    )

    const element = document.querySelector('.dnb-p')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space__top--medium',
      'dnb-p',
    ])

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual(['class'])
  })

  it('should render children', () => {
    render(
      <Element as="p" top="medium">
        text
      </Element>
    )

    const element = document.querySelector('.dnb-p')

    expect(element.textContent).toBe('text')
  })

  it('should support skeleton', () => {
    const { container, rerender } = render(
      <Element as="p" skeleton>
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'dnb-skeleton dnb-skeleton--font dnb-p'
    )

    rerender(
      <Element as="p" skeleton skeletonMethod="shape">
        text
      </Element>
    )

    expect(container.querySelector('p').getAttribute('class')).toBe(
      'dnb-skeleton dnb-skeleton--shape dnb-p'
    )
  })

  it('have inherit skeleton prop from shared Provider', () => {
    const { container } = render(
      <Provider skeleton>
        <Element as="p" className="my-p">
          text
        </Element>
      </Provider>
    )

    const element = container.querySelector('.my-p')

    expect(element.getAttribute('class')).toBe(
      'my-p dnb-skeleton dnb-skeleton--font dnb-p'
    )

    const attributes = Array.from(element.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'disabled', // because it's a skeleton
      'aria-disabled', // because it's a skeleton
      'aria-label', // because it's a skeleton
    ])
  })

  it('should not have inner_ref null inside default props', () => {
    expect(defaultProps['inner_ref']).toBe(undefined)
  })

  it('should validate with ARIA rules as a Element element', async () => {
    const Component = render(<Element {...props}>text</Element>)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })

  it('should add tag class by default', () => {
    render(
      <>
        <Element id="s" as="span">
          text
        </Element>
        <Element id="p" as="p" internalClass={''}>
          text
        </Element>
        <Element id="h" as="h1" internalClass="">
          text
        </Element>
        <Element id="d" as="div" internalClass={null}>
          text
        </Element>
        <Element id="a" as="a" internalClass={true}>
          text
        </Element>
      </>
    )

    const elementSpan = document.querySelector('#s')
    const elementP = document.querySelector('#p')
    const elementHeading = document.querySelector('#h')
    const elementDiv = document.querySelector('#d')
    const elementA = document.querySelector('#a')

    expect(Array.from(elementSpan.classList)).toEqual(['dnb-span'])
    expect(Array.from(elementP.classList)).toEqual(['dnb-p'])
    expect(Array.from(elementHeading.classList)).toEqual(['dnb-h1'])
    expect(Array.from(elementDiv.classList)).toEqual(['dnb-div'])
    expect(Array.from(elementA.classList)).toEqual(['dnb-a'])
  })

  it('should replace tag class with prop internalClass', () => {
    render(
      <Element as="span" internalClass="replacement-class">
        text
      </Element>
    )

    const element = document.querySelector('span')

    expect(Array.from(element.classList)).toEqual(['replacement-class'])
  })

  it('should not add tag class when internalClass is false', () => {
    render(
      <Element as="span" internalClass={false}>
        text
      </Element>
    )

    const element = document.querySelector('span')

    expect(Array.from(element.classList)).toEqual([])
  })

  it('should accept react element', () => {
    render(
      <Element id="el" as={myPElement}>
        text
      </Element>
    )
    const element = document.querySelector('#el')
    expect(element.tagName).toBe('P')
    expect(element.getAttribute('class')).toBe('')
    expect(element.textContent).toBe('text')
  })

  it('react element should accept internalClass', () => {
    render(
      <Element id="el" as={myPElement} internalClass="my-class">
        text
      </Element>
    )
    const element = document.querySelector('#el')
    expect(element.getAttribute('class')).toBe('my-class')
  })
})
