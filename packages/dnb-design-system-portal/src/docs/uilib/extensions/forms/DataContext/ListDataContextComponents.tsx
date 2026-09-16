import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getDataContextComponents } from '../../../../../shared/parts/listEdges'

export default function ListDataContextComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getDataContextComponents(regularMdxNodes)}
      {...props}
    />
  )
}
