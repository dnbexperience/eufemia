---
header: 'UI Library'
title: 'Make Changes'
draft: false
order: 1
---

# Make changes

## Get started on making new Components and Patterns

In the repo `dnb-ui-lib` You find the directory `/src/components` or `/src/patterns`. There You can place a new directory with all the needed sub folders. To get a reference, take a look how the other _components_ and _patterns_ are set up.

Next, we have to **pre-publish** the library locally, so we can check the building process and testing our changes locally by using again `yarn build`.

To use the local build, You can either run the Portal, or use `yarn link` to link the package with a totally different project.

Beside that, You can also use Storybook. Inside `dnb-ui-lib`, run `yarn story` to start the server.

It is recommended that You make a new branch to isolate Your work before it gets merged into the `origin/develop` branch.

```bash
# Make a Feature branch
$ git checkout -b ftr/my-feature

# - or a Working In Progress branch
$ git checkout -b wip/working-on-it
```

### What happens on calling `yarn build`?

There are a lot of different things going on, like:

- Assets are getting generated
- All the lib code gets compiled down to ECMAScript 5.1
- UMD bundle gets created
- All SASS styles are validated and compiled
- Code gets minified
- Icons are getting converted

A couple of folders and files are generated in the `dnb-ui-lib` root. They are ignored in the .gitignore file, so they not get a part of the git repo.
