import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react'
import CopyOnClick from '../CopyOnClick'
import useCopyToClipboard from '../useCopyToClipboard'
import { mockClipboard } from '../../../core/test-utils/testSetup'

describe('useCopyToClipboard timeout', () => {
  const originalExecCommand = document.execCommand

  beforeEach(() => {
    vi.useFakeTimers()
    mockClipboard()
    window.getSelection().removeAllRanges()
    document.execCommand = vi.fn(() => false)
  })

  afterEach(() => {
    cleanup()
    vi.clearAllTimers()
    vi.useRealTimers()
    document.execCommand = originalExecCommand
  })

  const advanceTime = async (milliseconds: number) => {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(milliseconds)
    })
  }

  it('closes the confirmation two seconds after a successful copy', async () => {
    const { result } = renderHook(useCopyToClipboard)

    await act(async () => {
      await result.current.copy('copy text')
    })

    expect(await navigator.clipboard.readText()).toBe('copy text')
    expect(result.current.active).toBe(true)
    expect(result.current.copyCount).toBe(1)

    await advanceTime(1999)
    expect(result.current.active).toBe(true)

    await advanceTime(1)
    expect(result.current.active).toBe(false)
  })

  it('does not show a confirmation when both clipboard methods fail', async () => {
    const { result } = renderHook(useCopyToClipboard)
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
      new Error('Permission denied')
    )

    await act(async () => {
      await result.current.copy('copy text')
    })

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(await navigator.clipboard.readText()).toBe('')
    expect(result.current.active).toBe(false)
    expect(result.current.copyCount).toBe(0)

    await advanceTime(2000)
    expect(result.current.active).toBe(false)
  })

  it('restarts the timeout and counts each successful copy', async () => {
    const { result } = renderHook(useCopyToClipboard)

    await act(async () => {
      await result.current.copy('first copy')
    })
    await advanceTime(1000)
    await act(async () => {
      await result.current.copy('second copy')
    })

    expect(result.current.copyCount).toBe(2)
    expect(await navigator.clipboard.readText()).toBe('second copy')
    expect(vi.getTimerCount()).toBe(1)

    await advanceTime(1999)
    expect(result.current.active).toBe(true)

    await advanceTime(1)
    expect(result.current.active).toBe(false)
  })

  it('keeps the successful copy deadline after a failed retry', async () => {
    const { result } = renderHook(useCopyToClipboard)

    await act(async () => {
      await result.current.copy('first copy')
    })
    await advanceTime(1000)
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
      new Error('Permission denied')
    )
    await act(async () => {
      await result.current.copy('failed retry')
    })

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(await navigator.clipboard.readText()).toBe('first copy')
    expect(result.current.copyCount).toBe(1)

    await advanceTime(999)
    expect(result.current.active).toBe(true)

    await advanceTime(1)
    expect(result.current.active).toBe(false)
  })

  it.each([false, true])(
    'keeps the deadline while a retry is pending, then handles success=%s',
    async (success) => {
      const { result } = renderHook(useCopyToClipboard)

      await act(async () => {
        await result.current.copy('first copy')
      })
      await advanceTime(1000)

      let resolve: () => void
      let reject: (error: Error) => void
      vi.mocked(navigator.clipboard.writeText).mockImplementationOnce(
        () =>
          new Promise<void>((res, rej) => {
            resolve = res
            reject = rej
          })
      )
      let pendingCopy: Promise<void>
      act(() => {
        pendingCopy = result.current.copy('pending retry')
      })

      await advanceTime(999)
      expect(result.current.active).toBe(true)
      await advanceTime(1)
      expect(result.current.active).toBe(false)
      expect(result.current.copyCount).toBe(1)

      await advanceTime(1000)
      await act(async () => {
        if (success) {
          resolve()
        } else {
          reject(new Error('Permission denied'))
        }
        await pendingCopy
      })

      expect(result.current.active).toBe(success)
      expect(result.current.copyCount).toBe(success ? 2 : 1)
      expect(document.execCommand).toHaveBeenCalledTimes(success ? 0 : 1)

      await advanceTime(1999)
      expect(result.current.active).toBe(success)
      await advanceTime(1)
      expect(result.current.active).toBe(false)
    }
  )

  it('does not change a newer successful copy when an earlier copy fails late', async () => {
    const { result } = renderHook(useCopyToClipboard)
    let reject: (error: Error) => void
    vi.mocked(navigator.clipboard.writeText).mockImplementationOnce(
      () =>
        new Promise<void>((_, rej) => {
          reject = rej
        })
    )
    let pendingCopy: Promise<void>
    act(() => {
      pendingCopy = result.current.copy('pending copy')
    })

    await advanceTime(1000)
    await act(async () => {
      await result.current.copy('successful copy')
    })
    await advanceTime(1000)
    await act(async () => {
      reject(new Error('Permission denied'))
      await pendingCopy
    })

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(await navigator.clipboard.readText()).toBe('successful copy')
    expect(result.current.copyCount).toBe(1)
    expect(result.current.active).toBe(true)

    await advanceTime(999)
    expect(result.current.active).toBe(true)
    await advanceTime(1)
    expect(result.current.active).toBe(false)
  })

  it('clears the successful copy timeout on unmount', async () => {
    const { result, unmount } = renderHook(useCopyToClipboard)

    await act(async () => {
      await result.current.copy('copy text')
    })
    expect(vi.getTimerCount()).toBe(1)

    unmount()
    expect(vi.getTimerCount()).toBe(0)
    await advanceTime(2000)
    expect(vi.getTimerCount()).toBe(0)
  })

  describe.each(['text', 'button'])('CopyOnClick %s', (variant) => {
    it('closes the confirmation after a failed retry', async () => {
      render(
        variant === 'text' ? (
          <CopyOnClick tooltipContent="Copied">copy text</CopyOnClick>
        ) : (
          <CopyOnClick.Button
            copyContent="copy text"
            tooltipContent="Copied"
          />
        )
      )
      const target = document.querySelector(
        variant === 'text' ? '.dnb-copy-on-click' : 'button'
      )

      await act(async () => {
        fireEvent.click(target)
      })
      expect(await navigator.clipboard.readText()).toBe('copy text')
      expect(document.querySelector('[role="tooltip"]')).toHaveTextContent(
        'Copied'
      )
      expect(target).toHaveAttribute('aria-describedby')

      await advanceTime(1000)
      window.getSelection().removeAllRanges()
      vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
        new Error('Permission denied')
      )
      await act(async () => {
        fireEvent.click(target)
        fireEvent.mouseLeave(target)
        fireEvent.blur(target)
      })
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2)
      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(document.querySelector('[role="tooltip"]')).toHaveTextContent(
        'Copied'
      )

      await advanceTime(1000)
      expect(target).not.toHaveAttribute('aria-describedby')
      // The popover stays in the DOM for its closing animation.
      await advanceTime(300)
      expect(
        document.querySelector('[role="tooltip"]')
      ).not.toBeInTheDocument()
    })
  })
})
