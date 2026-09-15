import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListFeatureFieldComponents(props) {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/feature-fields/*') &&
      node.frontmatter.showTabs
  )
  return <ListSummaryFromEdges edges={edges} {...props} />
}
