import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'
import { getWizardComponents } from '../../../../../shared/parts/listEdges'

export default function ListWizardComponents(props) {
  return (
    <ListSummaryFromEdges
      edges={getWizardComponents(regularMdxNodes)}
      {...props}
    />
  )
}
