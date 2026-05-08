import {
  ignoredStandaloneImportSourcePatterns,
  ignoredStandaloneMdxComponents,
  providedStandaloneMdxComponents,
} from './config.ts'

const mdxComponentCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
})

export function findUnhandledStandaloneMdxComponents(
  content: string,
  {
    importsByFile,
  }: {
    importsByFile?: Map<string, string[]>
  } = {}
) {
  const contentWithoutCodeFences = content.replace(/```[\s\S]*?```/g, '')
  const regex = /^\s*<([A-Z][A-Za-z0-9_.]*)\b[^>]*\/?>\s*$/gm
  const components = new Set<string>()
  const ignoredImportedComponents =
    getIgnoredImportedComponents(importsByFile)
  let match: RegExpExecArray | null

  while ((match = regex.exec(contentWithoutCodeFences))) {
    const [, name] = match

    if (
      name &&
      !ignoredStandaloneMdxComponents.has(name) &&
      !providedStandaloneMdxComponents.has(name) &&
      !ignoredImportedComponents.has(name)
    ) {
      components.add(name)
    }
  }

  return Array.from(components).sort(mdxComponentCollator.compare)
}

function getIgnoredImportedComponents(
  importsByFile?: Map<string, string[]>
) {
  const ignoredImportedComponents = new Set<string>()

  if (!importsByFile) {
    return ignoredImportedComponents
  }

  for (const [source, importedNames] of Array.from(
    importsByFile.entries()
  )) {
    if (
      !ignoredStandaloneImportSourcePatterns.some((pattern) => {
        return pattern.test(source)
      })
    ) {
      continue
    }

    for (const importedName of importedNames) {
      if (!importedName.startsWith('* as ')) {
        ignoredImportedComponents.add(importedName)
      }
    }
  }

  return ignoredImportedComponents
}
