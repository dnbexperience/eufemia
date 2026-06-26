/**
 * Shared category definitions for the component overview and related
 * components linking. Both `ListComponentsOverview` and `RelatedComponents`
 * use these so the grouping stays in sync.
 *
 * The source of truth for a component's category is the `category`
 * frontmatter on its parent `.mdx` page.
 */

export const categoryOrder = [
  {
    id: 'actions',
    title: 'Actions',
    description:
      'For things people click to do something, open choices, follow a link, or get help.',
  },
  {
    id: 'input',
    title: 'Input',
    description:
      'For entering information, choosing options, uploading files, or changing values.',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description:
      'For helping people move between pages, jump to content, or continue through steps.',
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description:
      'For messages and panels that tell people what happened, what is happening, or what needs attention.',
  },
  {
    id: 'content',
    title: 'Content',
    description:
      'For showing information, such as text, numbers, tables, icons, lists, and cards.',
  },
  {
    id: 'other',
    title: 'Other',
    description:
      'For special page behavior that does not fit the groups above.',
  },
] as const

export type CategoryId = (typeof categoryOrder)[number]['id']
export type CategoryValue = string | false | null | undefined

export type CategoryDefinition = {
  id: CategoryId
  title: string
  description: string
}

export const categoryIds = new Set<string>(
  categoryOrder.map(({ id }) => id)
)

export const excludedSlugs = new Set([
  'uilib/components/fragments',
  'uilib/components/overview',
])

export function isCategoryId(
  category: CategoryValue
): category is CategoryId {
  return typeof category === 'string' && categoryIds.has(category)
}

export function getCategoryId(
  category: CategoryValue
): CategoryId | undefined {
  if (category === false) {
    return undefined
  }

  if (isCategoryId(category)) {
    return category
  }

  return 'other'
}

export function getCategoryTitle(id: CategoryId): string {
  return categoryOrder.find((category) => category.id === id)?.title ?? id
}
