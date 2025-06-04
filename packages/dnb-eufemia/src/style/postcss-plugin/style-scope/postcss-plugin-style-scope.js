/**
 * This is written in JavaScript, because it is used directly by PostCSS.
 */

const path = require('path')
const fs = require('fs')
const selectorParser = require('postcss-selector-parser')
const { getStyleScopeHash } = require('./handleScopeHash.cjs')

function findPathToScopeHash(filePath) {
  const parts = filePath.split(path.sep)
  parts.pop() // Remove the filename
  let currentPath = parts[0] // Start with the first part (root on Unix, drive on Windows)

  for (let i = 1; i < parts.length; i++) {
    currentPath = path.join(currentPath, parts[i])
    const scopeHashPath = path.join(currentPath, 'scope-hash.txt')

    if (fs.existsSync(scopeHashPath)) {
      return currentPath
    }
  }

  return null
}

const postcssIsolateStyle = (opts = {}) => {
  const {
    scopeHash = 'auto',
    sharedScopeHash = undefined,
    defaultScopeHash = 'eufemia-scope--',
    skipClassNames = [],
    replaceClassNames = undefined,
    verbose = false,
    runAsCssModule = false,
  } = opts

  // Validate sharedScopeHash is a function if provided
  if (
    sharedScopeHash !== undefined &&
    typeof sharedScopeHash !== 'function'
  ) {
    throw new Error('sharedScopeHash must be a function')
  }

  const currentFallbackHash = getStyleScopeHash()
  const skipClassNamesSet = new Set(skipClassNames)
  const replaceClassNamesMap = replaceClassNames
    ? new Map(Object.entries(replaceClassNames))
    : undefined

  let countBefore = 0
  let countAfter = 0

  if (!verbose && !global.__didLog && process.env.NODE_ENV !== 'test') {
    global.__didLog = true
    console.log(`✨ @dnb/eufemia/style/postcss-plugin/style-scope`)
  }

  return {
    postcssPlugin: 'postcss-plugin-style-scope',

    Once(root) {
      const file = root.source?.input?.file ?? ''
      const isCssModule = runAsCssModule || file.includes('.module.')

      let fileFallbackHash = null
      // - Get the scope hash from the file
      if (scopeHash === 'auto') {
        const scopeHashFromFile = findPathToScopeHash(file)
        if (scopeHashFromFile) {
          const content = fs.readFileSync(
            path.join(scopeHashFromFile, 'scope-hash.txt'),
            'utf-8'
          )

          if (!content.includes(' ')) {
            fileFallbackHash = content
          }
        }
      }

      const fallbackHash = fileFallbackHash || currentFallbackHash
      const givenScope =
        typeof scopeHash === 'function' ? scopeHash(file) : scopeHash
      const scopeWithFallback =
        (scopeHash === 'auto' ? fallbackHash : givenScope) || fallbackHash

      // Get shared scope hashes if function is provided
      const sharedHashes = sharedScopeHash ? sharedScopeHash(file) : []

      root.walkRules((rule) => {
        countBefore += 1

        const selectorBefore = rule.selector

        if (
          rule.parent?.type === 'atrule' &&
          ['keyframes'].includes(rule.parent.name)
        ) {
          return
        }

        if (
          rule.selectors.length === 1 &&
          rule.selectors[0].trim() === ':root' &&
          Array.isArray(sharedHashes)
        ) {
          // For :root, create selectors for all hashes
          rule.selectors = [
            `.${scopeWithFallback}`,
            ...sharedHashes.map((hash) => `.${hash}`),
          ]
          return
        }

        // Process each selector and create duplicates for shared hashes
        const processedSelectors = []
        rule.selectors.forEach((selector) => {
          // Check if selector contains :not(#isolated) and remove it
          if (selector.includes(':not(#isolated) ')) {
            processedSelectors.push(
              selector
                .replace(/\s*:not\(#isolated\)\s*/, ' ')
                .replace(/\s+/g, ' ')
                .trim()
            )
            return
          }

          const processSelector = (scopeValue) => {
            return selectorParser((selectors) => {
              selectors.each((group) => {
                const onlyHtmlOrBody =
                  group.nodes.length === 1 &&
                  group.nodes[0].type === 'tag' &&
                  (group.nodes[0].value === 'html' ||
                    group.nodes[0].value === 'body')

                if (onlyHtmlOrBody) {
                  return
                }

                // Replace class names if matched
                group.nodes.forEach((n) => {
                  if (
                    n.type === 'class' &&
                    replaceClassNamesMap?.has(n.value)
                  ) {
                    n.value = replaceClassNamesMap.get(n.value)
                  }
                })

                const alreadyWrappedOrShouldSkip = group.nodes.some(
                  (n) => {
                    if (n.type === 'pseudo' && n.value === ':global') {
                      return n.nodes?.[0]?.nodes?.some(
                        (sub) =>
                          sub.type === 'class' &&
                          (sub.value === scopeValue ||
                            sub.value.startsWith(defaultScopeHash) ||
                            skipClassNamesSet.has(sub.value))
                      )
                    }
                    return (
                      (n.type === 'class' &&
                        (n.value === scopeValue ||
                          n.value.startsWith(defaultScopeHash) ||
                          skipClassNamesSet.has(n.value))) ||
                      (n.type === 'attribute' &&
                        skipClassNamesSet.has(n.attribute))
                    )
                  }
                )

                if (alreadyWrappedOrShouldSkip) {
                  let didRemoveExistingScope = false

                  if (scopeHash !== 'auto' && givenScope) {
                    // Remove existing scope so we can add the new one
                    for (let i = 0; i < group.nodes.length; i++) {
                      const n = group.nodes[i]

                      if (n.type === 'pseudo' && n.value === ':global') {
                        n.nodes?.forEach((sel) => {
                          sel.nodes = sel.nodes?.filter((sub) => {
                            const isMatch =
                              sub.type === 'class' &&
                              sub.value.startsWith(defaultScopeHash)

                            if (isMatch) {
                              didRemoveExistingScope = true
                            }
                            return !isMatch
                          })
                        })

                        const isEmpty =
                          n.nodes?.every(
                            (sel) => sel.nodes?.length === 0
                          ) ?? false

                        if (didRemoveExistingScope) {
                          if (isEmpty) {
                            group.nodes.splice(i, 1)
                          }
                          break
                        }
                      }

                      if (
                        n.type === 'class' &&
                        n.value.startsWith(defaultScopeHash)
                      ) {
                        group.nodes.splice(i, 1)
                        didRemoveExistingScope = true
                        break
                      }
                    }
                  }

                  // If we didn't remove anything and it's already wrapped → skip
                  if (
                    alreadyWrappedOrShouldSkip &&
                    !didRemoveExistingScope
                  ) {
                    return
                  }
                }

                const firstValidIndex = group.nodes.findIndex((n) => {
                  return (
                    (n.type === 'class' &&
                      !skipClassNamesSet.has(n.value)) ||
                    n.type === 'id' ||
                    n.type === 'attribute' ||
                    (n.type === 'tag' &&
                      n.value !== 'html' &&
                      n.value !== 'body')
                  )
                })
                if (firstValidIndex === -1) {
                  return
                }

                let insertIndex = 0
                for (let i = 0; i < group.nodes.length; i++) {
                  const n = group.nodes[i]
                  if (
                    n.type === 'tag' &&
                    (n.value === 'html' || n.value === 'body')
                  ) {
                    insertIndex = i + 1
                    while (
                      group.nodes[insertIndex] &&
                      (group.nodes[insertIndex].type === 'pseudo' ||
                        group.nodes[insertIndex].type === 'attribute')
                    ) {
                      insertIndex++
                    }
                  }
                }

                const space = selectorParser.combinator({ value: ' ' })
                const classNode = selectorParser.className({
                  value: scopeValue,
                })

                if (isCssModule) {
                  const innerSelector = selectorParser.selector()
                  innerSelector.append(classNode)
                  const globalPseudo = selectorParser.pseudo({
                    value: ':global',
                    nodes: [innerSelector],
                  })
                  group.nodes.splice(
                    insertIndex,
                    0,
                    space,
                    globalPseudo,
                    space
                  )
                } else {
                  group.nodes.splice(
                    insertIndex,
                    0,
                    space,
                    classNode,
                    space
                  )
                }
              })
            })
              .processSync(selector)
              .replace(/\s+/g, ' ')
              .trim()
          }

          // Always add the main scope selector
          processedSelectors.push(processSelector(scopeWithFallback))

          // Add shared hashes if they exist
          if (Array.isArray(sharedHashes) && sharedHashes.length > 0) {
            const uniqueSharedHashes = sharedHashes.filter(
              (hash) => hash !== scopeWithFallback
            )
            uniqueSharedHashes.forEach((hash) => {
              processedSelectors.push(processSelector(hash))
            })
          }
        })

        rule.selectors = processedSelectors

        if (verbose) {
          console.log(`
✨ @dnb/eufemia/style/postcss-plugin/style-scope
Scope: ${givenScope} → ${scopeWithFallback}
${
  Array.isArray(sharedHashes)
    ? `Shared Scopes: ${sharedHashes.join(', ')}`
    : ''
}
Before: ${selectorBefore.replace(/\n/g, ' ')}
After: ${rule.selector.replace(/\n/g, ' ')}
File: ${file}
Settings: ${JSON.stringify({ isCssModule }, null, 2)}
          `)
        }

        countAfter += 1
      })

      if (verbose) {
        console.log(
          `
  ✨ @dnb/eufemia/style/postcss-plugin/style-scope
  - File: ${path.relative(process.cwd(), file)}
  - Selectors processed: ${countBefore} → ${countAfter}
  `
        )
      }
    },
  }
}

postcssIsolateStyle.postcss = true
module.exports = postcssIsolateStyle
module.exports.getStyleScopeHash = postcssIsolateStyle
