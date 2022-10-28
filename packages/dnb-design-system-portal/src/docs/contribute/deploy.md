---
title: 'Deployment'
order: 4
icon: 'getting_started'
---

# Deployment

Publishing new versions to the NPM Package (`@dnb/eufemia`) is handled by a Deploy Server.

## Continuous Integration (CI)

The Portal (`dnb-design-system-portal`), all the [icons](https://eufemia.dnb.no/icons/) and the NPM Package (`@dnb/eufemia`) are build, deployed and released by a Continuous Integration (CI) server.

### Release GitFlow

The steps, from code changes to production builds, are:

1. Make a _Pull Request_ to the `origin/main` branch.
1. Check the results of the CI tests and builds.
1. After the _Pull Request_ got approved by one of the authored [maintainers](https://github.com/dnbexperience/eufemia/graphs/contributors),
1. You can merge your _Pull Request_.
1. A maintainer will create a _Pull Request_ into one of the release branches (`next`, `alpha`, `beta` or `release`).
1. After a release _Pull Request_ got merged, the CI Server will deploy the Portal and release a new version to NPM.

### How to make releases

Make sure you only make _Pull Request_ from `origin/main` into `origin/release`.
The release branch (`origin/release`) is more like a _secondary branch_. It contains the state of the latest version as well as all the git tags – each containing a new version number.

_NB:_ All example steps are for `beta` versions, but will apply for `next` or `alpha` versions as well.

#### How to release the first `next`, `alpha` or `beta`?

First, we need to ensure our beta branch contains the latest git tags:

1. `git fetch`
2. `git switch origin/beta`
3. `git reset --hard origin/release`

Now, you may either merge/cherry-pick locally or via a _Pull Request_:

In order to deal with rebasing and merging of several branches, it may be preferable to do it locally. You need git _push to remote_ access (GitHub).

We continue locally:

1. `git merge {your-feature-branch}`
2. `git push --force-with-lease`

Our beta version will now get released.

#### How to release another `next`, `alpha` or `beta` version?

1. `git switch {your-feature-branch}`
2. `git checkout -b {your-feature-branch}-beta`
3. `git rebase origin/beta`
4. `git switch beta`
5. `git merge {your-feature-branch}-beta`
6. `git push --force-with-lease`

Our beta version will now get released.

### How run a dry release locally

If you are unsure about what version will be released, you can run a so called dry-run locally.

Run the steps and prepare the git branches as above, but before you push to origin, you can run:

1. `yarn publish:dry`

## How to create a local package

Run `yarn workspace @dnb/eufemia build:pack` and you should get this file: `/build/dnb-eufemia-v0.0.0-development`.
