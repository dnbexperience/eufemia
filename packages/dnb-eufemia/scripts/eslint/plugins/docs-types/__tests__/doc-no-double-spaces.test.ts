import { RuleTester } from 'eslint'
import rule from '../rules/doc-no-double-spaces'

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('doc-no-double-spaces', rule, {
  valid: [
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: 'Normal single spaces in text.',
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
            type: 'has  double  spaces',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: "No double spaces here.",
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
            doc: 'Has  double spaces.',
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: 'Has double spaces.',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'doubleSpaces' }],
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: "Has  double  and   triple spaces.",
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: "Has double and triple spaces.",
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'doubleSpaces' }],
    },
    {
      code: `
        const ButtonDocs = {
          children: {
            doc: \`Has  double spaces.\`,
          },
        }
      `,
      output: `
        const ButtonDocs = {
          children: {
            doc: \`Has double spaces.\`,
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'doubleSpaces' }],
    },
  ],
})
