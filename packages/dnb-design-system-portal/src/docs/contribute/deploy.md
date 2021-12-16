---
title: 'Deployment'
order: 4
icon: 'getting_started'
---

# Deployment

Publishing new versions to the NPM Package (`@dnb/eufemia`) is handled by a Deploy Server.

## How to create a local package

Run `yarn build:pack` inside `/dnb-eufemia` and you get this file: `/build/dnb-eufemia-v0.0.0-development`.

## CI Structure

Both the Portal (`dnb-design-system-portal`) and the NPM Package (`@dnb/eufemia`) are deployed and build by a Continuous Integration (CI) Server.

Once you push your branch `feat/your-feature` (or what ever) to remote **origin**, all tests will be run against your latest pushes.

Merges from a Pull Request and other pushes to the development branch `origin/main`, will trigger a **test build** of the Portal. In this way, we make sure that a new Portal version can be built, before we actually publish a new build.

### The Release Branch

Make sure you only make Pull Request from `origin/main` into `origin/release`.
The Release Branch is more kind of a **secondary branch**. It reflects the latest version, but is actually only used to publish new versions and to make builds for the Portal.

<!--**TODO:** GitFlow and CI structure graphics-->

### Steps to follow

The steps, from code changes to production builds, are:

1. Push or make a Pull Request to the `origin/main` branch
1. Wait until the CI Server has validated the commits
1. Make a [Pull Request](https://github.com/dnbexperience/eufemia/compare/release...main?expand=1)
1. Once the Pull Request will be approved by one of the authored [repo contributors](https://github.com/dnbexperience/eufemia/graphs/contributors),
1. The CI Server will deploy the Portal and NPM builds

### NPM Library

These folders/files will be a part of the NPM [package](https://unpkg.com/@dnb/eufemia@latest/):

- /assets
- /components
- /elements
- /extensions
- /fragments
- /icons
- /style
- /cjs
- /es
- /esm
- /umd
- /shared
- web-components.js
- lib.js
- index.js
- package.json

#### Important aspects

- PropTypes are getting wrapped with [this babel plugin](babel-plugin-transform-react-remove-prop-types)) `process.env.NODE_ENV !== "production"`. This way applications in production, will not include `propTypes`. If a component depends to check `propTypes` during runtime, consider to export them, so they not getting removed – or simply use `defaultProps` for the operation.
- As for now, we use React Class Components, because there may happen a case, where two React instances are used, and that does not work with Hooks. Also, performance is a key factor. But we may consider a rewrite at some point.