import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListBaseValueComponents(props) {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/Value/**/*') &&
      node.frontmatter.componentType?.includes('base')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
