import path from 'path'
import { RuleTester } from 'eslint'
import rule from '../rules/sync-docs-jsdoc'

const ruleExports = rule as typeof rule & {
  extractDocsFromFile: (filePath: string) => Map<string, string>
  extractJsdocText: (commentValue: string) => string
  extractJsdocTags: (commentValue: string) => string[]
}

const fixturesDir = path.resolve(__dirname, 'fixtures/sync-docs-jsdoc')

const tester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('sync-docs-jsdoc', rule, {
  valid: [
    // ── JSDoc matches the doc string ──
    {
      code: `
        export type BasicProps = {
          /** Content of the component. */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
    },

    // ── Multiple matching properties ──
    {
      code: `
        export type BasicProps = {
          /** Content of the component. */
          content?: string

          /** Label for the component. */
          label?: string

          /** The size of the component. Defaults to \`medium\`. */
          size?: 'small' | 'medium' | 'large'
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
    },

    // ── Property not in the Docs file — no error ──
    {
      code: `
        export type BasicProps = {
          /** Some internal thing. */
          internalProp?: boolean
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
    },

    // ── No JSDoc on a documented property (requireJsdoc default false) ──
    {
      code: `
        export type BasicProps = {
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
    },

    // ── No Docs file in the directory — no error ──
    {
      code: `
        export type SomeProps = {
          /** Anything goes. */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'no-docs/types.ts'),
    },

    // ── File is a *Docs file itself — skipped ──
    {
      code: `
        export type Something = {
          /** Wrong text. */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/BasicDocs.ts'),
    },

    // ── Test file — skipped ──
    {
      code: `
        export type TestProps = {
          /** Wrong text. */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/Basic.test.ts'),
    },

    // ── JSDoc with @deprecated tag and matching description ──
    {
      code: `
        export type BasicProps = {
          /**
           * Content of the component.
           * @deprecated Use newProp instead.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
    },

    // ── Multi-export: matching docs from both exports ──
    {
      code: `
        export type MultiProps = {
          /** The current value. */
          value?: string

          /** Called when the value changes. */
          onChange?: () => void
        }
      `,
      filename: path.join(fixturesDir, 'multi-export/types.ts'),
    },

    // ── String-key property with matching JSDoc ──
    {
      code: `
        export type StringKeysProps = {
          /** Accessible label for the component. */
          'aria-label'?: string
        }
      `,
      filename: path.join(fixturesDir, 'string-keys/types.ts'),
    },

    // ── Interface (not just type alias) with matching JSDoc ──
    {
      code: `
        export interface BasicInterface {
          /** Content of the component. */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
    },
  ],

  invalid: [
    // ── Mismatched JSDoc — single property ──
    {
      code: `
        export type BasicProps = {
          /** Wrong description. */
          content?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [
        {
          messageId: 'mismatchedJsdoc',
          data: {
            docsFile: 'BasicDocs.ts',
            expected: 'Content of the component.',
          },
        },
      ],
    },

    // ── Mismatched JSDoc — multiple properties ──
    {
      code: `
        export type BasicProps = {
          /** Wrong content doc. */
          content?: string

          /** Wrong label doc. */
          label?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           */
          content?: string

          /**
           * Label for the component.
           */
          label?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [
        {
          messageId: 'mismatchedJsdoc',
          data: {
            docsFile: 'BasicDocs.ts',
            expected: 'Content of the component.',
          },
        },
        {
          messageId: 'mismatchedJsdoc',
          data: {
            docsFile: 'BasicDocs.ts',
            expected: 'Label for the component.',
          },
        },
      ],
    },

    // ── Multi-line JSDoc that doesn't match ──
    {
      code: `
        export type BasicProps = {
          /**
           * Old multi-line description.
           */
          content?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [{ messageId: 'mismatchedJsdoc' }],
    },

    // ── Multi-export docs: event description mismatch ──
    {
      code: `
        export type MultiProps = {
          /** Wrong event description. */
          onChange?: () => void
        }
      `,
      output: `
        export type MultiProps = {
          /**
           * Called when the value changes.
           */
          onChange?: () => void
        }
      `,
      filename: path.join(fixturesDir, 'multi-export/types.ts'),
      errors: [
        {
          messageId: 'mismatchedJsdoc',
          data: {
            docsFile: 'MultiDocs.ts',
            expected: 'Called when the value changes.',
          },
        },
      ],
    },

    // ── String-key property mismatch ──
    {
      code: `
        export type StringKeysProps = {
          /** Wrong label. */
          'aria-label'?: string
        }
      `,
      output: `
        export type StringKeysProps = {
          /**
           * Accessible label for the component.
           */
          'aria-label'?: string
        }
      `,
      filename: path.join(fixturesDir, 'string-keys/types.ts'),
      errors: [
        {
          messageId: 'mismatchedJsdoc',
          data: {
            docsFile: 'StringKeysDocs.ts',
            expected: 'Accessible label for the component.',
          },
        },
      ],
    },

    // ── Interface property mismatch ──
    {
      code: `
        export interface BasicInterface {
          /** Old description. */
          label?: string
        }
      `,
      output: `
        export interface BasicInterface {
          /**
           * Label for the component.
           */
          label?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [{ messageId: 'mismatchedJsdoc' }],
    },

    // ── requireJsdoc: true — missing JSDoc reported ──
    {
      code: `
        export type BasicProps = {
          content?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      options: [{ requireJsdoc: true }],
      errors: [
        {
          messageId: 'missingJsdoc',
          data: {
            docsFile: 'BasicDocs.ts',
            expected: 'Content of the component.',
          },
        },
      ],
    },

    // ── requireJsdoc: true — missing JSDoc on multiple properties ──
    {
      code: `
        export type BasicProps = {
          content?: string
          label?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           */
          content?: string
          /**
           * Label for the component.
           */
          label?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      options: [{ requireJsdoc: true }],
      errors: [
        { messageId: 'missingJsdoc' },
        { messageId: 'missingJsdoc' },
      ],
    },

    // ── Mismatch with backtick content in doc string ──
    {
      code: `
        export type BasicProps = {
          /** Wrong size doc. */
          size?: 'small' | 'medium' | 'large'
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * The size of the component. Defaults to \`medium\`.
           */
          size?: 'small' | 'medium' | 'large'
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [{ messageId: 'mismatchedJsdoc' }],
    },

    // ── Only the documented property is flagged, others are ignored ──
    {
      code: `
        export type BasicProps = {
          /** Wrong content doc. */
          content?: string

          /** Internal undocumented prop. */
          internalProp?: boolean
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           */
          content?: string

          /** Internal undocumented prop. */
          internalProp?: boolean
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [{ messageId: 'mismatchedJsdoc' }],
    },

    // ── Mismatched description with @deprecated tag — preserves tag ──
    {
      code: `
        export type BasicProps = {
          /**
           * Wrong description here.
           * @deprecated Use newProp instead.
           */
          content?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           * @deprecated Use newProp instead.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [
        {
          messageId: 'mismatchedJsdoc',
          data: {
            docsFile: 'BasicDocs.ts',
            expected: 'Content of the component.',
          },
        },
      ],
    },

    // ── Mismatched description with multiple tags — preserves all tags ──
    {
      code: `
        export type BasicProps = {
          /**
           * Old wrong text.
           * @internal
           * @deprecated Will be removed.
           */
          content?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           * @internal
           * @deprecated Will be removed.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [{ messageId: 'mismatchedJsdoc' }],
    },

    // ── Only @deprecated tag, no description — adds description before tag ──
    {
      code: `
        export type BasicProps = {
          /** @deprecated Use newProp instead. */
          content?: string
        }
      `,
      output: `
        export type BasicProps = {
          /**
           * Content of the component.
           * @deprecated Use newProp instead.
           */
          content?: string
        }
      `,
      filename: path.join(fixturesDir, 'basic/types.ts'),
      errors: [{ messageId: 'mismatchedJsdoc' }],
    },
  ],
})

// ── Unit tests for extractDocsFromFile ──

describe('extractDocsFromFile', () => {
  const { extractDocsFromFile } = ruleExports

  it('extracts doc strings from a basic Docs file', () => {
    const docsPath = path.join(fixturesDir, 'basic/BasicDocs.ts')
    const docs = extractDocsFromFile(docsPath)

    expect(docs.get('content')).toBe('Content of the component.')
    expect(docs.get('label')).toBe('Label for the component.')
    expect(docs.get('size')).toBe(
      'The size of the component. Defaults to `medium`.'
    )
    expect(docs.size).toBe(3)
  })

  it('extracts docs from a multi-export Docs file', () => {
    const docsPath = path.join(fixturesDir, 'multi-export/MultiDocs.ts')
    const docs = extractDocsFromFile(docsPath)

    expect(docs.get('value')).toBe('The current value.')
    expect(docs.get('label')).toBe('Label for the field.')
    expect(docs.get('onChange')).toBe('Called when the value changes.')
    expect(docs.get('onFocus')).toBe(
      'Called when the field receives focus.'
    )
    expect(docs.size).toBe(4)
  })

  it('extracts docs from a Docs file with string-key properties', () => {
    const docsPath = path.join(
      fixturesDir,
      'string-keys/StringKeysDocs.ts'
    )
    const docs = extractDocsFromFile(docsPath)

    expect(docs.get('aria-label')).toBe(
      'Accessible label for the component.'
    )
    expect(docs.get('data-testid')).toBe('Test ID for the component.')
    expect(docs.get('name')).toBe('The name attribute.')
    expect(docs.size).toBe(3)
  })
})

// ── Unit tests for extractJsdocText ──

describe('extractJsdocText', () => {
  const { extractJsdocText } = ruleExports

  it('extracts text from single-line JSDoc', () => {
    // comment.value for /** Some text. */
    expect(extractJsdocText('* Some text. ')).toBe('Some text.')
  })

  it('extracts text from multi-line JSDoc', () => {
    // comment.value for:
    // /**
    //  * Some text.
    //  */
    expect(extractJsdocText('*\n * Some text.\n ')).toBe('Some text.')
  })

  it('joins multiple content lines', () => {
    expect(extractJsdocText('*\n * First line.\n * Second line.\n ')).toBe(
      'First line. Second line.'
    )
  })

  it('handles text with backticks', () => {
    expect(extractJsdocText('* Defaults to `0`. ')).toBe(
      'Defaults to `0`.'
    )
  })

  it('handles empty JSDoc', () => {
    expect(extractJsdocText('* ')).toBe('')
  })

  it('trims extra whitespace', () => {
    expect(extractJsdocText('*   Lots of space.   ')).toBe(
      'Lots of space.'
    )
  })

  it('excludes @tag lines from the text', () => {
    expect(
      extractJsdocText(
        '*\n * Some description.\n * @deprecated Use something else.\n '
      )
    ).toBe('Some description.')
  })

  it('excludes multiple tags from the text', () => {
    expect(
      extractJsdocText(
        '*\n * Description text.\n * @internal\n * @deprecated Will be removed.\n '
      )
    ).toBe('Description text.')
  })

  it('returns empty when only tags are present', () => {
    expect(extractJsdocText('* @deprecated Use newProp instead. ')).toBe(
      ''
    )
  })
})

// ── Unit tests for extractJsdocTags ──

describe('extractJsdocTags', () => {
  const { extractJsdocTags } = ruleExports

  it('extracts a single tag', () => {
    expect(
      extractJsdocTags('*\n * Description.\n * @deprecated Use X.\n ')
    ).toEqual(['@deprecated Use X.'])
  })

  it('extracts multiple tags', () => {
    expect(
      extractJsdocTags(
        '*\n * Description.\n * @internal\n * @deprecated Will be removed.\n '
      )
    ).toEqual(['@internal', '@deprecated Will be removed.'])
  })

  it('returns empty array when no tags', () => {
    expect(extractJsdocTags('* Just a description. ')).toEqual([])
  })

  it('handles tag with multi-line continuation', () => {
    expect(
      extractJsdocTags(
        '*\n * Description.\n * @deprecated This is deprecated\n *   and will be removed.\n '
      )
    ).toEqual(['@deprecated This is deprecated and will be removed.'])
  })

  it('extracts tag from single-line JSDoc', () => {
    expect(
      extractJsdocTags('* @deprecated Use newProp instead. ')
    ).toEqual(['@deprecated Use newProp instead.'])
  })
})
