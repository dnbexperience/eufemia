/**
 * This is written in JavaScript, because it is used directly by PostCSS.
 */

const path = require('path')
const selectorParser = require('postcss-selector-parser')
const { getStyleScopeHash } = require('../../shared/BuildInfo.cjs')

const postcssIsolateStyle = (opts = {}) => {
  const {
    scopeHash = 'auto',
    skipClassNames = [],
    replaceClassNames = undefined,
    verbose = false,
    runAsCssModule = false,
  } = opts

  const scope = scopeHash === 'auto' ? getStyleScopeHash() : scopeHash
  const skipClassNamesSet = new Set(skipClassNames)
  const replaceClassNamesMap = replaceClassNames
    ? new Map(Object.entries(replaceClassNames))
    : undefined

  let countBefore = 0
  let countAfter = 0

  if (!verbose && !global.__didLog) {
    global.__didLog = true
    console.log(`✨ @dnb/eufemia/style/postcss-plugin-style-scope`)
  }

  return {
    postcssPlugin: 'postcss-plugin-style-scope',

    Once(root) {
      const file = root.source?.input?.file ?? ''
      const isCssModule = runAsCssModule || file.includes('.module.')

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
          rule.selectors[0].trim() === ':root'
        ) {
          rule.selectors = [`.${scope}`]
          return
        }

        rule.selectors = rule.selectors.map((selector) => {
          if (selector.trim().startsWith(':not(#isolated) ')) {
            return selector.replace(/^:not\(#isolated\)\s+/, '') // skip scoping
          }

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

              const alreadyWrappedOrShouldSkip = group.nodes.some((n) => {
                if (n.type === 'pseudo' && n.value === ':global') {
                  return n.nodes?.[0]?.nodes?.some(
                    (sub) =>
                      sub.type === 'class' &&
                      (sub.value === scope ||
                        skipClassNamesSet.has(sub.value))
                  )
                }
                return (
                  (n.type === 'class' &&
                    (n.value === scope ||
                      skipClassNamesSet.has(n.value))) ||
                  (n.type === 'attribute' &&
                    skipClassNamesSet.has(n.attribute))
                )
              })
              if (alreadyWrappedOrShouldSkip) {
                return
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
                value: scope,
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
                group.nodes.splice(insertIndex, 0, space, classNode, space)
              }
            })
          })
            .processSync(selector)
            .replace(/\s+/g, ' ')
            .trim()
        })

        if (verbose) {
          console.log(`
✨ @dnb/eufemia/style/postcss-plugin-style-scope
Scope: ${scopeHash} → ${scope}
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
  ✨ @dnb/eufemia/style/postcss-plugin-style-scope
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
