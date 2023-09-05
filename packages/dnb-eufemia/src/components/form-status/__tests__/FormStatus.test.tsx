/**
 * FormStatus Test
 *
 */

import React from 'react'
import { axeComponent, loadScss } from '../../../core/jest/jestSetup'
import FormStatus, { FormStatusProps } from '../FormStatus'
import Input from '../../input/Input'
import { render } from '@testing-library/react'

const props: FormStatusProps = {
  text: 'text',
}

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
    ).toBe('max-width: 30rem;')

    rerender(
      <Input
        status="status message"
        status_props={{ text: 'change width to 35rem' }}
        style={{ width: '35rem' }}
      />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('max-width: 35rem; height: auto;')

    rerender(
      <Input
        status="status message"
        status_props={{ text: 'change width to 40rem' }}
        style={{ width: '40rem' }}
      />
    )

    expect(
      document.querySelector('.dnb-form-status').getAttribute('style')
    ).toBe('max-width: 40rem; height: auto;')

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
    ).toBe('max-width: 30rem; height: auto;')
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

    expect(document.querySelector('.dnb-form-status').textContent).toBe(
      'content-a'
    )

    rerender(<FormStatus>content-b</FormStatus>)

    expect(document.querySelector('.dnb-form-status').textContent).toBe(
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
      'dnb-form-status',
      'dnb-form-status--error',
      'dnb-form-status__size--default',
      'dnb-space__top--large',
      'dnb-form-status--has-content',
    ])
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
