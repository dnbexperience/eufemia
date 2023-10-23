const visit = require('unist-util-visit')
const toString = require('mdast-util-to-string')
const { compileMDXWithCustomOptions } = require('gatsby-plugin-mdx')

function remarkHeadingsPlugin() {
  return async function transformer(tree, file) {
    let headings = []

    visit(tree, 'heading', (heading) => {
      headings.push({
        value: toString(heading),
        depth: heading.depth,
      })
    })

    const mdxFile = file
    if (!mdxFile.data.meta) {
      mdxFile.data.meta = {}
    }

    mdxFile.data.meta.headings = headings
  }
}

function makeHeadingsResolver({
  getNode,
  getNodesByType,
  pathPrefix,
  reporter,
  cache,
  schema,
  store,
}) {
  return schema.buildObjectType({
    name: 'Mdx',
    fields: {
      headings: {
        type: '[MdxHeading]',
        async resolve(mdxNode) {
          const fileNode = getNode(mdxNode.parent)

          if (!fileNode) {
            return null
          }

          const result = await compileMDXWithCustomOptions(
            {
              source: mdxNode.body,
              absolutePath: fileNode.absolutePath,
            },
            {
              pluginOptions: {},
              customOptions: {
                mdxOptions: {
                  remarkPlugins: [remarkHeadingsPlugin],
                },
              },
              getNode,
              getNodesByType,
              pathPrefix,
              reporter,
              cache,
              store,
            },
          )

          if (!result) {
            return null
          }

          return result.metadata.headings
        },
      },
    },
  })
}

exports.remarkHeadingsPlugin = remarkHeadingsPlugin
exports.makeHeadingsResolver = makeHeadingsResolver
