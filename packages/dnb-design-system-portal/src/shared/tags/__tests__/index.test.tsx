import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
import ReactMarkdown from 'react-markdown'
import { MemoryRouter } from 'react-router'

import tags from '../index'
import markdownComponents from '../markdownComponents'

afterEach(cleanup)

async function renderMdx(source: string) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
  })

  return render(<Content components={tags} />)
}

describe('Markdown task lists', () => {
  it('labels each checkbox with the text of its list item', async () => {
    const { container } = await renderMdx(
      '- [ ] Follow **semantics** properly\n- [x] Allow viewport zooming\n'
    )

    const checkboxes = Array.from(
      container.querySelectorAll('input[type="checkbox"]')
    )
    expect(checkboxes).toHaveLength(2)

    const names = checkboxes.map((checkbox) => {
      const labelId = checkbox.getAttribute('aria-labelledby')
      return document.getElementById(labelId)?.textContent.trim()
    })
    expect(names).toEqual([
      'Follow semantics properly',
      'Allow viewport zooming',
    ])
  })

  it('keeps regular list items unchanged', async () => {
    const { container } = await renderMdx('- First\n- Second\n')

    const items = Array.from(container.querySelectorAll('li'))
    expect(items.map((item) => item.innerHTML)).toEqual([
      'First',
      'Second',
    ])
  })
})

describe('markdownComponents', () => {
  it('does not render the react-markdown node as an attribute', () => {
    const { container } = render(
      <MemoryRouter>
        <ReactMarkdown
          // @ts-expect-error -- strictFunctionTypes
          components={markdownComponents}
          remarkPlugins={[remarkGfm]}
        >
          {
            '### Title\n\nUse `code` and [a link](/uilib/).\n\n- An item\n\n```js\nconst a = 1\n```\n'
          }
        </ReactMarkdown>
      </MemoryRouter>
    )

    expect(container.querySelector('code').textContent).toBe('code')
    expect(container.querySelector('a[href="/uilib/"]').textContent).toBe(
      'a link'
    )
    expect(container.querySelector('li').textContent).toBe('An item')
    expect(container.querySelectorAll('[node]')).toHaveLength(0)
  })
})
