import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListComponents(props) {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/components/**/*') &&
      !globPath(node, 'uilib/components/fragments/**') &&
      node.frontmatter.hideInMenu !== true
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
