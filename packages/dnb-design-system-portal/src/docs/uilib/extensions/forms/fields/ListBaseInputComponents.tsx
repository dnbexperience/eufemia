import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getBaseInputComponents } from '../../../../../shared/parts/listEdges'

export default function ListBaseInputComponents() {
  return (
    <ListSummaryFromEdges
      space={{ top: 'x-small' }}
      level={3}
      size="medium"
      description=""
      edges={getBaseInputComponents(regularMdxNodes)}
    />
  )
}
