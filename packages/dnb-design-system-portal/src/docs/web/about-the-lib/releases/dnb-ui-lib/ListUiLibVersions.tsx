import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getUiLibVersions } from '../../../../../shared/parts/listEdges'

export default function ListUiLibVersions(props) {
  return (
    <ListSummaryFromEdges
      edges={getUiLibVersions(regularMdxNodes)}
      {...props}
    />
  )
}
