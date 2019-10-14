---
title: 'NPM Library'
draft: true
order: 4
---

# NPM Library

These folders/files will be a part of the npm [package](https://unpkg.com/dnb-ui-lib@latest/):

- /assets
- /components
- /elements
- /patterns
- /icons
- /style
- /es
- /umd
- /shared
- /web-components
- index.js
- package.json

## How to publish a new version to NPM?

Make sure You use a correct **[message decoration](/uilib/development/commit)** to insure correct versioning.

You have to commit (or Pull Request merge) your changes to the `origin/develop` branch. Once Your commits gets approved by the CI Server, You can make a _Pull Request_ to the `origin/release`.

As soon as the _Pull Request_ gets merged into `origin/release`, the CI Server will check all commits and figure out the new NPM **Version Number** and publish a new version based on the message decorations.
