---
header: 'UI Library'
title: 'Development'
draft: false
---

# Development

The `dnb-ui-lib` uses a [Node](https://nodejs.org) based setup with a lot of auto generated code to make the [React](https://reactjs.org) based components and patterns.

## Why Yarn and not Lerna?

The mono repo `dnb-design-system` uses [Yarn](https://yarnpkg.com/) (>= v1.10.1) to maintain the [workspace functionality](https://yarnpkg.com/en/docs/workspaces). Instead of using `npm link` or `yarn link`, we use packages. This simplifies the linking and shared modules between [packages](https://docs.npmjs.com/getting-started/packages).
Yarn offers a simpler approach to workspaces, but is way more powerful in managing dependencies.

## Install the repo locally on Your machine

```bash
# Clone the repo into your project working directory
$ git clone https://github.com/dnbexperience/eufemia.git

# Change to the directory
$ cd eufemia

# Change to the latest and most up to date Branch
$ git checkout develop

# And install the dependencies
$ yarn install

# Once the installation is done, create a local build
$ yarn build

# Optionally, run the portal locally in watch mode (http://localhost:8000)
$ yarn start
```
