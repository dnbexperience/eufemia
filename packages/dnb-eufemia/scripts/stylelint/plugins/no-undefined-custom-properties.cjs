const stylelint = require('stylelint')
const fs = require('fs')
const path = require('path')

const RULE_NAME = 'eufemia/no-undefined-custom-properties'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  undefinedProperty: (name) =>
    `Unexpected undefined custom property "${name}". No declaration found in any SCSS source file.`,
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

const VAR_REGEX = /var\(\s*(--[a-z0-9-]+)\s*([,)])/gi
const VAR_REGEX_SINGLE = /var\(\s*(--[a-z0-9-]+)\s*([,)])/i
const DECL_REGEX = /(^|\s|{|;)(--[a-z0-9-]+)\s*:/gim

/**
 * Cache of all declared custom properties across the source tree.
 * Keyed by the resolved srcRoot path, persists for the process lifetime.
 */
const projectDeclarationsCache = new Map()

/**
 * Recursively find all .scss files under `dir`.
 */
const findScssFiles = (dir) => {
  const results = []

  if (!fs.existsSync(dir)) {
    return results
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      results.push(...findScssFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.scss')) {
      results.push(fullPath)
    }
  }

  return results
}

/**
 * Resolve the `src/` root from a file path.
 * Looks for a directory named `src` in the file's ancestor chain.
 */
const resolveSrcRoot = (filePath) => {
  const parts = filePath.replace(/\\/g, '/').split('/')
  const srcIndex = parts.lastIndexOf('src')

  if (srcIndex === -1) {
    return null
  }

  return parts.slice(0, srcIndex + 1).join('/')
}

/**
 * Build (and cache) the set of all custom property declarations
 * found in every .scss file under `srcRoot`.
 */
const getProjectDeclarations = (srcRoot) => {
  if (projectDeclarationsCache.has(srcRoot)) {
    return projectDeclarationsCache.get(srcRoot)
  }

  const declarations = new Set()
  const scssFiles = findScssFiles(srcRoot)

  for (const file of scssFiles) {
    const content = fs.readFileSync(file, 'utf-8')
    let match

    while ((match = DECL_REGEX.exec(content)) !== null) {
      declarations.add(match[2])
    }
  }

  projectDeclarationsCache.set(srcRoot, declarations)
  return declarations
}

/**
 * Check if `varName` is a state variant of a declared base variable.
 *
 * Convention: --component-property--state (double-dash separator).
 * If --component-property is declared, --component-property--state
 * is assumed valid (set by themes or specific variants at runtime).
 */
const isStateVariantOfDeclared = (varName, declarations) => {
  const doubleDashIndex = varName.indexOf('--', 2)

  if (doubleDashIndex === -1) {
    return false
  }

  const baseName = varName.substring(0, doubleDashIndex)
  return declarations.has(baseName)
}

const ruleFunction = (primary) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      RULE_NAME,
      {
        actual: primary,
        possible: [true],
      }
    )

    if (!validOptions) {
      return
    }

    const filePath = root.source?.input?.file || ''

    if (!filePath) {
      return
    }

    const srcRoot = resolveSrcRoot(filePath)

    if (!srcRoot || !fs.existsSync(srcRoot)) {
      return
    }

    const allDeclarations = getProjectDeclarations(srcRoot)

    if (allDeclarations.size === 0) {
      return
    }

    root.walkDecls((decl) => {
      const value = decl.value

      if (!value || !value.includes('var(')) {
        return
      }

      const references = value.match(VAR_REGEX)

      if (!references) {
        return
      }

      for (const ref of references) {
        const singleMatch = ref.match(VAR_REGEX_SINGLE)
        const varName = singleMatch?.[1]
        const delimiter = singleMatch?.[2]

        if (!varName) {
          continue
        }

        // Skip var() references with a CSS fallback value
        if (delimiter === ',') {
          continue
        }

        if (allDeclarations.has(varName)) {
          continue
        }

        // Skip state variants (--foo--hover) when the base (--foo) is declared
        if (isStateVariantOfDeclared(varName, allDeclarations)) {
          continue
        }

        stylelint.utils.report({
          result,
          ruleName: RULE_NAME,
          node: decl,
          message: messages.undefinedProperty(varName),
        })
      }
    })
  }
}

ruleFunction.ruleName = RULE_NAME
ruleFunction.messages = messages
ruleFunction.meta = meta

module.exports = stylelint.createPlugin(RULE_NAME, ruleFunction)
module.exports.ruleName = RULE_NAME
module.exports.messages = messages
