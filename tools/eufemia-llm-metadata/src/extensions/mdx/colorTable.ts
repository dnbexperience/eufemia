import fs from 'fs-extra'
import path from 'path'
import type { ObjectExpression, ObjectProperty } from '@babel/types'
import type {
  SpecialMdxComponentRenderer,
  SpecialMdxRendererDeps,
} from './types.ts'
import {
  escapeMarkdownTableCell,
  parseSimpleJsxStringAttributes,
  toRgbString,
} from './utils.ts'

type ColorTableRow = {
  name: string
  type: string
  brandName: string
  figmaName: string
}

type ColorTableThemeData = {
  data: ColorTableRow[]
  properties: Record<string, string>
}

let cachedColorTableThemes: Record<string, ColorTableThemeData> | null =
  null

export function createColorTableExtension(
  deps: SpecialMdxRendererDeps
): SpecialMdxComponentRenderer {
  return {
    name: 'ColorTable',
    replace: (content) => replaceColorTables(content, deps),
  }
}

async function replaceColorTables(
  content: string,
  deps: SpecialMdxRendererDeps
) {
  const regex = /<ColorTable\b([^>]*)\/>/g

  if (!regex.test(content)) {
    return content
  }

  regex.lastIndex = 0
  const themes = await loadColorTableThemes(deps)

  if (Object.keys(themes).length === 0) {
    return content
  }

  return content.replace(regex, (_match, attrsSource) => {
    const attrs = parseSimpleJsxStringAttributes(String(attrsSource || ''))
    const theme = attrs.theme

    if (!theme || !themes[theme]) {
      return ''
    }

    return `\n${renderColorTableMarkdown(themes[theme])}\n`
  })
}

async function loadColorTableThemes(deps: SpecialMdxRendererDeps) {
  if (cachedColorTableThemes) {
    return cachedColorTableThemes
  }

  const portalRoot = deps.findPackageRoot('dnb-design-system-portal')

  if (!portalRoot) {
    return {}
  }

  const colorTablePath = path.join(
    portalRoot,
    'src/docs/quickguide-designer/colors/ColorTable.tsx'
  )
  const { rowsByTheme, propertyModulePaths } =
    await loadColorTableSourceData(colorTablePath)

  if (Object.keys(rowsByTheme).length === 0) {
    return {}
  }

  const propertiesByTheme: Record<string, Record<string, string>> = {}

  for (const [theme, modulePath] of Object.entries(propertyModulePaths)) {
    const properties = await deps.loadModuleDefault(modulePath)

    if (properties && typeof properties === 'object') {
      propertiesByTheme[theme] = properties as Record<string, string>
    }
  }

  cachedColorTableThemes = Object.fromEntries(
    Object.entries(rowsByTheme)
      .filter(([theme]) => Boolean(propertiesByTheme[theme]))
      .map(([theme, data]) => {
        return [theme, { data, properties: propertiesByTheme[theme] }]
      })
  )

  return cachedColorTableThemes
}

async function loadColorTableSourceData(colorTablePath: string) {
  const parser = await import('@babel/parser')
  const source = await fs.readFile(colorTablePath, 'utf-8')
  const ast = parser.parse(source, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx'],
  })
  const rowsByTheme: Record<string, ColorTableRow[]> = {}
  const importSources: Record<string, string> = {}
  let propertyModulePaths: Record<string, string> = {}

  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration') {
      const defaultSpecifier = node.specifiers.find((specifier) => {
        return specifier.type === 'ImportDefaultSpecifier'
      })

      if (
        defaultSpecifier?.type === 'ImportDefaultSpecifier' &&
        typeof node.source.value === 'string' &&
        node.source.value.startsWith('@dnb/eufemia/')
      ) {
        importSources[defaultSpecifier.local.name] = node.source.value
      }

      continue
    }

    if (node.type !== 'VariableDeclaration') {
      continue
    }

    for (const declaration of node.declarations) {
      if (declaration.id.type !== 'Identifier') {
        continue
      }

      const name = declaration.id.name

      if (
        name === 'themes' &&
        declaration.init?.type === 'ObjectExpression'
      ) {
        propertyModulePaths = extractThemePropertyModulePaths(
          declaration.init,
          importSources
        )
        continue
      }

      if (!/^data[A-Z]/.test(name)) {
        continue
      }

      if (declaration.init?.type !== 'ArrayExpression') {
        continue
      }

      const theme = name.replace(/^data/, '').toLowerCase()
      const rows: ColorTableRow[] = []

      for (const element of declaration.init.elements) {
        if (!element || element.type !== 'ObjectExpression') {
          continue
        }

        const row = extractColorTableRow(element)

        if (row) {
          rows.push(row)
        }
      }

      if (rows.length > 0) {
        rowsByTheme[theme] = rows
      }
    }
  }

  return { rowsByTheme, propertyModulePaths }
}

function extractThemePropertyModulePaths(
  node: ObjectExpression,
  importSources: Record<string, string>
) {
  const modulePaths: Record<string, string> = {}

  for (const property of node.properties) {
    if (property.type !== 'ObjectProperty') {
      continue
    }

    const themeName = readObjectPropertyKey(property)

    if (!themeName || property.value.type !== 'ObjectExpression') {
      continue
    }

    const propertiesIdentifier = readNestedIdentifierProperty(
      property.value,
      'properties'
    )

    if (!propertiesIdentifier || !importSources[propertiesIdentifier]) {
      continue
    }

    modulePaths[themeName] = importSources[propertiesIdentifier]
  }

  return modulePaths
}

function readNestedIdentifierProperty(
  node: ObjectExpression,
  propertyName: string
) {
  for (const property of node.properties) {
    if (property.type !== 'ObjectProperty') {
      continue
    }

    if (readObjectPropertyKey(property) !== propertyName) {
      continue
    }

    return property.value.type === 'Identifier'
      ? property.value.name
      : null
  }

  return null
}

function readObjectPropertyKey(property: ObjectProperty) {
  return property.key.type === 'Identifier'
    ? property.key.name
    : property.key.type === 'StringLiteral'
      ? property.key.value
      : null
}

function extractColorTableRow(
  node: ObjectExpression
): ColorTableRow | null {
  const row: Partial<ColorTableRow> = {}

  for (const property of node.properties) {
    if (property.type !== 'ObjectProperty') {
      continue
    }

    const key = readObjectPropertyKey(property)

    if (!key || property.value.type !== 'StringLiteral') {
      continue
    }

    if (
      key === 'name' ||
      key === 'type' ||
      key === 'brandName' ||
      key === 'figmaName'
    ) {
      row[key] = property.value.value
    }
  }

  if (row.name && row.type && row.brandName && row.figmaName) {
    return row as ColorTableRow
  }

  return null
}

function renderColorTableMarkdown(themeData: ColorTableThemeData) {
  const lines = [
    '| Sample | Type | Brand name | Hex | RGB | Figma Library name | CSS Custom Properties name |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  ]

  for (const color of themeData.data) {
    const hex = themeData.properties[color.name]?.toLowerCase()

    if (!hex) {
      lines.push(
        `| Missing | ${escapeMarkdownTableCell(color.type)} | ${escapeMarkdownTableCell(color.brandName)} | Missing | Missing | ${escapeMarkdownTableCell(color.figmaName)} | \`${color.name}\` |`
      )
      continue
    }

    lines.push(
      [
        `| ${escapeMarkdownTableCell(hex)}`,
        escapeMarkdownTableCell(color.type),
        escapeMarkdownTableCell(color.brandName),
        `\`${hex}\``,
        `\`${toRgbString(hex)}\``,
        escapeMarkdownTableCell(color.figmaName),
        `\`${color.name}\` |`,
      ].join(' | ')
    )
  }

  return lines.join('\n')
}
