import { act, fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import Card from '../index'
import Provider from '../../../shared/Provider'
import useMediaQuery from '../../../shared/useMediaQuery'

vi.mock('../../../shared/useMediaQuery', () => ({ default: vi.fn() }))

describe('CardMediaButton', () => {
  let video: HTMLVideoElement
  let videoRef: { current: HTMLVideoElement | null }
  let paused: boolean
  let play: ReturnType<typeof vi.fn<() => Promise<void>>>
  let pause: ReturnType<typeof vi.fn<() => void>>

  beforeEach(() => {
    vi.mocked(useMediaQuery).mockReturnValue(false)
    video = document.createElement('video')
    video.muted = true
    paused = true
    Object.defineProperty(video, 'paused', { get: () => paused })
    play = vi.fn(() => {
      paused = false
      video.dispatchEvent(new Event('play'))
      return Promise.resolve()
    })
    pause = vi.fn(() => {
      paused = true
      video.dispatchEvent(new Event('pause'))
    })
    video.play = play
    video.pause = pause
    videoRef = { current: video }
  })

  it('pauses for reduced motion and allows manual playback without resetting time', async () => {
    video.currentTime = 3
    render(
      <Provider locale="en-GB">
        <Card.Info.MediaButton videoRef={videoRef} />
      </Provider>
    )
    const button = document.querySelector('button')
    expect(play).not.toHaveBeenCalled()
    expect(pause).toHaveBeenCalled()
    expect(button).toHaveAttribute('aria-label', 'Play background video')
    await userEvent.click(button)
    expect(play).toHaveBeenCalledTimes(1)
    expect(button).toHaveAttribute('aria-label', 'Pause background video')
    expect(
      document.querySelector('svg[data-icon-state="pause"]')
    ).toHaveClass('dnb-icon__state--active')
    await userEvent.click(button)
    expect(button).toHaveAttribute('aria-label', 'Play background video')
    expect(video.currentTime).toBe(3)
  })

  it('autoplays muted video and responds to preference changes', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    const { rerender } = render(
      <Card.Info.MediaButton videoRef={videoRef} />
    )
    expect(play).toHaveBeenCalledTimes(1)
    vi.mocked(useMediaQuery).mockReturnValue(false)
    rerender(<Card.Info.MediaButton videoRef={videoRef} />)
    expect(pause).toHaveBeenCalledTimes(1)
  })

  it('can disable autoplay and never autoplays audible media', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    const { rerender } = render(
      <Card.Info.MediaButton videoRef={videoRef} autoPlay={false} />
    )
    expect(play).not.toHaveBeenCalled()
    video.muted = false
    rerender(<Card.Info.MediaButton videoRef={videoRef} />)
    expect(play).not.toHaveBeenCalled()
  })

  it('does not restart manually paused playback on unrelated renders', async () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    const { rerender } = render(
      <Card.Info.MediaButton videoRef={videoRef} />
    )
    await userEvent.click(document.querySelector('button'))
    expect(paused).toBe(true)
    rerender(
      <Card.Info.MediaButton videoRef={videoRef} className="updated" />
    )
    expect(play).toHaveBeenCalledTimes(1)
    expect(paused).toBe(true)
  })

  it('tracks native playback and ending, and removes listeners on unmount', () => {
    const remove = vi.spyOn(video, 'removeEventListener')
    const { unmount } = render(
      <Card.Info.MediaButton
        videoRef={videoRef}
        playTitle="Play"
        pauseTitle="Pause"
      />
    )
    const button = document.querySelector('button')
    act(() => {
      paused = false
      video.dispatchEvent(new Event('play'))
    })
    expect(button).toHaveAttribute('aria-label', 'Pause')
    act(() => {
      paused = true
      video.dispatchEvent(new Event('ended'))
    })
    expect(button).toHaveAttribute('aria-label', 'Play')
    unmount()
    expect(remove).toHaveBeenCalledTimes(5)
  })

  it('keeps the control available when autoplay or manual playback is rejected', async () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    play.mockImplementation(() =>
      Promise.reject(new DOMException('Blocked', 'NotAllowedError'))
    )
    render(
      <Provider locale="en-GB">
        <Card.Info.MediaButton videoRef={videoRef} />
      </Provider>
    )
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1))
    const button = document.querySelector('button')
    await userEvent.click(button)
    expect(play).toHaveBeenCalledTimes(2)
    expect(button).toHaveAttribute('aria-label', 'Play background video')
  })

  it('supports cancellation, custom labels, refs and form-safe clicks', async () => {
    const ref = createRef<HTMLButtonElement>()
    const submit = vi.fn((event) => event.preventDefault())
    const { rerender } = render(
      <form onSubmit={submit}>
        <Card.Info.MediaButton
          ref={ref}
          videoRef={videoRef}
          title="Video"
          onClick={() => false}
        />
      </form>
    )
    const button = document.querySelector('button')
    expect(ref.current).toBe(button)
    expect(button).toHaveAttribute('type', 'button')
    await userEvent.click(button)
    expect(play).not.toHaveBeenCalled()
    expect(submit).not.toHaveBeenCalled()
    rerender(
      <Card.Info.MediaButton
        videoRef={videoRef}
        onClick={(event) => event.preventDefault()}
      />
    )
    fireEvent.click(document.querySelector('button'))
    expect(play).not.toHaveBeenCalled()
  })

  it('handles a missing media ref', async () => {
    render(<Card.Info.MediaButton videoRef={{ current: null }} />)
    await userEvent.click(document.querySelector('button'))
    expect(play).not.toHaveBeenCalled()
  })

  it('rebinds native events and autoplay when a stable ref receives a replacement video', async () => {
    vi.mocked(useMediaQuery).mockReturnValue(true)
    const { rerender } = render(
      <Provider locale="en-GB">
        <Card.Info.MediaButton videoRef={videoRef} />
      </Provider>
    )
    const oldVideo = video
    const remove = vi.spyOn(oldVideo, 'removeEventListener')
    const replacement = document.createElement('video')
    replacement.muted = true
    let replacementPaused = true
    Object.defineProperty(replacement, 'paused', {
      get: () => replacementPaused,
    })
    replacement.play = vi.fn(() => {
      replacementPaused = false
      replacement.dispatchEvent(new Event('play'))
      return Promise.resolve()
    })
    replacement.pause = vi.fn(() => {
      replacementPaused = true
      replacement.dispatchEvent(new Event('pause'))
    })
    videoRef.current = replacement
    rerender(
      <Provider locale="en-GB">
        <Card.Info.MediaButton videoRef={videoRef} />
      </Provider>
    )
    expect(remove).toHaveBeenCalledTimes(5)
    expect(replacement.play).toHaveBeenCalledTimes(1)
    await userEvent.click(document.querySelector('button'))
    expect(replacement.pause).toHaveBeenCalledTimes(1)
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Play background video'
    )
    act(() => {
      oldVideo.dispatchEvent(new Event('play'))
    })
    expect(document.querySelector('button')).toHaveAttribute(
      'aria-label',
      'Play background video'
    )
    vi.mocked(useMediaQuery).mockReturnValue(false)
    rerender(<Card.Info.MediaButton videoRef={videoRef} />)
    expect(replacement.pause).toHaveBeenCalledTimes(2)
  })

  it('shows play after a media error and uses translated defaults', () => {
    render(
      <Provider locale="nb-NO">
        <Card.Info.MediaButton videoRef={videoRef} />
      </Provider>
    )
    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Spill av bakgrunnsvideo')
    act(() => {
      paused = false
      video.dispatchEvent(new Event('play'))
    })
    expect(button).toHaveAttribute(
      'aria-label',
      'Sett bakgrunnsvideo på pause'
    )
    Object.defineProperty(video, 'error', { value: { code: 4 } })
    act(() => {
      video.dispatchEvent(new Event('error'))
    })
    expect(button).toHaveAttribute('aria-label', 'Spill av bakgrunnsvideo')
  })
})
