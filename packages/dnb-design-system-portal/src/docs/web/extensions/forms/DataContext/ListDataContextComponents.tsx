import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-data'
import { getDataContextComponents } from '../../../../../shared/parts/listEdges'

export default function ListDataContextComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getDataContextComponents(regularMdxNodes)}
      {...props}
    />
  )
}
