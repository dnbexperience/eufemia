import ts from 'typescript'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import {
  buildReverseDependencyMap,
  isReexportOnly,
} from '../runScreenshotsConditionally/tsDependencyGraph'

describe('tsDependencyGraph', () => {
  let root: string
  let program: ts.Program

  beforeAll(() => {
    root = mkdtempSync(path.join(os.tmpdir(), 'ts-graph-'))

    const write = (relativePath: string, content: string) => {
      const absolutePath = path.join(root, relativePath)
      mkdirSync(path.dirname(absolutePath), { recursive: true })
      writeFileSync(absolutePath, content)
    }

    // A real component with a value export and a type export.
    write(
      'src/comp/Comp.tsx',
      `export type CompProps = { a: number }\n` +
        `export default function Comp() {\n  return null\n}\n`
    )
    // A pure re-export barrel.
    write('src/comp/index.ts', `export { default } from './Comp'\n`)
    // Consumer that imports the component through the barrel.
    write(
      'src/consumer/Consumer.tsx',
      `import Comp from '../comp'\nexport function C() {\n  return Comp\n}\n`
    )
    // Consumer that imports the component directly.
    write(
      'src/direct/Direct.tsx',
      `import Comp from '../comp/Comp'\nexport function D() {\n  return Comp\n}\n`
    )
    // Type-only consumer: must NOT count as a visual dependent.
    write(
      'src/typeonly/TypeUser.ts',
      `import type { CompProps } from '../comp/Comp'\n` +
        `export const value: CompProps = { a: 1 }\n`
    )

    program = ts.createProgram(
      [
        path.join(root, 'src/comp/Comp.tsx'),
        path.join(root, 'src/comp/index.ts'),
        path.join(root, 'src/consumer/Consumer.tsx'),
        path.join(root, 'src/direct/Direct.tsx'),
        path.join(root, 'src/typeonly/TypeUser.ts'),
      ],
      {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        moduleResolution: ts.ModuleResolutionKind.Bundler,
        allowJs: true,
        noEmit: true,
        skipLibCheck: true,
        esModuleInterop: true,
      }
    )
  })

  afterAll(() => {
    rmSync(root, { recursive: true, force: true })
  })

  it('resolves barrel re-exports to the defining module', () => {
    const map = buildReverseDependencyMap(program, root)
    const dependents = map.get('src/comp/Comp.tsx') || []

    expect(dependents).toContain('src/consumer/Consumer.tsx')
    expect(dependents).toContain('src/direct/Direct.tsx')
  })

  it('ignores type-only imports', () => {
    const map = buildReverseDependencyMap(program, root)
    const dependents = map.get('src/comp/Comp.tsx') || []

    expect(dependents).not.toContain('src/typeonly/TypeUser.ts')
  })

  it('treats pure re-export barrels as transparent (not a dependent)', () => {
    const map = buildReverseDependencyMap(program, root)
    const dependents = map.get('src/comp/Comp.tsx') || []

    expect(dependents).not.toContain('src/comp/index.ts')
  })

  it('detects pure re-export barrels', () => {
    const barrel = program.getSourceFile(
      path.join(root, 'src/comp/index.ts')
    )
    const comp = program.getSourceFile(
      path.join(root, 'src/comp/Comp.tsx')
    )

    expect(barrel && isReexportOnly(barrel)).toBe(true)
    expect(comp && isReexportOnly(comp)).toBe(false)
  })
})
