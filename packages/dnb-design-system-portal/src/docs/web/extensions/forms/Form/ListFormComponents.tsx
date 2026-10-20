import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getFormComponents } from '../../../../../shared/parts/listEdges'

export default function ListFormComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getFormComponents(regularMdxNodes)}
      {...props}
    />
  )
}
