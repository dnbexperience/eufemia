const path = require('path')
const valueParser = require('postcss-value-parser')
const revisions = require('../postcss-isolated-style-scope/font-revisions.js')
const { files } = revisions

const basePath = 'https://assets.eufemia.dnb.no/font-files/'

module.exports = function rewriteContentAddressedFonts(value) {
  const parsed = valueParser(value)
  const entries = []
  let entry = []
  for (const node of parsed.nodes) {
    if (node.type === 'div' && node.value === ',') {
      entries.push(entry)
      entry = []
    } else {
      entry.push(node)
    }
  }
  entries.push(entry)

  return entries
    .map((nodes) => {
      const original = valueParser.stringify(nodes).trim()
      const url = nodes.find(
        (node) => node.type === 'function' && node.value === 'url'
      )
      const source =
        url && valueParser.stringify(url.nodes).replace(/^['"]|['"]$/g, '')
      // Keep an already content-addressed URL and its package fallback intact.
      if (
        !source ||
        source.startsWith(basePath) ||
        /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(source)
      ) {
        return original
      }
      const relativePath = source.split('/assets/fonts/')[1]
      const hash = files[relativePath]
      if (!hash) {
        return original
      }
      url.nodes = [
        {
          type: 'string',
          quote: '"',
          value: `${basePath}${hash}${path.posix.extname(relativePath)}`,
        },
      ]
      return `${valueParser.stringify(nodes).trim()}, ${original}`
    })
    .join(', ')
}
