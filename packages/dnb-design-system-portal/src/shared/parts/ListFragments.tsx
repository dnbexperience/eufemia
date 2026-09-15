import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListFragments() {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/components/fragments/*') &&
      node.frontmatter.hideInMenu !== true
  )

  return <ListSummaryFromEdges edges={edges} />
}
