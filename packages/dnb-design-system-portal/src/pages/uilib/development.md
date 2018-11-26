---
header: 'UI Library'
title: 'Development'
draft: false
---

# Development

The `dnb-ui-lib` uses a [Node](https://nodejs.org) based setup with a lot of auto generated code to make the [React](https://reactjs.org) based components and patterns.

#### Why Yarn and not Lerna?

The mono repo `dnb-design-system` uses [Yarn](https://yarnpkg.com/) (>= v1.10.1) to maintain the [workspace functionality](https://yarnpkg.com/en/docs/workspaces). Instead of using `npm link` or `yarn link`, we use packages. This simplifies the linking and shared modules between [packages](https://docs.npmjs.com/getting-started/packages).
Yarn offers a simpler approach to workspaces, but is way more powerful in managing dependencies.

#### Install the repo locally on Your machine

```bash
# Clone the repo into your project working directory
git clone https://github.com/dnbexperience/eufemia.git

# Change to the directory
cd eufemia

# And install the dependencies
yarn install

# Once the installation is done, create a local build
yarn build

# Optionally, run the portal locally in watch mode (http://localhost:8000)
yarn start
```

---

## Deploy

The steps, from code changes to production builds are:

1. Make Your changes
1. Write tests and test the codebase
1. Update eventually snapshots
1. Commit Your changes with the correct **message decoration**
1. Push or make a Pull Request to the [`develop`](https://github.com/dnbexperience/eufemia/commits/develop) branch
1. Wait until the CI Server has validated the commits
1. Make a [Pull Request](https://github.com/dnbexperience/eufemia/compare/master...develop?expand=1)
1. Once the Pull Request will be approved by one of the authored [repo contributors](https://github.com/dnbexperience/eufemia/graphs/contributors),
1. the CI Server will deploy the Portal and NPM builds

#### CI Deploy Structure

Both the Portal (`dnb-design-system-portal`) and the NPM Package (`dnb-ui-lib`) gets build by the Deploy Server.
The development branch is called `origin/develop`. All commits will be automatically tested before You can create a new pull request to the `origin/master` branch.

## UI Library

#### How to make changes

To make changes to the code base, You can either do it directly on GitHub with a fork of the Repository, or You can clone the Repository locally on Your computer.

To test and build Your changes locally, run

```bash
# In the `dnb-ui-lib` directory, call:
yarn build

# To check if You have to update some test snappshots
# or to simply validate your changes, run:
yarn test
```

##### Committing changes

Before You commit and push changes, Your code will be tested with both Static and Integration tests. You may make sure to run `yarn test` before You try to commit. You may also write new tests for Your code before committing.

The Code Base is based on several Static Tests to help the code to be uniform:

- Prettier
- ESLint
- StyleLint

You may consider to install Plugins for You Editor of choice to visualize and run the code formatters and linters based on the defined config files. This way to immediately see how the code have to consist.

##### Get started on making new Components and Patterns

In the repo `dnb-ui-lib` find the directory `/src/components` or `/src/patterns`. There You can place a new directory with all the needed sub folders. To get a reference, take a look how the other _components_ and _patterns_ are set up.

Next, we have to **pre-publish** the library locally, so we can check the building process and testing our changes by using again `yarn build`.

To use the local build, You can either run the Portal, or use `yarn link` to link the package with a totally different project.

##### What happens on calling `yarn build`?

There are a lot of different things going on, like:

- Assets are getting generated
- All the lib code gets compiled down to ECMAScript 5.1
- UMD bundle gets created
- All SASS styles are validated and compiled
- Code gets minified
- Icons are getting converted

A couple of folders and files are generated in the `dnb-ui-lib` root. They are ignored in the .gitignore file, so they not get a part of the git repo.

### NPM Package

These folders/files will be a part of the npm [package](https://unpkg.com/dnb-ui-lib@latest/):

- /assets
- /components
- /patterns
- /icons
- /style
- /es
- /umd
- /shared
- /web-components
- index.js

#### How to publish a new version to NPM?

You have to commit you changes to the `origin/develop` branch. Once the build gets approved by the CI Server, You can make a pull request to the the `origin/master` branch. All commits (_pull requests_) to master, will be deployed to both the Portal and the NPM Package.

**Make sure You follow [Semantic Versioning](https://semver.org)**

Version numbers are handled automatically by using [semantic-release](https://github.com/semantic-release/semantic-release#readme).
Make sure to decorate Your **commit messages** with either [commit message format](https://github.com/semantic-release/semantic-release#commit-message-format) or simply use the following three methods:

- `major: breaking change in API`
- `minor: this is a new feature`
- `fix: an example fix message`

## Portal

##### UI-LIB Changes

The integration of the `dnb-ui-lib` into the `dnb-design-system-portal` will happen on the Deploy Server automatically.
But You can easily run the build process for that, locally as well. Run `yarn build` in `dnb-design-system-portal` directory. This will update/create all the needed [pages](/uilib).

##### Update Content only

In case You make changes to **not** `ui-lib` related pages, You don't have to run the build process for sure. Simply commit Your changes. But make sure the Markdown is formatted correctly by using Prettier.
