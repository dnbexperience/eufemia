import React from 'react'
import { render } from '@testing-library/react'
import useFormField from '../useFormField'

function TestComponent(props: Parameters<typeof useFormField>[0]) {
  const { labelElement, statusElement, showStatus } = useFormField(props)
  return (
    <div>
      <div data-testid="label-container">{labelElement}</div>
      <div data-testid="status-container">{statusElement}</div>
      <span data-testid="show-status">{String(showStatus)}</span>
    </div>
  )
}

describe('useFormField', () => {
  it('should render FormLabel when label is provided', () => {
    const { container } = render(
      <TestComponent id="test" label="My Label" />
    )

    const label = container.querySelector('.dnb-form-label')
    expect(label).toBeTruthy()
    expect(label.getAttribute('id')).toBe('test-label')
    expect(label.getAttribute('for')).toBe('test')
    expect(label.textContent).toBe('My Label')
  })

  it('should not render FormLabel when label is not provided', () => {
    const { container } = render(<TestComponent id="test" />)

    const label = container.querySelector('.dnb-form-label')
    expect(label).toBeNull()
  })

  it('should render FormStatus with correct id', () => {
    const { container } = render(
      <TestComponent id="test" status="Error message" />
    )

    const status = container.querySelector('.dnb-form-status')
    expect(status).toBeTruthy()
    expect(status.getAttribute('id')).toBe('test-form-status')
  })

  it('should return showStatus as true when status is provided', () => {
    const { container } = render(
      <TestComponent id="test" status="Error" />
    )

    expect(
      container.querySelector('[data-testid="show-status"]').textContent
    ).toBe('true')
  })

  it('should return showStatus as falsy when no status', () => {
    const { container } = render(<TestComponent id="test" />)

    expect(
      container.querySelector('[data-testid="show-status"]').textContent
    ).not.toBe('true')
  })

  it('should pass forId override to FormLabel', () => {
    const { container } = render(
      <TestComponent id="test" label="Label" forId="custom-target" />
    )

    const label = container.querySelector('.dnb-form-label')
    expect(label.getAttribute('for')).toBe('custom-target')
  })

  it('should pass labelDirection to FormLabel', () => {
    const { container } = render(
      <TestComponent
        id="test"
        label="Label"
        labelDirection="vertical"
      />
    )

    const label = container.querySelector('.dnb-form-label')
    expect(label.classList.contains('dnb-form-label--vertical')).toBe(
      true
    )
  })

  it('should pass srOnly to FormLabel', () => {
    const { container } = render(
      <TestComponent id="test" label="Label" labelSrOnly />
    )

    const label = container.querySelector('.dnb-form-label')
    expect(label.classList.contains('dnb-sr-only')).toBe(true)
  })

  it('should pass statusState to FormStatus', () => {
    const { container } = render(
      <TestComponent
        id="test"
        status="Info message"
        statusState="info"
      />
    )

    const status = container.querySelector('.dnb-form-status')
    expect(
      status.classList.contains('dnb-form-status--info')
    ).toBeTruthy()
  })
})
