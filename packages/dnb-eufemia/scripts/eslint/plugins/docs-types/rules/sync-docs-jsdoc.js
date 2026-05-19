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

    for (const innerProp of prop.initializer.properties) {
      if (!ts.isPropertyAssignment(innerProp)) {
        continue
      }

      const innerName = getTsPropertyName(innerProp)
      if (innerName !== 'doc') {
        continue
      }

      const docValue = getStringLiteralValue(innerProp.initializer)
      if (docValue !== null) {
        docs.set(propName, docValue)
      }
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

function getDocsMap(dir) {
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
      const extracted = extractDocsFromFile(filePath)

      for (const [key, value] of extracted) {
        docs.set(key, value)
        fileMap.set(key, file)
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

    const filename = context.filename || context.getFilename()

    if (/Docs\.[jt]sx?$/.test(path.basename(filename))) {
      return {} // stop here
    }

    if (/\.(test|spec|stories)\.[jt]sx?$/.test(filename)) {
      return {} // stop here
    }

    const resolvedPath = path.resolve(filename)
    const dir = path.dirname(resolvedPath)
    const docsData = getDocsMap(dir)

    if (!docsData) {
      return {} // stop here
    }

    const options = context.options[0] || {}
    const requireJsdoc = options.requireJsdoc === true
    const sourceCode = context.sourceCode || context.getSourceCode()

    function checkProperty(node) {
      const propName = getEslintPropertyName(node)

      if (!propName || !docsData.docs.has(propName)) {
        return // stop here
      }

      const expectedDoc = docsData.docs.get(propName)
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
          context.report({
            node: node.key,
            messageId: 'missingJsdoc',
            data: { docsFile, expected: expectedDoc },
            fix(fixer) {
              const line = sourceCode.lines[node.loc.start.line - 1]
              const match = line.match(/^(\s*)/)
              const indent = match ? match[1] : ''
              const jsdoc = `/**\n${indent} * ${expectedDoc}\n${indent} */\n${indent}`
              return fixer.insertTextBefore(node, jsdoc)
            },
          })
        }

        return // stop here
      }

      const existingDoc = extractJsdocText(jsdocComment.value)
      const tags = extractJsdocTags(jsdocComment.value)

      if (existingDoc !== expectedDoc) {
        context.report({
          node: node.key,
          messageId: 'mismatchedJsdoc',
          data: { docsFile, expected: expectedDoc },
          fix(fixer) {
            let replacement

            if (tags.length > 0) {
              const commentNode = jsdocComment
              const startLine =
                sourceCode.lines[commentNode.loc.start.line - 1]
              const indentMatch = startLine.match(/^(\s*)/)
              const indent = indentMatch ? indentMatch[1] : ''
              const tagLines = tags
                .map((tag) => `${indent} * ${tag}`)
                .join('\n')
              replacement = `/**\n${indent} * ${expectedDoc}\n${tagLines}\n${indent} */`
            } else {
              const commentNode = jsdocComment
              const startLine =
                sourceCode.lines[commentNode.loc.start.line - 1]
              const indentMatch = startLine.match(/^(\s*)/)
              const indent = indentMatch ? indentMatch[1] : ''
              replacement = `/**\n${indent} * ${expectedDoc}\n${indent} */`
            }

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
