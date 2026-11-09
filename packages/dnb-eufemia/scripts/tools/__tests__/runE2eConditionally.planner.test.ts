import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { planE2eTests } from '../runE2eConditionally/planner'
import { LIBRARY, PORTAL } from '../runE2eConditionally/selection'

it('follows real TypeScript and Sass dependencies into browser test owners', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'e2e-plan-'))
  const write = (file: string, content: string) => {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
    writeFileSync(path.join(root, file), content)
  }
  const spec = (owner: string) =>
    LIBRARY + 'src/components/' + owner + '/__tests__/example.e2e.spec.ts'
  try {
    execFileSync('git', ['init'], { cwd: root, stdio: 'pipe' })
    write(
      LIBRARY + 'tsconfig.json',
      '{"compilerOptions":{"target":"es2022","module":"esnext","moduleResolution":"bundler","noEmit":true}}'
    )
    write(
      LIBRARY + 'src/components/checkbox/Checkbox.ts',
      'export const Checkbox = 1'
    )
    write(
      LIBRARY + 'src/components/filter/Filter.ts',
      "import { Checkbox } from '../checkbox/Checkbox'; export const Filter = Checkbox"
    )
    write(
      LIBRARY + 'src/components/checkbox/style/_shared.scss',
      '$color: red;'
    )
    write(
      LIBRARY + 'src/components/filter/style/filter.scss',
      "@use '../../checkbox/style/shared';"
    )
    for (const owner of ['checkbox', 'filter', 'slider']) {
      write(spec(owner), 'export {}')
    }
    write(
      PORTAL + 'src/e2e/pageNavigation.spec.ts',
      "page.goto('/web/components/button/')"
    )
    execFileSync('git', ['add', '.'], { cwd: root, stdio: 'pipe' })

    for (const change of ['Checkbox.ts', 'style/_shared.scss']) {
      const plan = planE2eTests({
        root,
        changedFiles: [LIBRARY + 'src/components/checkbox/' + change],
      })
      expect(plan.mode).toBe('partial')
      expect(plan.tests).toContain(spec('filter'))
      expect(plan.tests).toContain(
        PORTAL + 'src/e2e/pageNavigation.spec.ts'
      )
      expect(plan.tests).not.toContain(spec('slider'))
    }
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
