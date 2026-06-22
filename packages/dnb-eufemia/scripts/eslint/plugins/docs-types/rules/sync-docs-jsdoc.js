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

// Strips the conventional suffix from a *docs export* variable name to get its
// component base, e.g. "MenuButtonProperties" → "MenuButton". Docs exports use
// the "Properties" / "Props" / "Events" suffixes.
function stripDocsSuffix(varName) {
  return varName.replace(/(Properties|Props|Events)$/, '')
}

// Strips the conventional suffix from a *source type/interface* name to get its
// component base, e.g. "MenuButtonProps" → "MenuButton". The suffix set
// deliberately differs from stripDocsSuffix: source types can be "...AllProps"
// but never "...Events", whereas docs exports can be "...Events" but never
// "...AllProps". Keep both in sync with their respective naming conventions.
function stripTypeSuffix(typeName) {
  return typeName.replace(/(AllProps|Props|Properties)$/, '')
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

  // Docs grouped by their component base name (e.g. "MenuButton"), so a
  // property can be resolved against the export group that matches its
  // enclosing type, e.g. type "MenuButtonProps" → "MenuButtonProperties".
  // Groups sharing a base (e.g. "MenuRootProperties" and "MenuRootEvents")
  // are merged together.
  const groupMap = new Map()

  // Whether the source file name maps to a docs file in this directory,
  // either by sharing its prefix (e.g. "FilterSortButton" ↔ "FilterDocs")
  // or by matching an export group name (e.g. "ItemCenter" ↔
  // "ItemCenterProperties"). When it does not, the merged docs map is an
  // arbitrary mix of unrelated groups and must not be used as a fallback.
  let fileMatched = false

  for (const file of files) {
    const filePath = path.join(dir, file)

    try {
      const groups = extractGroupedDocsFromFile(filePath)

      for (const [varName, props] of groups) {
        const base = stripDocsSuffix(varName)

        let group = groupMap.get(base)

        if (!group) {
          // `file` records where the group was first seen. When one base
          // spans several docs files, the reported docsFile may therefore
          // point at the first contributing file rather than the exact one
          // a later merged property came from — acceptable for an error
          // message, which only needs to name a relevant docs file.
          group = { props: new Map(), file }
          groupMap.set(base, group)
        }

        for (const [key, value] of props) {
          group.props.set(key, value)
        }
      }

      // Derive the component prefix from the docs filename,
      // e.g. "FilterDocs.ts" → "Filter"
      const docsPrefix = file.replace(/Docs\.[jt]sx?$/, '')

      // Derive the sub-component name from the source filename,
      // e.g. sourceBasename "FilterSortButton" with prefix "Filter"
      //      → subComponent "SortButton"
      let subComponent = null

      if (sourceBasename && sourceBasename.startsWith(docsPrefix)) {
        subComponent = sourceBasename.slice(docsPrefix.length)
        fileMatched = true
      }

      // When the source file name does not share the docs-file prefix
      // (e.g. "ItemCenter.tsx" alongside "ListDocs.ts"), match the source
      // file name directly against an export group name instead, e.g.
      // "ItemCenter" → "ItemCenterProperties". Without this, the ambiguous
      // match would merge every group and the last one would win, producing
      // the wrong docs for sibling sub-components.
      let explicitGroups = null

      if (!subComponent && groups.size > 1 && sourceBasename) {
        explicitGroups = new Set()

        for (const [varName] of groups) {
          const base = stripDocsSuffix(varName)

          if (base === sourceBasename) {
            explicitGroups.add(varName)
          }
        }

        if (explicitGroups.size === 0) {
          explicitGroups = null
        } else {
          fileMatched = true
        }
      }

      for (const [varName, props] of groups) {
        // When a sub-component name is known and multiple groups exist,
        // only include exports that belong to this sub-component.
        if (subComponent && groups.size > 1) {
          if (!varName.startsWith(subComponent)) {
            continue
          }
        }

        // When matching the source file name directly to export groups,
        // only include the matched group(s).
        if (explicitGroups && !explicitGroups.has(varName)) {
          continue
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

  // A source file maps to the directory's docs when its name matches a docs
  // file or export group (see above), or when the directory has a single
  // docs file (the common "types.ts" + "XDocs.ts" convention). When there
  // are several docs files (e.g. the typography directory's Ingress/Lead/P/
  // Typography docs), a source file with no name match (e.g. "H.tsx") has no
  // source of truth and must be left untouched.
  return {
    docs,
    fileMap,
    groupMap,
    fileCount: files.length,
    // A missing source basename is treated as "matched": there is nothing to
    // disambiguate by, so fall back to the merged map rather than skipping.
    fileMatched: fileMatched || !sourceBasename,
  }
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

    if (/\.(test|spec)\.[jt]sx?$/.test(filename)) {
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

    // Walks up to the nearest named type/interface declaration and returns
    // its identifier, e.g. a property inside `type MenuButtonProps = {…}`
    // resolves to "MenuButtonProps".
    function getEnclosingTypeName(node) {
      let current = node.parent

      while (current) {
        if (
          current.type === 'TSInterfaceDeclaration' ||
          current.type === 'TSTypeAliasDeclaration'
        ) {
          return current.id && current.id.name ? current.id.name : null
        }

        current = current.parent
      }

      return null
    }

    // Resolves the doc entry for a property, preferring the export group that
    // matches the property's enclosing type (e.g. "MenuButtonProps" →
    // "MenuButtonProperties"), and falling back to the file-level docs map.
    function resolveDoc(propName, node) {
      const typeName = getEnclosingTypeName(node)

      if (typeName) {
        const base = stripTypeSuffix(typeName)
        const group = docsData.groupMap.get(base)

        if (group && group.props.has(propName)) {
          return { entry: group.props.get(propName), docsFile: group.file }
        }
      }

      // A directory is unambiguous only when it has a single docs file with a
      // single group. In that case the merged map is the one source of truth
      // and applies to any source file in the directory (e.g. the common
      // "types.ts" + "XDocs.ts" convention). When there are several docs files
      // or several groups, only fall back to the merged map for files that map
      // to this directory's docs, and only for the component's own props type
      // (e.g. "DrawerListProps"), never for nested data types declared in the
      // same file (e.g. "DrawerListDataArrayObject") which would otherwise
      // inherit unrelated component-level text.
      const unambiguous =
        docsData.groupMap.size <= 1 && docsData.fileCount <= 1

      const isComponentPropsType =
        !typeName || /(Props|Properties)$/.test(typeName)

      if (
        (unambiguous || (docsData.fileMatched && isComponentPropsType)) &&
        docsData.docs.has(propName)
      ) {
        return {
          entry: docsData.docs.get(propName),
          docsFile: docsData.fileMap.get(propName),
        }
      }

      return null
    }

    function checkProperty(node) {
      const propName = getEslintPropertyName(node)

      if (!propName) {
        return // stop here
      }

      const resolved = resolveDoc(propName, node)

      if (!resolved) {
        return // stop here
      }

      const { doc: expectedDoc, defaultValue: expectedDefault } =
        resolved.entry
      const docsFile = resolved.docsFile

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
              const line = sourceCode.getText().split('\n')[
                node.loc.start.line - 1
              ]
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
            const startLine = sourceCode.getText().split('\n')[
              commentNode.loc.start.line - 1
            ]
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
