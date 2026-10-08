import { createRef } from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CopyOnClick from '../CopyOnClick'
import CopyOnClickButton from '../CopyOnClickButton'
import Provider from '../../../shared/Provider'
import {
  axeComponent,
  mockClipboard,
} from '../../../core/test-utils/testSetup'

describe('CopyOnClick.Button', () => {
  beforeAll(() => {
    mockClipboard()
  })

  beforeEach(async () => {
    await navigator.clipboard.writeText('initial')
  })

  it('should be available as CopyOnClick.Button', () => {
    expect(CopyOnClick.Button).toBe(CopyOnClickButton)
  })

  it('should render an icon-only tertiary button with a default title', () => {
    render(<CopyOnClick.Button copyContent="70321369861" />)

    const button = document.querySelector('button')
    expect(button).toHaveClass(
      'dnb-button',
      'dnb-button--tertiary',
      'dnb-button--icon-only',
      'dnb-copy-on-click__button'
    )
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('title', 'Kopier')
    expect(button).toHaveAttribute('aria-label', 'Kopier')
    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'copy icon'
    )
  })

  it('should copy copyContent and show the tooltip on click', async () => {
    render(<CopyOnClick.Button copyContent="70321369861" />)

    await userEvent.click(document.querySelector('button'))

    expect(await navigator.clipboard.readText()).toBe('70321369861')
    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip__content')
      ).toHaveTextContent('Kopiert')
    })
  })

  it('should copy with the keyboard and announce the tooltip content', async () => {
    render(<CopyOnClick.Button copyContent="70321369861" />)

    const button = document.querySelector('button')

    await userEvent.tab()
    expect(document.activeElement).toBe(button)

    await userEvent.keyboard('{Enter}')

    expect(await navigator.clipboard.readText()).toBe('70321369861')
    await waitFor(() => {
      expect(document.querySelector('.dnb-aria-live')).toHaveTextContent(
        'Kopiert'
      )
    })
    expect(document.activeElement).toBe(button)
  })

  it('should support a custom title and tooltipContent', async () => {
    render(
      <CopyOnClick.Button
        copyContent="70321369861"
        title="Kopier kontonummer"
        tooltipContent="Kontonummer kopiert"
      />
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Kopier kontonummer')

    await userEvent.click(button)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip__content')
      ).toHaveTextContent('Kontonummer kopiert')
    })
  })

  it('should not set a default title when the button has text', () => {
    render(
      <CopyOnClick.Button
        copyContent="https://eufemia.dnb.no"
        text="Copy link"
      />
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('Copy link')
    expect(button).not.toHaveAttribute('title')
    expect(button).not.toHaveAttribute('aria-label')
  })

  it('should use the translations of the given locale', async () => {
    render(
      <Provider locale="en-GB">
        <CopyOnClick.Button copyContent="70321369861" />
      </Provider>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Copy')

    await userEvent.click(button)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-tooltip__content')
      ).toHaveTextContent('Copied')
    })
  })

  it('should call a given onClick and still copy', async () => {
    const onClick = vi.fn()
    render(
      <CopyOnClick.Button copyContent="70321369861" onClick={onClick} />
    )

    await userEvent.click(document.querySelector('button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(await navigator.clipboard.readText()).toBe('70321369861')
  })

  it('should not copy when disabled', async () => {
    render(<CopyOnClick.Button copyContent="70321369861" disabled />)

    await userEvent.click(document.querySelector('button'))

    expect(await navigator.clipboard.readText()).toBe('initial')
  })

  it('should not show the tooltip when copying fails', async () => {
    const originalWrite = navigator.clipboard.writeText
    const originalExecCommand = document.execCommand
    const writeText = vi
      .fn()
      .mockRejectedValue(new Error('Permission denied'))
    navigator.clipboard.writeText = writeText
    document.execCommand = vi.fn(() => false)

    try {
      render(<CopyOnClick.Button copyContent="70321369861" />)

      await userEvent.click(document.querySelector('button'))

      await waitFor(() => {
        expect(document.execCommand).toHaveBeenCalledWith('copy')
      })
      await new Promise((resolve) => setTimeout(resolve, 10))
      expect(
        document.querySelector('.dnb-tooltip')
      ).not.toBeInTheDocument()
    } finally {
      navigator.clipboard.writeText = originalWrite
      document.execCommand = originalExecCommand
    }
  })

  it('should forward Button props and the ref', () => {
    const ref = createRef<HTMLElement>()
    render(
      <CopyOnClick.Button
        copyContent="70321369861"
        variant="secondary"
        size="small"
        top="large"
        className="custom-class"
        ref={ref}
      />
    )

    const button = document.querySelector('button')
    expect(ref.current).toBe(button)
    expect(button).toHaveClass(
      'dnb-button--secondary',
      'dnb-button--size-small',
      'dnb-space__top--large',
      'dnb-copy-on-click__button',
      'custom-class'
    )
  })
})

describe('CopyOnClick.Button aria', () => {
  it('should validate', async () => {
    const Component = render(
      <CopyOnClick.Button copyContent="70321369861" />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
