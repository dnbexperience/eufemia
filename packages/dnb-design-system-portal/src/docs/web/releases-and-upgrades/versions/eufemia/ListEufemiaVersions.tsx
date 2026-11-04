import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-data'
import { getEufemiaVersions } from '../../../../../shared/parts/listEdges'

export default function ListEufemiaVersions(props) {
  return (
    <ListSummaryFromEdges
      edges={getEufemiaVersions(regularMdxNodes)}
      {...props}
    />
  )
}
