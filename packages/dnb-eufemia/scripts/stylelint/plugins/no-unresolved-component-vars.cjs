const stylelint = require('stylelint')
const fs = require('fs')
const path = require('path')

const RULE_NAME = 'eufemia/no-unresolved-component-vars'

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  unresolvedVar: (ref, styleDir) =>
    `Unexpected unknown custom property "${ref}". No declaration found in "${styleDir}".`,
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

/**
 * Well-known global variable prefixes that are declared outside component
 * style directories (theme properties, design tokens, etc.).
 * References starting with these are never flagged.
 */
const DEFAULT_GLOBAL_PREFIXES = [
  '--token-',
  '--color-',
  '--font-',
  '--line-height-',
  '--spacing-',
  '--easing-',
  '--b-',
  '--dnb-',
  '--sbanken-',
  '--sb-',
  '--carnegie-',
  '--eiendom-',
]

const VAR_REFERENCE_REGEX = /var\(\s*(--[a-z0-9-]+)\s*([,)])/gi
const SINGLE_VAR_REFERENCE_REGEX = /var\(\s*(--[a-z0-9-]+)\s*([,)])/i

/**
 * Cache for style-directory scans, keyed by absolute style-root path.
 * Persists for the lifetime of the Node process (module-level state).
 */
const declarationCache = new Map()

/**
 * Given a file path, return the "style root" directory.
 *
 * Convention:
 *   - If the file lives inside a `themes/` subdirectory of a `style/` dir,
 *     return the `style/` dir.
 *   - If the file lives directly in a `style/` dir, return that dir.
 *   - Otherwise fall back to the file's own directory.
 */
const resolveStyleRoot = (filePath) => {
  const normalizedPath = (filePath || '').replace(/\\/g, '/')
  const dir = path.dirname(normalizedPath)

  // e.g. .../style/themes/foo.scss → style root is .../style
  const themeMatch = dir.match(/^(.+\/style)\/themes\/?$/i)
  if (themeMatch) {
    return themeMatch[1]
  }

  // e.g. .../style/foo.scss → already at style root
  if (path.basename(dir) === 'style') {
    return dir
  }

  // fallback: use the file's directory
  return dir
}

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
 * Extract all custom property declarations from SCSS source text.
 * Returns a Set of property names.
 */
const extractDeclarations = (content) => {
  const declarations = new Set()
  const regex = /(^|\s|{|;)(--[a-z0-9-]+)\s*:/gim
  let match

  while ((match = regex.exec(content)) !== null) {
    declarations.add(match[2])
  }

  return declarations
}

/**
 * Build (and cache) the set of all custom property declarations found
 * in every .scss file under `styleRoot`, along with the component
 * prefixes derived from `dnb-<name>.scss` filenames.
 */
const getStyleRootData = (styleRoot) => {
  if (declarationCache.has(styleRoot)) {
    return declarationCache.get(styleRoot)
  }

  const allDeclarations = new Set()
  const componentPrefixes = []
  const scssFiles = findScssFiles(styleRoot)

  for (const file of scssFiles) {
    const content = fs.readFileSync(file, 'utf-8')

    for (const decl of extractDeclarations(content)) {
      allDeclarations.add(decl)
    }

    // Derive component prefix from dnb-<name>.scss filenames
    const basename = path.basename(file, '.scss')
    const prefixMatch = basename.match(/^dnb-(.+?)(?:-theme-.+)?$/)

    if (prefixMatch) {
      const prefix = `--${prefixMatch[1]}-`

      if (!componentPrefixes.includes(prefix)) {
        componentPrefixes.push(prefix)
      }
    }
  }

  const data = { allDeclarations, componentPrefixes }
  declarationCache.set(styleRoot, data)
  return data
}

/**
 * Check if `varName` is a state variant of a declared base variable.
 *
 * Convention: --component-property--state (double-dash separator).
 * If --component-property is declared, --component-property--state
 * is assumed valid (set by themes or specific variants).
 */
const isStateVariantOfDeclared = (varName, declarations) => {
  const doubleDashIndex = varName.indexOf('--', 2)

  if (doubleDashIndex === -1) {
    return false
  }

  const baseName = varName.substring(0, doubleDashIndex)
  return declarations.has(baseName)
}

const ruleFunction = (primary, secondaryOptions = {}) => {
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

    const globalPrefixes =
      secondaryOptions.globalPrefixes || DEFAULT_GLOBAL_PREFIXES

    const filePath = root.source?.input?.file || ''

    if (!filePath) {
      return
    }

    const styleRoot = resolveStyleRoot(filePath)

    // Bail out if the style root directory does not exist on disk
    // (e.g. virtual files during testing without a fixture directory).
    if (!fs.existsSync(styleRoot)) {
      return
    }

    const { allDeclarations, componentPrefixes } =
      getStyleRootData(styleRoot)

    if (allDeclarations.size === 0 || componentPrefixes.length === 0) {
      return
    }

    const isComponentScoped = (varName) => {
      // Skip well-known globals
      for (const gp of globalPrefixes) {
        if (varName.startsWith(gp)) {
          return false
        }
      }

      // Check if it matches a detected component prefix
      for (const cp of componentPrefixes) {
        if (varName.startsWith(cp)) {
          return true
        }
      }

      return false
    }

    const relativeStyleDir = path.relative(
      path.resolve(filePath, '../../..'),
      styleRoot
    )

    root.walkDecls((decl) => {
      const value = decl.value

      if (!value || !value.includes('var(')) {
        return
      }

      const references = value.match(VAR_REFERENCE_REGEX)

      if (!references) {
        return
      }

      for (const ref of references) {
        const singleMatch = ref.match(SINGLE_VAR_REFERENCE_REGEX)
        const varName = singleMatch?.[1]
        const delimiter = singleMatch?.[2]

        if (!varName) {
          continue
        }

        // Skip var() references that have a CSS fallback value —
        // these are intentionally optional (e.g. set via JS at runtime)
        if (delimiter === ',') {
          continue
        }

        if (!isComponentScoped(varName)) {
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
          message: messages.unresolvedVar(varName, relativeStyleDir),
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
module.exports.meta = meta
