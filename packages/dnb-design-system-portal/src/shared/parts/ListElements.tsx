import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListElements() {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/elements/*') &&
      node.frontmatter.hideInMenu !== true
  )

  return <ListSummaryFromEdges edges={edges} returnListItems />
}
