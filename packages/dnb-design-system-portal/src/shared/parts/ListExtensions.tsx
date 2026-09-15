import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListExtensions(props) {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/extensions/*') &&
      node.frontmatter.hideInMenu !== true
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
