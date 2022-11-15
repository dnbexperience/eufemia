/**
 * Element Test
 *
 */

import React from 'react'
import { fakeProps, axeComponent } from '../../core/jest/jestSetup'
import { act, render } from '@testing-library/react'
import Anchor from '../Anchor'

const props = fakeProps(require.resolve('../Anchor'), {
  all: true,
})
props.inner_ref = null
props.element = 'a'
props.lang = 'nb-NO'

describe('Anchor element', () => {
  it('has dnb-a class', () => {
    render(<Anchor>text</Anchor>)
    expect(document.querySelector('.dnb-a')).toBeTruthy()
  })

  it('has href', () => {
    render(<Anchor href="/url">text</Anchor>)
    expect(document.querySelector('[href]')).toBeTruthy()
  })

  it('has no-icon class when element was given', () => {
    render(
      <Anchor href="/url" target="_blank">
        <span>text</span>
      </Anchor>
    )
    expect(document.querySelector('.dnb-anchor--no-icon')).toBeTruthy()
  })

  it('should forward ref', () => {
    const ref = React.createRef<HTMLAnchorElement>()

    render(
      <Anchor ref={ref} to="/url">
        text
      </Anchor>
    )

    act(() => {
      const element = document.querySelector('.dnb-anchor')
      expect(ref.current).toBe(element)
    })
  })

  it('has aria-describedby when target is blank', () => {
    const { rerender } = render(
      <Anchor href="/url" target="_blank" lang="en-GB">
        text
      </Anchor>
    )

    const id = (
      document.querySelector('a') as HTMLAnchorElement
    ).getAttribute('aria-describedby')
    expect(
      (document.body.querySelector('#' + id) as HTMLAnchorElement)
        .textContent
    ).toBe('Opens a new Window')

    const title = 'External site'

    rerender(
      <Anchor href="/url" target="_blank" lang="en-GB" title={title}>
        text
      </Anchor>
    )

    expect(
      (document.querySelector('a') as HTMLAnchorElement).getAttribute(
        'title'
      )
    ).toBe(title)
    expect(document.body.querySelector('#' + id)).toBe(null)
  })

  it('should validate with ARIA rules as a Anchor element', async () => {
    const Component = render(<Anchor {...props} />)
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
