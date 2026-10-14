import { describe, it, expect, afterEach } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'

import tags from '../index'

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
