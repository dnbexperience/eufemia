import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes, globPath } from 'virtual:portal-pages'

export default function ListWizardComponents(props) {
  const edges = regularMdxNodes.filter((node) =>
    globPath(node, 'uilib/extensions/forms/Wizard/**/*')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
