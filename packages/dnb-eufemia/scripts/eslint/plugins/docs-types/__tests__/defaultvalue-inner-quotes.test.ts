import { RuleTester } from 'eslint'
import rule from '../rules/defaultvalue-inner-quotes'

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('defaultvalue-inner-quotes', rule, {
  valid: [
    {
      // Already quoted defaultValue
      code: `
        const ButtonDocs = {
          variant: {
            type: ['"primary"', '"secondary"'],
            defaultValue: "'primary'",
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // Boolean defaultValue - should not be flagged
      code: `
        const ButtonDocs = {
          disabled: {
            type: 'boolean',
            defaultValue: 'false',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // No type property with quoted literals
      code: `
        const ButtonDocs = {
          size: {
            type: 'string',
            defaultValue: 'medium',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // null/undefined values - should not be flagged
      code: `
        const ButtonDocs = {
          value: {
            type: ['"left"', '"right"'],
            defaultValue: 'null',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // Non-bareword value with special chars
      code: `
        const ButtonDocs = {
          label: {
            type: ['"left"', '"right"'],
            defaultValue: 'some-value',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
    {
      // true/false should not be flagged
      code: `
        const ButtonDocs = {
          active: {
            type: ['"left"', '"right"'],
            defaultValue: 'true',
          },
        }
      `,
      filename: 'ButtonDocs.ts',
    },
  ],
  invalid: [
    {
      // Bare word defaultValue with quoted type literals
      code: `
        const ButtonDocs = {
          variant: {
            type: ['"primary"', '"secondary"'],
            defaultValue: 'primary',
          },
        }
      `,
      output: `
        const ButtonDocs = {
          variant: {
            type: ['"primary"', '"secondary"'],
            defaultValue: "'primary'",
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'unquotedDefaultValue' }],
    },
    {
      // Template literal defaultValue
      code: `
        const ButtonDocs = {
          variant: {
            type: ['"left"', '"right"'],
            defaultValue: \`left\`,
          },
        }
      `,
      output: `
        const ButtonDocs = {
          variant: {
            type: ['"left"', '"right"'],
            defaultValue: "'left'",
          },
        }
      `,
      filename: 'ButtonDocs.ts',
      errors: [{ messageId: 'unquotedDefaultValue' }],
    },
  ],
})
