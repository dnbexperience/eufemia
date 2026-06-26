const stylelint = require('stylelint')
const fs = require('fs')
const path = require('path')

const RULE_NAME = 'eufemia/no-undefined-custom-property'

// Resolve the dnb-eufemia "src" root relative to this rule file
// (src/plugins/stylelint/rules/ -> src).
const SRC_ROOT = path.resolve(__dirname, '../../..')

const messages = stylelint.utils.ruleMessages(RULE_NAME, {
  undefined: (prop) =>
    `Unexpected reference to undefined custom property "${prop}". ` +
    `It is referenced via "var(${prop})" without a fallback but is never ` +
    `defined in any SCSS file nor set via JavaScript/TypeScript. A var() ` +
    `pointing at an undefined custom property resolves to a ` +
    `guaranteed-invalid value, which silently breaks the declaration. ` +
    `Define the property, add a fallback ("var(${prop}, <fallback>)"), or ` +
    `remove the reference.`,
  undefinedWithFallback: (prop) =>
    `Unexpected reference to undefined custom property "${prop}". ` +
    `It is referenced via "var(${prop}, <fallback>)" but is never defined ` +
    `in any SCSS file nor set via JavaScript/TypeScript, so it always ` +
    `resolves to the fallback \u2013 a "phantom" reference. Reference the ` +
    `real variable or value directly, define the property, or add it to ` +
    `"ignoreProperties" if it is an intentional override hook or is set at ` +
    `runtime with a dynamically built name.`,
})

const meta = {
  url: 'https://github.com/dnbexperience/eufemia',
}

// Matches a custom property *definition*, e.g. "--foo:" but not the "--foo"
// inside "var(--foo)". The leading boundary avoids matching inside words.
const SCSS_DEFINITION = /(?:^|[^\w-])(--[\w-]+)\s*:/g

// Matches any custom-property-looking token. Used to harvest properties that
// are defined dynamically from JavaScript/TypeScript (e.g. element.style
// .setProperty('--foo', …) or inline style strings like "--foo: 1rem").
const ANY_CUSTOM_PROPERTY = /--[\w-]+/g

// Matches a var() reference *without* a fallback, e.g. "var(--foo)".
// References that include a fallback ("var(--foo, 0)") or SCSS interpolation
// ("var(--foo-#{$x})") intentionally do not match and are therefore skipped.
const VAR_WITHOUT_FALLBACK = /var\(\s*(--[\w-]+)\s*\)/g

// Matches a var() reference *with* a fallback and captures the primary
// property, e.g. "var(--foo, red)" or "var(--foo, var(--bar))" -> "--foo".
// Used only when the "reportFallbacks" option is enabled, to catch "phantom"
// references whose primary property is never defined and therefore always
// resolve to the fallback. Interpolated names ("var(--foo-#{$x}, …)") do not
// match and are therefore skipped.
const VAR_WITH_FALLBACK = /var\(\s*(--[\w-]+)\s*,/g

const IGNORED_DIRECTORIES = new Set([
  'node_modules',
  '__tests__',
  '__snapshots__',
  'build',
])

// Cache the expensive filesystem scan per source root so it runs only once
// per stylelint process, no matter how many files are linted.
const knownPropertiesCache = new Map()

const walkFiles = (dir, extensions, onFile) => {
  let entries
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true })
  } catch {
    return
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (
        IGNORED_DIRECTORIES.has(entry.name) ||
        entry.name.startsWith('.')
      ) {
        continue
      }
      walkFiles(fullPath, extensions, onFile)
    } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
      onFile(fullPath)
    }
  }
}

const collectMatches = (content, regex, group, target) => {
  let match
  while ((match = regex.exec(content)) !== null) {
    target.add(group === 0 ? match[0] : match[group])
  }
}

// Read and scan files asynchronously, yielding to the event loop between
// files. The scan touches the entire "src" tree (thousands of files), so doing
// it synchronously would block long enough to trip worker heartbeats in some
// test runners; an async pass keeps the process responsive.
const scanFiles = async (files, regex, group, target) => {
  for (const file of files) {
    let content
    try {
      content = await fs.promises.readFile(file, 'utf8')
    } catch {
      continue
    }
    collectMatches(content, regex, group, target)
  }
}

const buildKnownProperties = (srcRoot) => {
  if (knownPropertiesCache.has(srcRoot)) {
    return knownPropertiesCache.get(srcRoot)
  }

  const scan = (async () => {
    const properties = new Set()

    // Definitions declared anywhere in SCSS/CSS (cross-file, including theme
    // and shared property files).
    const styleFiles = []
    walkFiles(srcRoot, ['.scss', '.css'], (file) => styleFiles.push(file))
    await scanFiles(styleFiles, SCSS_DEFINITION, 1, properties)

    // Properties referenced from JavaScript/TypeScript. These are treated as
    // "known" because they may be assigned dynamically at runtime (setProperty,
    // inline style strings, etc.), which a static SCSS scan cannot see.
    // Properties whose *names* are themselves built dynamically (e.g. via
    // template literals like `--${name}--${size}`) cannot be discovered this
    // way and should be declared through the "ignoreProperties" option instead.
    const scriptFiles = []
    walkFiles(
      srcRoot,
      ['.ts', '.tsx', '.js', '.jsx', '.cjs', '.mjs'],
      (file) => scriptFiles.push(file)
    )
    await scanFiles(scriptFiles, ANY_CUSTOM_PROPERTY, 0, properties)

    return properties
  })()

  // Cache the in-flight promise so concurrent lints share a single scan.
  knownPropertiesCache.set(srcRoot, scan)
  return scan
}

const collectLocalDefinitions = (root) => {
  const local = new Set()

  root.walkDecls((decl) => {
    if (decl.prop && decl.prop.startsWith('--')) {
      local.add(decl.prop)
    }
  })

  return local
}

const ruleFunction = (primary, secondaryOptions) => {
  return async (root, result) => {
    const validOptions = stylelint.utils.validateOptions(
      result,
      RULE_NAME,
      {
        actual: primary,
        possible: [true, false],
      },
      {
        actual: secondaryOptions,
        possible: {
          ignoreProperties: [(value) => typeof value === 'string'],
          reportFallbacks: [true, false],
        },
        optional: true,
      }
    )

    if (!validOptions || !primary) {
      return
    }

    // ignoreProperties entries may be exact names ("--foo") or regular
    // expressions written in "/pattern/" form (e.g. "/^--breakout--/") to
    // ignore whole families of dynamically generated properties.
    const ignoreExact = new Set()
    const ignorePatterns = []
    for (const entry of (secondaryOptions &&
      secondaryOptions.ignoreProperties) ||
      []) {
      const regexMatch = /^\/(.*)\/([a-z]*)$/.exec(entry)
      if (regexMatch) {
        try {
          ignorePatterns.push(new RegExp(regexMatch[1], regexMatch[2]))
        } catch (error) {
          result.warn(
            `Invalid "ignoreProperties" regex "${entry}" for ${RULE_NAME}: ${error.message}`,
            { stylelintType: 'invalidOption' }
          )
        }
      } else {
        ignoreExact.add(entry)
      }
    }

    // When enabled, also flag "phantom" references – var() with a fallback
    // whose primary property is never defined, so the fallback always wins.
    const reportFallbacks = Boolean(
      secondaryOptions && secondaryOptions.reportFallbacks
    )

    const knownProperties = await buildKnownProperties(SRC_ROOT)
    const localDefinitions = collectLocalDefinitions(root)

    const isKnown = (property) =>
      knownProperties.has(property) ||
      localDefinitions.has(property) ||
      ignoreExact.has(property) ||
      ignorePatterns.some((pattern) => pattern.test(property))

    root.walkDecls((decl) => {
      if (!decl.value || !decl.value.includes('var(')) {
        return
      }

      let match
      while ((match = VAR_WITHOUT_FALLBACK.exec(decl.value)) !== null) {
        const property = match[1]

        if (isKnown(property)) {
          continue
        }

        stylelint.utils.report({
          message: messages.undefined(property),
          node: decl,
          word: property,
          result,
          ruleName: RULE_NAME,
        })
      }

      if (!reportFallbacks) {
        return
      }

      let fallbackMatch
      while (
        (fallbackMatch = VAR_WITH_FALLBACK.exec(decl.value)) !== null
      ) {
        const property = fallbackMatch[1]

        if (isKnown(property)) {
          continue
        }

        stylelint.utils.report({
          message: messages.undefinedWithFallback(property),
          node: decl,
          word: property,
          result,
          ruleName: RULE_NAME,
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
