import { RuleTester } from 'eslint'
import rule from '../rules/no-inline-type-exports'

const tester = new RuleTester({
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    ecmaVersion: 2022,
    sourceType: 'module',
  },
})

tester.run('no-inline-type-exports', rule, {
  valid: [
    // Under threshold (4 types in a .tsx file)
    {
      code: `
        export type FooProps = { a: string }
        export type FooSize = 'small' | 'large'
        export type FooVariant = 'primary' | 'secondary'
        export type FooEvent = { value: string }
      `,
      filename: '/src/components/foo/Foo.tsx',
    },
    // Exactly at threshold (5 types, threshold is 5)
    {
      code: `
        export type A = string
        export type B = string
        export type C = string
        export type D = string
        export type E = string
      `,
      filename: '/src/components/foo/Foo.tsx',
    },
    // Any number of types in a .ts file (non-component file)
    {
      code: `
        export type A = string
        export type B = string
        export type C = string
        export type D = string
        export type E = string
        export type F = string
        export type G = string
      `,
      filename: '/src/components/foo/types.ts',
    },
    // Test files are ignored
    {
      code: `
        export type A = string
        export type B = string
        export type C = string
        export type D = string
        export type E = string
        export type F = string
      `,
      filename: '/src/components/foo/__tests__/Foo.test.tsx',
    },
    // Stories are ignored
    {
      code: `
        export type A = string
        export type B = string
        export type C = string
        export type D = string
        export type E = string
        export type F = string
      `,
      filename: '/src/components/foo/Foo.stories.tsx',
    },
    // Custom threshold: 10
    {
      code: `
        export type A = string
        export type B = string
        export type C = string
        export type D = string
        export type E = string
        export type F = string
        export type G = string
      `,
      filename: '/src/components/foo/Foo.tsx',
      options: [{ threshold: 10 }],
    },
  ],

  invalid: [
    // Over threshold (6 types in a .tsx file)
    {
      code: `
        export type FooProps = { a: string }
        export type FooSize = 'small' | 'large'
        export type FooVariant = 'primary' | 'secondary'
        export type FooEvent = { value: string }
        export type FooAllProps = FooProps & { extra: boolean }
        export type FooOnChange = (event: FooEvent) => void
      `,
      filename: '/src/components/foo/Foo.tsx',
      errors: [{ messageId: 'tooManyInlineTypes' }],
    },
    // Interfaces count too
    {
      code: `
        export interface FooProps { a: string }
        export interface FooEvent { value: string }
        export type FooSize = 'small' | 'large'
        export type FooVariant = 'primary' | 'secondary'
        export type FooAllProps = FooProps & { extra: boolean }
        export type FooOnChange = (event: FooEvent) => void
      `,
      filename: '/src/components/foo/Foo.tsx',
      errors: [{ messageId: 'tooManyInlineTypes' }],
    },
    // Custom threshold: 2
    {
      code: `
        export type FooProps = { a: string }
        export type FooSize = 'small' | 'large'
        export type FooVariant = 'primary' | 'secondary'
      `,
      filename: '/src/components/foo/Foo.tsx',
      options: [{ threshold: 2 }],
      errors: [{ messageId: 'tooManyInlineTypes' }],
    },
  ],
})
