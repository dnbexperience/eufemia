import { createRef, memo, Profiler, StrictMode, useState } from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import Heading from '../Heading'
import H3 from '../../../elements/H3'
import { createHeadingOrder } from '../useHeadingOrder'

function levels() {
  return Array.from(
    document.querySelectorAll('.dnb-heading'),
    ({ tagName }) => tagName
  )
}

describe('Heading order', () => {
  it('updates observation when headings move into new containers', async () => {
    const recalculate = vi.fn()
    const order = createHeadingOrder(recalculate)
    const container = document.createElement('div')
    container.innerHTML =
      '<section><h2></h2><h3></h3></section><aside></aside>'
    document.body.appendChild(container)
    const first = container.querySelector('h2')
    const second = container.querySelector('h3')
    const section = container.querySelector('section')
    const aside = container.querySelector('aside')
    const unregisterFirst = order.register('first', first)
    const unregisterSecond = order.register('second', second)
    try {
      order.check()
      await act(async () => {
        aside.append(second)
      })
      expect(recalculate).not.toHaveBeenCalled()
      await act(async () => {
        container.prepend(aside)
      })
      expect(recalculate).toHaveBeenCalledTimes(1)
      await act(async () => {
        section.append(second)
      })
      expect(recalculate).toHaveBeenCalledTimes(2)
      await act(async () => {
        section.prepend(second)
      })
      expect(recalculate).toHaveBeenCalledTimes(3)
    } finally {
      unregisterFirst()
      unregisterSecond()
      container.remove()
    }
  })

  it('observes each outline container instead of the whole document', async () => {
    const observe = vi.spyOn(MutationObserver.prototype, 'observe')
    try {
      render(
        <>
          {[2, 4].map((level) => (
            <section key={level}>
              <Heading.Level reset={level as 2 | 4}>
                <Heading>First</Heading>
                <Heading up>Following</Heading>
              </Heading.Level>
            </section>
          ))}
        </>
      )
      await act(async () => {})

      expect(observe).toHaveBeenCalled()
      expect(
        observe.mock.calls.every(
          ([node]) =>
            node instanceof HTMLElement && node.tagName === 'SECTION'
        )
      ).toBe(true)
    } finally {
      observe.mockRestore()
    }
  })

  it('does not subscribe ordinary typography headings to outline changes', async () => {
    const updated = vi.fn()
    const Ordinary = memo(() => (
      <Profiler id="ordinary" onRender={updated}>
        <H3>Ordinary</H3>
      </Profiler>
    ))
    const App = () => {
      const [up, setUp] = useState(false)
      return (
        <Heading.Level reset={2}>
          <button onClick={() => setUp(!up)}>Toggle</button>
          <Heading up={up}>Relative</Heading>
          <Ordinary />
        </Heading.Level>
      )
    }
    render(<App />)
    await act(async () => {})
    const renderCount = updated.mock.calls.length

    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H3'])
    expect(updated).toHaveBeenCalledTimes(renderCount)
  })

  it('preserves the manual heading element when enabling level use', async () => {
    const App = ({ useLevel }: { useLevel: boolean }) => (
      <Heading.Level reset={1}>
        <H3 tabIndex={0} level={useLevel ? 'use' : undefined}>
          Manual
        </H3>
        <Heading>Following</Heading>
      </Heading.Level>
    )
    const { rerender } = render(<App useLevel={false} />)
    const manual = document.querySelector('h3')
    ;(manual as HTMLElement).focus()

    await act(async () => {
      rerender(<App useLevel />)
    })
    expect(document.querySelector('h3')).toBe(manual)
    expect(document.activeElement).toBe(manual)
    expect(levels()).toEqual(['H3'])
  })

  it('recalculates when only a nested component reorders keyed headings', async () => {
    const Local = () => {
      const [reversed, setReversed] = useState(false)
      const headings = [
        <Heading key="plain">Plain</Heading>,
        <Heading key="up" up>
          Increased
        </Heading>,
      ]
      return (
        <>
          <button onClick={() => setReversed(!reversed)}>Toggle</button>
          {reversed ? headings.reverse() : headings}
        </>
      )
    }
    render(
      <Heading.Level reset={2}>
        <Local />
        <Heading>Following</Heading>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H2', 'H3', 'H3'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H3', 'H3', 'H3'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H2', 'H3', 'H3'])
  })

  it.each([false, true])(
    'tracks memoized heading order through wrappers (strict=%s)',
    async (strict) => {
      const Plain = memo(() => <Heading>Plain</Heading>)
      const Increased = memo(() => <Heading up>Increased</Heading>)
      const Local = () => {
        const [reversed, setReversed] = useState(false)
        const headings = [
          <section key="plain">
            <Plain />
          </section>,
          <section key="up">
            <Increased />
          </section>,
        ]
        return (
          <>
            <button onClick={() => setReversed(!reversed)}>Toggle</button>
            {reversed ? headings.reverse() : headings}
          </>
        )
      }
      const tree = (
        <Heading.Level reset={2}>
          <Local />
          <Heading>Following</Heading>
        </Heading.Level>
      )
      render(strict ? <StrictMode>{tree}</StrictMode> : tree)

      expect(levels()).toEqual(['H2', 'H3', 'H3'])
      for (const expected of [
        ['H3', 'H3', 'H3'],
        ['H2', 'H3', 'H3'],
        ['H3', 'H3', 'H3'],
      ]) {
        await act(async () => {
          fireEvent.click(document.querySelector('button'))
        })
        expect(levels()).toEqual(expected)
      }
    }
  )

  it('tracks reordered nested providers and preserves outer isolation', async () => {
    const Local = () => {
      const [reversed, setReversed] = useState(false)
      const groups = [
        <Heading.Level key="plain">
          <Heading>Plain</Heading>
        </Heading.Level>,
        <Heading.Increase key="up">
          <Heading>Increased</Heading>
        </Heading.Increase>,
      ]
      return (
        <>
          <button onClick={() => setReversed(!reversed)}>Toggle</button>
          {reversed ? groups.reverse() : groups}
          <Heading inherit>Inherited</Heading>
        </>
      )
    }
    render(
      <Heading.Level reset={2}>
        <Heading>First</Heading>
        <Local />
        <Heading up>Following</Heading>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H2', 'H2', 'H3', 'H3', 'H4'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H2', 'H3', 'H2', 'H2', 'H3'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H2', 'H2', 'H3', 'H3', 'H4'])
  })

  it('replays a moved memoized manual level override', async () => {
    const Manual = memo(() => <H3 level="use">Manual</H3>)
    const Local = () => {
      const [reversed, setReversed] = useState(false)
      const headings = [
        <Heading key="plain">Plain</Heading>,
        <Manual key="manual" />,
      ]
      return (
        <>
          <button onClick={() => setReversed(!reversed)}>Toggle</button>
          {reversed ? headings.reverse() : headings}
        </>
      )
    }
    render(
      <Heading.Level reset={1}>
        <Local />
        <Heading>Following</Heading>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H1', 'H3'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H3', 'H3'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H1', 'H3'])
  })

  it('keeps independent outlines stable when another outline reorders', async () => {
    const unchanged = vi.fn()
    const Unchanged = memo(() => {
      return <Heading up>Independent</Heading>
    })
    const Local = () => {
      const [reversed, setReversed] = useState(false)
      const headings = [
        <Heading key="plain">Plain</Heading>,
        <Heading key="up" up>
          Increased
        </Heading>,
      ]
      return (
        <>
          <button onClick={() => setReversed(!reversed)}>Toggle</button>
          {reversed ? headings.reverse() : headings}
        </>
      )
    }
    const { unmount } = render(
      <>
        <Heading.Level reset={2}>
          <Local />
        </Heading.Level>
        <Profiler id="independent" onRender={unchanged}>
          <Heading.Level reset={4}>
            <Unchanged />
          </Heading.Level>
        </Profiler>
      </>
    )
    await act(async () => {})
    const renderCount = unchanged.mock.calls.length
    expect(levels()).toEqual(['H2', 'H3', 'H5'])
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(levels()).toEqual(['H3', 'H3', 'H5'])
    expect(unchanged).toHaveBeenCalledTimes(renderCount)
    unmount()
    await act(async () => {})
    render(
      <Heading.Level reset={1}>
        <Heading>New outline</Heading>
      </Heading.Level>
    )
    expect(levels()).toEqual(['H1'])
  })

  it('preserves forwarded refs and React ref cleanup when levels change', async () => {
    const objectRef = createRef<HTMLElement>()
    const cleanup = vi.fn()
    const callbackRef = vi.fn((_node: HTMLElement) => cleanup)
    const Local = () => {
      const [reversed, setReversed] = useState(false)
      const headings = [
        <Heading key="plain" element="span" ref={objectRef}>
          Plain
        </Heading>,
        <Heading key="up" up ref={callbackRef}>
          Increased
        </Heading>,
      ]
      return (
        <>
          <button onClick={() => setReversed(!reversed)}>Toggle</button>
          {reversed ? headings.reverse() : headings}
        </>
      )
    }
    const { unmount } = render(
      <Heading.Level reset={1}>
        <Local />
      </Heading.Level>
    )
    const element = objectRef.current
    expect(element).toHaveAttribute('aria-level', '1')
    await act(async () => {
      fireEvent.click(document.querySelector('button'))
    })
    expect(objectRef.current).toBe(element)
    expect(element).toHaveAttribute('aria-level', '2')
    expect(
      callbackRef.mock.calls.every(([node]) => node instanceof HTMLElement)
    ).toBe(true)
    expect(cleanup).toHaveBeenCalled()
    unmount()
    expect(objectRef.current).toBeNull()
    expect(cleanup).toHaveBeenCalledTimes(callbackRef.mock.calls.length)
  })

  it('ignores unrelated DOM changes and disconnects order tracking on unmount', async () => {
    const updated = vi.fn()
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect')
    const { unmount } = render(
      <Profiler id="outline" onRender={updated}>
        <Heading.Level reset={1}>
          <Heading>First</Heading>
          <Heading up>Following</Heading>
          <div data-testid="unrelated" />
        </Heading.Level>
      </Profiler>
    )
    await act(async () => {})
    const renderCount = updated.mock.calls.length

    await act(async () => {
      document.querySelector('[data-testid="unrelated"]').append('Changed')
      document.querySelector('.dnb-heading').append(' text')
    })
    expect(levels()).toEqual(['H1', 'H2'])
    expect(updated).toHaveBeenCalledTimes(renderCount)

    unmount()
    expect(disconnect).toHaveBeenCalled()
    disconnect.mockRestore()
  })

  it('tracks memoized heading order after hydration', async () => {
    const Plain = memo(() => <Heading>Plain</Heading>)
    const Increased = memo(() => <Heading up>Increased</Heading>)
    const Local = () => {
      const [reversed, setReversed] = useState(false)
      const headings = [<Plain key="plain" />, <Increased key="up" />]
      return (
        <>
          <button onClick={() => setReversed(!reversed)}>Toggle</button>
          {reversed ? headings.reverse() : headings}
        </>
      )
    }
    const App = () => (
      <Heading.Level reset={2}>
        <Local />
        <Heading>Following</Heading>
      </Heading.Level>
    )
    const container = document.createElement('div')
    container.innerHTML = renderToString(<App />)
    document.body.appendChild(container)
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot>

    try {
      expect(levels()).toEqual(['H2', 'H3', 'H3'])
      await act(async () => {
        root = hydrateRoot(container, <App />, { onRecoverableError })
      })
      await act(async () => {
        fireEvent.click(container.querySelector('button'))
      })
      expect(levels()).toEqual(['H3', 'H3', 'H3'])
      await act(async () => {
        fireEvent.click(container.querySelector('button'))
      })
      expect(levels()).toEqual(['H2', 'H3', 'H3'])
      expect(onRecoverableError).not.toHaveBeenCalled()
    } finally {
      act(() => root?.unmount())
      container.remove()
    }
  })
})
