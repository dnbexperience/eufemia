import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListDataContextComponents(props) {
  const edges = regularMdxNodes.filter(({ fields }) =>
    fields.slug.startsWith('uilib/extensions/forms/DataContext/')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
