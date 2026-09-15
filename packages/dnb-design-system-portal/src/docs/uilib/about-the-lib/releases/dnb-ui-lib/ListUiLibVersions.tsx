import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListUiLibVersions(props) {
  const edges = regularMdxNodes.filter(({ fields }) =>
    fields.slug.startsWith('uilib/about-the-lib/releases/dnb-ui-lib/')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
