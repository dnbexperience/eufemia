import fs from 'fs'
import path from 'path'
import fsPromises from 'node:fs/promises'
import { toKebabCase } from '../shared/component-helper'

describe('Style Import References', () => {
  const ignoreList = new Set<string>(['icon-primary'])

  it('should have correct style import references matching folder names', async () => {
    const files = await getFiles()
    const errors: string[] = []

    for (const filePath of files) {
      const folder = folderOf(filePath)
      const area = areaOf(filePath)
      if (ignoreList.has(folder) || ignoreList.has(area)) {
        continue
      }

      let src: string
      try {
        src = fs.readFileSync(filePath, 'utf8')
      } catch (e) {
        errors.push(`Error reading file ${filePath}: ${e}`)
        continue
      }

      for (const imp of parseImports(src)) {
        const { ok, reason } = validate(filePath, imp, folder)
        if (!ok) {
          errors.push(
            `Incorrect import in ${filePath}:\n` +
              `  Component: ${area}\n` +
              `  Folder:    ${folder}\n` +
              `  Import:    ${imp}\n` +
              (reason ? `  Reason:    ${reason}\n` : '')
          )
        }
      }
    }

    expect(errors).toHaveLength(0)

    if (errors.length > 0) {
      console.error(
        `\nFound ${errors.length} style import reference error(s)\n`
      )
      errors.forEach((e, i) => console.error(`${i + 1}. ${e}\n`))
      console.error(`End of errors\n`)
      throw new Error(
        `Found ${errors.length} style import reference error(s).`
      )
    }
  })
})

function nameVariants(folder: string): string[] {
  const lower = folder.toLowerCase()
  const kebab = toKebabCase(folder)
  return Array.from(
    new Set([folder, lower, kebab, `dnb-${lower}`, `dnb-${kebab}`])
  )
}

function resolveImportBase(
  filePath: string,
  importPath: string
): string | null {
  const dir = path.dirname(filePath)
  let abs = path.resolve(dir, importPath)
  let ext = path.extname(abs)
  if (!ext) {
    const scss = `${abs}.scss`
    if (fs.existsSync(scss)) {
      abs = scss
      ext = '.scss'
    }
  }
  if (!ext) {
    return null
  }
  return path.basename(abs, ext)
}

function getFiles(): Promise<string[]> {
  const root = path.join(__dirname, '..')
  const bases = ['components', 'extensions', 'fragments'].map((d) =>
    path.join(root, d)
  )
  const patterns = ['**/style/index.{js,ts}', '**/style.{js,ts}']

  return Promise.all(
    bases.flatMap((base) =>
      patterns.map(async (p) => {
        const files = []
        for await (const file of fsPromises.glob(p, { cwd: base })) {
          files.push(path.join(base, file))
        }
        return files
      })
    )
  ).then((arrs) => arrs.flat())
}

function areaOf(filePath: string): string {
  const parts = filePath.split(path.sep)
  const i = parts.findIndex(
    (p) => p === 'components' || p === 'extensions' || p === 'fragments'
  )
  return i !== -1 && i + 1 < parts.length ? parts[i + 1] : ''
}

function folderOf(filePath: string): string {
  const file = path.basename(filePath)
  const dir = path.dirname(filePath)
  if (/^index\.[jt]s$/.test(file) && path.basename(dir) === 'style') {
    return path.basename(path.dirname(dir))
  }
  if (/^style\.[jt]s$/.test(file)) {
    return path.basename(dir)
  }
  return path.basename(dir)
}

function parseImports(src: string): string[] {
  const re = /import\s+(?:[\s\S]*?\s+from\s+)?['"]([^'"]+)['"]/g
  const out: string[] = []
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    out.push(m[1])
  }
  return out
}

function validate(
  filePath: string,
  importPath: string,
  folder: string
): { ok: boolean; reason?: string } {
  if (!(importPath.startsWith('./') || importPath.startsWith('../'))) {
    return { ok: true }
  }
  const base = resolveImportBase(filePath, importPath)
  if (!base) {
    return { ok: true }
  }
  const ext = path.extname(importPath)
  if (!(ext === '.scss' || (!ext && base))) {
    return { ok: true }
  }
  const variants = nameVariants(folder)
  if (!variants.some((v) => base.includes(v))) {
    return {
      ok: false,
      reason: `Expected "${base}" to include one of: ${variants
        .map((v) => `"${v}"`)
        .join(', ')}`,
    }
  }
  return { ok: true }
}
