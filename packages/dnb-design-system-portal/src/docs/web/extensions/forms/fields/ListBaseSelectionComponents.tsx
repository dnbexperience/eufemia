import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-data'
import { getBaseSelectionComponents } from '../../../../../shared/parts/listEdges'

export default function ListBaseSelectionComponents() {
  return (
    <ListSummaryFromEdges
      space={{ top: 'x-small' }}
      level={3}
      size="medium"
      description=""
      edges={getBaseSelectionComponents(regularMdxNodes)}
    />
  )
}
