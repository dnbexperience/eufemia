import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListEufemiaVersions(props) {
  const edges = regularMdxNodes.filter(({ fields }) =>
    fields.slug.startsWith('uilib/about-the-lib/releases/eufemia/')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
