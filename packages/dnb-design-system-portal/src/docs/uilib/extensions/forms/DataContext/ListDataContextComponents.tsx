import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListDataContextComponents(props) {
  const edges = regularMdxNodes.filter((node) =>
    globPath(node, 'uilib/extensions/forms/DataContext/**/*')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
