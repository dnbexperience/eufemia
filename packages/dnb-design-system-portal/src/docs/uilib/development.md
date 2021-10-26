---
title: 'Development'
icon: 'development'
order: 10
---

import GithubLogo from 'Pages/uilib/development/assets/github-logo.js'
import { Icon } from '@dnb/eufemia/src'

# Development

For more development details you may have a look at the confluence pages about [development details](https://confluence.tech.dnb.no/display/EDS/).

## Development principles

1. Avoid including runtime dependencies as much as possible.
1. Write integration tests with [these advices](/uilib/usage/best-practices/for-testing#integration-tests).
1. Re-use existing helper functions and helper classes to lower the build size.
1. Use existing linting and code styles, based on configuration.
1. Follow the existing structures for documentation, naming and structure.

## Development environment and defaults

Many defaults are given by the linting and prettier configurations. But to keep the code base consistent and clean, we have set a certain set of rules:

- Use [git message decoration](/uilib/development/commit) to ensure correct publish versioning.
- Use [naming conventions](/uilib/development/naming) when possible.
- Use best practices for [CSS style structures](/uilib/usage/best-practices/for-styling#structure).
- Use [nested CSS class selectors](https://medium.com/@andrew_barnes/bem-and-sass-a-perfect-match-5e48d9bc3894) with SASS (SCSS) and [BEM](http://getbem.com/naming/) (Block Element Modifier).
- Use [React Hooks](https://reactjs.org/docs/hooks-overview.html) over React class components when possible.

## Recommended Tools

- Use [React Testing Library](https://testing-library.com) when possible, even Enzyme is still used in existing components.
- Use [Volta](https://volta.sh/) for [Node.js](https://nodejs.org/) version handling.

## How to contribute?

If you don't have commit access;

- Create a Fork.
- Make your changes in your Fork and create a _Pull Request_ back to the Eufemia repo and `origin/main`.
- Watch the result of the tests.

If you have commit access;

- Make a new branch.
- Make your changes and commit it to the repo.
- Make a _Pull Request_ to `origin/main`.
- Watch the result of the tests.

## How to create a local package

Run `yarn build:pack` inside `/dnb-eufemia` and you get this file: `/build/dnb-eufemia-v0.0.0-development`.

## How to enable lint-staged?

Create a file called `.env.local` in the root of the repo (side-by-side to the .git folder), and put `LINT_STAGED=1` inside:

```bash
# File: .env.local
LINT_STAGED=1
```

## Other development topics

- [Changes](/uilib/development/changes)
- [Commit](/uilib/development/commit)
- [Deploy](/uilib/development/deploy)
- [Library](/uilib/development/ui-lib)
- [Portal](/uilib/development/portal)
- [Naming](/uilib/development/naming)
- [Icons](/uilib/development/icons)
- [Types](/uilib/development/types)
- [Issues](/uilib/development/issues)
