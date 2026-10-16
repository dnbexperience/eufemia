import { cleanup, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SuggestEdit from '../../docs/contribute/suggest-edit/SuggestEdit'

const mockCopyToClipboard = vi.hoisted(() => vi.fn())

vi.mock('@dnb/eufemia/src/shared/helpers', async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import('@dnb/eufemia/src/shared/helpers')
    >()
  return {
    ...actual,
    copyToClipboard: mockCopyToClipboard,
  }
})

afterEach(cleanup)

async function submitPrompt() {
  render(<SuggestEdit />)

  await userEvent.type(
    document.querySelector('textarea'),
    'Clarify the click event.'
  )
  await userEvent.click(document.querySelector('button[type="submit"]'))

  await waitFor(() => {
    expect(mockCopyToClipboard).toHaveBeenCalledTimes(1)
  })
}

describe('SuggestEdit', () => {
  beforeEach(() => {
    mockCopyToClipboard.mockReset()
  })

  it('confirms that the prompt was copied', async () => {
    mockCopyToClipboard.mockResolvedValueOnce(true)

    await submitPrompt()

    await waitFor(() => {
      expect(
        document.querySelector('button[type="submit"]').textContent
      ).toContain('Prompt copied')
    })
  })

  it('shows a copy icon, and a check icon once the prompt is copied', async () => {
    mockCopyToClipboard.mockResolvedValueOnce(true)

    render(<SuggestEdit />)

    const button = document.querySelector('button[type="submit"]')
    expect(
      button.querySelector('.dnb-icon').getAttribute('data-testid')
    ).toBe('copy icon')

    await userEvent.type(
      document.querySelector('textarea'),
      'Clarify the click event.'
    )
    await userEvent.click(button)

    await waitFor(() => {
      expect(
        button.querySelector('.dnb-icon').getAttribute('data-testid')
      ).toBe('check icon')
    })
  })

  it('explains that copying failed', async () => {
    // copyToClipboard returns an error or a message when it fails
    mockCopyToClipboard.mockResolvedValueOnce(
      new Error('Permission denied')
    )

    await submitPrompt()

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error').textContent
      ).toBe(
        'Could not copy the prompt. Open "Preview prompt" and copy it from there.'
      )
    })
    expect(
      document.querySelector('button[type="submit"]').textContent
    ).toContain('Copy prompt')
  })

  it('shows the error again when copying fails again', async () => {
    mockCopyToClipboard.mockResolvedValue(new Error('Permission denied'))

    await submitPrompt()

    let firstError: Element
    await waitFor(() => {
      firstError = document.querySelector('.dnb-form-status--error')
      expect(firstError).toBeTruthy()
    })

    await userEvent.click(document.querySelector('button[type="submit"]'))

    await waitFor(() => {
      expect(mockCopyToClipboard).toHaveBeenCalledTimes(2)
    })
    await waitFor(() => {
      const secondError = document.querySelector('.dnb-form-status--error')
      expect(secondError).toBeTruthy()
      expect(secondError).not.toBe(firstError)
    })
  })

  it('removes the error when the form changes', async () => {
    mockCopyToClipboard.mockResolvedValueOnce(
      new Error('Permission denied')
    )

    await submitPrompt()

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status--error')
      ).toBeTruthy()
    })

    await userEvent.type(document.querySelector('textarea'), ' Again.')

    expect(document.querySelector('.dnb-form-status--error')).toBe(null)
  })
})
