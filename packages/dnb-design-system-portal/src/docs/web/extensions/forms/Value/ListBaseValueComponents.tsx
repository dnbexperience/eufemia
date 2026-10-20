import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getBaseValueComponents } from '../../../../../shared/parts/listEdges'

export default function ListBaseValueComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getBaseValueComponents(regularMdxNodes)}
      {...props}
    />
  )
}
