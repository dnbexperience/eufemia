/**
 * This is written in JavaScript, because it is used directly by PostCSS.
 */

const path = require('path')
const selectorParser = require('postcss-selector-parser')
const {
  findPathToScopeHash,
  getScopeHashFromFile,
} = require('./plugin-utils.js')
const { getStyleScopeHash } = require('./plugin-scope-hash.cjs')

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
    console.log('✨ @dnb/eufemia/plugins/postcss-isolated-style-scope')
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
          const content = getScopeHashFromFile(scopeHashFromFile)

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
          isCssModule &&
          rule.selectors.length === 1 &&
          rule.selectors[0].trim() === ':global'
        ) {
          const hasNestedRules =
            Array.isArray(rule.nodes) &&
            rule.nodes.some((n) => n.type === 'rule')

          if (!hasNestedRules) {
            // top‐level :global with only declarations → scope the entire block
            rule.selector = `:global(.${scopeWithFallback})`
          }

          return
        }

        // Special‐case :root
        if (
          rule.selectors.length === 1 &&
          (rule.selectors[0].trim() === ':root' ||
            (isCssModule && rule.selectors[0].trim() === ':global :root'))
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
              // 1. Skip global selectors
              if (isGlobalSelector(group.nodes)) {
                return
              }
              // 1b. Skip global selectors inside :global block
              if (
                group.parent &&
                group.parent.type === 'pseudo' &&
                group.parent.value === ':global'
              ) {
                if (isGlobalSelector(group.nodes)) {
                  return
                }
              }

              // 2. Replace class names if matched
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

              // 5. compute insertion point: skip html/body at the front
              let i = 0

              // 5a. *only* strip a leading bare `:global` when it's the
              // special "body *flattened global-block" case (e.g. ":global body *" or
              // ":global html body *"), not for every selector that
              // starts with `:global`.
              if (
                group.nodes[0]?.type === 'pseudo' &&
                group.nodes[0].value === ':global' &&
                // bare pseudo (no inner `(...)`)
                (!group.nodes[0].nodes ||
                  group.nodes[0].nodes.length === 0) &&
                group.nodes[1]?.type === 'combinator' &&
                group.nodes[2]?.type === 'tag' &&
                ['html', 'body'].includes(group.nodes[2].value)
              ) {
                // skip ":global" + the space
                i = 2
                // skip any extra spaces
                while (
                  group.nodes[i] &&
                  group.nodes[i].type === 'combinator'
                ) {
                  i++
                }
              }

              // now skip an initial html (and optional body) just like before
              if (
                group.nodes[i]?.type === 'tag' &&
                group.nodes[i].value === 'html'
              ) {
                i++
                // skip html's pseudos/attrs…
                while (
                  group.nodes[i] &&
                  (group.nodes[i].type === 'pseudo' ||
                    group.nodes[i].type === 'attribute')
                ) {
                  i++
                }
                // then if it's " body" (with a space), skip that too
                if (
                  group.nodes[i]?.type === 'combinator' &&
                  group.nodes[i + 1]?.type === 'tag' &&
                  group.nodes[i + 1].value === 'body'
                ) {
                  i += 2
                  // skip body's pseudos/attrs
                  while (
                    group.nodes[i] &&
                    (group.nodes[i].type === 'pseudo' ||
                      group.nodes[i].type === 'attribute')
                  ) {
                    i++
                  }
                }
              } else if (
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

              const insertIndex = i

              // 6. build the scope node
              const space = selectorParser.combinator({ value: ' ' })
              const scopeClass = selectorParser.className({ value: scope })
              const asGlobal = hadGlobalWrapper || isCssModule

              if (asGlobal) {
                // <…> we want ":global(.scope)"
                const inner = selectorParser.selector()
                inner.append(scopeClass)
                const globalPseudo = selectorParser.pseudo({
                  value: ':global',
                  nodes: [inner],
                })
                // inject " <global(.scope)> " at insertIndex
                group.nodes.splice(
                  insertIndex,
                  0,
                  space,
                  globalPseudo,
                  space
                )
              } else {
                // plain " .scope "
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
          // If this rule is inside a :global block and selector is a global selector, skip scoping
          if (
            rule.parent &&
            rule.parent.type === 'rule' &&
            rule.parent.selector &&
            rule.parent.selector.trim() === ':global'
          ) {
            const ast = selectorParser().astSync(selector.trim())
            const isAllGlobal = ast.nodes.some((group) =>
              isGlobalSelector(group.nodes)
            )
            if (isAllGlobal) {
              processedSelectors.push(selector)
              return
            }
          }

          // Check if selector contains [skip-isolation] and remove it
          if (selector.includes('[skip-isolation] ')) {
            processedSelectors.push(
              selector.replace(/\[skip-isolation\]\s*/g, '').trim()
            )
            return
          }

          // Replace [scope-placeholder] with the actual scope hash
          if (selector.includes('[scope-placeholder]')) {
            selector = selector.replace(
              /\[scope-placeholder\]/g,
              isCssModule
                ? `:global(.${scopeWithFallback})`
                : `.${scopeWithFallback}`
            )
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
✨ @dnb/eufemia/plugins/postcss-isolated-style-scope
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
  ✨ @dnb/eufemia/plugins/postcss-isolated-style-scope
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

// Helper to check if a selector is html, body, html body, html *, body *, or html body *
function isGlobalSelector(nodes) {
  if (!nodes || nodes.length === 0) return false
  // Remove whitespace combinators
  const parts = nodes.filter(
    (n) => !(n.type === 'combinator' && n.value.trim() === '')
  )
  // Case 1: :global(html), :global(body), :global(html body), :global(html *), etc.
  if (
    parts.length === 1 &&
    parts[0].type === 'pseudo' &&
    parts[0].value === ':global' &&
    parts[0].nodes
  ) {
    // Recurse on the selector inside :global()
    return isGlobalSelector(parts[0].nodes[0].nodes)
  }
  // Case 2: :global html, :global body, :global html body, :global html *, etc.
  if (
    parts.length >= 2 &&
    parts[0].type === 'pseudo' &&
    parts[0].value === ':global'
  ) {
    // Check if the remaining parts form a global selector
    return isGlobalSelector(parts.slice(1))
  }
  // Case 3: html, body, html body
  if (parts[0].type === 'tag' && parts[0].value === 'html') {
    if (parts.length === 1) return true // html
    if (
      parts.length === 2 &&
      parts[1].type === 'tag' &&
      parts[1].value === 'body'
    ) {
      return true // html body
    }
    // html *
    if (parts.length === 2 && parts[1].type === 'universal') {
      return true
    }
  }
  // body
  if (
    parts.length === 1 &&
    parts[0].type === 'tag' &&
    parts[0].value === 'body'
  ) {
    return true
  }
  // :global html or :global body
  if (
    parts.length === 2 &&
    parts[0].type === 'pseudo' &&
    parts[0].value === ':global' &&
    parts[1].type === 'tag' &&
    ['html', 'body'].includes(parts[1].value)
  ) {
    return true
  }
  return false
}
