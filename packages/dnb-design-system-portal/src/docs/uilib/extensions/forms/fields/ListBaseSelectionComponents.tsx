import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListBaseSelectionComponents() {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/base-fields/*') &&
      node.frontmatter.componentType === 'base-selection'
  )

  return (
    <ListSummaryFromEdges
      space={{ top: 'x-small' }}
      level={3}
      size="medium"
      description=""
      edges={edges}
    />
  )
}
