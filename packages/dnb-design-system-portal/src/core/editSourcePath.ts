import { defaultTabsValue } from '../shared/tags/defaultValues'
import type { MdxNode } from '../../vite/client/plugins/portal-pages.shared'

export function resolveEditSourcePath(
  currentNode: MdxNode,
  allNodes: MdxNode[]
): string {
  const { fields, frontmatter } = currentNode

  if (!frontmatter.title || !frontmatter.showTabs) {
    return fields.sourcePath
  }

  const firstVisibleTab = (frontmatter.tabs || defaultTabsValue).find(
    ({ title }) =>
      !frontmatter.hideTabs?.some((hiddenTab) => hiddenTab.title === title)
  )

  if (!firstVisibleTab) {
    return fields.sourcePath
  }

  const tabKey = firstVisibleTab.key.replace(/^\/+|\/+$/g, '')
  const tabSlug =
    tabKey === fields.slug || tabKey.startsWith(`${fields.slug}/`)
      ? tabKey
      : `${fields.slug}/${tabKey}`
  const tabNode = allNodes.find(({ fields }) => fields.slug === tabSlug)

  return tabNode?.fields.sourcePath || fields.sourcePath
}
