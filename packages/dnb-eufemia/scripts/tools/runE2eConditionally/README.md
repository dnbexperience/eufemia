# E2E selection preview

CI reports which browser test files a feature-branch change would select. Both full Playwright suites still run. The job summary lists each selected file and its reason, and the e2e-timings artifact contains the full runs' JSON reports, including successful test durations.

Run from the repository root:

    yarn workspace @dnb/eufemia test:e2e:explain

The preview compares the whole branch with the merge base of origin/main and includes staged, unstaged, and untracked files. E2E_TEST_BASE_REF changes the comparison target. Both sides of a rename and deleted paths are included. For inspecting a specific scenario, repeat --changed=<repository-relative-file> and optionally use --output=<json-path>.

Selection reuses the screenshot suite's TypeScript and SCSS dependency helpers. It includes component owners, components composed in Portal fixtures, and shared browser checks. Forms and AI stay grouped by extension. Portal route literals provide fixture ownership for tests housed outside the component source directory.

Protected branches and release PRs keep full coverage. Portal content and shared source, assets, configuration, build, and dependency changes also receive full coverage. Static unit expectations and agent guidance alone do not add browser coverage. Source-driven style matrices and tests without a resolved owner remain included for product changes.

Use a component-only branch to verify that CI proposes a partial selection and measure the preview step's duration, including TypeScript dependency analysis. Workflow changes select all tests before building dependency graphs, so those runs do not measure partial selection.

Before enabling selective execution, compare the proposed selection with full CI results across component, composed-fixture, Portal, shared-style, asset and configuration changes. In particular, dynamic route construction, imports under aliases, redirects, file reads, and dependency changes need review. The preview does not authorize reducing coverage simply because a component name was absent from a route.
