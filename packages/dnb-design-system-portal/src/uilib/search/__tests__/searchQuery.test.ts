import queries from '../searchQuery'

jest.mock('../searchHelpers', () => {
  return { runQueriesWhen: () => true, getIndexName: () => 'indexName' }
})

describe('searchQuery', () => {
  const { indexName, transformer } = queries[0]

  const makeNode = (node) => {
    const edges = [
      {
        node: { siblings: [], headings: [], ...node },
      },
    ]
    const data = { pages: { edges } }

    return { data }
  }

  it('should skip node when no title is found', () => {
    expect(
      transformer(makeNode({ slug: '/page', frontmatter: {} }))
    ).toHaveLength(0)
  })

  it('should remove node when skipSearch is given', () => {
    expect(
      transformer(
        makeNode({ slug: '/page', frontmatter: { skipSearch: true } })
      )
    ).toHaveLength(0)
  })

  it('should collect headings', () => {
    expect(
      transformer(
        makeNode({
          slug: '/page',
          frontmatter: {},
          headings: [{ value: 'Heading 1', depth: 1 }],
        })
      )
    ).toEqual([{ headings: [], slug: '/page', title: 'Heading 1' }])
  })

  it('should collect frontmatter title and headings', () => {
    expect(
      transformer(
        makeNode({
          slug: '/page',
          frontmatter: { title: 'Title 1' },
          headings: [
            { value: 'Heading 1', depth: 1 },
            { value: 'Heading 2', depth: 2 },
          ],
        })
      )
    ).toEqual([
      {
        slug: '/page',
        title: 'Title 1',
        headings: [
          {
            slug: 'heading-1',
            value: 'Heading 1',
            depth: 1,
          },
          {
            slug: 'heading-2',
            value: 'Heading 2',
            depth: 2,
          },
        ],
      },
    ])
  })

  it('should use frontmatter search field as title', () => {
    expect(
      transformer(
        makeNode({
          slug: '/page',
          frontmatter: { search: 'search string' },
          headings: [{ value: 'Heading 1', depth: 1 }],
        })
      )
    ).toEqual([
      {
        slug: '/page',
        title: 'search string',
        search: null,
        headings: [
          {
            slug: 'heading-1',
            value: 'Heading 1',
            depth: 1,
          },
        ],
      },
    ])
  })

  it('should collect siblings and use it as category', () => {
    expect(
      transformer(
        makeNode({
          slug: '/page-1',
          frontmatter: { title: 'Title 1' },
          headings: [{ value: 'Heading 1', depth: 1 }],
          siblings: [
            {
              slug: '/page-2',
              frontmatter: { title: 'Title 2' },
              headings: [{ value: 'Heading 2', depth: 1 }],
            },
          ],
        })
      )
    ).toEqual([
      {
        category: {
          headings: [{ depth: 1, value: 'Heading 2' }],
          slug: '/page-2',
          title: 'Title 2',
        },
        headings: [{ depth: 1, slug: 'heading-1', value: 'Heading 1' }],
        slug: '/page-1',
        title: 'Title 1',
      },
    ])
  })

  it('should use heading depth 2 from headings, when no title else exist', () => {
    expect(
      transformer(
        makeNode({
          slug: '/page-1',
          frontmatter: {},
          headings: [
            { value: 'Heading 2', depth: 2 },
            { value: 'Heading 3', depth: 3 },
          ],
          siblings: [
            {
              slug: '/page-2',
              frontmatter: { title: 'Title 2' },
              headings: [{ value: 'Heading 2', depth: 1 }],
            },
          ],
        })
      )
    ).toEqual([
      {
        category: {
          headings: [{ depth: 1, value: 'Heading 2' }],
          slug: '/page-2',
          title: 'Title 2',
        },
        headings: [{ depth: 3, slug: 'heading-3', value: 'Heading 3' }],
        slug: '/page-1',
        title: 'Heading 2',
      },
    ])
  })

  it('should use title from siblings, when slug matches', () => {
    expect(
      transformer(
        makeNode({
          slug: '/page-1',
          frontmatter: {},
          headings: [
            { value: 'Heading 2', depth: 2 },
            { value: 'Heading 3', depth: 3 },
          ],
          siblings: [
            {
              slug: '/page-1',
              frontmatter: { title: 'Title 1' },
              headings: [{ value: 'Heading 1', depth: 1 }],
            },
          ],
        })
      )
    ).toEqual([
      {
        category: {
          headings: [{ depth: 1, value: 'Heading 1' }],
          slug: '/page-1',
          title: 'Title 1',
        },
        headings: [{ depth: 3, slug: 'heading-3', value: 'Heading 3' }],
        slug: '/page-1',
        title: 'Title 1 → Heading 2',
      },
    ])
  })

  it('should have indexName', () => {
    expect(indexName).toBe('indexName')
  })
})
