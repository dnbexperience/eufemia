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
      'Buttons and controls for starting actions or opening choices.',
  },
  {
    id: 'input',
    title: 'Inputs',
    description:
      'Controls for entering information, choosing options, and uploading files.',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description:
      'Components for moving between pages, sections, and steps.',
  },
  {
    id: 'feedback',
    title: 'Feedback and dialogs',
    description:
      'Messages, progress indicators, and dialogs that explain what is happening or needs attention.',
  },
  {
    id: 'content',
    title: 'Content and layout',
    description:
      'Components for organizing and displaying information, images, icons, and tables.',
  },
  {
    id: 'formatting',
    title: 'Formatting and typography',
    description:
      'Components for formatting dates, numbers, lists, and text.',
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    description:
      'Components for announcements, keyboard navigation, and screen reader content.',
  },
  {
    id: 'utilities',
    title: 'Utilities',
    description:
      'Components for scrolling, animation, copying, and rendering outside the page flow.',
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
  'web/components/fragments',
  'web/components/overview',
])

const categorizedExtensionSlugs = new Set([
  'web/extensions/payment-card',
  'web/extensions/sidebar-menu',
  'web/extensions/vipps-wallet-button',
])

export function isCategorizedComponentSlug(slug: string) {
  return (
    slug.startsWith('web/components/') ||
    categorizedExtensionSlugs.has(slug)
  )
}

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

  return 'utilities'
}

export function getCategoryTitle(id: CategoryId): string {
  return categoryOrder.find((category) => category.id === id)?.title ?? id
}
