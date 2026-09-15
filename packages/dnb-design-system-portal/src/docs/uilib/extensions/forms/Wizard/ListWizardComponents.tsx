import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListWizardComponents(props) {
  const edges = regularMdxNodes.filter(({ fields }) =>
    fields.slug.startsWith('uilib/extensions/forms/Wizard/')
  )

  return <ListSummaryFromEdges edges={edges} {...props} />
}
