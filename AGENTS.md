# AI Coding Guidelines for Eufemia

## Accuracy and Documentation

- Do not hallucinate - Use the documentation exactly as provided.
- Write concise code and add comments only when they clarify intent.
- Gather all required information from the documentation before using it as a reference.
- Do not make assumptions or infer missing details unless explicitly instructed to do so.
- Do NOT update changelog files (such as `EUFEMIA_CHANGELOG.mdx` or `changelog.mdx`) unless the user explicitly asks you to. Changelog entries should be written by humans.

## Code Style Rules

- Write code in logical blocks.
- Keep blank lines between logical blocks to ensure better readability.
- Follow existing Prettier and ESLint configurations, and run them on files after making changes.
- Run Prettier using the workspace version: `yarn exec prettier --write <file>`. Do NOT use `npx prettier`, as it bypasses Yarn PnP resolution and may use a wrong version.
- Use TypeScript for type safety.
- Use React Hooks over class components.
- Use camelCase for functions and variables.
- Use PascalCase for components and classes.
- Use kebab-case for component directory names (e.g. `components/date-picker/`). The `extensions/forms/` directory is an exception — it uses PascalCase directories (e.g. `Field/Address/`, `Form/Section/`) because they map directly to compound component names (`Field.Address`, `Form.Section`).
- Use kebab-case for CSS classes (prefixed with `dnb-`).
- Write CSS in SCSS, using the documented rational property order.
- Write CSS with recommended or correct units (e.g. `rem` as default).
- Use `rem` values directly in component SCSS instead of `var(--spacing-*)` custom properties. The spacing custom properties (`--spacing-small`, `--spacing-medium`, etc.) are only for the spacing infrastructure (`space/`, `flex/`, `grid/`). Reference: `--spacing-xx-small` = `0.25rem`, `--spacing-x-small` = `0.5rem`, `--spacing-small` = `1rem`, `--spacing-medium` = `1.5rem`, `--spacing-large` = `2rem`, `--spacing-x-large` = `3rem`, `--spacing-xx-large` = `3.5rem`.
- Use BEM for CSS class naming (block\_\_element--modifier) together with nested selectors in SCSS.
- Always use braces for `if`, `for`, `while`, `do-while`, and `switch` statements, even for single-line blocks.
- Early return statements that break control flow can use the comment `// stop here` when it makes sense to clarify intent.

### Test Requirements

- Tests should always be written for new functionality and bug fixes.
- Tests act as a contract to verify the intention of the functionality.
- Write tests before implementing a fix - this ensures the test captures the expected behavior and verifies the fix works correctly.
- Prefer document.querySelector over screen from @testing-library/react.

## Commit Messages

Follow the [Git convention style guide](packages/dnb-design-system-portal/src/docs/contribute/style-guides/git.mdx). Use Conventional Commits with imperative mood and a PascalCase scope when targeting a specific component:

- `fix(Button): prevent double click submission`
- `feat(DatePicker): add month-only mode`

For extensions/forms, use the compound name: `feat(Field.Date): ...`, `fix(Form.Section): ...`.
