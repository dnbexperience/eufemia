import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-data'
import { getElements } from './listEdges'

export default function ListElements() {
  return (
    <ListSummaryFromEdges
      edges={getElements(regularMdxNodes)}
      returnListItems
    />
  )
}
