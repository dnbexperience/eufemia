/**
 * StackBlitz integration for opening code examples in a live playground.
 */

import { getComponents } from '@dnb/eufemia/src/components/lib'
import { getFragments } from '@dnb/eufemia/src/fragments/lib'
import { getElements } from '@dnb/eufemia/src/elements/lib'

// Get component names dynamically from Eufemia's exports
const EUFEMIA_COMPONENT_NAMES = Object.keys(getComponents())
const EUFEMIA_FRAGMENT_NAMES = Object.keys(getFragments())
const EUFEMIA_ELEMENT_NAMES = Object.keys(getElements())

// Components from @dnb/eufemia/extensions/forms
const FORMS_COMPONENTS = [
  'Field',
  'Value',
  'Form',
  'Wizard',
  'FieldBlock',
  'Iterate',
  'FormError',
  'Tools',
]

// React hooks that need to be imported
const REACT_HOOKS = [
  'useState',
  'useEffect',
  'useRef',
  'useCallback',
  'useMemo',
  'useContext',
  'useLayoutEffect',
  'useReducer',
  'useImperativeHandle',
  'useDebugValue',
  'useDeferredValue',
  'useTransition',
  'useId',
  'useSyncExternalStore',
  'useInsertionEffect',
]

// Other React exports
const REACT_EXPORTS = [
  'Fragment',
  'Suspense',
  'createContext',
  'memo',
  'forwardRef',
  'lazy',
]

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
  for (const name of EUFEMIA_COMPONENT_NAMES) {
    if (isUsed(name)) {
      usedComponents.push(name)
    }
  }

  // Detect Eufemia fragments
  for (const name of EUFEMIA_FRAGMENT_NAMES) {
    if (isUsed(name)) {
      usedFragments.push(name)
    }
  }

  // Detect Eufemia elements
  for (const name of EUFEMIA_ELEMENT_NAMES) {
    if (isUsed(name)) {
      usedElements.push(name)
    }
  }

  // Detect Forms components
  for (const name of FORMS_COMPONENTS) {
    if (isUsed(name)) {
      usedFormsComponents.push(name)
    }
  }

  // Detect React hooks
  for (const hook of REACT_HOOKS) {
    const pattern = new RegExp(`\\b${hook}\\s*\\(`)
    if (pattern.test(code)) {
      usedReactHooks.push(hook)
    }
  }

  // Detect other React exports
  for (const exp of REACT_EXPORTS) {
    const pattern = new RegExp(`\\b${exp}\\b`)
    if (pattern.test(code)) {
      usedReactExports.push(exp)
    }
  }

  // Detect if code defines a function component
  const isFunctionComponent =
    /^(function\s+\w+|const\s+\w+\s*=\s*(\([^)]*\)|[^=])\s*=>)/m.test(code)

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
    isFunctionComponent,
    usesRenderPattern,
    hasExistingImports,
  }
}

/**
 * Generates the App.tsx content based on code analysis.
 */
function generateAppComponent(code: string) {
  const analysis = analyzeCodeForImports(code)

  // If code already has imports, use it as-is with minimal wrapping
  if (analysis.hasExistingImports) {
    return code
  }

  // Build imports
  const imports: string[] = []

  // React imports
  const reactImports = [
    ...analysis.usedReactHooks,
    ...analysis.usedReactExports,
  ]
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

  // Eufemia shared imports (Provider is always needed)
  imports.push(`import { Provider } from '@dnb/eufemia/shared'`)

  // Forms imports
  if (analysis.usedFormsComponents.length > 0) {
    imports.push(
      `import { ${analysis.usedFormsComponents.join(', ')} } from '@dnb/eufemia/extensions/forms'`
    )
  }

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

  if (analysis.isFunctionComponent) {
    // Code defines a function component - extract and use it
    const match = code.match(/^(?:function\s+(\w+)|const\s+(\w+)\s*=)/m)
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
export function openInStackBlitz(code: string) {
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

  const appComponent = generateAppComponent(code)

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
      dependencies: {
        '@dnb/eufemia': 'latest',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
      },
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
  form.action = 'https://stackblitz.com/run'
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
