import { defaultTabsValue } from '../shared/tags/defaultValues'

type Tab = {
  title: string
  key: string
}

type EditSourceNode = {
  fields: {
    slug: string
    sourcePath: string
  }
  frontmatter: {
    title?: string
    showTabs?: boolean
    tabs?: Tab[]
    hideTabs?: Array<{ title: string }>
  }
}

export function resolveEditSourcePath(
  currentNode: EditSourceNode,
  allNodes: EditSourceNode[]
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
