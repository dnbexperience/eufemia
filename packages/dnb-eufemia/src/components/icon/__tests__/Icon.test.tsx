/**
 * Component Test
 *
 */

import React from 'react'
import {
  mount,
  fakeProps,
  toJson,
  axeComponent,
  loadScss,
} from '../../../core/jest/jestSetup'
import { render } from '@testing-library/react'
import Component from '../Icon'
import { question } from './test-files'

const props = fakeProps(require.resolve('../Icon'), {
  optional: true,
})
props.icon = question
props.alt = 'question mark'
props.border = false
props['aria-hidden'] = null

describe('Icon component', () => {
  it('have to match snapshot', () => {
    const Comp = mount(<Component {...props} />)
    expect(toJson(Comp)).toMatchSnapshot()
  })

  it('has valid width and height prop', () => {
    const width = '200'
    const height = '100'
    render(<Component {...props} width={width} height={height} />)
    const elem = document.querySelector('svg')
    expect(elem).toBeTruthy()
    expect(elem.getAttribute('width')).toBe(width)
    expect(elem.getAttribute('height')).toBe(height)
  })

  it('should work with medium size', () => {
    const { rerender } = render(<Component {...props} size="24" />)
    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--medium')
    ).toBe(true)
    rerender(<Component {...props} size={16} />)
    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--default')
    ).toBe(true)
  })

  it('should return null if icon was given as null', () => {
    expect(mount(<Component icon={null} />)).toMatchInlineSnapshot(
      'ReactWrapper {}'
    )
    expect(mount(<Component icon={undefined} />)).toMatchInlineSnapshot(
      'ReactWrapper {}'
    )
    expect(mount(<Component icon={false} />)).toMatchInlineSnapshot(
      'ReactWrapper {}'
    )
    expect(mount(<Component icon={''} />)).toMatchInlineSnapshot(
      'ReactWrapper {}'
    )
  })

  it('should have border class', () => {
    render(<Component {...props} border={true} />)
    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--border')
    ).toBe(true)
  })

  it('should inherit color and vice versa when inherit_color is false', () => {
    const { rerender } = render(<Component icon={question} />)
    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--inherit-color')
    ).toBe(true)

    rerender(<Component icon={question} inherit_color={true} />)

    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--inherit-color')
    ).toBe(true)

    rerender(<Component icon={question} inherit_color={false} />)

    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--inherit-color')
    ).toBe(false)
  })

  it('should not be hidden, given aria-hidden={false}', () => {
    render(<Component {...props} aria-hidden={false} />)
    expect(
      document.querySelector('span.dnb-icon').getAttribute('aria-hidden')
    ).toBe('false')
  })

  it('should work with custom size', () => {
    const { rerender } = render(<Component {...props} size="100" />)
    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--custom-size')
    ).toBe(true)
    rerender(<Component {...props} size={16} />)
    expect(
      document
        .querySelector('span.dnb-icon')
        .classList.contains('dnb-icon--custom-size')
    ).toBe(false)
  })

  it('should set data-testid property based on the aria-label', () => {
    render(<Component icon={question} aria-label="question icon" />)
    expect(
      document.querySelector('span.dnb-icon').getAttribute('data-testid')
    ).toBe('question icon')
  })

  it('should set data-testid when provided', () => {
    render(
      <Component
        icon={question}
        aria-label="question icon"
        data-testid="custom-data-testid-value"
      />
    )
    expect(
      document.querySelector('span.dnb-icon').getAttribute('data-testid')
    ).toBe('custom-data-testid-value')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = mount(<Component {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})

describe('Icon scss', () => {
  const scss = loadScss(require.resolve('../style/deps.scss'))
  it('have to match snapshot', () => {
    expect(scss).toMatchSnapshot()
  })
})
