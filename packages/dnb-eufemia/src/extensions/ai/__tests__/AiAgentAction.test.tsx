import { act, fireEvent, render } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { axeComponent } from '../../../core/test-utils/testSetup'
import Avatar from '../../../components/Avatar'
import Provider from '../../../shared/Provider'
import svSE from '../constants/locales/sv-SE'
import daDK from '../constants/locales/da-DK'
import { AgentAction } from '..'

const root = () => document.querySelector('.dnb-ai-agent-action')
const progressbar = () => document.querySelector('[role="progressbar"]')
const undoButton = () =>
  document.querySelector<HTMLButtonElement>(
    '.dnb-ai-agent-action__undo-button'
  )

describe('Ai.AgentAction', () => {
  it('renders the action with indeterminate progress and a decorative agent avatar', () => {
    render(<AgentAction action="Paying">Spotify Premium</AgentAction>)
    expect(root()).toHaveClass(
      'dnb-ai-agent-action--running',
      'dnb-ai-agent-action--indeterminate'
    )
    expect(progressbar()).toHaveAccessibleName('Paying Spotify Premium')
    expect(progressbar()).not.toHaveAttribute('aria-valuenow')
    expect(progressbar()).toHaveAttribute('aria-valuetext', 'Pågår')
    expect(
      document.querySelector('.dnb-ai-agent-action__avatar')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(
      document.querySelector('.dnb-avatar--size-small')
    ).toBeInTheDocument()
  })

  it('renders each running label once without a decorative text copy', () => {
    render(<AgentAction action="Paying">Spotify Premium</AgentAction>)
    expect(progressbar()).toHaveTextContent(/^PayingSpotify Premium$/)
  })

  it.each([0, 37, 100, -1, 101])(
    'shows actual progress %s without completing the action',
    (progress) => {
      render(<AgentAction progress={progress}>Paying</AgentAction>)
      const clamped = Math.max(0, Math.min(100, progress))
      expect(progressbar()).toHaveAttribute(
        'aria-valuenow',
        String(clamped)
      )
      expect(
        document.querySelector('.dnb-ai-agent-action__fill')
      ).toHaveStyle({ width: clamped + '%' })
      expect(root()).toHaveClass('dnb-ai-agent-action--running')
      expect(root()).not.toHaveClass('dnb-ai-agent-action--indeterminate')
    }
  )

  it.each([NaN, Infinity, -Infinity])(
    'handles non-finite progress %s as unknown',
    (progress) => {
      render(
        <AgentAction progress={progress}>Generating a graph…</AgentAction>
      )
      expect(progressbar()).not.toHaveAttribute('aria-valuenow')
      expect(root()).toHaveClass('dnb-ai-agent-action--indeterminate')
    }
  )

  it.each(['done', 'error', 'canceled'] as const)(
    'renders the supplied %s result without progress or running labels',
    (status) => {
      render(
        <AgentAction status={status} action="Paying">
          Payment result
        </AgentAction>
      )
      expect(root()).toHaveClass('dnb-ai-agent-action--' + status)
      expect(progressbar()).toBeNull()
      expect(
        document.querySelector('.dnb-ai-agent-action__result')
      ).toHaveTextContent('Payment result')
      expect(root()).not.toHaveTextContent('Paying')
    }
  )

  it('supports custom or omitted avatars and target icons', () => {
    const { rerender } = render(
      <AgentAction
        avatar={
          <Avatar size="small" hasLabel>
            S
          </Avatar>
        }
        icon={
          <Avatar size="small" hasLabel>
            B
          </Avatar>
        }
      >
        Bill
      </AgentAction>
    )
    expect(
      document.querySelector('.dnb-ai-agent-action__avatar')
    ).toHaveTextContent('S')
    expect(
      document.querySelector('.dnb-ai-agent-action__icon')
    ).toHaveAttribute('aria-hidden', 'true')
    rerender(<AgentAction avatar={false}>Bill</AgentAction>)
    expect(
      document.querySelector('.dnb-ai-agent-action__avatar')
    ).toBeNull()
  })

  it('forwards spacing and DOM attributes without forwarding own props', () => {
    render(
      <AgentAction
        top="large"
        className="custom"
        id="payment"
        progress={32}
        undoUntil={100}
        undoLabel="Revert"
        undoDisabled
      >
        Bill
      </AgentAction>
    )
    expect(root()).toHaveClass('dnb-space__top--large', 'custom')
    expect(root()).toHaveAttribute('id', 'payment')
    for (const prop of [
      'progress',
      'status',
      'undoUntil',
      'undoLabel',
      'undoDisabled',
    ]) {
      expect(root()).not.toHaveAttribute(prop)
    }
  })

  it('labels multiple actions independently', () => {
    render(
      <>
        <AgentAction>First</AgentAction>
        <AgentAction>Second</AgentAction>
      </>
    )
    const elements = document.querySelectorAll('[role="progressbar"]')
    expect(elements[0]).toHaveAccessibleName('First')
    expect(elements[1]).toHaveAccessibleName('Second')
  })

  it.each([
    ['nb-NO', 'Angre', undefined],
    ['en-GB', 'Undo', undefined],
    ['en-US', 'Undo', undefined],
    ['sv-SE', 'Ångra', svSE],
    ['da-DK', 'Fortryd', daDK],
  ])('translates Undo in %s', (locale, label, translations) => {
    render(
      <Provider locale={locale} translations={translations}>
        <AgentAction status="done" onUndo={() => undefined}>
          Paid
        </AgentAction>
      </Provider>
    )
    expect(undoButton()).toHaveAccessibleName(label)
  })

  it('supports a custom Undo label and pending state', () => {
    const onUndo = vi.fn()
    const { rerender } = render(
      <AgentAction
        status="done"
        onUndo={onUndo}
        undoLabel="Revert payment"
        undoDisabled
      >
        Paid
      </AgentAction>
    )
    expect(undoButton()).toBeDisabled()
    fireEvent.click(undoButton())
    expect(onUndo).not.toHaveBeenCalled()
    rerender(
      <AgentAction
        status="done"
        onUndo={onUndo}
        undoLabel="Revert payment"
      >
        Paid
      </AgentAction>
    )
    fireEvent.click(undoButton())
    expect(onUndo).toHaveBeenCalledOnce()
    expect(onUndo.mock.calls[0][0].event.type).toBe('click')
    expect(root()).toHaveClass('dnb-ai-agent-action--done')
  })

  it('moves focus to the status when a focused Undo becomes disabled', () => {
    const view = (undoDisabled = false) => (
      <AgentAction
        status="done"
        onUndo={vi.fn()}
        undoDisabled={undoDisabled}
      >
        Paid
      </AgentAction>
    )
    const { rerender } = render(view())
    act(() => undoButton().focus())
    rerender(view(true))
    expect(
      document.querySelector('.dnb-ai-agent-action__status')
    ).toHaveFocus()
  })

  it('does not move focus elsewhere when Undo becomes disabled or disappears', () => {
    const view = (pending = false, reversed = false) => (
      <>
        <button>Other</button>
        <AgentAction
          status={reversed ? 'canceled' : 'done'}
          onUndo={vi.fn()}
          undoDisabled={pending}
        >
          Paid
        </AgentAction>
      </>
    )
    const { rerender } = render(view())
    act(() => undoButton().focus())
    const other = document.querySelector<HTMLButtonElement>('button')
    act(() => other.focus())
    rerender(view(true))
    expect(other).toHaveFocus()
    rerender(view(false, true))
    expect(other).toHaveFocus()
  })

  it.each(['running', 'error', 'canceled'] as const)(
    'does not offer Undo for %s',
    (status) => {
      render(
        <AgentAction status={status} onUndo={vi.fn()}>
          Result
        </AgentAction>
      )
      expect(undoButton()).toBeNull()
    }
  )

  it('has accessible progress and Undo controls', async () => {
    const result = render(
      <>
        <AgentAction action="Paying" progress={35}>
          Bill
        </AgentAction>
        <AgentAction>Generating a graph…</AgentAction>
        <AgentAction status="done" onUndo={vi.fn()}>
          Paid
        </AgentAction>
      </>
    )
    expect(await axeComponent(result)).toHaveNoViolations()
  })

  it('does not render a clock-dependent countdown during server rendering', () => {
    const html = renderToString(
      <AgentAction
        status="done"
        onUndo={vi.fn()}
        undoUntil={Date.now() + 20000}
      >
        Paid
      </AgentAction>
    )
    expect(html).toContain('Paid')
    expect(html).not.toContain('role="timer"')
  })

  describe('Undo deadline', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(100000)
    })
    afterEach(() => vi.useRealTimers())

    it('counts down from an absolute deadline and removes Undo when it expires', () => {
      render(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={120000}>
          Paid
        </AgentAction>
      )
      expect(document.querySelector('[role="timer"]')).toHaveTextContent(
        '20s'
      )
      expect(document.querySelector('[role="timer"]')).toHaveAttribute(
        'aria-live',
        'off'
      )
      act(() => vi.advanceTimersByTime(1000))
      expect(document.querySelector('[role="timer"]')).toHaveTextContent(
        '19s'
      )
      act(() => vi.advanceTimersByTime(19000))
      expect(undoButton()).toBeNull()
      expect(root()).toHaveTextContent('Paid')
    })

    it.each([99999, 100000, NaN, Infinity, -Infinity])(
      'hides Undo for expired or invalid deadline %s',
      (undoUntil) => {
        render(
          <AgentAction
            status="done"
            onUndo={vi.fn()}
            undoUntil={undoUntil}
          >
            Paid
          </AgentAction>
        )
        expect(undoButton()).toBeNull()
      }
    )

    it('checks the deadline at click time even if timers were throttled', () => {
      const onUndo = vi.fn()
      render(
        <AgentAction status="done" onUndo={onUndo} undoUntil={100500}>
          Paid
        </AgentAction>
      )
      vi.setSystemTime(100501)
      fireEvent.click(undoButton())
      expect(onUndo).not.toHaveBeenCalled()
    })

    it('uses wall-clock time after a background pause', () => {
      render(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={120000}>
          Paid
        </AgentAction>
      )
      vi.setSystemTime(130000)
      act(() => vi.advanceTimersByTime(1000))
      expect(undoButton()).toBeNull()
    })

    it('updates a changed deadline and removes timers when Undo is unavailable', () => {
      const { rerender } = render(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={120000}>
          Paid
        </AgentAction>
      )
      rerender(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={105000}>
          Paid
        </AgentAction>
      )
      expect(document.querySelector('[role="timer"]')).toHaveTextContent(
        '5s'
      )
      act(() => vi.advanceTimersByTime(5000))
      expect(undoButton()).toBeNull()
      rerender(
        <AgentAction status="done" onUndo={vi.fn()}>
          Paid
        </AgentAction>
      )
      expect(undoButton()).toBeInTheDocument()
      expect(document.querySelector('[role="timer"]')).toBeNull()
      rerender(<AgentAction status="done">Paid</AgentAction>)
      expect(undoButton()).toBeNull()
    })

    it('keeps the same focused Undo when adding a deadline', () => {
      const { rerender } = render(
        <AgentAction status="done" onUndo={vi.fn()}>
          Paid
        </AgentAction>
      )
      const button = undoButton()
      act(() => button.focus())
      rerender(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={120000}>
          Paid
        </AgentAction>
      )
      expect(undoButton()).toBe(button)
      expect(button).toHaveFocus()
      expect(document.querySelector('[role="timer"]')).toHaveTextContent(
        '20s'
      )
    })

    it('returns keyboard focus to the result when the Undo button expires', () => {
      render(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={101000}>
          Paid
        </AgentAction>
      )
      act(() => undoButton().focus())
      expect(undoButton()).toHaveFocus()
      act(() => vi.advanceTimersByTime(1000))
      expect(
        document.querySelector('.dnb-ai-agent-action__status')
      ).toHaveFocus()
    })

    it('does not move focus when Undo expires while focus is elsewhere', () => {
      render(
        <>
          <button>Other</button>
          <AgentAction status="done" onUndo={vi.fn()} undoUntil={101000}>
            Paid
          </AgentAction>
        </>
      )
      const other = document.querySelector<HTMLButtonElement>('button')
      other.focus()
      act(() => vi.advanceTimersByTime(1000))
      expect(other).toHaveFocus()
    })

    it('keeps custom-locale announcements quiet while progress changes', () => {
      const translations = { 'en-GB': { Ai: { toolRunning: 'Working' } } }
      const view = (progress: number) => (
        <Provider locale="en-GB" translations={translations}>
          <AgentAction progress={progress}>Paying</AgentAction>
        </Provider>
      )
      const { rerender } = render(view(20))
      act(() => vi.advanceTimersByTime(1))
      expect(document.querySelector('.dnb-aria-live')).toHaveTextContent(
        'Working: Paying'
      )
      act(() => vi.advanceTimersByTime(100))
      rerender(view(30))
      act(() => vi.advanceTimersByTime(1))
      expect(
        document.querySelector('.dnb-aria-live')
      ).toBeEmptyDOMElement()
    })

    it('announces results without repeating announcements for progress or countdown ticks', () => {
      const { rerender } = render(
        <AgentAction progress={20}>Paying</AgentAction>
      )
      act(() => vi.advanceTimersByTime(1))
      expect(document.querySelector('.dnb-aria-live')).toHaveTextContent(
        'Pågår: Paying'
      )
      act(() => vi.advanceTimersByTime(100))
      rerender(<AgentAction progress={30}>Paying</AgentAction>)
      act(() => vi.advanceTimersByTime(1))
      expect(
        document.querySelector('.dnb-aria-live')
      ).toBeEmptyDOMElement()
      rerender(
        <AgentAction status="done" onUndo={vi.fn()} undoUntil={120000}>
          Paid
        </AgentAction>
      )
      act(() => vi.advanceTimersByTime(1))
      expect(document.querySelector('.dnb-aria-live')).toHaveTextContent(
        'Fullført: Paid'
      )
      act(() => vi.advanceTimersByTime(2000))
      expect(
        document.querySelector('.dnb-aria-live')
      ).toBeEmptyDOMElement()

      const announcement = document.querySelector('.dnb-aria-live')
      expect(announcement).toHaveAttribute('aria-live', 'polite')
      expect(announcement).toHaveAttribute('aria-atomic', 'true')
      rerender(
        <AgentAction status="canceled">Payment reversed.</AgentAction>
      )
      act(() => vi.advanceTimersByTime(1))
      expect(announcement).toHaveTextContent('Avbrutt: Payment reversed.')
      rerender(
        <AgentAction action="Paying" progress={0}>
          Spotify Premium
        </AgentAction>
      )
      act(() => vi.advanceTimersByTime(1))
      expect(announcement).toHaveTextContent(
        'Pågår: Paying Spotify Premium'
      )
    })
  })
})
