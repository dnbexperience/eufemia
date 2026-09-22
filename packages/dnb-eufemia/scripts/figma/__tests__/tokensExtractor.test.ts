import {
  convertVariablesToTokens,
  extractTokens,
  TOKEN_EXPORTS,
  type FigmaLocalVariables,
} from '../tasks/tokensExtractor'
import { createFigmaClient } from '../helpers/figmaClient'
import { readFileSync } from 'node:fs'
import path from 'path'
import fs from 'fs-extra'
import { log } from '../../lib'

vi.mock('../helpers/figmaClient', () => ({ createFigmaClient: vi.fn() }))
vi.mock('fs-extra', () => ({
  default: { outputFile: vi.fn() },
}))

const white = { r: 1, g: 1, b: 1, a: 1 }
const green = { r: 0, g: 0.4470588266849518, b: 0.4470588266849518, a: 1 }

/** The remaining brand modes only exist so every configured export can be written */
const restModes = ['1:2', '1:3', '1:4']
const inAllModes = <Value>(value: Value) =>
  Object.fromEntries(restModes.map((modeId) => [modeId, value]))

const meta: FigmaLocalVariables = {
  variableCollections: {
    'VariableCollectionId:1:1': {
      id: 'VariableCollectionId:1:1',
      name: 'brand',
      modes: [
        { modeId: '1:0', name: 'dnb-light' },
        { modeId: '1:1', name: 'dnb-dark' },
        { modeId: '1:2', name: 'sbanken-light' },
        { modeId: '1:3', name: 'sbanken-dark' },
        { modeId: '1:4', name: 'dnbcarnegie-light' },
      ],
      defaultModeId: '1:0',
      variableIds: [
        'VariableID:1:2',
        'VariableID:1:3',
        'VariableID:1:4',
        'VariableID:1:5',
      ],
    },
    'VariableCollectionId:abc/5552:1080': {
      id: 'VariableCollectionId:abc/5552:1080',
      name: 'colors',
      modes: [{ modeId: '9:0', name: 'color' }],
      defaultModeId: '9:0',
      variableIds: [
        'VariableID:def/5552:1666',
        'VariableID:def/5552:1667',
      ],
    },
  },
  variables: {
    'VariableID:1:2': {
      id: 'VariableID:1:2',
      name: 'color/background/page-background',
      variableCollectionId: 'VariableCollectionId:1:1',
      resolvedType: 'COLOR',
      valuesByMode: {
        '1:0': { type: 'VARIABLE_ALIAS', id: 'VariableID:def/5552:1666' },
        '1:1': green,
        ...inAllModes(green),
      },
      description: 'The page background',
      scopes: ['FRAME_FILL'],
      codeSyntax: { WEB: '--token-color-background-page-background' },
    },
    'VariableID:1:3': {
      id: 'VariableID:1:3',
      name: 'radius/interactive',
      variableCollectionId: 'VariableCollectionId:1:1',
      resolvedType: 'FLOAT',
      valuesByMode: { '1:0': 4, '1:1': 4, ...inAllModes(4) },
      hiddenFromPublishing: true,
      scopes: [],
      codeSyntax: {},
    },
    'VariableID:1:4': {
      id: 'VariableID:1:4',
      name: 'font/weight/basis',
      variableCollectionId: 'VariableCollectionId:1:1',
      resolvedType: 'STRING',
      valuesByMode: {
        '1:0': 'Regular',
        '1:1': 'Regular',
        ...inAllModes('Regular'),
      },
      scopes: ['FONT_STYLE'],
    },
    // Shares its name with the "font/weight" group above
    'VariableID:1:5': {
      id: 'VariableID:1:5',
      name: 'font/weight',
      variableCollectionId: 'VariableCollectionId:1:1',
      resolvedType: 'STRING',
      valuesByMode: {
        '1:0': 'Medium',
        '1:1': 'Medium',
        ...inAllModes('Medium'),
      },
      scopes: [],
    },
    'VariableID:def/5552:1666': {
      id: 'VariableID:def/5552:1666',
      name: 'dnb/greyscale/0',
      variableCollectionId: 'VariableCollectionId:abc/5552:1080',
      resolvedType: 'COLOR',
      valuesByMode: { '9:0': white },
      scopes: ['ALL_SCOPES'],
    },
    'VariableID:def/5552:1667': {
      id: 'VariableID:def/5552:1667',
      name: 'dnb/greyscale/0/40',
      variableCollectionId: 'VariableCollectionId:abc/5552:1080',
      resolvedType: 'COLOR',
      valuesByMode: { '9:0': { ...white, a: 0.4 } },
      scopes: ['ALL_SCOPES'],
    },
  },
}

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(log, 'info').mockImplementation(vi.fn())
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('convertVariablesToTokens', () => {
  it('converts an aliased color to the resolved value and alias data', () => {
    const tokens = convertVariablesToTokens({
      meta,
      collection: 'brand',
      mode: 'dnb-light',
    })

    expect(tokens.color).toEqual({
      background: {
        'page-background': {
          $type: 'color',
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 1,
            hex: '#FFFFFF',
          },
          $description: 'The page background',
          $extensions: {
            'com.figma.variableId': 'VariableID:1:2',
            'com.figma.scopes': ['FRAME_FILL'],
            'com.figma.codeSyntax': {
              WEB: '--token-color-background-page-background',
            },
            'com.figma.aliasData': {
              targetVariableId: 'VariableID:def/5552:1666',
              targetVariableName: 'dnb/greyscale/0',
              targetVariableSetId: 'VariableCollectionId:abc/5552:1080',
              targetVariableSetName: 'colors',
            },
          },
        },
      },
    })
  })

  it('reads the requested mode', () => {
    const tokens = convertVariablesToTokens({
      meta,
      collection: 'brand',
      mode: 'dnb-dark',
    })

    expect(tokens).toMatchObject({
      color: {
        background: {
          'page-background': {
            $value: {
              components: [0, 0.4470588266849518, 0.4470588266849518],
              alpha: 1,
              hex: '#007272',
            },
            $extensions: expect.not.objectContaining({
              'com.figma.aliasData': expect.anything(),
            }),
          },
        },
      },
      $extensions: { 'com.figma.modeName': 'dnb-dark' },
    })
  })

  it('omits empty scopes, code syntax and descriptions', () => {
    const tokens = convertVariablesToTokens({
      meta,
      collection: 'brand',
      mode: 'dnb-light',
    })

    expect(tokens.radius).toEqual({
      interactive: {
        $type: 'number',
        $value: 4,
        $extensions: {
          'com.figma.variableId': 'VariableID:1:3',
          'com.figma.hiddenFromPublishing': true,
        },
      },
    })
  })

  it('nests a variable that shares its name with a group as "$root"', () => {
    const tokens = convertVariablesToTokens({
      meta,
      collection: 'brand',
      mode: 'dnb-light',
    })

    expect(tokens.font).toMatchObject({
      weight: {
        basis: { $type: 'string', $value: 'Regular' },
        $root: { $type: 'string', $value: 'Medium' },
      },
    })
  })

  it('marks string variables with the original Figma type', () => {
    const tokens = convertVariablesToTokens({
      meta,
      collection: 'brand',
      mode: 'dnb-light',
    })

    expect(tokens.font['weight'].basis.$extensions).toMatchObject({
      'com.figma.type': 'string',
    })
  })

  it('uses the default mode when no mode is given', () => {
    const tokens = convertVariablesToTokens({ meta, collection: 'colors' })

    expect(tokens).toMatchObject({
      dnb: {
        greyscale: {
          '0': {
            '40': {
              $value: { alpha: 0.4, hex: '#FFFFFF' },
            },
            $root: { $value: { alpha: 1, hex: '#FFFFFF' } },
          },
        },
      },
      $extensions: { 'com.figma.modeName': 'color' },
    })
  })

  it('throws when the collection is unknown', () => {
    expect(() =>
      convertVariablesToTokens({ meta, collection: 'spacing' })
    ).toThrow('Expected exactly one Figma variable collection named')
  })

  it('throws when the mode is unknown', () => {
    expect(() =>
      convertVariablesToTokens({
        meta,
        collection: 'brand',
        mode: 'dnbcarnegie-dark',
      })
    ).toThrow('has no mode named "dnbcarnegie-dark"')
  })

  it('throws when an alias points outside of the response', () => {
    expect(() =>
      convertVariablesToTokens({
        meta: {
          ...meta,
          variables: {
            ...meta.variables,
            'VariableID:1:2': {
              ...meta.variables['VariableID:1:2'],
              valuesByMode: {
                '1:0': { type: 'VARIABLE_ALIAS', id: 'VariableID:9:9' },
              },
            },
          },
        },
        collection: 'brand',
        mode: 'dnb-light',
      })
    ).toThrow('points to a variable that is not part of the response')
  })
})

describe('extractTokens', () => {
  it('throws without a Figma file', async () => {
    await expect(extractTokens()).rejects.toThrow('FIGMA_TOKENS_FILE')
  })

  it('writes one file per configured collection mode', async () => {
    const get = vi.fn().mockResolvedValue({ data: { meta } })
    vi.mocked(createFigmaClient).mockReturnValue({
      client: { get },
    } as unknown as ReturnType<typeof createFigmaClient>)

    const files = await extractTokens({
      figmaFile: 'file-key',
      tokensDir: '/tokens',
    })

    expect(get).toHaveBeenCalledWith('files/file-key/variables/local')
    expect(files).toEqual([
      '/tokens/color.tokens.json',
      '/tokens/brand/dnb-light.tokens.json',
      '/tokens/brand/dnb-dark.tokens.json',
      '/tokens/brand/sbanken-light.tokens.json',
      '/tokens/brand/sbanken-dark.tokens.json',
      '/tokens/brand/dnbcarnegie-light.tokens.json',
    ])
    expect(fs.outputFile).toHaveBeenCalledTimes(6)
  })

  it('names the failing collection and mode', async () => {
    const get = vi.fn().mockResolvedValue({
      data: {
        meta: {
          ...meta,
          variableCollections: {
            ...meta.variableCollections,
            'VariableCollectionId:1:1': {
              ...meta.variableCollections['VariableCollectionId:1:1'],
              modes: [{ modeId: '1:0', name: 'dnb-light' }],
            },
          },
        },
      },
    })

    vi.mocked(createFigmaClient).mockReturnValue({
      client: { get },
    } as unknown as ReturnType<typeof createFigmaClient>)

    await expect(
      extractTokens({ figmaFile: 'file-key', tokensDir: '/tokens' })
    ).rejects.toThrow(
      'Failed to convert the Figma collection "brand" (mode "dnb-dark")'
    )
  })
})

describe('the committed Figma exports', () => {
  const FIGMA_TYPES = {
    color: 'COLOR',
    number: 'FLOAT',
    string: 'STRING',
  } as const

  /**
   * Rebuilds the Figma REST response a committed export was made from, so the
   * converter can be held against files that Figma itself has written.
   */
  const toLocalVariables = (tokens, mode: string) => {
    const collectionId = 'VariableCollectionId:1:1'
    const meta: FigmaLocalVariables = {
      variables: {},
      variableCollections: {
        [collectionId]: {
          id: collectionId,
          name: 'exported',
          modes: [{ modeId: '1:0', name: mode }],
          defaultModeId: '1:0',
          variableIds: [],
        },
      },
    }

    const toValue = (leaf) =>
      leaf.$type === 'color'
        ? {
            r: leaf.$value.components[0],
            g: leaf.$value.components[1],
            b: leaf.$value.components[2],
            a: leaf.$value.alpha,
          }
        : leaf.$value

    const addAliasTarget = (leaf) => {
      const alias = leaf.$extensions['com.figma.aliasData']
      const targetCollectionId = alias.targetVariableSetId

      meta.variableCollections[targetCollectionId] ??= {
        id: targetCollectionId,
        name: alias.targetVariableSetName,
        modes: [{ modeId: 'target', name: 'target' }],
        defaultModeId: 'target',
        variableIds: [],
      }
      meta.variables[alias.targetVariableId] = {
        id: alias.targetVariableId,
        name: alias.targetVariableName,
        variableCollectionId: targetCollectionId,
        resolvedType: FIGMA_TYPES[leaf.$type],
        valuesByMode: { target: toValue(leaf) },
      }
    }

    const walk = (node, figmaPath: string[]) => {
      if (!('$type' in node)) {
        for (const [key, value] of Object.entries(node)) {
          if (key !== '$extensions') {
            walk(value, [...figmaPath, key === '$root' ? '' : key])
          }
        }
        return
      }

      const extensions = node.$extensions
      const id = extensions['com.figma.variableId']

      meta.variableCollections[collectionId].variableIds.push(id)
      meta.variables[id] = {
        id,
        name: figmaPath.filter(Boolean).join('/'),
        variableCollectionId: collectionId,
        resolvedType: FIGMA_TYPES[node.$type],
        valuesByMode: {
          '1:0': extensions['com.figma.aliasData']
            ? {
                type: 'VARIABLE_ALIAS',
                id: extensions['com.figma.aliasData'].targetVariableId,
              }
            : toValue(node),
        },
        description: node.$description,
        hiddenFromPublishing: extensions['com.figma.hiddenFromPublishing'],
        scopes: extensions['com.figma.scopes'],
        codeSyntax: extensions['com.figma.codeSyntax'],
      }

      if (extensions['com.figma.aliasData']) {
        addAliasTarget(node)
      }
    }

    walk(tokens, [])

    return meta
  }

  it.each(TOKEN_EXPORTS)(
    'reproduces $fileName',
    ({ fileName, mode = 'color' }) => {
      const file = path.resolve(
        __dirname,
        '../../../src/style/themes/figma',
        fileName
      )
      const tokens = JSON.parse(readFileSync(file, 'utf-8'))

      expect(
        JSON.stringify(
          convertVariablesToTokens({
            meta: toLocalVariables(tokens, mode),
            collection: 'exported',
            mode,
          }),
          null,
          2
        )
      ).toBe(JSON.stringify(tokens, null, 2))
    }
  )
})
