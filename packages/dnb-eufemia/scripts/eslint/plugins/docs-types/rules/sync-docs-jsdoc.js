const fs = require('fs')
const path = require('path')

let ts
try {
  ts = require('typescript')
} catch {
  // TypeScript not available — rule will be disabled
}

/**
 * Extracts property name → doc string pairs from a *Docs file.
 * Uses the TypeScript compiler API for robust parsing.
 */
function extractDocsFromFile(filePath) {
  if (!ts) {
    return new Map()
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  )

  const docs = new Map()

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      extractFromObjectLiteral(node.initializer, docs)
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return docs
}

/**
 * Like extractDocsFromFile, but returns docs grouped by their export
 * variable name.  e.g. { SortButtonProperties: Map { data → …, … } }
 */
function extractGroupedDocsFromFile(filePath) {
  if (!ts) {
    return new Map()
  }

  const content = fs.readFileSync(filePath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  )

  const groups = new Map()

  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isObjectLiteralExpression(node.initializer) &&
      node.name &&
      ts.isIdentifier(node.name)
    ) {
      const varName = node.name.text
      const props = new Map()
      extractFromObjectLiteral(node.initializer, props)

      if (props.size > 0) {
        groups.set(varName, props)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return groups
}

function extractFromObjectLiteral(objLiteral, docs) {
  for (const prop of objLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue
    }

    const propName = getTsPropertyName(prop)
    if (!propName) {
      continue
    }

    if (!ts.isObjectLiteralExpression(prop.initializer)) {
      continue
    }

    let doc = null
    let defaultValue = null

    for (const innerProp of prop.initializer.properties) {
      if (!ts.isPropertyAssignment(innerProp)) {
        continue
      }

      const innerName = getTsPropertyName(innerProp)

      if (innerName === 'doc') {
        doc = getStringLiteralValue(innerProp.initializer)
      } else if (innerName === 'defaultValue') {
        defaultValue = getStringLiteralValue(innerProp.initializer)
      }
    }

    if (doc !== null) {
      docs.set(propName, { doc, defaultValue })
    }
  }
}

function getTsPropertyName(prop) {
  if (ts.isIdentifier(prop.name)) {
    return prop.name.text
  }

  if (ts.isStringLiteral(prop.name)) {
    return prop.name.text
  }

  return null
}

function getStringLiteralValue(node) {
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return node.text
  }

  return null
}

function getEslintPropertyName(node) {
  if (node.key.type === 'Identifier') {
    return node.key.name
  }

  if (node.key.type === 'Literal' && typeof node.key.value === 'string') {
    return node.key.value
  }

  return null
}

function extractJsdocText(commentValue) {
  return commentValue
    .split('\n')
    .map((line) => line.replace(/^\s*\*\s?/, ''))
    .filter(
      (line) => line.trim().length > 0 && !line.trim().startsWith('@')
    )
    .join(' ')
    .trim()
}

/**
 * Separates the main doc text from a trailing `Default: \`...\`` line.
 * Returns { docText, defaultValue } where defaultValue is the inner
 * content of the backticks, or null if no default line is present.
 */
function splitDefaultFromDoc(fullText) {
  const match = fullText.match(/^(.*?)\s*Default:\s*`([^`]*)`\.?$/)

  if (match) {
    return {
      docText: match[1].replace(/\s+$/, ''),
      defaultValue: match[2],
    }
  }

  return { docText: fullText, defaultValue: null }
}

function extractJsdocTags(commentValue) {
  const tags = []
  const lines = commentValue.split('\n')

  let currentTag = null

  for (const line of lines) {
    const stripped = line.replace(/^\s*\*\s?/, '')

    if (/^\s*@\w+/.test(stripped)) {
      if (currentTag) {
        tags.push(currentTag)
      }

      currentTag = stripped.trim()
    } else if (currentTag && stripped.trim().length > 0) {
      currentTag += ' ' + stripped.trim()
    }
  }

  if (currentTag) {
    tags.push(currentTag)
  }

  return tags
}

function getDocsMap(dir, sourceBasename) {
  let files

  try {
    files = fs.readdirSync(dir).filter((f) => /Docs\.[jt]sx?$/.test(f))
  } catch {
    return null
  }

  if (files.length === 0) {
    return null
  }

  const docs = new Map()
  const fileMap = new Map()

  for (const file of files) {
    const filePath = path.join(dir, file)

    try {
      const groups = extractGroupedDocsFromFile(filePath)

      // Derive the component prefix from the docs filename,
      // e.g. "FilterDocs.ts" → "Filter"
      const docsPrefix = file.replace(/Docs\.[jt]sx?$/, '')

      // Derive the sub-component name from the source filename,
      // e.g. sourceBasename "FilterSortButton" with prefix "Filter"
      //      → subComponent "SortButton"
      let subComponent = null

      if (sourceBasename && sourceBasename.startsWith(docsPrefix)) {
        subComponent = sourceBasename.slice(docsPrefix.length)
      }

      for (const [varName, props] of groups) {
        // When a sub-component name is known and multiple groups exist,
        // only include exports that belong to this sub-component.
        if (subComponent && groups.size > 1) {
          if (!varName.startsWith(subComponent)) {
            continue
          }
        }

        for (const [key, value] of props) {
          docs.set(key, value)
          fileMap.set(key, file)
        }
      }
    } catch {
      // Skip files that fail to parse
    }
  }

  if (docs.size === 0) {
    return null
  }

  return { docs, fileMap }
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Ensures JSDoc comments on type properties match the doc strings in sibling *Docs files.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          requireJsdoc: {
            type: 'boolean',
            description:
              'When true, also reports missing JSDoc for properties documented in the *Docs file.',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      mismatchedJsdoc:
        'JSDoc does not match the doc string in {{ docsFile }}. Expected: "{{ expected }}".',
      missingJsdoc:
        'Missing JSDoc for documented property. Expected (from {{ docsFile }}): "{{ expected }}".',
    },
  },

  create(context) {
    if (!ts) {
      return {}
    }

    const filename = context.filename

    if (/Docs\.[jt]sx?$/.test(path.basename(filename))) {
      return {} // stop here
    }

    if (/\.(test|spec|stories)\.[jt]sx?$/.test(filename)) {
      return {} // stop here
    }

    const resolvedPath = path.resolve(filename)
    const dir = path.dirname(resolvedPath)
    const sourceBasename = path
      .basename(filename)
      .replace(/\.[jt]sx?$/, '')
    const docsData = getDocsMap(dir, sourceBasename)

    if (!docsData) {
      return {} // stop here
    }

    const options = context.options[0] || {}
    const requireJsdoc = options.requireJsdoc === true
    const sourceCode = context.sourceCode

    function buildExpectedDoc(doc, defaultValue) {
      if (defaultValue != null) {
        return `${doc}\nDefault: \`${defaultValue}\``
      }

      return doc
    }

    function buildJsdocBlock(indent, doc, defaultValue, tags) {
      const lines = [`/**`, `${indent} * ${doc}`]

      if (defaultValue != null) {
        lines.push(`${indent} * Default: \`${defaultValue}\``)
      }

      if (tags.length > 0) {
        for (const tag of tags) {
          lines.push(`${indent} * ${tag}`)
        }
      }

      lines.push(`${indent} */`)
      return lines.join('\n')
    }

    function checkProperty(node) {
      const propName = getEslintPropertyName(node)

      if (!propName || !docsData.docs.has(propName)) {
        return // stop here
      }

      const { doc: expectedDoc, defaultValue: expectedDefault } =
        docsData.docs.get(propName)
      const docsFile = docsData.fileMap.get(propName)

      const comments = sourceCode.getCommentsBefore(node)

      let jsdocComment = null
      for (const c of comments) {
        if (c.type === 'Block' && c.value.startsWith('*')) {
          jsdocComment = c
        }
      }

      if (!jsdocComment) {
        if (requireJsdoc) {
          const expected = buildExpectedDoc(expectedDoc, expectedDefault)
          context.report({
            node: node.key,
            messageId: 'missingJsdoc',
            data: { docsFile, expected },
            fix(fixer) {
              const line = sourceCode.lines[node.loc.start.line - 1]
              const match = line.match(/^(\s*)/)
              const indent = match ? match[1] : ''
              const jsdoc =
                buildJsdocBlock(indent, expectedDoc, expectedDefault, []) +
                `\n${indent}`
              return fixer.insertTextBefore(node, jsdoc)
            },
          })
        }

        return // stop here
      }

      const fullJsdocText = extractJsdocText(jsdocComment.value)
      const tags = extractJsdocTags(jsdocComment.value)
      const { docText: existingDoc, defaultValue: existingDefault } =
        splitDefaultFromDoc(fullJsdocText)

      const docMatches = existingDoc === expectedDoc
      const defaultMatches =
        (expectedDefault == null && existingDefault == null) ||
        existingDefault === expectedDefault

      if (!docMatches || !defaultMatches) {
        const expected = buildExpectedDoc(expectedDoc, expectedDefault)
        context.report({
          node: node.key,
          messageId: 'mismatchedJsdoc',
          data: { docsFile, expected },
          fix(fixer) {
            const commentNode = jsdocComment
            const startLine =
              sourceCode.lines[commentNode.loc.start.line - 1]
            const indentMatch = startLine.match(/^(\s*)/)
            const indent = indentMatch ? indentMatch[1] : ''
            const replacement = buildJsdocBlock(
              indent,
              expectedDoc,
              expectedDefault,
              tags
            )

            return fixer.replaceTextRange(jsdocComment.range, replacement)
          },
        })
      }
    }

    return {
      TSPropertySignature: checkProperty,
      TSMethodSignature: checkProperty,
    }
  },
}

module.exports.extractDocsFromFile = extractDocsFromFile
module.exports.extractJsdocText = extractJsdocText
module.exports.extractJsdocTags = extractJsdocTags
module.exports.splitDefaultFromDoc = splitDefaultFromDoc
