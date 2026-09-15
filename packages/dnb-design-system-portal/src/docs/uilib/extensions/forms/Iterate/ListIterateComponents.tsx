import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListComponents(props) {
  const edges = regularMdxNodes.filter(({ fields }) =>
    fields.slug.startsWith('uilib/extensions/forms/Iterate/')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
