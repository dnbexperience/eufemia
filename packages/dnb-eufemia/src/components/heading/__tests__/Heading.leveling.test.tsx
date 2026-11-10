import { StrictMode, useState } from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import Heading from '../Heading'
import H3 from '../../../elements/H3'
import type { HeadingLevel, HeadingProps } from '../Heading'

function levels() {
  return Array.from(
    document.querySelectorAll('.dnb-heading'),
    ({ tagName }) => tagName
  )
}

describe('Heading leveling regressions', () => {
  it.each([undefined, 1, 2, 3])(
    'seeds skipCorrection with reset=%s',
    (reset) => {
      render(
        <Heading.Level reset={reset} skipCorrection>
          <Heading>First</Heading>
          <Heading>Second</Heading>
        </Heading.Level>
      )

      const level = Math.max(1, reset || 0)
      expect(levels()).toEqual([`H${level}`, `H${level}`])
    }
  )

  it.each([2, 3, 4, 5, 6] as const)(
    'corrects level=1 after level=%s',
    (level) => {
      render(
        <Heading.Level reset={level}>
          <Heading>Previous</Heading>
          <Heading level={1}>Corrected</Heading>
          <Heading inherit>Inherited</Heading>
        </Heading.Level>
      )

      expect(levels()).toEqual([`H${level}`, 'H2', 'H2'])
    }
  )

  it('does not duplicate h1 through inherit', () => {
    render(
      <Heading.Level reset={1}>
        <Heading>First</Heading>
        <Heading inherit>Second</Heading>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H1', 'H2'])
  })

  it('updates the sibling baseline after inherit crosses a context', () => {
    render(
      <Heading.Level reset={1}>
        <Heading>First</Heading>
        <Heading>Second</Heading>
        <Heading.Increase>
          <Heading>Nested</Heading>
        </Heading.Increase>
        <Heading inherit>Inherited</Heading>
        <Heading up>Following</Heading>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H1', 'H2', 'H3', 'H3', 'H4'])
  })

  it.each([1, 2, 3, 4, 5])(
    'increments once through a plain context at reset=%s',
    (reset) => {
      render(
        <Heading.Level reset={reset}>
          <Heading>First</Heading>
          <Heading.Level>
            <Heading up>Nested</Heading>
          </Heading.Level>
        </Heading.Level>
      )

      expect(levels()).toEqual([`H${reset}`, `H${reset + 1}`])
    }
  )

  it('does not skip a rendered heading level through empty increase contexts', () => {
    render(
      <Heading.Level reset={1}>
        <Heading>First</Heading>
        <Heading.Increase>
          <Heading.Increase>
            <Heading>Nested</Heading>
          </Heading.Increase>
        </Heading.Increase>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H1', 'H2'])
  })

  it.each([false, true])(
    'keeps the first relative heading stable (strict=%s)',
    (strict) => {
      const App = ({ revision = 0 }) => (
        <Heading.Level reset={1}>
          <Heading up>First</Heading>
          <Heading up>Second</Heading>
          <Heading key={revision}>Third</Heading>
        </Heading.Level>
      )
      const tree = (revision: number) =>
        strict ? (
          <StrictMode>
            <App revision={revision} />
          </StrictMode>
        ) : (
          <App revision={revision} />
        )
      const { rerender } = render(tree(0))

      expect(levels()).toEqual(['H1', 'H2', 'H2'])
      for (let revision = 1; revision <= 3; revision++) {
        rerender(tree(revision))
        expect(levels()).toEqual(['H1', 'H2', 'H2'])
      }
    }
  )

  it.each([2, 3])(
    'keeps mixed explicit and relative levels stable at reset=%s',
    (reset) => {
      const App = ({ revision = 0 }) => (
        <Heading.Level reset={reset}>
          <Heading level={Math.min(reset + 1, 6) as HeadingLevel}>
            First
          </Heading>
          <Heading up level={Math.min(reset + 2, 6) as HeadingLevel}>
            Second
          </Heading>
          <Heading up key={revision}>
            Third
          </Heading>
        </Heading.Level>
      )
      const { rerender } = render(<App />)
      const expected = [`H${reset + 1}`, `H${reset + 2}`, `H${reset + 3}`]

      expect(levels()).toEqual(expected)
      rerender(<App revision={1} />)
      expect(levels()).toEqual(expected)
    }
  )

  it.each([2, '2'] as const)(
    'corrects number and string levels consistently (%s)',
    (level) => {
      render(
        <Heading.Level reset={2}>
          <Heading level={level}>First</Heading>
          <Heading level={typeof level === 'string' ? '5' : 5}>
            Second
          </Heading>
        </Heading.Level>
      )

      expect(levels()).toEqual(['H2', 'H3'])
    }
  )

  it.each([
    ['up', {}, { up: true }, ['H3', 'H4']],
    ['down', {}, { down: true }, ['H2', 'H3']],
    ['reset', { reset: 2 }, { reset: 4 }, ['H4', 'H5']],
  ] as const)(
    'responds to changed %s props',
    (_name, before, after, expected) => {
      const App = ({ options }: { options: HeadingProps }) => (
        <Heading.Level reset={2}>
          <Heading {...options}>First</Heading>
          <Heading up>Second</Heading>
        </Heading.Level>
      )
      const { rerender } = render(<App options={before} />)

      rerender(<App options={after} />)
      expect(levels()).toEqual(expected)
    }
  )

  it('recalculates when the reset prop of a provider changes', () => {
    const App = ({ reset = 2 }) => (
      <Heading.Level reset={reset}>
        <Heading>First</Heading>
        <Heading up>Second</Heading>
      </Heading.Level>
    )
    const { rerender } = render(<App />)

    rerender(<App reset={3} />)
    expect(levels()).toEqual(['H3', 'H4'])
  })

  it.each([
    [2, 3, undefined, true, ['H3', 'H4', 'H5']],
    [2, 3, 4, true, ['H3', 'H4', 'H5']],
    [2, 2, 4, false, ['H2', 'H3', 'H4']],
    [3, 4, 4, false, ['H4', 'H4', 'H5']],
  ] as const)(
    'keeps screenshot outline reset=%s level=%s/%s up=%s stable',
    (reset, first, second, up, expected) => {
      const App = ({ revision = 0 }) => (
        <StrictMode>
          <Heading.Level reset={reset}>
            <Heading level={first}>First</Heading>
            <Heading level={second} up={up}>
              Second
            </Heading>
            <Heading up key={revision}>
              Third
            </Heading>
          </Heading.Level>
        </StrictMode>
      )
      const { rerender } = render(<App />)

      expect(levels()).toEqual(expected)
      rerender(<App />)
      expect(levels()).toEqual(expected)
      for (let revision = 1; revision <= 3; revision++) {
        rerender(<App revision={revision} />)
        expect(levels()).toEqual(expected)
      }
    }
  )

  it.each([false, true])(
    'recalculates relative siblings after explicit correction changes (strict=%s)',
    (strict) => {
      const App = ({ showMiddle = true }) => {
        const content = (
          <Heading.Level reset={1}>
            <Heading level={1}>First</Heading>
            {showMiddle && <Heading level={2}>Middle</Heading>}
            <Heading level={4}>Corrected</Heading>
            <Heading up>Following</Heading>
            <Heading>Same</Heading>
          </Heading.Level>
        )
        return strict ? <StrictMode>{content}</StrictMode> : content
      }
      const { rerender } = render(<App />)

      expect(levels()).toEqual(['H1', 'H2', 'H3', 'H4', 'H4'])
      rerender(<App showMiddle={false} />)
      expect(levels()).toEqual(['H1', 'H2', 'H3', 'H3'])
      rerender(<App />)
      expect(levels()).toEqual(['H1', 'H2', 'H3', 'H4', 'H4'])
    }
  )

  it.each([
    'up',
    'increase',
    'down',
    'decrease',
    'inherit',
    'skipCorrection',
  ] as const)(
    'responds to toggling heading %s in both directions',
    (prop) => {
      const App = ({ enabled = false }) => (
        <Heading.Level reset={2}>
          <Heading.Increase>
            <Heading>Nested</Heading>
          </Heading.Increase>
          <Heading
            {...{ [prop]: enabled }}
            level={prop === 'skipCorrection' ? 6 : undefined}
          >
            Changed
          </Heading>
          <Heading up>Following</Heading>
        </Heading.Level>
      )
      const { rerender } = render(<App />)
      const initial =
        prop === 'skipCorrection' ? ['H3', 'H4', 'H5'] : ['H3', 'H2', 'H3']
      const changed = {
        up: ['H3', 'H3', 'H4'],
        increase: ['H3', 'H3', 'H4'],
        down: ['H3', 'H2', 'H3'],
        decrease: ['H3', 'H2', 'H3'],
        inherit: ['H3', 'H3', 'H4'],
        skipCorrection: ['H3', 'H6', 'H6'],
      }[prop]

      expect(levels()).toEqual(initial)
      rerender(<App enabled />)
      expect(levels()).toEqual(changed)
      rerender(<App />)
      expect(levels()).toEqual(initial)
    }
  )

  it.each([
    'up',
    'increase',
    'down',
    'decrease',
    'inherit',
    'skipCorrection',
  ] as const)(
    'responds to toggling provider %s in both directions',
    (prop) => {
      const App = ({ enabled = false }) => (
        <Heading.Level reset={2}>
          <Heading.Increase>
            <Heading>Previous</Heading>
          </Heading.Increase>
          <Heading.Level
            {...{ [prop]: enabled }}
            level={prop === 'skipCorrection' ? 6 : undefined}
          >
            <Heading>Changed</Heading>
            <Heading up>Following</Heading>
          </Heading.Level>
        </Heading.Level>
      )
      const { rerender } = render(<App />)
      const initial =
        prop === 'skipCorrection' ? ['H3', 'H4', 'H5'] : ['H3', 'H2', 'H3']
      const changed = {
        up: ['H3', 'H3', 'H4'],
        increase: ['H3', 'H3', 'H4'],
        down: ['H3', 'H2', 'H3'],
        decrease: ['H3', 'H2', 'H3'],
        inherit: ['H3', 'H3', 'H4'],
        skipCorrection: ['H3', 'H6', 'H6'],
      }[prop]

      expect(levels()).toEqual(initial)
      rerender(<App enabled />)
      expect(levels()).toEqual(changed)
      rerender(<App />)
      expect(levels()).toEqual(initial)
    }
  )

  it('updates plain siblings after headings are inserted', () => {
    const App = ({ inserted = false }) => (
      <Heading.Level reset={2}>
        <Heading>First</Heading>
        {inserted && <Heading up>Inserted</Heading>}
        <Heading>Following</Heading>
        <Heading up>Last</Heading>
      </Heading.Level>
    )
    const { rerender } = render(<App />)

    expect(levels()).toEqual(['H2', 'H2', 'H3'])
    rerender(<App inserted />)
    expect(levels()).toEqual(['H2', 'H3', 'H3', 'H4'])
    rerender(<App />)
    expect(levels()).toEqual(['H2', 'H2', 'H3'])
  })

  it('keeps manual heading overrides when recalculating a scope', () => {
    const App = ({ revision = 0 }) => (
      <StrictMode>
        <Heading.Level reset={1}>
          <Heading>First</Heading>
          <H3 level="use">Manual</H3>
          <Heading key={revision}>Following</Heading>
          <Heading up>Last</Heading>
        </Heading.Level>
      </StrictMode>
    )
    const { rerender } = render(<App />)

    expect(levels()).toEqual(['H1', 'H3', 'H4'])
    rerender(<App revision={1} />)
    expect(levels()).toEqual(['H1', 'H3', 'H4'])
  })

  it.each([
    [0.5, 'H1'],
    [2.5, 'H2'],
    [7, 'H6'],
    [Infinity, 'H6'],
  ] as const)(
    'renders a valid heading for reset=%s',
    (reset, expected) => {
      render(
        <Heading.Level reset={reset}>
          <Heading>First</Heading>
        </Heading.Level>
      )

      expect(levels()).toEqual([expected])
    }
  )

  it.each([false, true])(
    'recalculates keyed headings when reordered (strict=%s)',
    (strict) => {
      const App = ({ reversed = false }) => {
        const headings = [
          <Heading key="plain">Plain</Heading>,
          <Heading key="up" up>
            Increased
          </Heading>,
        ]
        return (
          <Heading.Level reset={2}>
            {reversed ? headings.reverse() : headings}
            <Heading>Following</Heading>
          </Heading.Level>
        )
      }
      const tree = (reversed: boolean) =>
        strict ? (
          <StrictMode>
            <App reversed={reversed} />
          </StrictMode>
        ) : (
          <App reversed={reversed} />
        )
      const { rerender } = render(tree(false))

      expect(levels()).toEqual(['H2', 'H3', 'H3'])
      rerender(tree(true))
      expect(levels()).toEqual(['H3', 'H3', 'H3'])
      rerender(tree(false))
      expect(levels()).toEqual(['H2', 'H3', 'H3'])
    }
  )

  it('reports the actual previous heading level when correcting h1', () => {
    const debug = vi.fn()
    render(
      <Heading.Level reset={2} debug={debug}>
        <Heading.Increase>
          <Heading>Previous</Heading>
        </Heading.Increase>
        <Heading level={1}>Corrected</Heading>
      </Heading.Level>
    )

    expect(debug).toHaveBeenCalledWith(
      'Cannot decrease to heading level 1! Had before',
      3,
      '- The new level is',
      2,
      expect.any(String),
      '',
      'Corrected'
    )
  })

  it.each(['heading', 'provider'] as const)(
    'recalculates when only a nested component changes a %s prop',
    (kind) => {
      const Local = () => {
        const [up, setUp] = useState(false)
        return (
          <>
            <button onClick={() => setUp(!up)}>Toggle</button>
            {kind === 'heading' ? (
              <Heading up={up}>Changed</Heading>
            ) : (
              <Heading.Level up={up}>
                <Heading>Changed</Heading>
                <Heading up>Following inside</Heading>
              </Heading.Level>
            )}
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

      const initial =
        kind === 'heading' ? ['H2', 'H2', 'H3'] : ['H2', 'H2', 'H3', 'H3']
      const changed =
        kind === 'heading' ? ['H2', 'H3', 'H4'] : ['H2', 'H3', 'H4', 'H3']

      expect(levels()).toEqual(initial)
      fireEvent.click(document.querySelector('button'))
      expect(levels()).toEqual(changed)
      fireEvent.click(document.querySelector('button'))
      expect(levels()).toEqual(initial)
    }
  )

  it('recalculates when only a nested component inserts a heading', () => {
    const Local = () => {
      const [inserted, setInserted] = useState(false)
      return (
        <>
          <button onClick={() => setInserted(!inserted)}>Toggle</button>
          {inserted && <Heading up>Inserted</Heading>}
        </>
      )
    }
    render(
      <Heading.Level reset={2}>
        <Heading>First</Heading>
        <Local />
        <Heading>Following</Heading>
        <Heading up>Last</Heading>
      </Heading.Level>
    )

    expect(levels()).toEqual(['H2', 'H2', 'H3'])
    fireEvent.click(document.querySelector('button'))
    expect(levels()).toEqual(['H2', 'H3', 'H3', 'H4'])
    fireEvent.click(document.querySelector('button'))
    expect(levels()).toEqual(['H2', 'H2', 'H3'])
  })

  it.each(['up', 'down', 'inherit', 'skipCorrection', 'reset'] as const)(
    'recalculates a locally changed provider %s from its entry baseline',
    (prop) => {
      const Local = () => {
        const [enabled, setEnabled] = useState(false)
        return (
          <>
            <button onClick={() => setEnabled(!enabled)}>Toggle</button>
            <Heading.Level
              {...{
                [prop]: prop === 'reset' ? (enabled ? 4 : 2) : enabled,
              }}
              level={prop === 'skipCorrection' ? 6 : undefined}
            >
              <Heading>Changed</Heading>
              <Heading up>Following</Heading>
            </Heading.Level>
          </>
        )
      }
      render(
        <Heading.Level reset={2}>
          <Heading.Increase>
            <Heading>Previous</Heading>
          </Heading.Increase>
          <Local />
        </Heading.Level>
      )
      const initial =
        prop === 'skipCorrection' ? ['H3', 'H4', 'H5'] : ['H3', 'H2', 'H3']
      const changed = {
        up: ['H3', 'H3', 'H4'],
        down: ['H3', 'H2', 'H3'],
        inherit: ['H3', 'H3', 'H4'],
        skipCorrection: ['H3', 'H6', 'H6'],
        reset: ['H3', 'H4', 'H5'],
      }[prop]

      expect(levels()).toEqual(initial)
      fireEvent.click(document.querySelector('button'))
      expect(levels()).toEqual(changed)
      fireEvent.click(document.querySelector('button'))
      expect(levels()).toEqual(initial)
    }
  )

  it.each([
    [1, undefined, undefined, true, ['H1', 'H2', 'H2']],
    [2, 3, undefined, true, ['H3', 'H4', 'H5']],
    [2, 3, 4, true, ['H3', 'H4', 'H5']],
    [2, 2, 4, false, ['H2', 'H3', 'H4']],
    [3, 4, 4, false, ['H4', 'H4', 'H5']],
  ] as const)(
    'hydrates reset=%s level=%s/%s up=%s without changing server levels',
    async (reset, first, second, up, expected) => {
      const App = () => (
        <Heading.Level reset={reset}>
          <Heading level={first} up={up}>
            First
          </Heading>
          <Heading level={second} up={up}>
            Second
          </Heading>
          <Heading up={reset !== 1}>Third</Heading>
        </Heading.Level>
      )
      const container = document.createElement('div')
      container.innerHTML = renderToString(<App />)
      document.body.appendChild(container)
      const serverLevels = levels()
      expect(serverLevels).toEqual(expected)
      const onRecoverableError = vi.fn()
      let root: ReturnType<typeof hydrateRoot>

      try {
        await act(async () => {
          root = hydrateRoot(container, <App />, { onRecoverableError })
        })
        expect(levels()).toEqual(expected)
        expect(levels()).toEqual(serverLevels)
        expect(onRecoverableError).not.toHaveBeenCalled()
      } finally {
        act(() => root?.unmount())
        container.remove()
      }
    }
  )
})
