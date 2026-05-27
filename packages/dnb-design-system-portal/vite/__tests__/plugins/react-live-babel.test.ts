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

describe('sourceImports injection', () => {
  it('injects sourceImports for all file-level imports', async () => {
    const input = `
      import { Button } from '@dnb/eufemia/src'
      import { trash } from '@dnb/eufemia/icons'
      export function Demo() {
        return <ComponentBox scope={{ trash }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('sourceImports')
    expect(output).toContain("import { Button } from '@dnb/eufemia'")
    expect(output).toContain("import { trash } from '@dnb/eufemia/icons'")
  })

  it('rewrites @dnb/eufemia/src/ to @dnb/eufemia/ in sourceImports', async () => {
    const input = `
      import { trash } from '@dnb/eufemia/src/icons'
      export function Demo() {
        return <ComponentBox scope={{ trash }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain("from '@dnb/eufemia/icons'")
    expect(output).toContain(
      `"import { trash } from '@dnb/eufemia/icons'"`
    )
  })

  it('includes imports even without scope match', async () => {
    const input = `
      import styled from '@emotion/styled'
      export function Demo() {
        return <ComponentBox>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('sourceImports')
    expect(output).toContain("import styled from '@emotion/styled'")
  })

  it('includes @dnb/eufemia imports without scope match', async () => {
    const input = `
      import { Button } from '@dnb/eufemia/src/components'
      export function Demo() {
        return <ComponentBox>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('sourceImports')
    expect(output).toContain('Button')
  })

  it('includes react imports', async () => {
    const input = `
      import { useState } from 'react'
      export function Demo() {
        return <ComponentBox>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('sourceImports')
    expect(output).toContain("import { useState } from 'react'")
  })

  it('includes external packages', async () => {
    const input = `
      import { format } from 'date-fns'
      export function Demo() {
        return <ComponentBox scope={{ format }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain("import { format } from 'date-fns'")
  })

  it('handles renamed imports with as syntax', async () => {
    const input = `
      import { trash as trashIcon } from '@dnb/eufemia/icons'
      export function Demo() {
        return <ComponentBox scope={{ trashIcon }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain(
      "import { trash as trashIcon } from '@dnb/eufemia/icons'"
    )
  })

  it('groups multiple specifiers from the same source', async () => {
    const input = `
      import { trash, add } from '@dnb/eufemia/icons'
      export function Demo() {
        return <ComponentBox scope={{ trash, add }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('trash, add')
    expect(output).toContain("from '@dnb/eufemia/icons'")
  })

  it('skips internal portal imports', async () => {
    const input = `
      import ComponentBox from '../shared/tags/ComponentBox'
      export function Demo() {
        return <ComponentBox>code</ComponentBox>
      }
    `

    const output = await transform(input)

    // No sourceImports injected since the only import is a portal internal
    expect(output).not.toContain('sourceImports')
  })

  it('gives each ComponentBox the same sourceImports', async () => {
    const input = `
      import { trash, add } from '@dnb/eufemia/icons'
      export function First() {
        return <ComponentBox scope={{ trash }}>code</ComponentBox>
      }
      export function Second() {
        return <ComponentBox scope={{ add }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    // Both should have sourceImports since all file-level imports are included
    const matches = output.match(/sourceImports/g)
    expect(matches).toHaveLength(2)
  })

  it('does not inject sourceImports when file has no imports', async () => {
    const input = `
      export function Demo() {
        return <ComponentBox>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).not.toContain('sourceImports')
  })

  it('handles namespace imports (import * as)', async () => {
    const input = `
      import * as Blocks from '@dnb/eufemia/src/extensions/forms/blocks'
      export function Demo() {
        return <ComponentBox scope={{ Blocks }}>code</ComponentBox>
      }
    `

    const output = await transform(input)

    expect(output).toContain('sourceImports')
    expect(output).toContain(
      "import * as Blocks from '@dnb/eufemia/extensions/forms/blocks'"
    )
  })
})
