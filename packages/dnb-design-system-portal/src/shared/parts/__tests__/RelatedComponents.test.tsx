import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

const mockData = vi.hoisted(() => ({
  components: {
    edges: [
      {
        node: {
          fields: { slug: 'web/components/dropdown' },
          frontmatter: {
            title: 'Dropdown',
            description:
              'Use Dropdown when people need to choose one option from a list.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/autocomplete' },
          frontmatter: {
            title: 'Autocomplete',
            description:
              'Use Autocomplete to help people find and choose from matching suggestions as they type.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/radio' },
          frontmatter: {
            title: 'Radio',
            description:
              'Use Radio when people must choose one option from a set.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/checkbox' },
          frontmatter: {
            title: 'Checkbox',
            description:
              'Use Checkbox when people can turn one or more options on or off.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/input' },
          frontmatter: {
            title: 'Input',
            description:
              'Use Input when people need to enter a short line of text.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/slider' },
          frontmatter: {
            title: 'Slider',
            description:
              'Use Slider when people need to choose a value from a range.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/switch' },
          frontmatter: {
            title: 'Switch',
            description:
              'Use Switch when people can turn one setting on or off.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/textarea' },
          frontmatter: {
            title: 'Textarea',
            description:
              'Use Textarea when people need to write longer text over several lines.',
            category: 'input',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/anchor' },
          frontmatter: {
            title: 'Anchor (Text Link)',
            description:
              'Use Anchor to take people to another page, section, or website.',
            category: 'actions',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/button' },
          frontmatter: {
            title: 'Button',
            description:
              'Use Button when people need to start, confirm, or submit an action.',
            category: 'actions',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/breadcrumb' },
          frontmatter: {
            title: 'Breadcrumb',
            description: 'Use Breadcrumb to show where someone is.',
            category: 'navigation',
          },
        },
      },
      {
        node: {
          fields: { slug: 'web/components/fragments/drawer-list' },
          frontmatter: {
            title: 'DrawerList',
            description: 'Use DrawerList as an internal list pattern.',
            category: false,
          },
        },
      },
    ],
  },
}))

vi.mock('portal-query', () => ({
  graphql: (strings: TemplateStringsArray) => String(strings),
  useStaticQuery: () => mockData,
}))

vi.mock('../../tags/Anchor', () => ({
  default: ({ href, children }: { href: string; children: unknown }) => (
    <a href={href}>{children as never}</a>
  ),
}))

vi.mock('../../tags/AutoLinkHeader', () => ({
  default: ({ children }: { children: unknown }) => (
    <h2>{children as never}</h2>
  ),
}))

import RelatedComponents from '../RelatedComponents'

afterEach(cleanup)

function renderAt(pathname: string) {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <RelatedComponents />
    </MemoryRouter>
  )
}

describe('RelatedComponents', () => {
  it('lists the other components in the same category, excluding itself', () => {
    const { container } = renderAt('/web/components/dropdown')

    expect(container.querySelector('h2')?.textContent).toBe(
      'Related components'
    )

    const links = Array.from(container.querySelectorAll('li a')).map((a) =>
      (a as HTMLAnchorElement).getAttribute('href')
    )

    expect(links).toContain('/web/components/autocomplete')
    expect(links).toContain('/web/components/radio')
    expect(links).not.toContain('/web/components/dropdown')
  })

  it('caps the inline list at six and links to the rest of the category', () => {
    const { container } = renderAt('/web/components/dropdown')

    const links = Array.from(container.querySelectorAll('li a')).map((a) =>
      (a as HTMLAnchorElement).getAttribute('href')
    )

    // Input has 7 siblings here; only the first six (alphabetical) show.
    expect(links).toEqual([
      '/web/components/autocomplete',
      '/web/components/checkbox',
      '/web/components/input',
      '/web/components/radio',
      '/web/components/slider',
      '/web/components/switch',
    ])
    expect(links).not.toContain('/web/components/textarea')

    const seeAll = Array.from(container.querySelectorAll('a')).find((a) =>
      a.textContent?.includes('See all')
    )

    expect(seeAll).toBeTruthy()
    expect(seeAll?.getAttribute('href')).toBe(
      '/web/components/overview/#input'
    )
    expect(seeAll?.textContent).toContain('Input')
  })

  it('omits the See all link when the whole category fits inline', () => {
    const { container } = renderAt('/web/components/button')

    const hasSeeAll = Array.from(container.querySelectorAll('a')).some(
      (a) => a.textContent?.includes('See all')
    )

    expect(hasSeeAll).toBe(false)
  })

  it('links to the matching overview category anchor', () => {
    const { container } = renderAt('/web/components/dropdown')

    const categoryLink = container.querySelector(
      'a[href="/web/components/overview/#input"]'
    )

    expect(categoryLink).not.toBeNull()
    expect(categoryLink?.textContent).toBe('Input')
  })

  it('shows a short reason derived from each description', () => {
    const { container } = renderAt('/web/components/dropdown')

    const items = Array.from(container.querySelectorAll('li')).map(
      (li) => li.textContent
    )

    expect(items).toContain(
      'Autocomplete — to help people find and choose from matching suggestions as they type.'
    )
    expect(items).toContain(
      'Radio — when people must choose one option from a set.'
    )
  })

  it('strips the parenthetical part of a related component title', () => {
    const { container } = renderAt('/web/components/button')

    const anchorLink = container.querySelector(
      'li a[href="/web/components/anchor"]'
    )

    expect(anchorLink?.textContent).toBe('Anchor')
  })

  it('resolves the current component when on a tab sub-route', () => {
    const { container } = renderAt('/web/components/dropdown/info')

    expect(container.querySelector('h2')?.textContent).toBe(
      'Related components'
    )
  })

  it('renders nothing when the category has no other members', () => {
    const { container } = renderAt('/web/components/breadcrumb')

    expect(container.innerHTML).toBe('')
  })

  it('renders nothing for a page with category false', () => {
    const { container } = renderAt('/web/components/fragments/drawer-list')

    expect(container.innerHTML).toBe('')
  })

  it('renders nothing for an unknown page', () => {
    const { container } = renderAt('/web/components/does-not-exist')

    expect(container.innerHTML).toBe('')
  })
})
