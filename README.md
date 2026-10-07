# Wizard and Form.SubmitButton demo for the release PR #9538

Demos for https://github.com/dnbexperience/eufemia/pull/9538.

- `latest/` uses `@dnb/eufemia@11.15.1`, the latest version on npm before this release.
- `pr-9538/` uses the release PR build `https://pkg.pr.new/@dnb/eufemia@e223486`.

The app code is the same in both folders. Only the `@dnb/eufemia` version in `package.json` differs.

The demo covers:

1. Going back with an async `onStepChange` (#9640, #9668).
2. Going forward with an async `onStepChange` (#9681, #9683).
3. Several submit buttons and a submit from code (#9636, #9639).
4. A given `onClick` on the built-in buttons (#9569, #9620).
