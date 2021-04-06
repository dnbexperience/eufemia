---
title: 'Make Changes'
draft: true
order: 1
---

# Making changes

1. Create a Fork of the repo: [Eufemia on GitHub](https://github.com/dnbexperience/eufemia)
1. Check out your fork.
1. Install the dependencies.
1. Make your changes.
1. Run the integration tests: `cd @dnb/eufemia && yarn test`
1. Start the portal: `cd dnb-design-system-portal && yarn start`
1. Runt the visual test against it: `cd @dnb/eufemia && yarn test`
1. And check the result / reports, located in: `cd @dnb/eufemia/jest-screenshot-report/`
1. [Commit your change](/uilib/development/commit) and create a Pull Request to the `main` branch.

## Get started on making new Components, Elements and Extensions

In the repo `@dnb/eufemia` you will find the directory `/src/components`, `/src/elements` or `/src/extensions`. There you can place a new directory with all the necessary sub folders. As a reference, take a look how the other _components_, _elements_ and _extensions_ are set up.

Next, we need to **pre-publish** the library locally, so we can check the building process and test our changes locally by using `yarn build` again.

To use the local build, you can either run the portal, or use `yarn link` to link the package with a totally different project.

As well as that, you can also use Storybook. Inside `@dnb/eufemia`, run `yarn story` to start the server.

It is recommended that you make a new branch to isolate your work before it gets merged into the `origin/main` branch.

```bash
# Make a Feature branch
$ git checkout -b feat/my-feature

# - or a Work In Progress branch
$ git checkout -b wip/working-on-it
```

### Create a local build

In case You have to create a local build of the package (for various reasons) you can do so:

```bash
# In the `@dnb/eufemia` directory, run:
$ yarn build
```

You find the output in the `/build` folder.

#### What happens then

During the package build, a lot of various things will happen, like:

- Assets are getting generated
- All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)
- UMD/ESM/ES bundle gets created
- All SASS styles are validated and compiled (to support IE)
- All bundles gets minified
- Icons are getting converted
