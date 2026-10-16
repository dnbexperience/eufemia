import { StrictMode, useContext } from 'react'
import type { ReactElement } from 'react'
import { act, cleanup, render, waitFor } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  LiveContext,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive,
} from 'react-live'
import { LiveProvider } from '../src'

afterEach(cleanup)

function playground(props: Record<string, unknown>) {
  return (
    <LiveProvider {...props}>
      <LiveEditor />
      <LivePreview />
      <LiveError />
    </LiveProvider>
  )
}

async function hydrate(element: ReactElement) {
  const container = document.createElement('div')
  container.innerHTML = renderToString(element)
  const onRecoverableError = vi.fn()
  let root!: ReturnType<typeof hydrateRoot>
  await act(async () => {
    root = hydrateRoot(container, element, { onRecoverableError })
  })
  return { container, root, onRecoverableError }
}

describe('upstream context integration', () => {
  it('keeps code client-only unless SSR is enabled', () => {
    const transformCode = vi.fn(() => '<strong>hello</strong>')
    expect(
      renderToString(playground({ code: 'hello', transformCode }))
    ).not.toContain('<strong>hello</strong>')
    expect(transformCode).not.toHaveBeenCalled()
  })

  it('renders through upstream LivePreview and withLive on the server', () => {
    const ContextConsumer = withLive(({ live }) => (
      <span>{live.code}</span>
    ))
    const html = renderToString(
      <LiveProvider code="<strong>hello</strong>" ssr>
        <LivePreview />
        <ContextConsumer />
      </LiveProvider>
    )
    expect(html).toContain('<div><strong>hello</strong></div>')
    expect(html).toContain('&lt;strong&gt;hello&lt;/strong&gt;')
  })

  it('upstream editor uses the same code, scope, and edit callback', async () => {
    let onChange!: (code: string) => void
    function Capture() {
      onChange = useContext(LiveContext).onChange
      return null
    }
    render(
      <LiveProvider
        code="<strong>{message}</strong>"
        scope={{ message: 'hello' }}
        ssr
      >
        <Capture />
        <LiveEditor />
        <LivePreview />
        <LiveError />
      </LiveProvider>
    )
    expect(document.querySelector('strong')?.textContent).toBe('hello')
    expect(document.querySelector('pre')?.textContent).toContain('message')
    await act(async () => {
      onChange('<strong>edited</strong>')
    })
    expect(document.querySelector('strong')?.textContent).toBe('edited')
  })
})

describe('SSR and hydration', () => {
  it.each([false, true])(
    'reuses async transform output during hydration (StrictMode: %s)',
    async (strict) => {
      const transformCode = vi.fn((code: string) =>
        Promise.resolve('<strong>' + code + '</strong>')
      )
      const preview = playground({
        code: 'hello',
        transformCode,
        ssr: true,
      })
      const { container, root, onRecoverableError } = await hydrate(
        strict ? <StrictMode>{preview}</StrictMode> : preview
      )
      try {
        expect(container.querySelector('strong')?.textContent).toBe(
          'hello'
        )
        expect(transformCode).toHaveBeenCalledTimes(strict ? 3 : 2)
        expect(onRecoverableError).not.toHaveBeenCalled()
      } finally {
        await act(() => root.unmount())
      }
    }
  )

  it('renders synchronous noInline code on the server', () => {
    expect(
      renderToString(
        playground({
          code: 'render(<strong>hello</strong>)',
          noInline: true,
          ssr: true,
        })
      )
    ).toContain('<div><strong>hello</strong></div>')
  })

  it.each([false, true])(
    'does not repeat a sync transform after hydration (StrictMode: %s)',
    async (strict) => {
      const transformCode = vi.fn(
        (code: string) => '<strong>' + code + '</strong>'
      )
      const preview = playground({
        code: 'hello',
        ssr: true,
        transformCode,
      })
      const { container, root, onRecoverableError } = await hydrate(
        strict ? <StrictMode>{preview}</StrictMode> : preview
      )
      try {
        expect(container.querySelector('strong')?.textContent).toBe(
          'hello'
        )
        expect(transformCode).toHaveBeenCalledTimes(strict ? 3 : 2)
        expect(onRecoverableError).not.toHaveBeenCalled()
      } finally {
        await act(() => root.unmount())
      }
    }
  )

  it.each(['<div>', undefined])(
    'reports invalid async output %s and recovers',
    async (invalid) => {
      const { container, root } = await hydrate(
        playground({
          code: 'hello',
          ssr: true,
          transformCode: () => Promise.resolve(invalid),
        })
      )
      try {
        expect(container.textContent).toContain(
          invalid === undefined
            ? 'Code failed to transform'
            : 'SyntaxError'
        )
        await act(async () => {
          root.render(
            playground({ code: '<strong>fixed</strong>', ssr: true })
          )
        })
        expect(container.querySelector('strong')?.textContent).toBe(
          'fixed'
        )
      } finally {
        await act(() => root.unmount())
      }
    }
  )

  it('reports rejected async transforms', async () => {
    const { container, root } = await hydrate(
      playground({
        code: 'hello',
        ssr: true,
        transformCode: () => Promise.reject(new Error('transform failed')),
      })
    )
    try {
      expect(container.textContent).toContain('Error: transform failed')
    } finally {
      await act(() => root.unmount())
    }
  })

  it('retains hooks state through hydration', async () => {
    const code =
      '() => { const [count, setCount] = React.useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button> }'
    const { container, root, onRecoverableError } = await hydrate(
      playground({ code, ssr: true })
    )
    try {
      await act(() => container.querySelector('button')?.click())
      expect(container.querySelector('button')?.textContent).toBe('1')
      expect(onRecoverableError).not.toHaveBeenCalled()
    } finally {
      await act(() => root.unmount())
    }
  })
})

describe('client async lifecycle', () => {
  it('keeps a synchronous noInline preview subscribed to later render calls', async () => {
    let complete!: () => void
    const scope = {
      capture: (callback: () => void) => {
        complete = callback
      },
    }
    render(
      playground({
        code: 'render(<strong>first</strong>); capture(() => render(<strong>later</strong>))',
        scope,
        noInline: true,
        ssr: true,
      })
    )
    expect(document.querySelector('strong')?.textContent).toBe('first')
    await act(() => complete())
    expect(document.querySelector('strong')?.textContent).toBe('later')
  })

  it('detaches initial SSR callbacks when the example changes', async () => {
    let complete!: () => void
    const scope = {
      capture: (callback: () => void) => {
        complete = callback
      },
    }
    const { rerender } = render(
      playground({
        code: 'render(<strong>first</strong>); capture(() => render(<strong>obsolete</strong>))',
        scope,
        noInline: true,
        ssr: true,
      })
    )
    rerender(
      playground({
        code: 'render(<strong>new</strong>)',
        scope,
        noInline: true,
        ssr: true,
      })
    )
    await waitFor(() =>
      expect(document.querySelector('strong')?.textContent).toBe('new')
    )
    act(() => complete())
    expect(document.querySelector('strong')?.textContent).toBe('new')
  })

  it('re-evaluates code when scope changes and returns to its initial value', async () => {
    const first = { message: 'first' }
    const { rerender } = render(
      playground({
        code: '<strong>{message}</strong>',
        scope: first,
        ssr: true,
      })
    )
    rerender(
      playground({
        code: '<strong>{message}</strong>',
        scope: { message: 'second' },
        ssr: true,
      })
    )
    await waitFor(() =>
      expect(document.querySelector('strong')?.textContent).toBe('second')
    )
    rerender(
      playground({
        code: '<strong>{message}</strong>',
        scope: first,
        ssr: true,
      })
    )
    await waitFor(() =>
      expect(document.querySelector('strong')?.textContent).toBe('first')
    )
  })

  it('reports preview render errors through upstream LiveError and recovers', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    try {
      const { rerender } = render(
        playground({
          code: "() => { throw new Error('preview failed') }",
          ssr: true,
        })
      )
      await waitFor(() =>
        expect(document.body.textContent).toContain(
          'Error: preview failed'
        )
      )
      rerender(playground({ code: '<strong>fixed</strong>', ssr: true }))
      await waitFor(() =>
        expect(document.querySelector('strong')?.textContent).toBe('fixed')
      )
    } finally {
      consoleError.mockRestore()
    }
  })

  it('discards a slower transform after the code prop changes', async () => {
    const resolvers = new Map<string, (value: string) => void>()
    const transformCode = (code: string) =>
      new Promise<string>((resolve) => resolvers.set(code, resolve))
    const { rerender } = render(playground({ code: 'old', transformCode }))
    rerender(playground({ code: 'new', transformCode }))
    await act(async () => {
      resolvers.get('new')?.('<strong>new</strong>')
    })
    await act(async () => {
      resolvers.get('old')?.('<strong>old</strong>')
    })
    expect(document.querySelector('strong')?.textContent).toBe('new')
  })

  it('retains delayed noInline rendering with SSR enabled', async () => {
    render(
      playground({
        code: 'Promise.resolve().then(() => render(<strong>delayed</strong>))',
        noInline: true,
        ssr: true,
      })
    )
    await waitFor(() =>
      expect(document.querySelector('strong')?.textContent).toBe('delayed')
    )
  })

  it('preserves delayed noInline render calls', async () => {
    render(
      playground({
        code: 'Promise.resolve().then(() => render(<strong>delayed</strong>))',
        noInline: true,
      })
    )
    await waitFor(() =>
      expect(document.querySelector('strong')?.textContent).toBe('delayed')
    )
  })

  it('ignores callbacks from obsolete examples', async () => {
    let complete!: () => void
    const scope = {
      capture: (callback: () => void) => {
        complete = callback
      },
    }
    const { rerender } = render(
      playground({
        code: 'capture(() => render(<strong>old</strong>))',
        scope,
        noInline: true,
      })
    )
    await waitFor(() => expect(complete).toBeTypeOf('function'))
    rerender(
      playground({
        code: 'render(<strong>new</strong>)',
        scope,
        noInline: true,
      })
    )
    await waitFor(() =>
      expect(document.querySelector('strong')?.textContent).toBe('new')
    )
    act(() => complete())
    expect(document.querySelector('strong')?.textContent).toBe('new')
  })
})
