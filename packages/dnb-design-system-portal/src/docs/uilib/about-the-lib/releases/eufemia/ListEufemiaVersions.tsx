import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListEufemiaVersions(props) {
  const edges = regularMdxNodes.filter((node) =>
    globPath(node, 'uilib/about-the-lib/releases/eufemia/**/*')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
