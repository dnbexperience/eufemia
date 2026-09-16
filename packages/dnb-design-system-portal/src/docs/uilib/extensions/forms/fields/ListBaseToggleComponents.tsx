import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getBaseToggleComponents } from '../../../../../shared/parts/listEdges'

export default function ListBaseToggleComponents() {
  return (
    <ListSummaryFromEdges
      space={{ top: 'x-small' }}
      level={3}
      size="medium"
      description=""
      edges={getBaseToggleComponents(regularMdxNodes)}
    />
  )
}
