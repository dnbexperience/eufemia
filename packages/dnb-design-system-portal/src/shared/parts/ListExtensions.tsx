import ListSummaryFromEdges from './ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getExtensions } from './listEdges'

export default function ListExtensions(props) {
  return (
    <ListSummaryFromEdges
      edges={getExtensions(regularMdxNodes)}
      {...props}
    />
  )
}
