import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getIterateComponents } from '../../../../../shared/parts/listEdges'

export default function ListComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getIterateComponents(regularMdxNodes)}
      {...props}
    />
  )
}
