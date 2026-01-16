#!/usr/bin/env node
/* eslint-disable no-console */

import fs from 'node:fs'
import path from 'node:path'
import prettier from 'prettier'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'
import generateModule from '@babel/generator'
import * as t from '@babel/types'

const traverse = (traverseModule as any).default ?? traverseModule
const generate = (generateModule as any).default ?? generateModule
const PUBLIC_URL = process.env.CF_PAGES_URL || 'https://eufemia.dnb.no'

type ComponentCodeMap = Map<string, string>
type ImportsByFile = Map<string, string[]>
type PrettierConfig = Record<string, unknown>
type ConvertState = {
  mdxCache: Map<string, string>
  inProgress: Set<string>
}
type ComponentEntry = {
  code: string
  format: 'md' | 'tsx'
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length < 1) {
    console.log('Usage: node scripts/mdx-to-md.js <input.mdx> [output.md]')
    process.exit(1)
  }

  const inputPath = path.resolve(process.cwd(), args[0])
  const outputPath = args[1]
    ? path.resolve(process.cwd(), args[1])
    : inputPath.replace(/\.mdx?$/, '.md')

  const portalRoot = resolvePortalRoot(process.cwd())
  const docsRoot = path.join(portalRoot, 'src/docs')
  const prettierConfigPath = path.join(portalRoot, '.prettierrc')
  const prettierConfig = JSON.parse(
    fs.readFileSync(prettierConfigPath, 'utf-8'),
  ) as PrettierConfig

  const state: ConvertState = {
    mdxCache: new Map(),
    inProgress: new Set(),
  }
  const output = await convertMdxToMd({
    inputPath,
    docsRoot,
    prettierConfig,
    includeFrontmatter: true,
    state,
  })
  fs.writeFileSync(outputPath, output, 'utf-8')
  console.log(`Wrote ${outputPath}`)
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

export { main }

function resolvePortalRoot(startDir: string) {
  let current = startDir
  const root = path.parse(startDir).root

  while (true) {
    const candidate = path.join(current, 'package.json')
    if (fs.existsSync(candidate)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(candidate, 'utf-8'))
        if (pkg?.name === 'dnb-design-system-portal') {
          return current
        }
      } catch {
        // Ignore invalid package.json while traversing.
      }
    }

    const portalCandidate = path.join(
      current,
      'packages',
      'dnb-design-system-portal',
    )
    if (fs.existsSync(portalCandidate)) {
      return portalCandidate
    }

    if (current === root) {
      break
    }
    current = path.dirname(current)
  }

  throw new Error(
    'Could not resolve dnb-design-system-portal root. Run from repo root or packages/dnb-design-system-portal.',
  )
}

function splitFrontmatter(content: string) {
  const match = content.match(/^---\n[\s\S]*?\n---\n/)
  if (!match) {
    return { frontmatter: '', body: content }
  }
  const frontmatter = match[0].trimEnd()
  const body = content.slice(match[0].length)
  return { frontmatter, body }
}

function extractImports(content: string) {
  const importsByFile: ImportsByFile = new Map()
  const lines = content.split('\n')
  const output: string[] = []
  let inFence = false
  let inImportBlock = false
  let importLines: string[] = []

  for (const line of lines) {
    const fenceMatch = line.match(/^(```+|~~~+)/)
    if (fenceMatch) {
      inFence = !inFence
      output.push(line)
      continue
    }

    if (!inFence) {
      const trimmed = line.trim()
      if (inImportBlock) {
        importLines.push(line)
        const joined = importLines.join(' ').trim()
        if (/\bfrom\s+['"][^'"]+['"]/.test(joined)) {
          collectImportSpecifiers(joined, importsByFile)
          inImportBlock = false
          importLines = []
        }
        continue
      }
      if (/^import\s+/.test(trimmed)) {
        if (/^import\s+type\s+/.test(trimmed)) {
          continue
        }
        if (!/\bfrom\s+['"][^'"]+['"]/.test(trimmed)) {
          inImportBlock = true
          importLines = [line]
          continue
        }
        collectImportSpecifiers(trimmed, importsByFile)
        continue
      }
    }

    output.push(line)
  }

  return {
    importsByFile,
    cleanedBody: output.join('\n').replace(/\n{3,}/g, '\n\n'),
  }
}

function collectImportSpecifiers(
  statement: string,
  importsByFile: ImportsByFile,
) {
  if (/^import\s+type\s+/.test(statement)) {
    return
  }
  const sourceMatch = statement.match(/from\s+['"]([^'"]+)['"]/)
  if (!sourceMatch) {
    return
  }

  const source = sourceMatch[1]
  const specifierPart = statement
    .replace(/^import\s+/, '')
    .replace(/\s+from\s+['"][^'"]+['"]\s*;?$/, '')
    .trim()

  const specifiers: string[] = []
  const namespaceMatch = specifierPart.match(/\*\s+as\s+([A-Za-z0-9_]+)/)
  if (namespaceMatch && namespaceMatch[1]) {
    specifiers.push(`* as ${namespaceMatch[1]}`)
  }
  const defaultPart = specifierPart.split(',')[0].trim()
  if (
    defaultPart &&
    !defaultPart.startsWith('{') &&
    !defaultPart.startsWith('*')
  ) {
    specifiers.push(defaultPart)
  }

  const namedMatch = specifierPart.match(/\{([\s\S]+)\}/)
  if (namedMatch) {
    const namedSpecifiers = namedMatch[1]
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const parts = item.split(/\s+as\s+/)
        return parts[1] ? parts[1].trim() : parts[0].trim()
      })
    specifiers.push(...namedSpecifiers)
  }

  if (specifiers.length > 0) {
    const existing = importsByFile.get(source) || []
    importsByFile.set(source, existing.concat(specifiers))
  }
}

async function collectComponentCode({
  importsByFile,
  inputDir,
  docsRoot,
  prettierConfig,
  state,
}: {
  importsByFile: ImportsByFile
  inputDir: string
  docsRoot: string
  prettierConfig: PrettierConfig
  state: ConvertState
}) {
  const componentCode: Map<string, ComponentEntry> = new Map()
  const parsedFiles: Map<string, ComponentCodeMap> = new Map()
  const mdxCache = state.mdxCache
  const inProgress = state.inProgress

  for (const [source, names] of Array.from(importsByFile.entries())) {
    const resolvedPath = resolveImportPath({
      source,
      inputDir,
      docsRoot,
    })
    if (!resolvedPath) {
      continue
    }

    if (resolvedPath.endsWith('.mdx')) {
      let md = mdxCache.get(resolvedPath)
      if (!md && !inProgress.has(resolvedPath)) {
        inProgress.add(resolvedPath)
        md = await convertMdxToMd({
          inputPath: resolvedPath,
          docsRoot,
          prettierConfig,
          includeFrontmatter: false,
          state,
        })
        inProgress.delete(resolvedPath)
        mdxCache.set(resolvedPath, md)
      }
      if (md) {
        for (const name of names) {
          const trimmed = md.trim()
          if (trimmed) {
            componentCode.set(name, { code: trimmed, format: 'md' })
          }
        }
      }
      continue
    }

    let fileCode = parsedFiles.get(resolvedPath)
    if (!fileCode) {
      const sourceCode = fs.readFileSync(resolvedPath, 'utf-8')
      const ast = parse(sourceCode, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      })
      fileCode = await extractExports(ast, prettierConfig)
      parsedFiles.set(resolvedPath, fileCode)
    }

    for (const name of names) {
      if (name.startsWith('* as ')) {
        const ns = name.replace('* as ', '').trim()
        if (ns) {
          for (const [exportName, exportCode] of fileCode.entries()) {
            componentCode.set(`${ns}.${exportName}`, {
              code: exportCode,
              format: 'tsx',
            })
          }
        }
        continue
      }
      const code = fileCode.get(name)
      if (code) {
        componentCode.set(name, { code, format: 'tsx' })
      }
    }
  }

  return componentCode
}

export async function convertMdxToMd({
  inputPath,
  docsRoot,
  prettierConfig,
  includeFrontmatter,
  state,
}: {
  inputPath: string
  docsRoot: string
  prettierConfig: PrettierConfig
  includeFrontmatter: boolean
  state: ConvertState
}) {
  const raw = fs.readFileSync(inputPath, 'utf-8')
  const { frontmatter, body } = splitFrontmatter(raw)
  const { importsByFile, cleanedBody } = extractImports(body)
  const componentCode = await collectComponentCode({
    importsByFile,
    inputDir: path.dirname(inputPath),
    docsRoot,
    prettierConfig,
    state,
  })

  let outputBody = cleanedBody
  outputBody = stripWrapperTags(outputBody, [
    'VisibilityByTheme',
    'VisibleWhenVisualTest',
  ])
  outputBody = replaceComponentUsages(outputBody, componentCode)

  const metadataUrl = buildMetadataUrlFromPath(inputPath, docsRoot)
  const outputFrontmatter = includeFrontmatter
    ? addMetadataToFrontmatter(frontmatter, metadataUrl)
    : ''
  const output = [outputFrontmatter, outputBody.trim()]
    .filter(Boolean)
    .join('\n\n')
  const formattedOutput = await prettier.format(output, {
    ...prettierConfig,
    parser: 'markdown',
  })
  return `${formattedOutput.trim()}\n`
}

function buildMetadataUrlFromPath(filePath: string, docsRoot: string) {
  const rel = path.relative(docsRoot, filePath)
  const noExt = rel.replace(/\.[^/.]+$/, '')
  const slug = `/${path.posix.join(
    'uilib',
    noExt.split(path.sep).join('/'),
  )}/`
  return `${PUBLIC_URL}${slug}metadata.json`
}

function addMetadataToFrontmatter(
  frontmatter: string,
  metadataUrl: string,
) {
  if (!frontmatter) {
    return `---\nmetadata: ${metadataUrl}\n---`
  }
  const lines = frontmatter
    .replace(/^---\n/, '')
    .replace(/\n---$/, '')
    .split('\n')
  const cleaned: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }
    const keyMatch = /^([A-Za-z0-9_-]+):/.exec(trimmed)
    if (!keyMatch) {
      continue
    }
    const key = keyMatch[1]
    if (key === 'title' || key === 'description') {
      cleaned.push(line)
    }
  }
  cleaned.push(`metadata: ${metadataUrl}`)
  return `---\n${cleaned.join('\n')}\n---`
}

function resolveImportPath({
  source,
  inputDir,
  docsRoot,
}: {
  source: string
  inputDir: string
  docsRoot: string
}) {
  let candidate: string | null = null
  if (source.startsWith('Docs/')) {
    candidate = path.join(docsRoot, source.replace(/^Docs\//, ''))
  } else if (source.startsWith('.')) {
    candidate = path.resolve(inputDir, source)
  } else {
    return null
  }

  return resolveWithExtension(candidate)
}

function resolveWithExtension(basePath: string) {
  const extensions = ['.tsx', '.ts', '.jsx', '.js', '.mdx']
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) {
    return basePath
  }

  for (const ext of extensions) {
    const withExt = `${basePath}${ext}`
    if (fs.existsSync(withExt)) {
      return withExt
    }
  }

  return null
}

async function extractExports(ast: any, prettierConfig: PrettierConfig) {
  const exportsMap: ComponentCodeMap = new Map()
  const exportEntries: Array<{
    name: string
    jsxNode: t.JSXElement | t.JSXFragment
  }> = []

  traverse(ast, {
    ExportNamedDeclaration(path) {
      const declaration = path.node.declaration
      if (t.isVariableDeclaration(declaration)) {
        for (const declarator of declaration.declarations) {
          if (!t.isIdentifier(declarator.id)) {
            continue
          }
          const name = declarator.id.name
          const init = declarator.init
          const jsxNode = getReturnedJSX(init)
          if (jsxNode) {
            exportEntries.push({ name, jsxNode })
          }
        }
      } else if (t.isFunctionDeclaration(declaration)) {
        const name = declaration.id?.name
        const jsxNode = getReturnedJSX(declaration)
        if (name && jsxNode) {
          exportEntries.push({ name, jsxNode })
        }
      }
    },
  })

  for (const entry of exportEntries) {
    const code = await formatJSXChildren(entry.jsxNode, prettierConfig)
    if (code) {
      exportsMap.set(entry.name, code)
    }
  }

  return exportsMap
}

function getReturnedJSX(fnNode?: any) {
  if (!fnNode) {
    return null
  }

  if (t.isArrowFunctionExpression(fnNode)) {
    if (t.isJSXElement(fnNode.body) || t.isJSXFragment(fnNode.body)) {
      return fnNode.body
    }
    if (t.isBlockStatement(fnNode.body)) {
      const returnStmt = fnNode.body.body.find((node) =>
        t.isReturnStatement(node),
      )
      const arg = returnStmt?.argument
      if (t.isJSXElement(arg) || t.isJSXFragment(arg)) {
        return arg
      }
    }
  }

  if (t.isFunctionDeclaration(fnNode) || t.isFunctionExpression(fnNode)) {
    const returnStmt = fnNode.body.body.find((node) =>
      t.isReturnStatement(node),
    )
    const arg = returnStmt?.argument
    if (t.isJSXElement(arg) || t.isJSXFragment(arg)) {
      return arg
    }
  }

  return null
}

async function formatJSXChildren(
  jsxNode: t.JSXElement | t.JSXFragment,
  prettierConfig: PrettierConfig,
) {
  let children: Array<any> = []

  if (t.isJSXElement(jsxNode)) {
    const name = jsxNode.openingElement.name
    if (t.isJSXIdentifier(name) && name.name === 'ComponentBox') {
      children = jsxNode.children
    } else {
      children = [jsxNode]
    }
  } else if (t.isJSXFragment(jsxNode)) {
    children = jsxNode.children
  }

  const filteredChildren = children.filter((child) => {
    return !(t.isJSXText(child) && !child.value.trim())
  })

  if (filteredChildren.length === 0) {
    return ''
  }

  let childCode: string[]
  let fromStatements = false
  if (filteredChildren.length === 1) {
    const single = filteredChildren[0]
    if (t.isJSXExpressionContainer(single)) {
      const expr = single.expression
      if (t.isParenthesizedExpression(expr)) {
        single.expression = expr.expression
      }
      if (
        t.isArrowFunctionExpression(single.expression) ||
        t.isFunctionExpression(single.expression)
      ) {
        const body = single.expression.body
        if (t.isBlockStatement(body)) {
          fromStatements = true
          const statements = body.body
          const last = statements[statements.length - 1]
          if (t.isReturnStatement(last) && last.argument) {
            const renderCall = t.expressionStatement(
              t.callExpression(t.identifier('render'), [last.argument]),
            )
            childCode = statements
              .slice(0, -1)
              .concat(renderCall)
              .map((stmt) => generate(stmt).code)
          } else {
            childCode = statements.map((stmt) => generate(stmt).code)
          }
        } else if (t.isJSXElement(body) || t.isJSXFragment(body)) {
          childCode = [generate(body).code]
        } else {
          childCode = [generate(single).code]
        }
      } else {
        childCode = [generate(single).code]
      }
    } else {
      childCode = [generate(single).code]
    }
  } else {
    childCode = filteredChildren.map((child) => generate(child).code)
  }
  let code = childCode.join('\n')
  if (filteredChildren.length === 1 && !fromStatements) {
    const onlyChild = filteredChildren[0]
    if (t.isJSXElement(onlyChild) || t.isJSXFragment(onlyChild)) {
      code = `render(${generate(onlyChild).code})`
    }
  }
  if (childCode.length > 1 && !fromStatements) {
    code = `<>${childCode.join('\n')}</>`
  }

  try {
    code = await prettier.format(code, {
      ...prettierConfig,
      parser: 'babel-ts',
    })
  } catch {
    return code.trim()
  }

  code = code.replace(/(^|\n)\s*;(?=\s*[A-Za-z<(])/g, '$1')

  if (childCode.length > 1 && !fromStatements) {
    code = code.replace(/^<>|<\/>$|^\s{2}/gm, '')
  }

  return code.trim()
}

function stripWrapperTags(content: string, tagNames: string[]) {
  let output = content
  for (const tag of tagNames) {
    const openTag = new RegExp(`<${tag}[^>]*>`, 'g')
    const closeTag = new RegExp(`</${tag}>`, 'g')
    output = output.replace(openTag, '').replace(closeTag, '')
  }
  return output
}

function replaceComponentUsages(
  content: string,
  componentCode: Map<string, ComponentEntry | string>,
) {
  const componentRegex =
    /<([A-Z][A-Za-z0-9_]*(?:\.[A-Za-z0-9_]+)*)\s*\/>/g

  return content.replace(componentRegex, (match, name: string) => {
    const entry = componentCode.get(name)
    if (!entry) {
      return match
    }
    if (typeof entry === 'string') {
      return `\n\`\`\`tsx\n${entry}\n\`\`\`\n`
    }
    if (entry.format === 'md') {
      return `\n${entry.code}\n`
    }
    if (looksLikeMarkdown(entry.code)) {
      return `\n${entry.code}\n`
    }
    return `\n\`\`\`tsx\n${entry.code}\n\`\`\`\n`
  })
}

function looksLikeMarkdown(code: string) {
  return /(^|\n)#{1,6}\s+\S/.test(code) || /```/.test(code)
}
