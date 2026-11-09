import { execFileSync } from 'node:child_process'
import { mkdtempSync, writeFileSync, rmSync, renameSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { getChangedFiles } from '../runE2eConditionally/planner'

it('includes the whole branch, both sides of renames and uncommitted changes', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'e2e-selection-'))
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: root, stdio: 'pipe' })
  try {
    git('init', '-b', 'main')
    git('config', 'user.email', 'tests@example.com')
    git('config', 'user.name', 'Tests')
    for (const file of [
      'renamed.ts',
      'deleted.ts',
      'modified.ts',
      'staged.ts',
    ]) {
      writeFileSync(path.join(root, file), 'base')
    }
    git('add', '.')
    git('commit', '-m', 'Initial files')
    git('switch', '-c', 'fix/component')
    renameSync(
      path.join(root, 'renamed.ts'),
      path.join(root, 'destination.ts')
    )
    git('add', '.')
    git('commit', '-m', 'Rename source')
    rmSync(path.join(root, 'deleted.ts'))
    git('add', '.')
    git('commit', '-m', 'Remove source')
    writeFileSync(path.join(root, 'modified.ts'), 'changed')
    writeFileSync(path.join(root, 'staged.ts'), 'changed')
    git('add', 'staged.ts')
    writeFileSync(path.join(root, 'new.ts'), 'new')

    expect(getChangedFiles(root, 'main')).toEqual([
      'deleted.ts',
      'destination.ts',
      'modified.ts',
      'new.ts',
      'renamed.ts',
      'staged.ts',
    ])
    expect(() => getChangedFiles(root, 'missing-base')).toThrow()
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
