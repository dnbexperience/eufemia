import { render, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ReplyAnnouncement from '../ReplyAnnouncement'

describe('ReplyAnnouncement example', () => {
  const region = () => document.querySelector('[aria-live="polite"]')

  it('waits for a reply to end and does not repeat it after unrelated updates', async () => {
    const { rerender } = render(
      <ReplyAnnouncement text="History" isBusy={false} />
    )
    expect(region().textContent).toBe('')
    rerender(<ReplyAnnouncement text="First words" isBusy />)
    expect(region().textContent).toBe('')
    rerender(<ReplyAnnouncement text="Full reply" isBusy />)
    expect(region().textContent).toBe('')
    rerender(<ReplyAnnouncement text="Full reply" isBusy={false} />)
    await waitFor(() => expect(region().textContent).toBe('Full reply'))
    rerender(<ReplyAnnouncement text="Restored history" isBusy={false} />)
    expect(region().textContent).not.toContain('Restored history')
  })

  it.each(['Stopped. Partial reply', 'Failed. Partial reply', ''])(
    'lets the application announce %s when busy ends',
    async (text) => {
      const { rerender } = render(
        <ReplyAnnouncement text="Partial" isBusy />
      )
      rerender(<ReplyAnnouncement text={text} isBusy={false} />)
      await waitFor(() => expect(region().textContent).toBe(text))
    }
  )

  it('clears the region before an identical reply in a later turn', async () => {
    const { rerender } = render(
      <ReplyAnnouncement text="Same reply" isBusy />
    )
    rerender(<ReplyAnnouncement text="Same reply" isBusy={false} />)
    await waitFor(() => expect(region().textContent).toBe('Same reply'))
    rerender(<ReplyAnnouncement text="Same reply" isBusy />)
    expect(region().textContent).toBe('')
    rerender(<ReplyAnnouncement text="Same reply" isBusy={false} />)
    await waitFor(() => expect(region().textContent).toBe('Same reply'))
  })
})
