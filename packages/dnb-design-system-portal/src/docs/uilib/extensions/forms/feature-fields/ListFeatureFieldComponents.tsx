import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListFeatureFieldComponents(props) {
  const edges = regularMdxNodes.filter(({ fields, frontmatter }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return (
      parentPath === 'uilib/extensions/forms/feature-fields' &&
      frontmatter.showTabs
    )
  })
  return <ListSummaryFromEdges edges={edges} {...props} />
}
