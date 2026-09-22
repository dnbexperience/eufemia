/**
 * Figma Task handlers
 *
 * Fetches the design token variables from Figma and writes them as
 * W3C Design Token (DTCG) JSON files – the same format the Figma UI
 * produces with "Export Modes". The files are consumed by
 * `scripts/prebuild/tasks/makePropertiesFile.ts`.
 */

import fs from 'fs-extra'
import path from 'path'
import { log } from '../../lib'
import { createFigmaClient } from '../helpers/figmaClient'

try {
  process.loadEnvFile()
} catch {
  // .env is optional — CI provides env vars directly
}

/**
 * Figma REST API types for `GET /v1/files/:file_key/variables/local`.
 * Only the fields we rely on are declared.
 */
type FigmaVariableAlias = {
  type: 'VARIABLE_ALIAS'
  id: string
}

type FigmaColorValue = {
  r: number
  g: number
  b: number
  a?: number
}

type FigmaVariableValue =
  | boolean
  | number
  | string
  | FigmaColorValue
  | FigmaVariableAlias

type FigmaVariable = {
  id: string
  name: string
  variableCollectionId: string
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR'
  valuesByMode: Record<string, FigmaVariableValue>
  description?: string
  hiddenFromPublishing?: boolean
  scopes?: string[]
  codeSyntax?: Record<string, string>
}

type FigmaVariableCollection = {
  id: string
  name: string
  modes: Array<{ modeId: string; name: string }>
  defaultModeId: string
  variableIds: string[]
}

export type FigmaLocalVariables = {
  variables: Record<string, FigmaVariable>
  variableCollections: Record<string, FigmaVariableCollection>
}

type TokenType = 'color' | 'number' | 'string'

type TokenValue = {
  colorSpace: 'srgb'
  components: [number, number, number]
  alpha: number
  hex: string
}

type TokenExtensions = {
  'com.figma.variableId': string
  'com.figma.hiddenFromPublishing'?: true
  'com.figma.scopes'?: string[]
  'com.figma.codeSyntax'?: Record<string, string>
  'com.figma.type'?: TokenType
  'com.figma.aliasData'?: {
    targetVariableId: string
    targetVariableName: string
    targetVariableSetId: string
    targetVariableSetName: string
  }
}

type TokenLeaf = {
  $type: TokenType
  $value: TokenValue | number | string
  $description?: string
  $extensions: TokenExtensions
}

type TokenGroup = {
  [key: string]: TokenLeaf | TokenGroup
}

type TokenModeExtensions = { 'com.figma.modeName': string }

export type TokenExport = {
  [key: string]: TokenLeaf | TokenGroup | TokenModeExtensions
}

/**
 * Which Figma collection and mode ends up in which file, relative to
 * `src/style/themes/figma`. Every mode of these collections has to be listed,
 * so a mode added in Figma cannot pass unnoticed.
 */
export const TOKEN_EXPORTS: ReadonlyArray<{
  collection: string
  mode: string
  fileName: string
}> = [
  { collection: 'colors', mode: 'color', fileName: 'color.tokens.json' },
  {
    collection: 'brand',
    mode: 'dnb-light',
    fileName: 'brand/dnb-light.tokens.json',
  },
  {
    collection: 'brand',
    mode: 'dnb-dark',
    fileName: 'brand/dnb-dark.tokens.json',
  },
  {
    collection: 'brand',
    mode: 'sbanken-light',
    fileName: 'brand/sbanken-light.tokens.json',
  },
  {
    collection: 'brand',
    mode: 'sbanken-dark',
    fileName: 'brand/sbanken-dark.tokens.json',
  },
  {
    collection: 'brand',
    mode: 'dnbcarnegie-light',
    fileName: 'brand/dnbcarnegie-light.tokens.json',
  },
]

const TOKEN_TYPES: Record<
  FigmaVariable['resolvedType'],
  TokenType | undefined
> = {
  COLOR: 'color',
  FLOAT: 'number',
  STRING: 'string',
  BOOLEAN: undefined,
}

/** An alias may point to another alias, but never in an endless chain. */
const MAX_ALIAS_DEPTH = 10

const isAlias = (value: unknown): value is FigmaVariableAlias =>
  typeof value === 'object' &&
  value !== null &&
  (value as FigmaVariableAlias).type === 'VARIABLE_ALIAS'

const isLeaf = (node: TokenLeaf | TokenGroup): node is TokenLeaf =>
  '$type' in node

const toHex = ({ r, g, b }: FigmaColorValue) =>
  '#' +
  [r, g, b]
    .map((channel) =>
      Math.round(Math.max(0, Math.min(1, channel)) * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .join('')
    .toUpperCase()

const toTokenValue = (
  variable: FigmaVariable,
  value: FigmaVariableValue
): TokenLeaf['$value'] => {
  if (variable.resolvedType === 'COLOR') {
    const color = value as FigmaColorValue
    return {
      colorSpace: 'srgb',
      components: [color.r, color.g, color.b],
      alpha: color.a ?? 1,
      hex: toHex(color),
    }
  }

  return value as number | string
}

const findCollection = (
  { variableCollections }: FigmaLocalVariables,
  name: string
) => {
  const collections = Object.values(variableCollections).filter(
    (collection) => collection.name === name
  )

  if (collections.length !== 1) {
    throw new Error(
      `Expected exactly one Figma variable collection named "${name}", found ${collections.length}`
    )
  }

  return collections[0]
}

const findModeId = (collection: FigmaVariableCollection, name: string) => {
  const mode = collection.modes.find((mode) => mode.name === name)

  if (!mode) {
    throw new Error(
      `The Figma variable collection "${collection.name}" has no mode named "${name}", only: ${collection.modes
        .map((mode) => mode.name)
        .join(', ')}`
    )
  }

  return mode.modeId
}

/**
 * A mode added in Figma would otherwise never reach the library, because
 * nothing outside of Figma shows that it exists.
 */
export const assertModesAreExported = (meta: FigmaLocalVariables) => {
  const collectionNames = Array.from(
    new Set(TOKEN_EXPORTS.map(({ collection }) => collection))
  )

  for (const collectionName of collectionNames) {
    const exported = TOKEN_EXPORTS.filter(
      ({ collection }) => collection === collectionName
    ).map(({ mode }) => mode)

    const missing = findCollection(meta, collectionName)
      .modes.map((mode) => mode.name)
      .filter((name) => !exported.includes(name))

    if (missing.length) {
      throw new Error(
        `The Figma variable collection "${collectionName}" has modes that are not exported: ${missing.join(
          ', '
        )}. Add them to TOKEN_EXPORTS and to the token files in makePropertiesFile.ts.`
      )
    }
  }
}

/**
 * Figma exports the value an alias points to, not the alias itself,
 * so the chain has to be followed until it ends in a concrete value.
 */
const resolveValue = (
  meta: FigmaLocalVariables,
  value: FigmaVariableValue,
  modeId: string
) => {
  let resolved = value

  for (let depth = 0; isAlias(resolved); depth++) {
    if (depth >= MAX_ALIAS_DEPTH) {
      throw new Error(
        `Could not resolve the Figma variable alias "${resolved.id}" within ${MAX_ALIAS_DEPTH} steps`
      )
    }

    const target = meta.variables[resolved.id]

    if (!target) {
      throw new Error(
        `The Figma variable alias "${resolved.id}" points to a variable that is not part of the response`
      )
    }

    const collection =
      meta.variableCollections[target.variableCollectionId]
    // The target collection rarely shares mode ids, so fall back to its default mode
    const targetModeId =
      collection?.modes.some((mode) => mode.modeId === modeId) === true
        ? modeId
        : collection?.defaultModeId

    resolved = target.valuesByMode[targetModeId]

    if (resolved === undefined) {
      throw new Error(
        `The Figma variable "${target.name}" has no value for mode "${targetModeId}"`
      )
    }
  }

  return resolved
}

const makeAliasData = (
  meta: FigmaLocalVariables,
  alias: FigmaVariableAlias
) => {
  const target = meta.variables[alias.id]

  if (!target) {
    throw new Error(
      `The Figma variable alias "${alias.id}" points to a variable that is not part of the response`
    )
  }

  const collection = meta.variableCollections[target.variableCollectionId]

  if (!collection) {
    throw new Error(
      `The Figma variable "${target.name}" belongs to the unknown collection "${target.variableCollectionId}"`
    )
  }

  return {
    targetVariableId: alias.id,
    targetVariableName: target.name,
    targetVariableSetId: collection.id,
    targetVariableSetName: collection.name,
  }
}

const makeTokenLeaf = (
  meta: FigmaLocalVariables,
  variable: FigmaVariable,
  modeId: string
): TokenLeaf => {
  const $type = TOKEN_TYPES[variable.resolvedType]

  if (!$type) {
    throw new Error(
      `The Figma variable "${variable.name}" has the unsupported type "${variable.resolvedType}"`
    )
  }

  const value = variable.valuesByMode[modeId]

  if (value === undefined) {
    throw new Error(
      `The Figma variable "${variable.name}" has no value for mode "${modeId}"`
    )
  }

  const $extensions: TokenExtensions = {
    'com.figma.variableId': variable.id,
  }

  if (variable.hiddenFromPublishing) {
    $extensions['com.figma.hiddenFromPublishing'] = true
  }
  if (variable.scopes?.length) {
    $extensions['com.figma.scopes'] = variable.scopes
  }
  if (Object.keys(variable.codeSyntax ?? {}).length) {
    $extensions['com.figma.codeSyntax'] = variable.codeSyntax
  }
  if ($type === 'string') {
    // DTCG has no string type, so Figma keeps the original type here
    $extensions['com.figma.type'] = $type
  }
  if (isAlias(value)) {
    $extensions['com.figma.aliasData'] = makeAliasData(meta, value)
  }

  return {
    $type,
    $value: toTokenValue(variable, resolveValue(meta, value, modeId)),
    ...(variable.description
      ? { $description: variable.description }
      : {}),
    $extensions,
  }
}

/** `color/background/action` becomes a nested group with the leaf at the end */
const addTokenLeaf = (
  tokens: TokenGroup,
  figmaPath: string[],
  leaf: TokenLeaf
) => {
  let group = tokens

  for (const name of figmaPath.slice(0, -1)) {
    const existing = group[name]

    if (existing === undefined) {
      group[name] = {}
    } else if (isLeaf(existing)) {
      // A variable can share its name with a group, then it becomes the group root
      group[name] = { $root: existing }
    }

    group = group[name] as TokenGroup
  }

  const name = figmaPath[figmaPath.length - 1]
  const existing = group[name]

  if (existing === undefined) {
    group[name] = leaf
  } else if (isLeaf(existing)) {
    throw new Error(
      `Two Figma variables share the name "${figmaPath.join('/')}"`
    )
  } else {
    existing.$root = leaf
  }
}

/**
 * Converts one mode of one Figma variable collection into the
 * DTCG structure used by the committed `*.tokens.json` files.
 */
export const convertVariablesToTokens = ({
  meta,
  collection: collectionName,
  mode: modeName,
}: {
  meta: FigmaLocalVariables
  collection: string
  mode: string
}): TokenExport => {
  const collection = findCollection(meta, collectionName)
  const modeId = findModeId(collection, modeName)
  const tokens: TokenGroup = {}

  for (const variableId of collection.variableIds) {
    const variable = meta.variables[variableId]

    if (!variable) {
      continue // a deleted variable can still be referenced by the collection
    }

    addTokenLeaf(
      tokens,
      variable.name.split('/'),
      makeTokenLeaf(meta, variable, modeId)
    )
  }

  if (Object.keys(tokens).length === 0) {
    throw new Error(
      `The Figma variable collection "${collectionName}" has no variables`
    )
  }

  const mode = collection.modes.find((mode) => mode.modeId === modeId)

  return {
    ...tokens,
    $extensions: { 'com.figma.modeName': mode?.name ?? modeId },
  }
}

const fetchLocalVariables = async (figmaFile: string) => {
  const Figma = createFigmaClient({
    personalAccessToken: process.env.FIGMA_TOKEN,
  })

  const { data } = await Figma.client.get<{ meta: FigmaLocalVariables }>(
    `files/${encodeURIComponent(figmaFile)}/variables/local`
  )

  if (!data?.meta?.variables || !data?.meta?.variableCollections) {
    throw new Error('The Figma variables response was empty')
  }

  return data.meta
}

/**
 * Writes every configured collection mode to disk and
 * returns the files that were written.
 */
export const extractTokens = async ({
  figmaFile,
  tokensDir = path.resolve(__dirname, '../../../src/style/themes/figma'),
}: {
  figmaFile?: string
  tokensDir?: string
} = {}) => {
  if (!figmaFile) {
    throw new Error(
      'No Figma tokens file defined. Set the "FIGMA_TOKENS_FILE" environment variable.'
    )
  }

  const meta = await fetchLocalVariables(figmaFile)

  assertModesAreExported(meta)

  const files: string[] = []

  for (const { collection, mode, fileName } of TOKEN_EXPORTS) {
    let tokens: TokenExport

    try {
      tokens = convertVariablesToTokens({ meta, collection, mode })
    } catch (e) {
      throw new Error(
        `Failed to convert the Figma collection "${collection}" (mode "${mode}") into ${fileName}`,
        { cause: e }
      )
    }

    const file = path.resolve(tokensDir, fileName)

    await fs.outputFile(file, JSON.stringify(tokens, null, 2))
    files.push(file)

    log.info(`> Figma: Wrote design tokens to ${fileName}`)
  }

  return files
}
