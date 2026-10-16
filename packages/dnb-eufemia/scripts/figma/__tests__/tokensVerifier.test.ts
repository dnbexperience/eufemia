import os from 'node:os'
import path from 'path'
import fs from 'fs-extra'
import { verifyTokens } from '../tasks/tokensVerifier'
import {
  DESIGN_TOKEN_FILES,
  FOUNDATION_TOKEN_FILES,
} from '../../prebuild/tasks/makePropertiesFile'
import { log } from '../../lib'

const token = {
  $type: 'number',
  $value: 4,
  $extensions: { 'com.figma.variableId': 'VariableID:1:1' },
}

const foundation = {
  dnb: { greyscale: { 0: token } },
  sbanken: { white: token },
  'dnb-carnegie': { white: token },
}

const toGroup = (names: string[]) =>
  Object.fromEntries(names.map((name) => [name, token]))

/** The tokens the typography properties are generated from */
const typography = {
  size: toGroup([
    'text-2xs',
    'text-xs',
    'text-sm',
    'text-basis',
    'text-lead',
    'heading-lg',
    'heading-xl',
    'heading-2xl',
  ]),
  height: toGroup([
    'text-xs',
    'text-sm',
    'text-basis',
    'text-lead',
    'heading-large',
    'heading-xl',
    'heading-2xl',
  ]),
}

const brand = { radius: token, font: typography }
const dnbLight = 'src/style/themes/figma/brand/dnb-light.tokens.json'

let rootDir: string

const writeExport = (file: string, content: unknown) =>
  fs.outputFile(path.resolve(rootDir, file), JSON.stringify(content))

beforeEach(async () => {
  vi.spyOn(log, 'start').mockImplementation(vi.fn())
  vi.spyOn(log, 'succeed').mockImplementation(vi.fn())
  vi.spyOn(log, 'fail').mockImplementation(vi.fn())

  rootDir = await fs.mkdtemp(path.join(os.tmpdir(), 'eufemia-tokens-'))

  for (const file of DESIGN_TOKEN_FILES) {
    await writeExport(file.in, brand)
  }
  await writeExport(FOUNDATION_TOKEN_FILES[0].in, foundation)
})

afterEach(async () => {
  vi.restoreAllMocks()
  await fs.remove(rootDir)
})

describe('verifyTokens', () => {
  it('passes when every export the themes need is there', async () => {
    await expect(verifyTokens({ rootDir })).resolves.toBeUndefined()
  })

  it('ignores exports that no theme uses', async () => {
    await writeExport(
      'src/style/themes/figma/brand/dnbeiendom-light-test.tokens.json',
      {}
    )

    await expect(verifyTokens({ rootDir })).resolves.toBeUndefined()
  })

  it('reports a missing mode export', async () => {
    await fs.remove(
      path.resolve(
        rootDir,
        'src/style/themes/figma/brand/dnb-dark.tokens.json'
      )
    )

    await expect(verifyTokens({ rootDir })).rejects.toThrow(
      './src/style/themes/figma/brand/dnb-dark.tokens.json is missing'
    )
  })

  it('reports an export without tokens', async () => {
    await writeExport(
      'src/style/themes/figma/brand/sbanken-light.tokens.json',
      { $extensions: { 'com.figma.modeName': 'sbanken-light' } }
    )

    await expect(verifyTokens({ rootDir })).rejects.toThrow(
      './src/style/themes/figma/brand/sbanken-light.tokens.json (sbanken): Invalid Figma export: no tokens found'
    )
  })

  it('reports a foundation that misses the colors of a theme', async () => {
    await writeExport(FOUNDATION_TOKEN_FILES[0].in, {
      dnb: foundation.dnb,
      sbanken: foundation.sbanken,
    })

    await expect(verifyTokens({ rootDir })).rejects.toThrow(
      '(carnegie): Invalid Figma token node at "dnb-carnegie"'
    )
  })

  it('reports a variable name that cannot become a CSS variable', async () => {
    await writeExport(dnbLight, {
      ...brand,
      color: { 'action (old)': token },
    })

    await expect(verifyTokens({ rootDir })).rejects.toThrow(
      `./${dnbLight} (ui): Unsupported characters [ ' ', '(', ')' ] in variable: "color/action (old)"`
    )
  })

  it('reports an alias to a collection the themes do not support', async () => {
    await writeExport(dnbLight, {
      ...brand,
      color: {
        action: {
          ...token,
          $type: 'color',
          $extensions: {
            'com.figma.aliasData': {
              targetVariableName: 'eiendom/green-500',
              targetVariableSetId: 'VariableCollectionId:3:1',
              targetVariableSetName: 'eiendom-colors',
            },
          },
        },
      },
    })

    await expect(verifyTokens({ rootDir })).rejects.toThrow(
      `./${dnbLight} (ui): Unsupported variable set: eiendom-colors`
    )
  })

  it('reports a missing typography token', async () => {
    const size = { ...typography.size }
    delete size['text-sm']
    await writeExport(dnbLight, {
      ...brand,
      font: { ...typography, size },
    })

    await expect(verifyTokens({ rootDir })).rejects.toThrow(
      `./${dnbLight} (ui): Missing numeric typography token for --font-size-small: font/size/text-sm`
    )
  })

  it('lists every problem at once', async () => {
    await fs.remove(
      path.resolve(rootDir, 'src/style/themes/figma/color.tokens.json')
    )
    await fs.remove(
      path.resolve(
        rootDir,
        'src/style/themes/figma/brand/dnbcarnegie-light.tokens.json'
      )
    )

    const error = await verifyTokens({ rootDir }).catch((e) => e)

    expect(error.message.split('\n')).toEqual([
      'The design token exports are not as expected:',
      '- ./src/style/themes/figma/brand/dnbcarnegie-light.tokens.json is missing. The Figma collection or mode it is exported from was not found.',
      '- ./src/style/themes/figma/color.tokens.json is missing. The Figma collection or mode it is exported from was not found.',
    ])
  })
})
