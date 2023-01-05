---
title: 'Code guide'
order: 1
---

# Code guide

To assure that the source code remains consistent regardless of the amount of contributors, a set of code principles has been established.

The current set of main code principles within JS, CSS, Typography and testing are located in the [UI Library - Best practices](/uilib/usage/best-practices). Below is more related to further developing the Eufemia repository.

## Recommended Tools

- Use [React Testing Library](https://testing-library.com) when possible, even Enzyme is still used in existing components.
- Use [Volta](https://volta.sh/) for [Node.js](https://nodejs.org/) version handling.
- Use plugins in your favorite code editor for [ESLint](https://eslint.org/docs/user-guide/integrations) and [Prettier](https://prettier.io/docs/en/editors.html), which formats the code for you.

Other helpful tools:

- [Axe Devtools extension](https://www.deque.com/axe/devtools/)
- [Lighthouse extension](https://developers.google.com/web/tools/lighthouse#devtools)

## Linting

JavaScript and Style linting is mandatory for merging commits in Eufemia. During a commit (locally), your commit content (code) should be tested with both static and integration tests. You may run `yarn test` or `yarn test:update` before you try to commit. You may also write new tests for your code before committing.

The Code Base is based on several Static Tests to help the code to be uniform:

- Prettier
- ESLint
- StyleLint

You may consider to install plugins for your editor of choice - to visualize and run the code formatters and linters based on the given config files. This way you can immediately see how the code will and have to consist.

Either include the plugins in your code editor, or run the following command after you made changes:

```bash
yarn workspace dnb-design-system-portal lint:js && yarn workspace @dnb/eufemia lint:styles
```

Fix the resulted warnings and error before you commit and merge.

## TypeScript and type checking

TypeScript types are mandatory for merging commits in Eufemia. During a commit (locally), your commit content (code) should be tested. You may run:

```bash
yarn workspace @dnb/eufemia test:types
```

Fix the resulted warnings and errors before you commit and merge.
