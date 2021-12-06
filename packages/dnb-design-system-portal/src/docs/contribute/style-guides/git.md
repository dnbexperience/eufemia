---
title: 'Git convention'
order: 5
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'

# Git convention

**Make sure you follow [Semantic Versioning](https://semver.org)**

Version numbers are handled automatically by using [semantic-release](https://github.com/semantic-release/semantic-release#readme).

## Commit Messages

Make sure to decorate your **commit messages** with either [commit message format](https://github.com/semantic-release/semantic-release#commit-message-format) or simply use the following three methods:

- `fix: an example fix message`
- `feat: this is a new feature`
- `break: breaking change in API`

You can use these synonyms as well:

- `patch: an example fix message`
- `minor: this is a new feature`
- `major: breaking change in API`

Read more about [simple-commit-message](https://github.com/bahmutov/simple-commit-message).

If you are working on a single component update, you can use

- `fix(ExampleComponent): an example fix message` or
- `feat(ExampleComponent): this is a new feature`.

### Ignore CI run

You can either include `[skip ci]` in your [commit message](https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/) or let your branch name end with `--skip-ci`.

### Rebasing

#### Squash commits

If you have to make a small fix after you committed:

- Make and commit the new change
- Squash and rebase with the previous commit
- Force push to your branch

#### Rebase onto main

If you are working on a branch for a long period, it might be necessary to do a rebase on main once in a while:

```bash
git fetch origin && git rebase origin/main
```

## Pull Requests

When you have committed changes to your branch, go to [Github Pull Requests](https://github.com/dnbexperience/eufemia/pulls) and open a `New pull request`.

<InlineImg src="/images/pull-request.png" width="900" alt="Screenshot of the location of new pull request button on Github" top bottom/>

You will most likely get the yellow notification bar mentioning that a branch had a recent push. Click on the `Compare and pull request` button. This will take you to the page for opening a pull request. Fill out the template under the `Write tab`.

<InlineImg src="/images/pull-request-part-2.png" width="900" alt="Screenshot of opening a new pull request on Github" top bottom/>

Request a reviewer, create the pull request and watch the results of the pipeline checks.
