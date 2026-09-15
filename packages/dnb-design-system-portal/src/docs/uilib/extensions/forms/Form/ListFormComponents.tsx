import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListFormComponents(props) {
  const edges = regularMdxNodes.filter(
    (node) =>
      globPath(node, 'uilib/extensions/forms/Form/**/*') &&
      node.frontmatter.componentType !== 'docs'
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
