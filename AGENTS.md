# AI Coding Guidelines for Eufemia

## Accuracy and Documentation

- Do not hallucinate - Use the documentation exactly as provided.
- Write concise code and add comments only when they clarify intent.
- Gather all required information from the documentation before using it as a reference.
- Do not make assumptions or infer missing details unless explicitly instructed to do so.

## Code Style Rules

- Write code in logical blocks.
- Keep blank lines between logical blocks to ensure better readability.
- Follow existing Prettier and ESLint configurations.
- Use TypeScript for type safety.
- Use React Hooks over class components.
- Use camelCase for functions and variables.
- Use PascalCase for components and classes.
- Use kebab-case for CSS classes (prefixed with `dnb-`).
- Write CSS in SCSS, using the documented rational property order.
- Write CSS with recommended or correct units (e.g. `rem` as default).
- Use BEM for CSS class naming (block\_\_element--modifier) together with nested selectors in SCSS.
- Always use braces for `if`, `for`, `while`, `do-while`, and `switch` statements, even for single-line blocks.
- Early return statements that break control flow can use the comment `// stop here` when it makes sense to clarify intent.

### Test Requirements

- Tests should always be written for new functionality and bug fixes.
- Tests act as a contract to verify the intention of the functionality.
- Write tests before implementing a fix - this ensures the test captures the expected behavior and verifies the fix works correctly.
