---
title: 'Deploy'
status: 'imp'
draft: true
order: 3
---

# Deploy

Publishing new versions to the NPM Package (`@dnb/eufemia`) is handled by a Deploy Server.

## CI Structure

Actually, both the Portal (`dnb-design-system-portal`) and the NPM Package (`@dnb/eufemia`) are deployed and build by a Continuous Integration (CI) Server.

Once You push Your branch `feat/your-feature` (or what ever) to remote **origin**, all tests will be run against Your latest pushes.

Merges from a Pull Request and other pushes to the development branch `origin/main`, will trigger a **test build** of the Portal. This way me make sure that a new Portal version can be build, before we actually publish a new build.

### The Release Branch

Make sure You only make Pull Request from `origin/main` into `origin/release`.
The Release Branch is more kind of a **secondary branch**. It reflects the latest version, but is actually only used to publish new versions and to make builds for the Portal.

**TODO:** GitFlow and CI structure graphics

### Steps to follow

The steps, from code changes to production builds are:

1. Make Your changes and write tests and test the codebase
1. Update eventually snapshots (`yarn test:update`)
1. Commit Your changes with the correct **[message decoration](/uilib/development/commit)**
1. Push or make a Pull Request to the `origin/main` branch
1. Wait until the CI Server has validated the commits
1. Make a [Pull Request](https://github.com/dnbexperience/eufemia/compare/release...main?expand=1)
1. Once the Pull Request will be approved by one of the authored [repo contributors](https://github.com/dnbexperience/eufemia/graphs/contributors),
1. The CI Server will deploy the Portal and NPM builds
