import { regularMdxNodes } from 'virtual:portal-data'
import { getBaseFieldComponents } from '../../../../../shared/parts/listEdges'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

export default function ListBaseFieldComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getBaseFieldComponents(regularMdxNodes)}
      {...props}
    />
  )
}
