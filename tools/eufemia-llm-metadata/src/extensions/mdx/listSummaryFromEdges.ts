import fs from 'fs-extra'
import path from 'path'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import { parseSimpleJsxStringAttributes } from './utils.ts'

type ListSummaryFrontmatter = {
  title?: string | null
  description?: string | null
  order?: number | string | null
  draft?: boolean | null
  hideInMenu?: boolean | null
  componentType?: string | null
  showTabs?: boolean | null
}

type ListEntry = {
  slug: string
  title: string
  description: string | null
  frontmatter: ListSummaryFrontmatter
}

type PathFilter =
  | {
      type: 'glob'
      value: string
    }
  | {
      type: 'regex'
      value: RegExp
    }

type FrontmatterFilter = {
  field: string
  operator: 'ne' | 'regex'
  value: boolean | null | RegExp | string
}

type SortField = {
  field: string
  direction: 'ASC' | 'DESC'
}

type ListSummaryConfig = {
  pathFilter: PathFilter | null
  frontmatterFilters: FrontmatterFilter[]
  sortFields: SortField[]
  returnListItems: boolean
}

type ListSummaryData = {
  config: ListSummaryConfig
  entries: ListEntry[]
}

const docsFilesCache = new Map<string, string[]>()
const listSummaryCache = new Map<string, ListSummaryData | null>()

export function createListSummaryFromEdgesExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'ListSummaryFromEdges',
    replace: (content) => replaceListSummaryFromEdges(content, deps),
  }
}

async function replaceListSummaryFromEdges(
  content: string,
  deps: SpecialMdxRendererDeps
) {
  let output = content
  const candidates = findRenderableListComponents(
    content,
    deps.importsByFile
  )

  for (const candidate of candidates) {
    const regex = new RegExp(`<${candidate.name}\\b([^>]*)\\/>`, 'g')

    if (!regex.test(output)) {
      continue
    }

    regex.lastIndex = 0

    const wrapperPath = await resolveImportedComponentPath(
      candidate.source,
      deps
    )

    if (!wrapperPath) {
      continue
    }

    const listSummaryData = await loadListSummaryData(wrapperPath, deps)

    if (!listSummaryData || listSummaryData.entries.length === 0) {
      continue
    }

    output = output.replace(regex, (_match, attrsSource) => {
      const attrs = parseSimpleJsxStringAttributes(
        String(attrsSource || '')
      )
      const level = parseHeadingLevel(String(attrs.level || ''))
      const description = attrs.description ?? null

      return `\n${renderListEntriesMarkdown(listSummaryData.entries, {
        returnListItems: listSummaryData.config.returnListItems,
        level,
        description,
      })}\n`
    })
  }

  return output
}

function findRenderableListComponents(
  content: string,
  importsByFile: Map<string, string[]>
) {
  const candidates: Array<{ name: string; source: string }> = []

  for (const [source, importedNames] of Array.from(
    importsByFile.entries()
  )) {
    for (const importedName of importedNames) {
      if (
        importedName.startsWith('* as ') ||
        !/^List[A-Z]/.test(importedName) ||
        !content.includes(`<${importedName}`)
      ) {
        continue
      }

      candidates.push({ name: importedName, source })
    }
  }

  return candidates
}

async function resolveImportedComponentPath(
  source: string,
  deps: Pick<SpecialMdxRendererDeps, 'findPackageRoot' | 'inputDir'>
) {
  if (source.startsWith('.') || source.startsWith('/')) {
    return resolveSourceWithExtension(path.resolve(deps.inputDir, source))
  }

  if (source.startsWith('dnb-design-system-portal/')) {
    const portalRoot = deps.findPackageRoot('dnb-design-system-portal')

    if (!portalRoot) {
      return null
    }

    return resolveSourceWithExtension(
      path.join(
        portalRoot,
        source.replace(/^dnb-design-system-portal\//, '')
      )
    )
  }

  return null
}

async function resolveSourceWithExtension(basePath: string) {
  const candidates = [
    basePath,
    `${basePath}.tsx`,
    `${basePath}.ts`,
    `${basePath}.jsx`,
    `${basePath}.js`,
    path.join(basePath, 'index.tsx'),
    path.join(basePath, 'index.ts'),
    path.join(basePath, 'index.jsx'),
    path.join(basePath, 'index.js'),
  ]

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate)

      if (stat.isFile()) {
        return candidate
      }
    } catch {
      // ignore
    }
  }

  return null
}

async function loadListSummaryData(
  wrapperPath: string,
  deps: Pick<SpecialMdxRendererDeps, 'docsRoot' | 'toSlugAndDir'>
) {
  const cacheKey = `${wrapperPath}::${deps.docsRoot}`

  if (listSummaryCache.has(cacheKey)) {
    return listSummaryCache.get(cacheKey) || null
  }

  try {
    const source = await fs.readFile(wrapperPath, 'utf-8')

    if (!source.includes('ListSummaryFromEdges')) {
      listSummaryCache.set(cacheKey, null)
      return null
    }

    const querySource = extractTemplateLiteral(source, 'graphql`')

    if (!querySource) {
      listSummaryCache.set(cacheKey, null)
      return null
    }

    const config = parseListSummaryConfig(querySource, source)
    const docsFiles = await findAllDocFiles(deps.docsRoot)
    const entries: ListEntry[] = []

    for (const filePath of docsFiles) {
      const relativePath = path
        .relative(deps.docsRoot, filePath)
        .replace(/\\/g, '/')

      if (!matchesPathFilter(relativePath, config.pathFilter)) {
        continue
      }

      const frontmatter = await readListSummaryFrontmatter(filePath)

      if (
        !frontmatter ||
        !matchesFrontmatterFilters(frontmatter, config)
      ) {
        continue
      }

      if (typeof frontmatter.title !== 'string' || !frontmatter.title) {
        continue
      }

      entries.push({
        slug: deps.toSlugAndDir(relativePath, '').slug,
        title: frontmatter.title,
        description:
          typeof frontmatter.description === 'string'
            ? frontmatter.description
            : null,
        frontmatter,
      })
    }

    entries.sort((a, b) => compareListEntries(a, b, config.sortFields))

    const data = { config, entries }
    listSummaryCache.set(cacheKey, data)

    return data
  } catch {
    listSummaryCache.set(cacheKey, null)
    return null
  }
}

function extractTemplateLiteral(source: string, anchor: string) {
  const start = source.indexOf(anchor)

  if (start < 0) {
    return null
  }

  const contentStart = start + anchor.length
  const end = source.indexOf('`', contentStart)

  if (end < 0) {
    return null
  }

  return source.slice(contentStart, end)
}

function parseListSummaryConfig(
  querySource: string,
  componentSource: string
): ListSummaryConfig {
  return {
    pathFilter: parsePathFilter(querySource),
    frontmatterFilters: parseFrontmatterFilters(querySource),
    sortFields: parseSortFields(querySource),
    returnListItems:
      /<ListSummaryFromEdges\b[^>]*\breturnListItems\b/.test(
        componentSource
      ),
  }
}

function parsePathFilter(querySource: string): PathFilter | null {
  const contentFilePathBlock = extractNamedBlock(
    querySource,
    'contentFilePath'
  )

  if (!contentFilePathBlock) {
    return null
  }

  const globMatch = contentFilePathBlock.match(
    /\bglob\s*:\s*(["'])([\s\S]*?)\1/
  )

  if (globMatch?.[2]) {
    return {
      type: 'glob',
      value: globMatch[2],
    }
  }

  const regexMatch = contentFilePathBlock.match(
    /\bregex\s*:\s*(["'])([\s\S]*?)\1/
  )

  if (regexMatch?.[2]) {
    return {
      type: 'regex',
      value: new RegExp(
        regexMatch[2].replace(/^\//, '').replace(/\/$/, '')
      ),
    }
  }

  return null
}

function parseFrontmatterFilters(querySource: string) {
  const frontmatterBlock = extractNamedBlock(querySource, 'frontmatter')

  if (!frontmatterBlock) {
    return []
  }

  const filters: FrontmatterFilter[] = []
  const regex =
    /(\w+)\s*:\s*\{\s*(ne|regex)\s*:\s*(null|true|false|"[^"]*"|'[^']*')\s*\}/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(frontmatterBlock))) {
    const [, field, operator, rawValue] = match

    if (!field || !operator || !rawValue) {
      continue
    }

    filters.push({
      field,
      operator: operator as 'ne' | 'regex',
      value: parseFilterValue(operator as 'ne' | 'regex', rawValue),
    })
  }

  return filters
}

function parseSortFields(querySource: string) {
  const sortBlock = extractNamedArrayBlock(querySource, 'sort')

  if (!sortBlock) {
    return []
  }

  const fields: SortField[] = []
  const regex = /frontmatter\s*:\s*\{\s*(\w+)\s*:\s*(ASC|DESC)\s*\}/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(sortBlock))) {
    const [, field, direction] = match

    if (!field || !direction) {
      continue
    }

    fields.push({
      field,
      direction: direction as 'ASC' | 'DESC',
    })
  }

  return fields
}

function extractNamedBlock(source: string, fieldName: string) {
  const fieldRegex = new RegExp(`\\b${fieldName}\\s*:`)
  const fieldMatch = fieldRegex.exec(source)

  if (!fieldMatch) {
    return null
  }

  const openIndex = source.indexOf('{', fieldMatch.index)

  if (openIndex < 0) {
    return null
  }

  return extractBalancedBlock(source, openIndex, '{', '}')
}

function extractNamedArrayBlock(source: string, fieldName: string) {
  const fieldRegex = new RegExp(`\\b${fieldName}\\s*:`)
  const fieldMatch = fieldRegex.exec(source)

  if (!fieldMatch) {
    return null
  }

  const openIndex = source.indexOf('[', fieldMatch.index)

  if (openIndex < 0) {
    return null
  }

  return extractBalancedBlock(source, openIndex, '[', ']')
}

function extractBalancedBlock(
  source: string,
  openIndex: number,
  openChar: string,
  closeChar: string
) {
  let depth = 0

  for (let index = openIndex; index < source.length; index += 1) {
    const char = source[index]

    if (char === openChar) {
      depth += 1
    } else if (char === closeChar) {
      depth -= 1

      if (depth === 0) {
        return source.slice(openIndex, index + 1)
      }
    }
  }

  return null
}

function parseFilterValue(
  operator: 'ne' | 'regex',
  rawValue: string
): boolean | null | RegExp | string {
  if (operator === 'regex') {
    return new RegExp(rawValue.slice(2, -2))
  }

  if (rawValue === 'null') {
    return null
  }

  if (rawValue === 'true') {
    return true
  }

  if (rawValue === 'false') {
    return false
  }

  return rawValue.slice(1, -1)
}

async function findAllDocFiles(docsRoot: string) {
  if (docsFilesCache.has(docsRoot)) {
    return docsFilesCache.get(docsRoot) || []
  }

  const files: string[] = []

  async function walk(currentPath: string): Promise<void> {
    const entries = await fs.readdir(currentPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name)

      if (entry.isDirectory()) {
        await walk(fullPath)
        continue
      }

      if (entry.isFile() && fullPath.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  }

  await walk(docsRoot)
  docsFilesCache.set(docsRoot, files)

  return files
}

async function readListSummaryFrontmatter(filePath: string) {
  try {
    const source = await fs.readFile(filePath, 'utf-8')
    return parseSimpleFrontmatter(source)
  } catch {
    return null
  }
}

function parseSimpleFrontmatter(source: string): ListSummaryFrontmatter {
  const match = source.match(/^---\n([\s\S]*?)\n---/)

  if (!match?.[1]) {
    return {}
  }

  const frontmatter: ListSummaryFrontmatter = {}

  for (const line of match[1].split('\n')) {
    const trimmed = line.trim()

    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }

    const separatorIndex = trimmed.indexOf(':')

    if (separatorIndex < 0) {
      continue
    }

    const key = trimmed.slice(0, separatorIndex).trim()
    const rawValue = trimmed.slice(separatorIndex + 1).trim()

    if (!key) {
      continue
    }

    frontmatter[key as keyof ListSummaryFrontmatter] =
      parseFrontmatterScalar(rawValue) as never
  }

  return frontmatter
}

function parseFrontmatterScalar(value: string) {
  if (!value) {
    return ''
  }

  if (value === 'true') {
    return true
  }

  if (value === 'false') {
    return false
  }

  if (value === 'null') {
    return null
  }

  if (isNumericScalar(value)) {
    return Number(value)
  }

  return value.replace(/^['"]|['"]$/g, '')
}

function isNumericScalar(value: string) {
  let hasDigits = false
  let hasDecimalSeparator = false

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]

    if (char >= '0' && char <= '9') {
      hasDigits = true
      continue
    }

    if (char === '-' && index === 0) {
      continue
    }

    if (char === '.' && !hasDecimalSeparator) {
      hasDecimalSeparator = true
      continue
    }

    return false
  }

  return hasDigits
}

function matchesPathFilter(
  relativePath: string,
  pathFilter: PathFilter | null
) {
  if (!pathFilter) {
    return true
  }

  if (pathFilter.type === 'regex') {
    return pathFilter.value.test(relativePath)
  }

  return globToRegExp(pathFilter.value).test(relativePath)
}

function matchesFrontmatterFilters(
  frontmatter: ListSummaryFrontmatter,
  config: Pick<ListSummaryConfig, 'frontmatterFilters'>
) {
  return config.frontmatterFilters.every((filter) => {
    const value = frontmatter[filter.field as keyof ListSummaryFrontmatter]

    if (filter.operator === 'regex') {
      return filter.value instanceof RegExp
        ? filter.value.test(String(value || ''))
        : false
    }

    return value !== filter.value
  })
}

function compareListEntries(
  a: ListEntry,
  b: ListEntry,
  sortFields: SortField[]
) {
  for (const sortField of sortFields) {
    const left =
      a.frontmatter[sortField.field as keyof ListSummaryFrontmatter]
    const right =
      b.frontmatter[sortField.field as keyof ListSummaryFrontmatter]
    const compared = compareListValues(left, right)

    if (compared !== 0) {
      return sortField.direction === 'DESC' ? compared * -1 : compared
    }
  }

  return a.title.localeCompare(b.title)
}

function compareListValues(
  left: ListSummaryFrontmatter[keyof ListSummaryFrontmatter],
  right: ListSummaryFrontmatter[keyof ListSummaryFrontmatter]
) {
  const leftMissing = left === null || left === undefined
  const rightMissing = right === null || right === undefined

  if (leftMissing && rightMissing) {
    return 0
  }

  if (leftMissing) {
    return 1
  }

  if (rightMissing) {
    return -1
  }

  if (typeof left === 'number' && typeof right === 'number') {
    return left - right
  }

  return String(left).localeCompare(String(right))
}

function parseHeadingLevel(value: string) {
  const parsed = parseInt(value, 10)

  if (Number.isNaN(parsed) || parsed < 1 || parsed > 6) {
    return 2
  }

  return parsed
}

function renderListEntriesMarkdown(
  entries: ListEntry[],
  options: {
    returnListItems: boolean
    level: number
    description: string | null
  }
) {
  if (options.returnListItems) {
    return entries
      .map((entry) => {
        const description = options.description ?? entry.description

        return description
          ? `- [${entry.title}](${entry.slug}): ${description}`
          : `- [${entry.title}](${entry.slug})`
      })
      .join('\n')
  }

  const headingPrefix = '#'.repeat(options.level)

  return entries
    .map((entry) => {
      const description = options.description ?? entry.description

      return description
        ? `${headingPrefix} [${entry.title}](${entry.slug})\n\n${description}`
        : `${headingPrefix} [${entry.title}](${entry.slug})`
    })
    .join('\n\n')
}

function globToRegExp(pattern: string) {
  return new RegExp(`^${convertGlobSegment(pattern)}$`)
}

function convertGlobSegment(pattern: string): string {
  let output = ''

  for (let index = 0; index < pattern.length; index += 1) {
    const char = pattern[index]
    const nextChar = pattern[index + 1]

    if (char === '*' && nextChar === '*' && pattern[index + 2] === '/') {
      output += '(?:.*\\/)?'
      index += 2
      continue
    }

    if (char === '*' && nextChar === '*') {
      output += '.*'
      index += 1
      continue
    }

    if (char === '*') {
      output += '[^/]*'
      continue
    }

    if (char === '?') {
      output += '[^/]'
      continue
    }

    if (char === '{') {
      const endIndex = findClosingBraceIndex(pattern, index)

      if (endIndex > index) {
        const inner = pattern.slice(index + 1, endIndex)
        const parts = splitBraceAlternatives(inner)

        output += `(?:${parts
          .map((part) => convertGlobSegment(part))
          .join('|')})`
        index = endIndex
        continue
      }
    }

    output += escapeRegExp(char)
  }

  return output
}

function findClosingBraceIndex(pattern: string, startIndex: number) {
  let depth = 0

  for (let index = startIndex; index < pattern.length; index += 1) {
    const char = pattern[index]

    if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1

      if (depth === 0) {
        return index
      }
    }
  }

  return -1
}

function splitBraceAlternatives(value: string) {
  const parts: string[] = []
  let current = ''
  let depth = 0

  for (const char of value) {
    if (char === ',' && depth === 0) {
      parts.push(current)
      current = ''
      continue
    }

    if (char === '{') {
      depth += 1
    } else if (char === '}') {
      depth -= 1
    }

    current += char
  }

  parts.push(current)
  return parts
}

function escapeRegExp(value: string) {
  return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
}
