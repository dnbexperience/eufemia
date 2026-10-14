import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
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

  it('does not confirm when copying fails', async () => {
    // copyToClipboard returns an error or a message when it fails
    mockCopyToClipboard.mockResolvedValueOnce(
      new Error('Permission denied')
    )

    await submitPrompt()

    await new Promise((resolve) => setTimeout(resolve, 10))
    expect(
      document.querySelector('button[type="submit"]').textContent
    ).toContain('Copy prompt')
  })
})
