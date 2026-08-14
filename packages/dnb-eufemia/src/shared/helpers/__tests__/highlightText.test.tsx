import { render } from '@testing-library/react'
import { isValidElement } from 'react'
import { highlightText, useHighlightText } from '../highlightText'

function renderToContainer(node: React.ReactNode) {
  const { container } = render(<div>{node}</div>)
  return container.firstChild as HTMLElement
}

describe('highlightText', () => {
  it('returns the node unchanged when there is no search', () => {
    const result = highlightText('Hello World', {
      search: '',
      className: 'my-highlight',
    })

    expect(result).toBe('Hello World')
  })

  it('returns the node unchanged when there is no match', () => {
    const container = renderToContainer(
      highlightText('Hello World', {
        search: 'xyz',
        className: 'my-highlight',
      })
    )

    expect(container.textContent).toBe('Hello World')
    expect(container.querySelector('.my-highlight')).toBeNull()
  })

  it('highlights a single term with the default mark tag', () => {
    const container = renderToContainer(
      highlightText('Hello World', {
        search: 'World',
        className: 'my-highlight',
      })
    )

    const mark = container.querySelector('.my-highlight')
    expect(mark).not.toBeNull()
    expect(mark?.tagName).toBe('MARK')
    expect(mark?.textContent).toBe('World')
  })

  it('highlights every occurrence of a term', () => {
    const container = renderToContainer(
      highlightText('banana', {
        search: 'a',
        className: 'my-highlight',
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks).toHaveLength(3)
    expect(container.textContent).toBe('banana')
  })

  it('highlights multiple terms', () => {
    const container = renderToContainer(
      highlightText('Hello World', {
        search: 'Hello World',
        className: 'my-highlight',
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks).toHaveLength(2)
    expect(marks[0].textContent).toBe('Hello')
    expect(marks[1].textContent).toBe('World')
  })

  it('accepts an array of terms', () => {
    const container = renderToContainer(
      highlightText('foo bar baz', {
        search: ['foo', 'baz'],
        className: 'my-highlight',
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks).toHaveLength(2)
    expect(marks[0].textContent).toBe('foo')
    expect(marks[1].textContent).toBe('baz')
  })

  it('is case-insensitive by default', () => {
    const container = renderToContainer(
      highlightText('Hello World', {
        search: 'hello',
        className: 'my-highlight',
      })
    )

    const mark = container.querySelector('.my-highlight')
    expect(mark?.textContent).toBe('Hello')
  })

  it('respects ignoreCase set to false', () => {
    const container = renderToContainer(
      highlightText('Hello hello', {
        search: 'hello',
        className: 'my-highlight',
        ignoreCase: false,
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks).toHaveLength(1)
    expect(marks[0].textContent).toBe('hello')
  })

  it('supports the span tag option', () => {
    const container = renderToContainer(
      highlightText('Hello World', {
        search: 'World',
        className: 'my-highlight',
        tag: 'span',
      })
    )

    const highlight = container.querySelector('.my-highlight')
    expect(highlight?.tagName).toBe('SPAN')
    expect(highlight?.textContent).toBe('World')
  })

  it('escapes regex special characters in the search', () => {
    const container = renderToContainer(
      highlightText('price is 10$ (net)', {
        search: '(net)',
        className: 'my-highlight',
      })
    )

    const mark = container.querySelector('.my-highlight')
    expect(mark?.textContent).toBe('(net)')
  })

  it('does not throw on regex special characters that would otherwise be invalid', () => {
    const container = renderToContainer(
      highlightText('a * b', {
        search: '*',
        className: 'my-highlight',
      })
    )

    const mark = container.querySelector('.my-highlight')
    expect(mark?.textContent).toBe('*')
  })

  it('highlights numbers', () => {
    const container = renderToContainer(
      highlightText('Account 12345678901', {
        search: '123',
        className: 'my-highlight',
      })
    )

    const mark = container.querySelector('.my-highlight')
    expect(mark?.textContent).toBe('123')
  })

  it('cleans terms when searchNumbers is enabled', () => {
    const container = renderToContainer(
      highlightText('1234 and 5678', {
        search: '12.34 56 78',
        className: 'my-highlight',
        searchNumbers: true,
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks[0].textContent).toBe('1234')
    expect(marks[1].textContent).toBe('5678')
  })

  it('walks nested element nodes', () => {
    const node = (
      <a href="/path">
        Use <code>Card</code> now
      </a>
    )

    const container = renderToContainer(
      highlightText(node, {
        search: 'Ca',
        className: 'my-highlight',
      })
    )

    const link = container.querySelector('a')
    const code = link?.querySelector('code')
    const mark = code?.querySelector('.my-highlight')

    expect(link).not.toBeNull()
    expect(code?.textContent).toBe('Card')
    expect(mark?.textContent).toBe('Ca')
  })

  it('walks arrays of nodes', () => {
    const container = renderToContainer(
      highlightText(['Hello', ' ', 'World'], {
        search: 'World',
        className: 'my-highlight',
      })
    )

    const mark = container.querySelector('.my-highlight')
    expect(mark?.textContent).toBe('World')
    expect(container.textContent).toBe('Hello World')
  })

  it('does not render HTML strings as markup', () => {
    const container = renderToContainer(
      highlightText('hello <em>world</em>', {
        search: 'hello',
        className: 'my-highlight',
      })
    )

    expect(container.querySelector('em')).toBeNull()
    expect(container.innerHTML).toContain('&lt;em&gt;')
  })

  it('handles a term that appears in multiple split parts (previously buggy repeated-part scenario)', () => {
    // Reproduces the FilterHighlighting stateful g-flag regex bug where
    // regex.test() with lastIndex made alternating parts fail to highlight.
    const container = renderToContainer(
      highlightText('a b a b a', {
        search: 'a',
        className: 'my-highlight',
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks).toHaveLength(3)
    marks.forEach((mark) => {
      expect(mark.textContent).toBe('a')
    })
  })

  it('wraps top-level text in a span when wrapInSpan is enabled', () => {
    const result = highlightText('item bb', {
      search: 'bb',
      className: 'my-highlight',
      tag: 'span',
      wrapInSpan: true,
    })

    expect(isValidElement(result)).toBe(true)

    const { container } = render(<>{result}</>)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe('SPAN')
    expect(wrapper.querySelector('.my-highlight')?.textContent).toBe('bb')
  })

  it('anchors the first term with the starts-with match', () => {
    const container = renderToContainer(
      highlightText('the other the', {
        search: ['the'],
        className: 'my-highlight',
        searchMatch: 'starts-with',
        searchInWordIndex: 1,
      })
    )

    const marks = container.querySelectorAll('.my-highlight')
    expect(marks).toHaveLength(1)
    expect(marks[0].textContent).toBe('the')
    expect(container.textContent).toBe('the other the')
  })
})

describe('useHighlightText', () => {
  function Consumer({
    node,
    cacheKey,
    onHighlight,
  }: {
    node: React.ReactNode
    cacheKey?: string
    onHighlight?: (result: React.ReactNode) => void
  }) {
    const highlight = useHighlightText({
      search: 'World',
      className: 'my-highlight',
    })

    const result = highlight(node, cacheKey)
    onHighlight?.(result)

    return <div>{result}</div>
  }

  it('highlights via the returned callback', () => {
    const { container } = render(<Consumer node="Hello World" />)

    const mark = container.querySelector('.my-highlight')
    expect(mark?.tagName).toBe('MARK')
    expect(mark?.textContent).toBe('World')
  })

  it('returns a cached result for the same cache key', () => {
    const results: React.ReactNode[] = []

    const { rerender } = render(
      <Consumer
        node="Hello World"
        cacheKey="key-1"
        onHighlight={(result) => results.push(result)}
      />
    )

    rerender(
      <Consumer
        node="Hello World again"
        cacheKey="key-1"
        onHighlight={(result) => results.push(result)}
      />
    )

    // Same cache key returns the identical (cached) result reference.
    expect(results[0]).toBe(results[1])
  })
})
