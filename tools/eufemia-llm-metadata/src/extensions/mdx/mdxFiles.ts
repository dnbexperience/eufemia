import fs from 'fs-extra'
import path from 'path'

/**
 * Shared helpers for scanning the docs corpus and reading the simple
 * frontmatter on each `.mdx` page.
 *
 * Both the component-catalog and the list-summary renderers need to walk a
 * docs subtree and read lightweight frontmatter without a full YAML parser,
 * so the directory walk and frontmatter parsing live here in one place.
 */

export type FrontmatterScalar = string | number | boolean | null
export type FrontmatterRecord = Record<string, FrontmatterScalar>

/**
 * Recursively collect every `.mdx` file under `root`.
 */
export async function findMdxFiles(root: string): Promise<string[]> {
  const files: string[] = []

  async function walk(currentPath: string): Promise<void> {
    const dirEntries = await fs.readdir(currentPath, {
      withFileTypes: true,
    })

    for (const dirEntry of dirEntries) {
      const fullPath = path.join(currentPath, dirEntry.name)

      if (dirEntry.isDirectory()) {
        await walk(fullPath)
        continue
      }

      if (dirEntry.isFile() && fullPath.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  }

  await walk(root)

  return files
}

/**
 * Read and parse a file's leading frontmatter block. Returns `null` when the
 * file cannot be read or has no frontmatter block.
 */
export async function readFrontmatter(
  filePath: string
): Promise<FrontmatterRecord | null> {
  try {
    const source = await fs.readFile(filePath, 'utf-8')

    return parseFrontmatter(source)
  } catch {
    return null
  }
}

/**
 * Parse the leading `---` frontmatter block into a flat record of scalars.
 * Returns `null` when the source has no frontmatter block.
 */
export function parseFrontmatter(
  source: string
): FrontmatterRecord | null {
  const match = source.match(/^---\n([\s\S]*?)\n---/)

  if (!match?.[1]) {
    return null
  }

  const frontmatter: FrontmatterRecord = {}

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

    frontmatter[key] = parseFrontmatterScalar(rawValue)
  }

  return frontmatter
}

/**
 * Coerce a raw frontmatter value into a boolean, number, null or string,
 * stripping surrounding quotes from string values.
 */
export function parseFrontmatterScalar(value: string): FrontmatterScalar {
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
