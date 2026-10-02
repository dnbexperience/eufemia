import ListSummaryFromEdges from '../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getAiComponents } from '../../../../shared/parts/listEdges'

export default function ListAiComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getAiComponents(regularMdxNodes)}
      {...props}
    />
  )
}
