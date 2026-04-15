import { RuleTester } from 'eslint'
import rule from '../rules/doc-trailing-period'

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('doc-trailing-period', rule, {
  valid: [
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: 'The content of the button.',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: "Defines the content.",
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: \`Template literal doc.\`,
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // Non-doc properties should be ignored
      code: `
        const ButtonDocs = {
          children: {
            type: 'string',
            defaultValue: 'hello',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // Empty doc strings should be ignored
      code: `
        const ButtonDocs = {
          children: {
            doc: '',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
  ],
  invalid: [
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: 'The content of the button',
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: 'The content of the button.',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'missingTrailingPeriod' }],
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: "The content of the button",
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: "The content of the button.",
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'missingTrailingPeriod' }],
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: \`The content of the button\`,
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: \`The content of the button.\`,
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'missingTrailingPeriod' }],
    },
    {
      // Trailing whitespace should be preserved after the period
      code: `
        const ButtonDocs = {
          children: {
            doc: 'The content of the button ',
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: 'The content of the button. ',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'missingTrailingPeriod' }],
    },
  ],
})
