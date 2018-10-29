---
header: 'UI Library'
title: 'Development'
---

# Development

The `dnb-ui-lib` uses a [Node](https://nodejs.org) based setup with a lot of auto generated code to make the [React](https://reactjs.org) based components and patterns.

#### Why Yarn and not Lerna?

The mono repo `dnb-design-system` uses [Yarn](https://yarnpkg.com/) to maintain the [workspace functionality](https://yarnpkg.com/en/docs/workspaces). Instead of using `npm link` or `yarn link`, we use packages. This simplifies the linking and shared modules between [packages](https://docs.npmjs.com/getting-started/packages).

#### Install the repo locally on Your machine

```bash
# Somewhere, call:
git clone https://github.com/eggsdesign/dnb-design-system.git

# change to the directory:
cd dnb-design-system

# and install the node modules by simply calling:
yarn
```

Once the installation is done, `yarn startup` will be called to make all ready for a local server start.

---

## Portal

#### Start the Portal locally

```bash
# In the `dnb-design-system-portal` directory, call:
yarn start
```

#### Make a production build of the Portal, ready for deploy

```bash
# In the `dnb-design-system-portal` directory, call:
yarn build
```

---

## UI Library

#### Make a npm package build of the `dnb-ui-lib` ready to publish

```bash
# In the `dnb-ui-lib` directory, call:
yarn build
```

#### Get started on making new Components and Patterns

In the repo `dnb-ui-lib` find the directory `/src/components` or `/src/patterns`. There we can place a new directory with all the sub needed folders. To get a reference, take a look how the other _components_ and _patterns_ are set up.

Next, we have to pre-build the library so it gets ready for a publish.
To do so and to integrate the new parts into the lib, simply do one of these steps:

```bash
# Method 1: in the `dnb-ui-lib` directory, call:
yarn startup

# Method 2: in the `dnb-design-system-portal` directory, call:
yarn startup
```

_Method 2_ will also create the needed pages in the `dnb-design-system-portal` at the same time.

**How to move or rename a Component or a Pattern?**

Simply run `yarn startup` for every build you have to generate.

**What happens on calling `yarn startup`?**

There are a lot of different things going on, like:

- Assets are getting generated
- All the lib code gets compiled down to ECMAScript 5.1
- UMD bundle gets created
- All SASS styles are validated and compiled
- Code gets minified

A couple of folders and files are generated in the `dnb-ui-lib` root. They are ignored in the .gitignore file, so they not get a part of the git repo.
But these folders/files like:

- /assets
- /components
- /patterns
- /styles
- /web-components
- /umd
- /shared
- index.js

Will be a part of the npm [package](https://www.npmjs.com/package/dnb-ui-lib).

---

# NPM

#### How to publish a new version of the [package](https://www.npmjs.com/package/dnb-ui-lib)?

Make sure You are logged in to _npm_ locally. You also have to make sure the terminal is directed to `dnb-ui-lib`.

**Make sure You follow [Semantic Versioning](https://semver.org)**

For a patch version e.g., run `npm version patch`
Once the new version is set, go ahead:

```bash
# To pack and publish the new version, run:
npm publish ./

# If you don't want something to be installed by default
npm publish ./ --tag beta
```
