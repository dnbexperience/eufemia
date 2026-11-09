import ListSummaryFromEdges from '../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-data'
import { getChatComponents } from '../../../../shared/parts/listEdges'

export default function ListChatComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getChatComponents(regularMdxNodes)}
      {...props}
    />
  )
}
