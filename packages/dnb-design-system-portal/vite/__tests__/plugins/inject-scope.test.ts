import { describe, it, expect } from 'vitest'
import {
  injectScope,
  extractScopeIdentifiers,
} from '../../client/plugins/inject-scope'

/**
 * Transform helper that runs injectStableName → injectScope → babel-plugin-react-live
 * to simulate the full pipeline.
 */
async function transformWithFullPipeline(code: string) {
  const path = await import('node:path')
  const babel = await import('@babel/core')
  const { injectStableName } =
    await import('../../client/plugins/react-live-babel')

  const portalRoot = path.resolve(__dirname, '..', '..', '..')

  const result = await babel.transformAsync(code, {
    filename: 'Examples.tsx',
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: [
      injectStableName,
      injectScope,
      [
        require.resolve('babel-plugin-react-live'),
        {
          componentName: 'ComponentBox',
          filesToMatch: ['Examples.tsx'],
          prettierPath: path.resolve(portalRoot, '.prettierrc'),
        },
      ],
    ],
  })

  return result?.code || ''
}

describe('extractScopeIdentifiers', () => {
  it('extracts PascalCase component names', () => {
    expect(extractScopeIdentifiers('<Button text="hi" />')).toEqual([
      'Button',
    ])
  })

  it('extracts multiple component names', () => {
    const result = extractScopeIdentifiers(
      '<Section><Button /><Card /></Section>'
    )
    expect(result).toContain('Button')
    expect(result).toContain('Section')
    expect(result).toContain('Card')
  })

  it('extracts namespace roots like Form and Field', () => {
    const result = extractScopeIdentifiers(
      '<Form.Handler><Field.String path="/foo" /></Form.Handler>'
    )
    expect(result).toContain('Form')
    expect(result).toContain('Field')
    expect(result).not.toContain('Handler')
    expect(result).not.toContain('String')
  })

  it('ignores builtin scope names', () => {
    const result = extractScopeIdentifiers(
      '<React.Fragment><Suspense><Button /></Suspense></React.Fragment>'
    )
    expect(result).toContain('Button')
    expect(result).not.toContain('React')
    expect(result).not.toContain('Fragment')
    expect(result).not.toContain('Suspense')
  })

  it('ignores identifiers inside string literals', () => {
    const result = extractScopeIdentifiers(
      '<Button text="Section" variant="primary" />'
    )
    expect(result).toContain('Button')
    expect(result).not.toContain('Section')
  })

  it('does not treat apostrophes in JSX text as string delimiters', () => {
    const result = extractScopeIdentifiers(
      `<Flex.Vertical>
  <Form.MainHeading>I'm left aligned</Form.MainHeading>
  <Card stack outset>
    <P>Card content</P>
  </Card>
  <Form.SubmitButton text="I'm also left aligned" />
</Flex.Vertical>`
    )
    expect(result).toContain('Flex')
    expect(result).toContain('Form')
    expect(result).toContain('Card')
    expect(result).toContain('P')
  })

  it('ignores identifiers inside comments', () => {
    const result = extractScopeIdentifiers(
      '// Use Section here\n<Button />'
    )
    expect(result).toContain('Button')
    expect(result).not.toContain('Section')
  })

  it('ignores unknown PascalCase identifiers', () => {
    const result = extractScopeIdentifiers(
      '<MyCustomComponent /><Button />'
    )
    expect(result).toContain('Button')
    expect(result).not.toContain('MyCustomComponent')
  })

  it('handles elements like P, H1, H2', () => {
    const result = extractScopeIdentifiers('<P>text</P><H2>heading</H2>')
    expect(result).toContain('P')
    expect(result).toContain('H2')
  })

  it('returns deduplicated results', () => {
    const result = extractScopeIdentifiers('<Button /><Button />')
    expect(result).toEqual(['Button'])
  })
})

describe('injectScope babel plugin', () => {
  it('injects __buildScope with components found in code string', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return <ComponentBox><Button text="hi" /></ComponentBox>
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).toContain('__buildScope')
    expect(output).toContain('__scope_Button')
    expect(output).toContain('@dnb/eufemia/src/components/button/Button')
  })

  it('reuses existing file-level imports', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      import { Button } from '@dnb/eufemia/src'
      export function Demo() {
        return <ComponentBox><Button text="hi" /></ComponentBox>
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).toContain('__buildScope')
    // Should use the existing Button binding, not add __scope_Button
    expect(output).not.toContain('__scope_Button')
    // Shorthand property: { Button } (same as { Button: Button })
    expect(output).toMatch(/__buildScope[\s\S]*Button/)
  })

  it('handles multiple components in one code string', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return (
          <ComponentBox>
            <Section>
              <Button text="hi" />
              <Card>content</Card>
            </Section>
          </ComponentBox>
        )
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).toContain('__scope_Button')
    expect(output).toContain('__scope_Section')
    expect(output).toContain('__scope_Card')
  })

  it('handles forms namespace imports', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return (
          <ComponentBox>
            <Form.Handler>
              <Field.String path="/name" />
            </Form.Handler>
          </ComponentBox>
        )
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).toContain('__scope_Form')
    expect(output).toContain('__scope_Field')
    expect(output).toContain('@dnb/eufemia/src/extensions/forms')
  })

  it('handles shared imports (Provider, Theme)', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return (
          <ComponentBox>
            <Provider locale="nb-NO">
              <Button text="hi" />
            </Provider>
          </ComponentBox>
        )
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).toContain('__scope_Provider')
    expect(output).toContain('@dnb/eufemia/src/shared')
  })

  it('does not inject for non-ComponentBox elements', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return <SomeOther><Button /></SomeOther>
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).not.toContain('__buildScope')
    expect(output).not.toContain('__scope_')
  })

  it('does not inject builtins like React hooks', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return (
          <ComponentBox>
            {() => {
              const [open, setOpen] = useState(false)
              return <Button text="hi" />
            }}
          </ComponentBox>
        )
      }
    `

    const output = await transformWithFullPipeline(input)

    // Should NOT inject useState (it's a builtin provided by ComponentBox)
    expect(output).not.toContain('__scope_useState')
    // Should inject Button
    expect(output).toContain('__scope_Button')
  })

  it('shares added imports across multiple ComponentBoxes in the same file', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function First() {
        return <ComponentBox><Button text="a" /></ComponentBox>
      }
      export function Second() {
        return <ComponentBox><Button text="b" /><Section>x</Section></ComponentBox>
      }
    `

    const output = await transformWithFullPipeline(input)

    // Button import added once, used in both scopes
    const buttonImportCount = (
      output.match(/@dnb\/eufemia\/src\/components\/button\/Button/g) || []
    ).length
    expect(buttonImportCount).toBe(1)

    // Both ComponentBoxes should have __buildScope
    const buildScopeCount = (output.match(/__buildScope/g) || []).length
    expect(buildScopeCount).toBeGreaterThanOrEqual(2)
  })

  it('handles element imports like P and H2', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return (
          <ComponentBox>
            <P>paragraph</P>
            <H2>heading</H2>
          </ComponentBox>
        )
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).toContain('__scope_P')
    expect(output).toContain('__scope_H2')
    expect(output).toContain('@dnb/eufemia/src/elements/P')
    expect(output).toContain('@dnb/eufemia/src/elements/H2')
  })

  it('does not add __buildScope when no known symbols are found', async () => {
    const input = `
      import ComponentBox from '../../shared/tags/ComponentBox'
      export function Demo() {
        return <ComponentBox>{'plain text'}</ComponentBox>
      }
    `

    const output = await transformWithFullPipeline(input)

    expect(output).not.toContain('__buildScope')
  })
})
