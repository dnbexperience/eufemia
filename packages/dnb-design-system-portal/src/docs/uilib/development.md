---
title: 'Development'
icon: 'development'
order: 10
---

import GithubLogo from 'Pages/uilib/development/assets/github-logo.js'
import { Icon } from 'dnb-ui-lib/src'

# Development

For more development details you may have a look at the confluence pages about [development details](https://confluence.tech.dnb.no/display/EDS/).

## Development principles

1. Avoid including runtime dependencies as much as possible.
1. Write integration tests with [these advices](/uilib/usage/best-practices/for-testing#integration-tests).
1. Re-use existing helper functions and classes.
1. Use existing linting and code styles, based on configuration.
1. Follow the existing structures for documentation, naming and setup.

## Development environment and defaults

Many defaults are given by the linting and prettier configurations. But to keep the code base consistent and clean, we have set a certain set of rules:

- Use [Volta](https://volta.sh/) for [Node.js](https://nodejs.org/) and [yarn](https://yarnpkg.com/) version handling.
- Use only [Function and Class Components](https://reactjs.org/docs/components-and-props.html#function-and-class-components) for components, elements, fragments and patterns - no [Hooks](https://reactjs.org/docs/hooks-overview.html).
- Use strictly the [naming conventions](/uilib/development/naming).
- Use correct [message decoration](/uilib/development/commit) to insure correct versioning.
- Use best practices for [CSS style structures](/uilib/usage/best-practices/for-styling#structure).
- Use [nested CSS class selectors](https://medium.com/@andrew_barnes/bem-and-sass-a-perfect-match-5e48d9bc3894) with SASS (SCSS) and BEM (Block Element Modifier).

## How to publish a new version to NPM?

Create a Fork, make your changes and create a _Pull Request_) - or commit your changes to a new branch. From there an admin will create a _Pull Request_ into the `origin/develop` branch. Once Your commits got approved on CI, we will create a _Pull Request_ to merge the changes in to the `origin/release` branch.

As soon as the _Pull Request_ gets merged into `origin/release`, a CI/CD server will check all commits and figure out the new NPM **Version Number** and publish a new version based on the message decorations.
