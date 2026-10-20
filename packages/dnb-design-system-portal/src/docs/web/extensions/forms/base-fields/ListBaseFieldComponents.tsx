import { regularMdxNodes } from 'virtual:portal-pages'
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
