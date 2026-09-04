# AI Coding Guidelines for Eufemia

## Accuracy and Documentation

- Base decisions on the repository source and its documentation. Do not invent APIs, behavior, or requirements.
- Gather the necessary context before making changes. Ask for clarification when required information is missing.
- Add comments only when they clarify intent that the code cannot express on its own.
- Do not update changelog files, such as `EUFEMIA_CHANGELOG.mdx` or `changelog.mdx`, unless the user explicitly asks, and preserve changelog changes already made by the user.
- When deprecating or removing a public API, or introducing a breaking change, add migration guidance to the next major-version info file in `packages/dnb-design-system-portal/src/docs/uilib/about-the-lib/releases/eufemia/`.

## Working on Code

- Write as little code as possible to achieve the best result. Prefer simple solutions and remove unnecessary complexity.
- Keep changes focused on the requested outcome. Preserve existing behavior and avoid unrelated refactors or scope creep.
- Find and understand the relevant existing code before implementing a solution. Extend or improve it when possible; otherwise replace it rather than creating a duplicate or parallel implementation.
- Follow established patterns in the surrounding code unless the task requires changing them.
- Consider correctness, security, performance, and accessibility for every change. Do not expose sensitive data, weaken safeguards, or add avoidable work to frequently used code paths.
- This repository is public. Do not document security fail-open or bypass paths in comments, docs, or error messages. Describe what a safeguard does, not how to defeat it, and keep internal identifiers and secrets out of committed files.
- Review the complete diff before handing off work or creating a pull request. Check for unintended changes and reassess correctness, readability, security, performance, accessibility, and test coverage.

## Code Style

- Write code in logical blocks and separate them with blank lines.
- Use TypeScript for type safety.
- Use React Hooks instead of class components.
- Use camelCase for functions and variables.
- Use PascalCase for components and classes.
- Use kebab-case for component directory names, such as `components/date-picker/`.
- The `extensions/forms/` directory is an exception: use PascalCase directories, such as `Field/Address/` and `Form/Section/`, because they map directly to compound component names (`Field.Address` and `Form.Section`).
- Use kebab-case CSS classes prefixed with `dnb-`.
- Write CSS in SCSS, use BEM (`block__element--modifier`) with nested selectors, and follow the documented rational property order.
- Follow the documented unit guidance and use `rem` by default.
- In component SCSS, use `rem` values directly instead of `var(--spacing-*)`. Spacing custom properties are reserved for the spacing infrastructure in `space/`, `flex/`, and `grid/`.
- Spacing reference: `xx-small` = `0.25rem`, `x-small` = `0.5rem`, `small` = `1rem`, `medium` = `1.5rem`, `large` = `2rem`, `x-large` = `3rem`, and `xx-large` = `3.5rem`.
- Always use braces for control-flow statements, including single-line bodies.
- An early return that breaks control flow may use `// stop here` when the comment clarifies intent.

## Tests and Validation

- Write tests for new functionality and bug fixes. Tests are a contract for the intended behavior.
- For a bug fix, write and run a regression test before implementing the fix, and verify that it fails for the expected reason.
- Prefer `document.querySelector` over `screen` from `@testing-library/react`.
- Follow the existing Prettier and ESLint configurations and run the relevant checks on changed files.
- Format files with the workspace version: `yarn exec prettier --write <file>`. Do not use `npx prettier`, because it bypasses Yarn PnP resolution and may select the wrong version.

## Git and Pull Requests

- Never commit directly to `main` or release branches such as `release`. Create a branch and open a pull request.
- Name branches according to the change type, such as `fix/...`, `feat/...`, `chore/...`, or `refactor/...`. Never use an `agents/` prefix.

### Commits

- Write concise commit messages in the imperative mood.
- Do not add decorators such as `fix:`, `feat:`, or `chore:` to individual commits. Use a Conventional Commit decorator only in the pull request title.

### Creating Pull Requests

- Before creating a pull request, check whether one already exists for the branch and review the complete diff against `main`.
- Pull request titles are used in release logs. Make each title easy for developers to understand without issue, task, or repository context. Format it according to the [Git convention style guide](packages/dnb-design-system-portal/src/docs/contribute/style-guides/git.mdx), using a Conventional Commit decorator and, when targeting a component, a PascalCase scope.
- Examples: `fix(Button): prevent double click submission` and `feat(DatePicker): add month-only mode`.
- For extensions/forms, use the compound name, such as feat(Field.Date): ... or fix(Form.Section): .... Use Forms as the scope for changes that span the whole forms extension.
- Keep the description short and focused on motivation: explain the problem and why the change matters. Link the relevant Slack discussion when available.
- Do not list validation steps, tests run, changed files, or other information already visible elsewhere in the pull request.
- Never merge unless the user explicitly asks, the current pull request revision is approved, and all required checks pass.
- Use squash merge unless the user explicitly requests another merge method.

### Reviewing Pull Requests

- Understand the motivation, intended behavior, and scope before reviewing the implementation.
- Review the diff and relevant surrounding code. Verify findings against the source rather than relying on assumptions or automated review output.
- Prioritize correctness, regressions, security, performance, accessibility, API compatibility, and missing tests. Distinguish actionable defects from preferences.
- Keep feedback within the pull request's goal. Mention unrelated concerns separately instead of expanding the scope.
- Review the latest revision and avoid repeating resolved or obsolete feedback.

### Commenting on Pull Requests

- Make comments concise, specific, respectful, and actionable. Explain why an issue matters and suggest a direction when useful.
- Ask a question when intent is unclear; do not present assumptions as facts.
- Clearly distinguish blocking issues from non-blocking suggestions and minor preferences.
- Avoid filler, duplicate comments, and comments that only repeat automated checks.
- When dismissing or resolving plausible automated feedback, leave a brief reason.
