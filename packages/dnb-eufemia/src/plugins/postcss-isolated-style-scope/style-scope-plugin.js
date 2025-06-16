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

  const currentFallbackHash = getStyleScopeHash()
  const skipClassNamesSet = new Set(skipClassNames)
  const replaceClassNamesMap = replaceClassNames
    ? new Map(Object.entries(replaceClassNames))
    : undefined

  let countBefore = 0
  let countAfter = 0

  if (!verbose && !global.__didLog && process.env.NODE_ENV !== 'test') {
    global.__didLog = true
    console.log('✨ @dnb/eufemia/plugins/style-scope')
  }

  return {
    postcssPlugin: 'isolated-style-scope-plugin',

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
      const sharedHashes =
        typeof sharedScopeHash === 'function'
          ? sharedScopeHash(file)
          : undefined

      root.walkRules((rule) => {
        countBefore += 1
        const selectorBefore = rule.selector

        if (
          rule.parent?.type === 'atrule' &&
          ['keyframes'].includes(rule.parent.name)
        ) {
          return
        }

        // Special‐case lone :global
        if (
          rule.selectors.length === 1 &&
          rule.selectors[0].trim() === ':global'
        ) {
          // in CSS-Module mode wrap in one :global(...)
          if (isCssModule) {
            rule.selector = `:global(.${scopeWithFallback})`
          } else {
            rule.selector = `.${scopeWithFallback}`
          }
          return
        }

        // Special‐case :root
        if (
          rule.selectors.length === 1 &&
          (rule.selectors[0].trim() === ':root' ||
            rule.selectors[0].trim() === ':global :root')
        ) {
          const scopes = [scopeWithFallback]

          if (Array.isArray(sharedHashes)) {
            for (const hash of sharedHashes) {
              if (!scopes.includes(hash)) {
                scopes.push(hash)
              }
            }
          }

          // in CSS-Module mode, wrap the entire list in one :global(...)
          if (isCssModule) {
            const classList = scopes.map((s) => `.${s}`).join(', ')
            rule.selector = `:global(${classList})`
          } else {
            rule.selector = scopes.map((s) => `.${s}`).join(', ')
          }
          return
        }

        // Helper for transforming individual selectors
        const processSelector = (selector, scope) =>
          selectorParser((selectors) => {
            selectors.each((group) => {
              // 1. skip “root” selectors (html, body, or html body)
              const onlyHtmlOrBody =
                group.nodes.length === 1 &&
                group.nodes[0].type === 'tag' &&
                (group.nodes[0].value === 'html' ||
                  group.nodes[0].value === 'body')

              const htmlBodyCombo =
                group.nodes.length >= 3 &&
                group.nodes.every(
                  (n) =>
                    (n.type === 'tag' &&
                      (n.value === 'html' || n.value === 'body')) ||
                    n.type === 'combinator'
                )

              if (onlyHtmlOrBody || htmlBodyCombo) return

              // Replace class names if matched
              group.nodes.forEach((n) => {
                if (
                  n.type === 'class' &&
                  replaceClassNamesMap?.has(n.value)
                ) {
                  n.value = replaceClassNamesMap.get(n.value)
                }
              })

              // 3. detect already scoped or nodes to skip
              const alreadyWrappedOrShouldSkip = group.nodes.some((n) => {
                if (n.type === 'pseudo' && n.value === ':global') {
                  return n.nodes?.[0]?.nodes?.some(
                    (sub) =>
                      sub.type === 'class' &&
                      (sub.value === scope ||
                        sub.value.startsWith(defaultScopeHash) ||
                        skipClassNamesSet.has(sub.value))
                  )
                }
                return (
                  (n.type === 'class' &&
                    (n.value === scope ||
                      n.value.startsWith(defaultScopeHash) ||
                      skipClassNamesSet.has(n.value))) ||
                  (n.type === 'attribute' &&
                    skipClassNamesSet.has(n.attribute))
                )
              })

              let hadGlobalWrapper = false
              let didRemoveExistingScope = false

              // 4. remove default scope if we intend to replace it
              if (alreadyWrappedOrShouldSkip) {
                if (scopeHash !== 'auto' && givenScope) {
                  for (let i = 0; i < group.nodes.length; i++) {
                    const n = group.nodes[i]

                    if (n.type === 'pseudo' && n.value === ':global') {
                      hadGlobalWrapper = true
                      n.nodes?.forEach((sel) => {
                        sel.nodes = sel.nodes?.filter((sub) => {
                          const match =
                            sub.type === 'class' &&
                            sub.value.startsWith(defaultScopeHash)
                          if (match) {
                            didRemoveExistingScope = true
                          }
                          return !match
                        })
                      })

                      const isEmpty =
                        n.nodes?.every((sel) => sel.nodes?.length === 0) ??
                        false
                      if (didRemoveExistingScope) {
                        if (isEmpty) group.nodes.splice(i, 1)
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

              // 5. compute insertion point: skip a leading html, and if followed by body skip that too
              let insertIndex = 0
              let i = 0

              // if it starts with <html>
              if (
                group.nodes[i]?.type === 'tag' &&
                group.nodes[i].value === 'html'
              ) {
                i++
                // skip any pseudo/attr attached to html
                while (
                  group.nodes[i] &&
                  (group.nodes[i].type === 'pseudo' ||
                    group.nodes[i].type === 'attribute')
                ) {
                  i++
                }
                // if next is " space + body", skip both
                if (
                  group.nodes[i]?.type === 'combinator' &&
                  group.nodes[i + 1]?.type === 'tag' &&
                  group.nodes[i + 1].value === 'body'
                ) {
                  i += 2
                  // skip body’s pseudos/attrs
                  while (
                    group.nodes[i] &&
                    (group.nodes[i].type === 'pseudo' ||
                      group.nodes[i].type === 'attribute')
                  ) {
                    i++
                  }
                }
              }
              // or if it starts directly with <body>
              else if (
                group.nodes[i]?.type === 'tag' &&
                group.nodes[i].value === 'body'
              ) {
                i++
                while (
                  group.nodes[i] &&
                  (group.nodes[i].type === 'pseudo' ||
                    group.nodes[i].type === 'attribute')
                ) {
                  i++
                }
              }
              insertIndex = i

              // 6. build the scope node
              const space = selectorParser.combinator({ value: ' ' })
              const scopeClass = selectorParser.className({ value: scope })
              const asGlobal = hadGlobalWrapper || isCssModule

              if (asGlobal) {
                // <…> we want “:global(.scope)”
                const inner = selectorParser.selector()
                inner.append(scopeClass)
                const globalPseudo = selectorParser.pseudo({
                  value: ':global',
                  nodes: [inner],
                })
                // inject “ <global(.scope)> ” at insertIndex
                group.nodes.splice(
                  insertIndex,
                  0,
                  space,
                  globalPseudo,
                  space
                )
              } else {
                // plain “ .scope ”
                group.nodes.splice(
                  insertIndex,
                  0,
                  space,
                  scopeClass,
                  space
                )
              }
            })
          })
            .processSync(selector)
            .replace(/\s+/g, ' ')
            .trim()

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

          // Always add the main scope selector
          processedSelectors.push(
            processSelector(selector, scopeWithFallback)
          )

          // Add shared hashes if they exist
          if (Array.isArray(sharedHashes) && sharedHashes.length > 0) {
            const uniqueSharedHashes = sharedHashes.filter(
              (hash) => hash !== scopeWithFallback
            )
            uniqueSharedHashes.forEach((hash) => {
              processedSelectors.push(processSelector(selector, hash))
            })
          }
        })

        rule.selectors = processedSelectors

        if (verbose) {
          console.log(`
✨ @dnb/eufemia/plugins/style-scope
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
  ✨ @dnb/eufemia/plugins/style-scope
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
