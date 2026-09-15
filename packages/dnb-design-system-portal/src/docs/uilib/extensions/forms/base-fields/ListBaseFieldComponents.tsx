import { regularMdxNodes, globPath } from 'virtual:portal-pages'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

export default function ListBaseFieldComponents(props) {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/base-fields/*') &&
      node.frontmatter.componentType?.includes('base')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
