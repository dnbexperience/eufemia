import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'
import { regularMdxNodes } from 'virtual:portal-pages'

export default function ListAllBlocks(props) {
  const edges = regularMdxNodes.filter(({ fields }) => {
    const parentPath = fields.slug.split('/').slice(0, -1).join('/')

    return parentPath === 'uilib/extensions/forms/blocks'
  })

  return <ListSummaryFromEdges edges={edges} {...props} />
}
