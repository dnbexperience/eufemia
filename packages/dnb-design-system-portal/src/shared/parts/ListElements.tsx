import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getElements } from './listEdges'

export default function ListElements() {
  return (
    <ListSummaryFromEdges
      edges={getElements(regularMdxNodes)}
      returnListItems
    />
  )
}
