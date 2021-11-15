---
title: 'Git convention'
---

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

## Committing changes

During a commit (locally), your commit content (code) will be tested with both Static and Integration tests. you may run `yarn test` or `yarn test:update` before you try to commit. you may also write new tests for your code before committing.

The Code Base is based on several Static Tests to help the code to be uniform:

- Prettier
- ESLint
- StyleLint

You may consider to install plugins for your editor of choice - to visualize and run the code formatters and linters based on the given config files. This way you can immediately see how the code will and have to consist.

## Ignore CI run

You can either include `[skip ci]` in your [commit message](https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/) or let your branch name end with `--skip-ci`.
