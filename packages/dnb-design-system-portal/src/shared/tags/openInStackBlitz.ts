/**
 * StackBlitz integration for opening code examples in a live playground.
 *
 * Import detection relies on the babel plugin (react-live-babel.ts) which
 * passes all file-level imports from Examples.tsx as sourceImports.
 * This module filters those to only include names actually used in each
 * code snippet — no hardcoded component/hook/export name lists needed.
 */

import { format } from 'prettier/standalone'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
// eslint-disable-next-line workspaces/require-dependency -- workspace sibling used at build-time only
import starterPackageJson from 'eufemia-starter/package.json'

/**
 * The version of @dnb/eufemia to install in StackBlitz.
 * On PR preview deployments, this is a pkg-pr-new URL pointing to the
 * pre-release built from the same commit. Falls back to 'latest' in
 * production or local development.
 */
export const eufemiaVersion: string =
  import.meta.env.VITE_EUFEMIA_STACKBLITZ_VERSION || 'latest'

/**
 * Filters sourceImports to only include names actually used in the code.
 * Each sourceImport is a full import statement string from the babel plugin.
 */
export function filterImportsByUsage(
  sourceImports: string[],
  code: string
): string[] {
  const result: string[] = []

  for (const stmt of sourceImports) {
    const fromMatch = stmt.match(/from\s+['"]([^'"]+)['"]/)
    if (!fromMatch) {
      continue
    }

    const source = fromMatch[1]

    // Handle namespace imports (e.g. "import * as Blocks from ...")
    const namespaceMatch = stmt.match(/^import\s+\*\s+as\s+(\w+)/)
    if (namespaceMatch) {
      const namespaceName = namespaceMatch[1]
      if (new RegExp(`\\b${namespaceName}\\b`).test(code)) {
        result.push(`import * as ${namespaceName} from '${source}'`)
      }
      continue
    }

    // Extract default import name (e.g. "styled" from "import styled from ...")
    const defaultMatch = stmt.match(/^import\s+(\w+)[\s,]/)
    const defaultName =
      defaultMatch && defaultMatch[1] !== '{' ? defaultMatch[1] : null

    // Extract named imports
    const namedMatch = stmt.match(/\{([^}]+)\}/)
    const namedSpecs: Array<{ full: string; local: string }> = []

    if (namedMatch) {
      for (const spec of namedMatch[1].split(',')) {
        const trimmed = spec.trim()
        if (!trimmed) {
          continue
        }

        const parts = trimmed.split(/\s+as\s+/)
        const local = parts.length > 1 ? parts[1] : parts[0]
        namedSpecs.push({ full: trimmed, local })
      }
    }

    // Filter by code usage
    const defaultUsed =
      defaultName && new RegExp(`\\b${defaultName}\\b`).test(code)

    const usedNamed = namedSpecs.filter((s) =>
      new RegExp(`\\b${s.local}\\b`).test(code)
    )

    if (!defaultUsed && usedNamed.length === 0) {
      continue
    }

    // Rebuild import statement with only used specifiers
    const parts: string[] = []

    if (defaultUsed) {
      parts.push(defaultName)
    }

    if (usedNamed.length > 0) {
      parts.push(`{ ${usedNamed.map((s) => s.full).join(', ')} }`)
    }

    result.push(`import ${parts.join(', ')} from '${source}'`)
  }

  return result
}

/**
 * Analyzes code structure to determine how to wrap it for StackBlitz.
 */
export function analyzeCodeStructure(code: string) {
  /* eslint-disable security/detect-unsafe-regex */
  const functionPattern = /^(?:export\s+)?function\s+\w+/m
  const arrowPattern =
    /^(?:export\s+)?const\s+\w+\s*=\s*(?:\([^)]*\)|\w+)\s*=>/m
  /* eslint-enable security/detect-unsafe-regex */

  return {
    isFunctionComponent:
      functionPattern.test(code) || arrowPattern.test(code),
    hasDefaultExport: /^export\s+default\b/m.test(code),
    usesRenderPattern: /\brender\s*\(/.test(code),
    hasExistingImports: /^import\s+/m.test(code),
  }
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
 * Generates the App.tsx content with imports and code wrapping.
 */
export function generateAppComponent(
  code: string,
  imports: string[] = []
) {
  const structure = analyzeCodeStructure(code)

  // If code already has imports, use it as-is with minimal wrapping
  if (structure.hasExistingImports) {
    return code
  }

  const importsBlock = imports.join('\n')

  // Handle different code patterns
  if (structure.usesRenderPattern) {
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

  if (structure.hasDefaultExport) {
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
  return <${componentName} />
}`
  }

  if (structure.isFunctionComponent) {
    // Code defines a function component - extract and use it
    const fnMatch = code.match(
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(?:export\s+)?function\s+(\w+)/m
    )
    const constMatch = code.match(
      // eslint-disable-next-line security/detect-unsafe-regex
      /^(?:export\s+)?const\s+(\w+)\s*=/m
    )
    const componentName = fnMatch?.[1] ?? constMatch?.[1] ?? 'Example'

    return `${importsBlock}

${code}

export default function App() {
  return <${componentName} />
}`
  }

  // Plain JSX - wrap in App component
  return `${importsBlock}

export default function App() {
  return (
    <>
      ${code}
    </>
  )
}`
}

/**
 * Opens the given code in StackBlitz using their define API.
 * Creates a new project with the Eufemia starter template and the provided code.
 */
export async function openInStackBlitz(
  code: string,
  sourceImports?: string[]
) {
  // Filter sourceImports to only include names used in this code snippet
  const imports = filterImportsByUsage(sourceImports || [], code)

  // Detect external package dependencies from filtered imports
  const dependencies: Record<string, string> = {
    '@dnb/eufemia': eufemiaVersion,
    react: starterPackageJson.dependencies.react,
    'react-dom': starterPackageJson.dependencies['react-dom'],
  }

  const knownPackages = new Set(['@dnb/eufemia', 'react', 'react-dom'])

  for (const stmt of imports) {
    const fromMatch = stmt.match(/from\s+['"]([^'"]+)['"]/)
    if (!fromMatch) {
      continue
    }

    const source = fromMatch[1]
    if (source.startsWith('.') || source.startsWith('/')) {
      continue
    }

    // Extract package name (handle scoped packages like @scope/pkg)
    const pkg = source.startsWith('@')
      ? source.split('/').slice(0, 2).join('/')
      : source.split('/')[0]

    if (!knownPackages.has(pkg)) {
      dependencies[pkg] = 'latest'
    }
  }

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
    generateAppComponent(code, imports)
  )

  // Mirrors eufemia-starter/index.html (without favicon)
  const indexHtml = `<!DOCTYPE html>
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

</html>`

  const packageJson = JSON.stringify(
    {
      name: 'eufemia-example',
      private: true,
      version: '0.0.0',
      type: 'module',
      repository: starterPackageJson.repository,
      bugs: starterPackageJson.bugs,
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      dependencies,
      devDependencies: {
        '@types/react': starterPackageJson.devDependencies['@types/react'],
        '@types/react-dom':
          starterPackageJson.devDependencies['@types/react-dom'],
        '@vitejs/plugin-react':
          starterPackageJson.devDependencies['@vitejs/plugin-react'],
        typescript: starterPackageJson.devDependencies.typescript,
        vite: starterPackageJson.devDependencies.vite,
      },
    },
    null,
    2
  )

  // Mirrors eufemia-starter/vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      jsx: 'automatic',
    },
  },
})
`

  // Mirrors eufemia-starter/tsconfig.app.json (without comments)
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
