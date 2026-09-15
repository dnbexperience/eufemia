import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListUiLibVersions(props) {
  const edges = regularMdxNodes.filter((node) =>
    globPath(node, 'uilib/about-the-lib/releases/dnb-ui-lib/**/*')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
