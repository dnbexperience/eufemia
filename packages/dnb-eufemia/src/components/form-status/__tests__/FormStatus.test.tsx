/**
 * FormStatus Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import FormStatus, { FormStatusProps } from '../FormStatus'
import Input from '../../input/Input'
import { render } from '@testing-library/react'
import {
  initializeTestSetup,
  nextAnimationFrame,
  runAnimation,
  simulateAnimationEnd,
} from '../../height-animation/__tests__/HeightAnimationUtils'

const props: FormStatusProps = {
  text: 'text',
}

// To be able to test the height animation / cached content
initializeTestSetup()

describe('FormStatus component', () => {
  it('should set correct max-width', () => {
    render(
      <Input
        style={{ width: '10rem' }}
        status="Long status pulvinar per ad varius nostra faucibus enim ante posuere in"
      />
    )

    expect(
      document.querySelector('.dnb-input__input').getAttribute('style')
    ).toBe('width: 10rem;')
    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toContain('max-width: 30rem;')
  })

  it('should re-calculate max-width', () => {
    const { rerender } = render(
      <Input style={{ width: '10rem' }} status="status message" />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 30rem;')

    rerender(
      <Input
        status="status message"
        status_props={{ text: 'change width to 35rem' }}
        style={{ width: '35rem' }}
      />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 35rem;')

    rerender(
      <Input
        status="status message"
        status_props={{ text: 'change width to 40rem' }}
        style={{ width: '40rem' }}
      />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 40rem;')

    rerender(
      <Input
        status="status message"
        status_props={{ text: 'change width to 10rem' }}
        style={{ width: '10rem' }}
      />
    )

    window.dispatchEvent(new Event('resize'))

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('--duration: 600ms; max-width: 30rem;')
  })

  it('should set correct id', () => {
    render(<Input id="custom-id" status="status text" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('id')
    ).toBe('custom-id-form-status')
    expect(
      document.querySelector('.dnb-form-status__text').getAttribute('id')
    ).toBe('custom-id-status')
  })

  it('should be modifiable with status_prop', () => {
    render(
      <Input
        status="status message"
        status_props={{
          variant: 'outlined',
        }}
      />
    )
    expect(document.querySelector('.dnb-form-status').classList).toContain(
      'dnb-form-status__variant--outlined'
    )
  })

  it('should update children when they change', () => {
    const { rerender } = render(<FormStatus>content</FormStatus>)

    rerender(<FormStatus>content-a</FormStatus>)

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'content-a'
    )

    rerender(<FormStatus>content-b</FormStatus>)

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'content-b'
    )
  })

  it('should have correct attributes once the "hidden" prop changes', async () => {
    const { rerender } = render(<FormStatus {...props} hidden />)
    expect(
      document.querySelector('.dnb-form-status[hidden]')
    ).toBeInTheDocument()

    rerender(<FormStatus {...props} hidden={false} />)

    expect(
      document.querySelector('.dnb-form-status[hidden]')
    ).not.toBeInTheDocument()
  })

  it('has to to have a text value as defined in the prop', () => {
    render(<FormStatus {...props} />)

    expect(
      document.querySelector('.dnb-form-status__text').textContent
    ).toBe(props.text)
  })

  it('should support spacing props', () => {
    render(<FormStatus top="2rem">test</FormStatus>)

    const element = document.querySelector('.dnb-form-status')

    expect(Array.from(element.classList)).toEqual([
      'dnb-space',
      'dnb-height-animation',
      'dnb-form-status',
      'dnb-form-status__size--default',
      'dnb-space__top--large',
      'dnb-form-status--error',
      'dnb-form-status--has-content',
      'dnb-height-animation--is-visible',
      'dnb-height-animation--is-in-dom',
    ])
  })

  it('should support "shellSpace" spacing props', () => {
    const { rerender } = render(
      <FormStatus shellSpace={{ top: '2rem' }}>test</FormStatus>
    )

    const element = document.querySelector('.dnb-form-status__shell')

    expect(element).toHaveClass(
      'dnb-form-status__shell dnb-space__top--large'
    )

    rerender(<FormStatus shellSpace="2rem">test</FormStatus>)

    expect(element).toHaveClass(
      'dnb-form-status__shell dnb-space__top--large dnb-space__bottom--large dnb-space__right--large dnb-space__left--large'
    )
  })

  it('cache content and update it', () => {
    const { rerender } = render(
      <FormStatus {...props} no_animation={false} />
    )

    const element = document.querySelector('.dnb-form-status__text')

    expect(element).toHaveTextContent(String(props.text))

    rerender(
      <FormStatus {...props} no_animation={false} text="new text" />
    )

    expect(element).toHaveTextContent('new text')

    rerender(<FormStatus {...props} no_animation={false} text="" />)

    expect(element).toHaveTextContent('new text')

    runAnimation()

    expect(element).not.toBeInTheDocument()
  })

  it('cache state and update it', () => {
    const { rerender } = render(
      <FormStatus {...props} no_animation={false} state="info" />
    )

    const element = document.querySelector('.dnb-form-status')

    expect(element).toHaveClass('dnb-form-status--info')

    rerender(<FormStatus {...props} no_animation={false} state="error" />)

    expect(element).toHaveClass('dnb-form-status--error')

    rerender(
      <FormStatus {...props} no_animation={false} text="" state="" />
    )

    expect(element).toHaveClass('dnb-form-status--error')

    nextAnimationFrame()

    expect(element).toHaveClass('dnb-form-status--error')

    nextAnimationFrame()

    expect(element).toHaveClass('dnb-form-status--error')

    simulateAnimationEnd()

    expect(element).not.toBeInTheDocument()
  })
})

describe('FormStatus scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it('have to match default theme snapshot', () => {
    const css = loadScss(
      require.resolve('../style/themes/dnb-form-status-theme-ui.scss')
    )
    expect(css).toMatchSnapshot()
  })
})

describe('FormStatus role', () => {
  it('should have role alert', () => {
    render(<FormStatus text="status text" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).toBe('alert')
  })

  it('should have role status when state is info', () => {
    render(<FormStatus text="status text" state="info" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).toBe('status')
  })

  it('should be able to override role', () => {
    render(<FormStatus role="none" text="status text" />)

    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).not.toBe('alert')
    expect(
      document.querySelector('.dnb-form-status').getAttribute('role')
    ).toBe('none')
  })

  it('should validate with ARIA rules', async () => {
    const Comp = render(<FormStatus {...props} />)
    expect(await axeComponent(Comp)).toHaveNoViolations()
  })
})
