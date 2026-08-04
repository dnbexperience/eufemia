import { describe, expect, it } from 'vitest'
import { resolveEditSourcePath } from '../editSourcePath'

type Node = Parameters<typeof resolveEditSourcePath>[0]

const sourceRoot = 'packages/dnb-design-system-portal/src/docs'

function createNode(
  slug: string,
  frontmatter: Node['frontmatter'] = {}
): Node {
  return {
    fields: {
      slug,
      sourcePath: `${sourceRoot}/${slug}.mdx`,
    },
    frontmatter,
  }
}

describe('resolveEditSourcePath', () => {
  it('uses the first tab source for a tabbed parent page', () => {
    const parent = createNode('uilib/components/button', {
      title: 'Button',
      showTabs: true,
    })
    const info = createNode('uilib/components/button/info')

    expect(resolveEditSourcePath(parent, [parent, info])).toBe(
      `${sourceRoot}/uilib/components/button/info.mdx`
    )
  })

  it('uses the current source for a tab subpage', () => {
    const demos = createNode('uilib/components/button/demos', {
      showTabs: true,
    })

    expect(resolveEditSourcePath(demos, [demos])).toBe(
      `${sourceRoot}/uilib/components/button/demos.mdx`
    )
  })

  it('supports absolute tab keys', () => {
    const parent = createNode('uilib/components/date-format', {
      title: 'DateFormat',
      showTabs: true,
      tabs: [
        {
          title: 'Info',
          key: '/uilib/components/date-format/info',
        },
      ],
    })
    const info = createNode('uilib/components/date-format/info')

    expect(resolveEditSourcePath(parent, [parent, info])).toBe(
      `${sourceRoot}/uilib/components/date-format/info.mdx`
    )
  })

  it('skips hidden tabs', () => {
    const parent = createNode('uilib/components/example', {
      title: 'Example',
      showTabs: true,
      tabs: [
        { title: 'Info', key: '/info' },
        { title: 'Demos', key: '/demos' },
      ],
      hideTabs: [{ title: 'Info' }],
    })
    const demos = createNode('uilib/components/example/demos')

    expect(resolveEditSourcePath(parent, [parent, demos])).toBe(
      `${sourceRoot}/uilib/components/example/demos.mdx`
    )
  })

  it('keeps the parent source when the first tab points to the parent', () => {
    const parent = createNode('uilib/usage/customisation/theming', {
      title: 'Theming',
      showTabs: true,
      tabs: [
        {
          title: 'Overview',
          key: '/uilib/usage/customisation/theming',
        },
      ],
    })

    expect(resolveEditSourcePath(parent, [parent])).toBe(
      `${sourceRoot}/uilib/usage/customisation/theming.mdx`
    )
  })

  it('falls back to the parent source when no tab source exists', () => {
    const parent = createNode('uilib/components/example', {
      title: 'Example',
      showTabs: true,
    })

    expect(resolveEditSourcePath(parent, [parent])).toBe(
      `${sourceRoot}/uilib/components/example.mdx`
    )
  })
})
