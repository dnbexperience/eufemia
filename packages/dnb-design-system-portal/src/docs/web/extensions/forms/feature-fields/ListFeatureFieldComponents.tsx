import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getFeatureFieldComponents } from '../../../../../shared/parts/listEdges'

export default function ListFeatureFieldComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getFeatureFieldComponents(regularMdxNodes)}
      {...props}
    />
  )
}
