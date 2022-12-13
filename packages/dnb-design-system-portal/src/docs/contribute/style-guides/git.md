---
title: 'Git convention'
order: 5
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'

# Git convention

**Make sure you follow [Semantic Versioning](https://semver.org)**

Version numbers are handled automatically by using [semantic-release](https://github.com/semantic-release/semantic-release#readme).

## Commit Messages

Make sure to decorate your **commit messages** with either [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) or [simple-commit-message](https://github.com/bahmutov/simple-commit-message):

- `fix: an example fix message` as the subject
- `feat: this is a new feature` as the subject
- `BREAKING CHANGE:` in the footer of the commit, the subject does not really matter. See example below.

If you are working on a single component update, you can use a decoration and a scope in parenthesis:

- `fix(ExampleComponent): an example fix message`
- `feat(ExampleComponent): this is a new feature`

You can also use the following decorators – but keep in mind, they won't be included in the [releases change log](https://github.com/dnbexperience/eufemia/releases):

- `chore:`
- `docs:`
- `style:`
- `build:`
- `ci:`
- `refactor:`
- `perf:`
- `test:`

Example of a breaking change commit message:

```text
commit subject with optional decorator

Body with text
Several lines

BREAKING CHANGE:

Subject (will be a list item):

Markdown text over several lines.

Additional text such as:

1. List item
2. List item
```

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
