/**
 * StackBlitz integration for opening code examples in a live playground.
 */

// eslint-disable-next-line no-restricted-imports
import * as ReactExports from 'react'
import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'
import { FORMS_EXPORT_NAMES } from './formsExports'
import { format } from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'

// Lazy initialization - only compute when needed
let EUFEMIA_COMPONENT_NAMES: string[] | null = null
let EUFEMIA_FRAGMENT_NAMES: string[] | null = null
let EUFEMIA_ELEMENT_NAMES: string[] | null = null
let REACT_HOOK_NAMES: string[] | null = null
let REACT_EXPORT_NAMES: string[] | null = null

function getEufemiaComponentNames() {
  if (!EUFEMIA_COMPONENT_NAMES) {
    EUFEMIA_COMPONENT_NAMES = Object.keys(getComponents())
  }
  return EUFEMIA_COMPONENT_NAMES
}

function getEufemiaFragmentNames() {
  if (!EUFEMIA_FRAGMENT_NAMES) {
    EUFEMIA_FRAGMENT_NAMES = Object.keys(getFragments())
  }
  return EUFEMIA_FRAGMENT_NAMES
}

function getEufemiaElementNames() {
  if (!EUFEMIA_ELEMENT_NAMES) {
    EUFEMIA_ELEMENT_NAMES = Object.keys(getElements())
  }
  return EUFEMIA_ELEMENT_NAMES
}

/**
 * Dynamically extracts React hook names from the React module.
 * Hooks are identified by the "use" prefix (e.g., useState, useEffect).
 */
function getReactHookNames() {
  if (!REACT_HOOK_NAMES) {
    REACT_HOOK_NAMES = Object.keys(ReactExports).filter(
      (name) =>
        name.startsWith('use') && typeof ReactExports[name] === 'function'
    )
  }
  return REACT_HOOK_NAMES
}

/**
 * Dynamically extracts React exports that are not hooks.
 * Filters out internal/unstable APIs and non-importable values.
 */
function getReactExportNames() {
  if (!REACT_EXPORT_NAMES) {
    REACT_EXPORT_NAMES = Object.keys(ReactExports).filter((name) => {
      // Skip hooks (handled by getReactHookNames)
      if (name.startsWith('use')) return false
      // Skip internal React fields
      if (name.startsWith('__') || name.startsWith('unstable_'))
        return false
      // Skip non-importable values like 'version'
      if (typeof ReactExports[name] === 'string') return false

      return ReactExports[name] !== undefined
    })
  }
  return REACT_EXPORT_NAMES
}

// Shared exports from @dnb/eufemia/shared
const SHARED_EXPORTS = ['Provider', 'Theme']

// Known icon namespace imports
const ICON_NAMESPACES: Record<string, string> = {
  PrimaryIconsMedium: '@dnb/eufemia/icons/dnb/primary_icons_medium',
  SecondaryIconsMedium: '@dnb/eufemia/icons/dnb/secondary_icons_medium',
}

/**
 * Lazily loads all icon export names from @dnb/eufemia/src/icons.
 * Only loaded when someone clicks the StackBlitz button.
 */
let iconExportNamesCache: string[] | null = null
async function getIconExportNames(): Promise<string[]> {
  if (!iconExportNamesCache) {
    const icons = await import('@dnb/eufemia/src/icons')
    iconExportNamesCache = Object.keys(icons)
  }
  return iconExportNamesCache
}

/**
 * Lazily loads all date-fns export names.
 * Only loaded when someone clicks the StackBlitz button.
 */
let dateFnsExportNamesCache: string[] | null = null
async function getDateFnsExportNames(): Promise<string[]> {
  if (!dateFnsExportNamesCache) {
    const dateFns = await import('date-fns')
    dateFnsExportNamesCache = Object.keys(dateFns)
  }
  return dateFnsExportNamesCache
}

/**
 * Converts a PascalCase name to snake_case.
 * E.g. "BellMedium" -> "bell_medium", "AccountCard" -> "account_card"
 */
function toSnakeCase(name: string): string {
  return name
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '')
}

/**
 * Analyzes code to detect what imports are needed.
 */
function analyzeCodeForImports(code: string) {
  const usedComponents: string[] = []
  const usedFragments: string[] = []
  const usedElements: string[] = []
  const usedFormsComponents: string[] = []
  const usedReactHooks: string[] = []
  const usedReactExports: string[] = []
  const usedSharedExports: string[] = []
  const usedIconNamespaces: string[] = []
  let usesStyled = false
  let usesBlocks = false

  // Helper to check if a name is used in code
  const isUsed = (name: string) => {
    // Match <Component, Component., or {Component (but not in strings/comments)
    const pattern = new RegExp(
      `[<{\\s,]${name}[.>\\s,)}]|^${name}[.>\\s]`,
      'm'
    )
    return pattern.test(code)
  }

  // Detect Eufemia components
  for (const name of getEufemiaComponentNames()) {
    if (isUsed(name)) {
      usedComponents.push(name)
    }
  }

  // Detect Eufemia fragments
  for (const name of getEufemiaFragmentNames()) {
    if (isUsed(name)) {
      usedFragments.push(name)
    }
  }

  // Detect Eufemia elements
  for (const name of getEufemiaElementNames()) {
    if (isUsed(name)) {
      usedElements.push(name)
    }
  }

  // Detect Forms components
  for (const name of FORMS_EXPORT_NAMES) {
    if (isUsed(name)) {
      usedFormsComponents.push(name)
    }
  }

  // Detect React hooks
  for (const hook of getReactHookNames()) {
    const pattern = new RegExp(`\\b${hook}\\s*\\(`)
    if (pattern.test(code)) {
      usedReactHooks.push(hook)
    }
  }

  // Detect other React exports
  for (const exp of getReactExportNames()) {
    const pattern = new RegExp(`\\b${exp}\\b`)
    if (pattern.test(code)) {
      usedReactExports.push(exp)
    }
  }

  // Detect shared exports (Provider, Theme)
  for (const exp of SHARED_EXPORTS) {
    if (isUsed(exp)) {
      usedSharedExports.push(exp)
    }
  }

  // Detect styled usage (from @emotion/styled)
  if (/\bstyled[.(]/.test(code)) {
    usesStyled = true
  }

  // Detect Blocks namespace usage (from @dnb/eufemia/extensions/forms/blocks)
  if (/\bBlocks\./.test(code)) {
    usesBlocks = true
  }

  // Detect icon namespace usage (PrimaryIconsMedium, SecondaryIconsMedium)
  for (const name of Object.keys(ICON_NAMESPACES)) {
    if (new RegExp(`\\b${name}\\b`).test(code)) {
      usedIconNamespaces.push(name)
    }
  }

  // Detect if code defines a function component (including exports)
  const isFunctionComponent =
    /^(export\s+)?(function\s+\w+|const\s+\w+\s*=\s*(\([^)]*\)|[^=])\s*=>)/m.test(
      code
    )

  // Detect if code already has a default export
  const hasDefaultExport = /^export\s+default\b/m.test(code)

  // Detect if code uses render() pattern (noInline)
  const usesRenderPattern = /\brender\s*\(/.test(code)

  // Check if code already has imports (user edited it)
  const hasExistingImports = /^import\s+/m.test(code)

  return {
    usedComponents,
    usedFragments,
    usedElements,
    usedFormsComponents,
    usedReactHooks,
    usedReactExports,
    usedSharedExports,
    usesStyled,
    usesBlocks,
    usedIconNamespaces,
    isFunctionComponent,
    hasDefaultExport,
    usesRenderPattern,
    hasExistingImports,
  }
}

/**
 * Detects external imports (icons, date-fns, etc.) needed by the code.
 * Uses dynamic imports to avoid bundling heavy modules on initial page load.
 * Only loaded when someone clicks the StackBlitz button.
 */
async function detectExternalImports(
  code: string,
  analysis: ReturnType<typeof analyzeCodeForImports>
): Promise<{ imports: string[]; dependencies: Record<string, string> }> {
  const imports: string[] = []
  const dependencies: Record<string, string> = {}

  // Collect all names already handled by other import detection
  const knownNames = new Set([
    ...analysis.usedComponents,
    ...analysis.usedFragments,
    ...analysis.usedElements,
    ...analysis.usedFormsComponents,
    ...analysis.usedReactHooks,
    ...analysis.usedReactExports,
    ...analysis.usedSharedExports,
    ...analysis.usedIconNamespaces,
    ...SHARED_EXPORTS,
    // Common names that aren't icons or date-fns
    'App',
    'Provider',
    'render',
    'styled',
    'Blocks',
  ])

  // Extract all identifiers from code that aren't already known
  const unknownNames = new Set<string>()
  const identifierPattern =
    /\b([A-Z][a-zA-Z]*|[a-z][a-z_]*_(?:medium|small|large)|[a-z][a-zA-Z]+)\b/g
  let match: RegExpExecArray | null

  while ((match = identifierPattern.exec(code)) !== null) {
    const name = match[1]
    if (!knownNames.has(name)) {
      unknownNames.add(name)
    }
  }

  if (unknownNames.size === 0) {
    return { imports, dependencies }
  }

  // Detect individual icon imports
  const iconNames = await getIconExportNames()
  const iconNameSet = new Set(iconNames)
  const iconImportPairs: Array<{ snakeName: string; usedName: string }> =
    []

  for (const name of unknownNames) {
    if (iconNameSet.has(name)) {
      iconImportPairs.push({ snakeName: name, usedName: name })
      knownNames.add(name)
    } else {
      const snakeName = toSnakeCase(name)
      if (iconNameSet.has(snakeName)) {
        iconImportPairs.push({ snakeName, usedName: name })
        knownNames.add(name)
      }
    }
  }

  if (iconImportPairs.length > 0) {
    const specifiers = iconImportPairs.map(({ snakeName, usedName }) =>
      snakeName === usedName ? snakeName : `${snakeName} as ${usedName}`
    )
    imports.push(
      `import { ${specifiers.join(', ')} } from '@dnb/eufemia/icons'`
    )
  }

  // Detect date-fns imports dynamically
  const dateFnsNames = await getDateFnsExportNames()
  const dateFnsSet = new Set(dateFnsNames)
  const usedDateFns: string[] = []

  for (const name of unknownNames) {
    if (!knownNames.has(name) && dateFnsSet.has(name)) {
      usedDateFns.push(name)
    }
  }

  if (usedDateFns.length > 0) {
    imports.push(`import { ${usedDateFns.join(', ')} } from 'date-fns'`)
    dependencies['date-fns'] = '^4.1.0'
  }

  return { imports, dependencies }
}

/**
 * Formats code using prettier with the project's configuration.
 */
export async function formatCode(code: string): Promise<string> {
  try {
    return await format(code, {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree],
      printWidth: 75,
      tabWidth: 2,
      singleQuote: true,
      bracketSpacing: true,
      useTabs: false,
      semi: false,
      bracketSameLine: false,
      trailingComma: 'es5',
    })
  } catch {
    return code
  }
}

/**
 * Generates the App.tsx content based on code analysis.
 * @param extraImports - Additional import statements (e.g. for icons detected asynchronously)
 */
function generateAppComponent(code: string, extraImports: string[] = []) {
  const analysis = analyzeCodeForImports(code)

  // If code already has imports, use it as-is with minimal wrapping
  if (analysis.hasExistingImports) {
    return code
  }

  // Build imports
  const imports: string[] = []

  // React imports (sorted for consistency)
  const reactImports = [
    ...analysis.usedReactHooks,
    ...analysis.usedReactExports,
  ].sort()
  if (reactImports.length > 0) {
    imports.push(`import { ${reactImports.join(', ')} } from 'react'`)
  }

  // Combine all Eufemia imports (components, fragments, elements)
  const allEufemiaImports = [
    ...analysis.usedComponents,
    ...analysis.usedFragments,
    ...analysis.usedElements,
  ]
  if (allEufemiaImports.length > 0) {
    imports.push(
      `import { ${allEufemiaImports.join(', ')} } from '@dnb/eufemia'`
    )
  }

  // Eufemia shared imports (Provider is always needed, plus any detected like Theme)
  const sharedImports = [
    'Provider',
    ...analysis.usedSharedExports.filter((e) => e !== 'Provider'),
  ]
  imports.push(
    `import { ${sharedImports.join(', ')} } from '@dnb/eufemia/shared'`
  )

  // Styled from emotion
  if (analysis.usesStyled) {
    imports.push(`import styled from '@emotion/styled'`)
  }

  // Forms imports
  if (analysis.usedFormsComponents.length > 0) {
    imports.push(
      `import { ${analysis.usedFormsComponents.join(', ')} } from '@dnb/eufemia/extensions/forms'`
    )
  }

  // Blocks namespace import
  if (analysis.usesBlocks) {
    imports.push(
      `import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'`
    )
  }

  // Icon namespace imports (PrimaryIconsMedium, SecondaryIconsMedium)
  for (const name of analysis.usedIconNamespaces) {
    imports.push(`import * as ${name} from '${ICON_NAMESPACES[name]}'`)
  }

  // Extra imports (e.g. icons, date-fns detected asynchronously)
  imports.push(...extraImports)

  const importsBlock = imports.join('\n')

  // Handle different code patterns
  if (analysis.usesRenderPattern) {
    // noInline pattern: extract the component and render it properly
    const componentCode = code
      .replace(
        /\brender\s*\(\s*<(\w+)/,
        'export default function App() {\n  return <$1'
      )
      .replace(/\)\s*$/, '\n}')

    return `${importsBlock}

${componentCode}`
  }

  if (analysis.hasDefaultExport) {
    // Code already has a default export - rename it and wrap
    const modifiedCode = code
      .replace(/^export\s+default\s+function\s+(\w+)/m, 'function $1')
      .replace(/^export\s+default\s+const\s+(\w+)/m, 'const $1')

    const match = code.match(
      /^export\s+default\s+(?:function|const)\s+(\w+)/m
    )
    const componentName = match?.[1] || 'Component'

    return `${importsBlock}

${modifiedCode}

export default function App() {
  return (
    <Provider>
      <${componentName} />
    </Provider>
  )
}`
  }

  if (analysis.isFunctionComponent) {
    // Code defines a function component - extract and use it
    const match = code.match(
      /^(?:export\s+)?(?:function\s+(\w+)|const\s+(\w+)\s*=)/m
    )
    const componentName = match?.[1] || match?.[2] || 'Example'

    return `${importsBlock}

${code}

export default function App() {
  return (
    <Provider>
      <${componentName} />
    </Provider>
  )
}`
  }

  // Plain JSX - wrap in App component
  return `${importsBlock}

export default function App() {
  return (
    <Provider>
      ${code}
    </Provider>
  )
}`
}

/**
 * Opens the given code in StackBlitz using their define API.
 * Creates a new project with the Eufemia starter template and the provided code.
 */
export async function openInStackBlitz(code: string) {
  // Analyze code to determine needed dependencies
  const analysis = analyzeCodeForImports(code)

  // Detect external imports (icons, date-fns, etc.) asynchronously
  // These modules are loaded lazily to avoid bundling on every page
  const external = await detectExternalImports(code, analysis)

  const appCode = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@dnb/eufemia/style'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`

  const appComponent = await formatCode(
    generateAppComponent(code, external.imports)
  )

  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Eufemia Example</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

  // Build dependencies object conditionally
  const dependencies: Record<string, string> = {
    '@dnb/eufemia': 'latest',
    react: '^19.0.0',
    'react-dom': '^19.0.0',
  }

  if (analysis.usesStyled) {
    dependencies['@emotion/styled'] = '^11.14.0'
  }

  Object.assign(dependencies, external.dependencies)

  const packageJson = JSON.stringify(
    {
      name: 'eufemia-example',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies,
      devDependencies: {
        '@types/react': '^19.0.0',
        '@types/react-dom': '^19.0.0',
        '@vitejs/plugin-react': '^4.4.1',
        typescript: '~5.8.3',
        vite: '^6.3.5',
      },
    },
    null,
    2
  )

  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
`

  const tsConfig = JSON.stringify(
    {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        isolatedModules: true,
        moduleDetection: 'force',
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        noUncheckedSideEffectImports: true,
      },
      include: ['src'],
    },
    null,
    2
  )

  // Create a form to submit to StackBlitz's define API
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://stackblitz.com/run?file=src/App.tsx'
  form.target = '_blank'

  const files: Record<string, string> = {
    'src/main.tsx': appCode,
    'src/App.tsx': appComponent,
    'index.html': indexHtml,
    'package.json': packageJson,
    'vite.config.ts': viteConfig,
    'tsconfig.json': tsConfig,
  }

  // Add project files
  for (const [filename, content] of Object.entries(files)) {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = `project[files][${filename}]`
    input.value = content
    form.appendChild(input)
  }

  // Add project metadata
  const titleInput = document.createElement('input')
  titleInput.type = 'hidden'
  titleInput.name = 'project[title]'
  titleInput.value = 'Eufemia Example'
  form.appendChild(titleInput)

  const descInput = document.createElement('input')
  descInput.type = 'hidden'
  descInput.name = 'project[description]'
  descInput.value = 'Example created from Eufemia documentation'
  form.appendChild(descInput)

  const templateInput = document.createElement('input')
  templateInput.type = 'hidden'
  templateInput.name = 'project[template]'
  templateInput.value = 'node'
  form.appendChild(templateInput)

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
