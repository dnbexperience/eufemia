// Install local git hooks (via simple-git-hooks) after `yarn install`.
// Skipped in CI: git hooks must not run there — e.g. @semantic-release/git
// creates the release commit, which must not trigger lint-staged.
import { execSync } from 'node:child_process'

if (process.env.CI) {
  process.exit(0)
}

try {
  execSync('yarn simple-git-hooks', { stdio: 'inherit' })
} catch {
  // Never fail `yarn install` if hook setup can't complete (e.g. no .git dir).
}
