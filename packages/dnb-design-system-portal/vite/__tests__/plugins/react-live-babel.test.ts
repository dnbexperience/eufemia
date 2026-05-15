import { describe, it, expect } from 'vitest'
import { injectStableName } from '../../client/plugins/react-live-babel'

async function transform(code: string) {
  const babel = await import('@babel/core')
  const result = await babel.transformAsync(code, {
    filename: 'Examples.tsx',
    presets: [
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: [injectStableName],
  })

  return result?.code || ''
}

describe('injectStableName babel plugin', () => {
  it('injects stableName from enclosing function declaration', async () => {
    const input = `
      export function MyExample() {
        return <ComponentBox>code here</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('stableName: "MyExample"')
  })

  it('injects stableName from enclosing variable declarator', async () => {
    const input = `
      export const ArrowExample = () => {
        return <ComponentBox>code here</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('stableName: "ArrowExample"')
  })

  it('appends counter suffix for multiple ComponentBoxes in the same function', async () => {
    const input = `
      export function MultiBox() {
        return (
          <>
            <ComponentBox>first</ComponentBox>
            <ComponentBox>second</ComponentBox>
            <ComponentBox>third</ComponentBox>
          </>
        )
      }
    `

    const output = await transform(input)

    expect(output).toContain('stableName: "MultiBox"')
    expect(output).toContain('stableName: "MultiBox_2"')
    expect(output).toContain('stableName: "MultiBox_3"')
  })

  it('uses separate counters for different functions', async () => {
    const input = `
      export function First() {
        return <ComponentBox>a</ComponentBox>
      }
      export function Second() {
        return <ComponentBox>b</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('stableName: "First"')
    expect(output).toContain('stableName: "Second"')
    expect(output).not.toContain('First_2')
    expect(output).not.toContain('Second_2')
  })

  it('skips ComponentBox without an enclosing named function', async () => {
    const input = `
      export default () => {
        return <ComponentBox>orphan</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).not.toContain('stableName')
  })

  it('ignores non-ComponentBox elements', async () => {
    const input = `
      export function Demo() {
        return <SomeOther>content</SomeOther>
      }
    `

    const output = await transform(input)

    expect(output).not.toContain('stableName')
  })

  it('resets counters between separate transform calls', async () => {
    const input = `
      export function Repeated() {
        return (
          <>
            <ComponentBox>a</ComponentBox>
            <ComponentBox>b</ComponentBox>
          </>
        )
      }
    `

    const first = await transform(input)
    const second = await transform(input)

    expect(first).toContain('stableName: "Repeated"')
    expect(first).toContain('stableName: "Repeated_2"')
    expect(second).toContain('stableName: "Repeated"')
    expect(second).toContain('stableName: "Repeated_2"')
  })
})
