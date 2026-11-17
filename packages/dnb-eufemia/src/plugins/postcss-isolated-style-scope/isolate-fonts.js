const valueParser = require('postcss-value-parser')
const revisions = require('./font-revisions.js')
const families = new Map(
  Object.entries(revisions.families).map(([name, revision]) => [
    name.toLowerCase(),
    revision,
  ])
)

// Match complete family names, including unquoted multi-word names. Functions
// are traversed for var() fallbacks, but their names and URLs stay untouched.
function rewriteFamilies(nodes, start = 0) {
  for (let index = start; index < nodes.length; index++) {
    const node = nodes[index]
    if (node.type === 'function') {
      if (node.value.toLowerCase() === 'var') {
        const comma = node.nodes.findIndex(
          (entry) => entry.type === 'div' && entry.value === ','
        )
        if (comma !== -1) {
          rewriteFamilies(node.nodes, comma + 1)
        }
      }
      continue
    }
    if (node.type === 'string') {
      node.value = families.get(node.value.toLowerCase()) || node.value
      continue
    }
    if (node.type !== 'word') {
      continue
    }
    let end = index + 1
    while (['space', 'comment', 'word'].includes(nodes[end]?.type)) {
      end++
    }
    while (['space', 'comment'].includes(nodes[end - 1]?.type)) {
      end--
    }
    const name = nodes
      .slice(index, end)
      .filter((entry) => entry.type === 'word')
      .map((entry) => entry.value)
      .join(' ')
      .toLowerCase()
    const replacement = families.get(name)
    if (replacement) {
      node.type = 'string'
      node.quote = '"'
      node.value = replacement
      nodes.splice(index + 1, end - index - 1)
    } else {
      index = end - 1
    }
  }
}

function rewriteShorthand(nodes) {
  for (const node of nodes) {
    if (node.type === 'function' && /^var$/i.test(node.value)) {
      const comma = node.nodes.findIndex(
        (entry) => entry.type === 'div' && entry.value === ','
      )
      if (comma !== -1) {
        const fallback = node.nodes.slice(comma + 1)
        rewriteShorthand(fallback)
        node.nodes.splice(comma + 1, node.nodes.length, ...fallback)
      }
    }
  }
  // The family follows the size and optional line-height in a shorthand.
  const size = nodes.findIndex(
    (node) =>
      node.type === 'word' &&
      (/^(?:0|xx?-small|small|medium|large|xx?-large|xxx-large|smaller|larger)$/i.test(
        node.value
      ) ||
        /^(?:[0-9.]+)(?:px|rem|em|%|pt|pc|in|cm|mm|q|ex|ch|cap|ic|lh|rlh|vw|vh|vi|vb|vmin|vmax)$/i.test(
          node.value
        ))
  )
  const dynamicSize = nodes.findIndex(
    (node) =>
      node.type === 'function' &&
      /^(var|calc|min|max|clamp)$/i.test(node.value)
  )
  if (size === -1 && dynamicSize === -1) {
    return
  }
  let start = (size === -1 ? dynamicSize : size) + 1
  while (nodes[start]?.type === 'space') {
    start++
  }
  if (nodes[start]?.type === 'div' && nodes[start].value === '/') {
    start += 2
  }
  rewriteFamilies(nodes, start)
}

module.exports = function isolateFonts(root) {
  root.walkDecls((decl) => {
    const property = decl.prop.toLowerCase()
    if (
      property !== 'font-family' &&
      property !== 'font' &&
      !/^--.*font/.test(property)
    ) {
      return
    }
    const parsed = valueParser(decl.value)
    if (property !== 'font-family') {
      rewriteShorthand(parsed.nodes)
    }
    if (property !== 'font') {
      rewriteFamilies(parsed.nodes)
    }
    decl.value = parsed.toString()
  })
}
