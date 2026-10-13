import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getFragments } from './listEdges'

export default function ListFragments() {
  return (
    <ListSummaryFromEdges
      level={3}
      edges={getFragments(regularMdxNodes)}
    />
  )
}
