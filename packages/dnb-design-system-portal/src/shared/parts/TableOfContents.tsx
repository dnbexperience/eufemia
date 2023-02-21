import { Anchor, Ul, Li } from '@dnb/eufemia/src/elements'

type Headings = Array<{ value: string; depth: number }>

type TableOfContentsProps = {
  edges: Array<{
    node: { headings: Headings }
  }>
}

const TableOfContents = ({ edges }: TableOfContentsProps) => {
  const orderedHeadings = edges.map((edge) =>
    orderHeadings(edge.node.headings)
  )

  return (
    <Ul>
      {orderedHeadings.map((heading) => (
        <TableOfContentsItem
          key={`${heading.value}-${heading.depth}`}
          {...heading}
        />
      ))}
    </Ul>
  )
}

type TableOfContentsItemProps = {
  slug?: string
  value: string
  depth: number
  subheadings: TableOfContentsItemProps[]
}

function TableOfContentsItem({
  slug,
  value,
  subheadings,
}: TableOfContentsItemProps) {
  const itemSlug =
    value
      .replace(/((\.|,|\(|\))+)/gim, '')
      .replace(/\s+/gim, '-')
      .toLocaleLowerCase() ?? ''

  return (
    <Li>
      <Anchor href={`/${slug}#${itemSlug}`}>{value}</Anchor>
      {subheadings.length > 0 && (
        <Ul>
          {subheadings.map((heading) => (
            <TableOfContentsItem
              key={`${heading.value}-${heading.depth}`}
              slug={slug}
              {...heading}
            />
          ))}
        </Ul>
      )}
    </Li>
  )
}

function orderHeadings(headings: Headings) {
  let parentId = undefined
  let previousDepthLevel = undefined
  const mainHeading = headings[0]
  const subHeadings = headings.slice(1)

  const mapParentIdsToHeadings = subHeadings.map(
    ({ value, depth }, index, array) => {
      if (depth > previousDepthLevel) {
        parentId = array[index - 1].value
      }

      if (depth < previousDepthLevel) {
        parentId = undefined
      }

      if (previousDepthLevel !== depth) {
        previousDepthLevel = depth
      }

      return { value, depth, parentId }
    }
  )

  const convertToTree = (array, parentId = undefined) => {
    return array
      .filter((heading) => heading.parentId === parentId)
      .map((heading) => ({
        ...heading,
        subheadings: convertToTree(array, heading.value),
      }))
  }

  return {
    ...mainHeading,
    subheadings: convertToTree(mapParentIdsToHeadings),
  }
}

export default TableOfContents
