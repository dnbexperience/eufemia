---
title: 'Make Changes'
draft: true
order: 1
---

# Making changes

## Get started on making new Components and Patterns

In the repo `dnb-ui-lib` you will find the directory `/src/components` or `/src/patterns`. There you can place a new directory with all the necessary sub folders. As a reference, take a look how the other _components_ and _patterns_ are set up.

Next, we need to **pre-publish** the library locally, so we can check the building process and test our changes locally by using `yarn build` again.

To use the local build, you can either run the portal, or use `yarn link` to link the package with a totally different project.

As well as that, you can also use Storybook. Inside `dnb-ui-lib`, run `yarn story` to start the server.

It is recommended that you make a new branch to isolate your work before it gets merged into the `origin/develop` branch.

```bash
# Make a Feature branch
$ git checkout -b ftr/my-feature

# - or a Work In Progress branch
$ git checkout -b wip/working-on-it
```

### Create a local build

In case You have to create a local build of the package (for various reasons) you can do so:

```bash
# In the `dnb-ui-lib` directory, run:
$ yarn build
```

#### What happens then

During the package build are a lot of different things going on, like:

- Assets are getting generated
- All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)
- UMD bundle gets created
- All SASS styles are validated and compiled (to support IE)
- All bundles gets minified
- Icons are getting converted

A couple of folders and files will be generated in the `dnb-ui-lib` directory. They are ignored in the `.gitignore` file, so they not get a part of the git repo.
