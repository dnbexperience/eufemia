---
title: 'Icons Library'
---

# Icons Library

Icons are getting added (more or less) automatically by extracting them from [Figma Icons Library](https://www.figma.com/file/2aNwT4Lbyt9hFmDv8k34yN/Eufemia---Icons?node-id=1%3A9).

## How to sync new icons?

To fetch new icons from the [Figma Icons Library](https://www.figma.com/file/2aNwT4Lbyt9hFmDv8k34yN/Eufemia---Icons?node-id=1%3A9) file, you have to:

1. Re-branch `main`, and name it `icons/{your-branch-name}` (it needs to include icons in the name):

   ```bash
   git checkout main && git pull origin main
   ```

   ```bash
   git checkout -b icons/{your-branch-name} && git push -u origin
   ```

1. After the CI/CD process has finished it should have made a commit back to the branch including the new optimized icons.
1. With that commit, make a PR back to `main`, review, and (squash) merge it.

**Notes:**

- The PR or commit needs a [appropriate title](/contribute/style-guides/git) e.g. `feat(Icons): add [icon names]` or `fix(Icon): fix cropped [icon name]`. You can either give the commit a good title during the squash merge of the PR or you may pull and rebase interactive `git pull && git rebase -i` or amend.
- Depending on the situation, you may have to pull the changes down locally, and run all tests, to eventually [update broken visual snapshots](/contribute/getting-started#running-tests-locally). But ideally, all of that should be handled during the CI/CD process.

## How to fix icons?

If you need to re-fetch one or several icons that got updated or changed in the [Figma Icons Library](https://www.figma.com/file/2aNwT4Lbyt9hFmDv8k34yN/Eufemia---Icons?node-id=1%3A9) you can force the icons to get re-processed before the cache timeout of 30 days:

1. Find the icon in the `icons-svg.lock` file and change the `updated` field to `0`.
1. Commit the change – but ensure the git branch name starts with `icon/` (more details above).

## Icons CI/CD process description

This is a description of what happens during adding new icons to the icons library.

Icons are getting added (more or less) automatically by extracting them from Figma. Following is how the process is tied together.

1. The connection happens on CI.
1. Checks if a new Figma Icons library version is available.
1. Download the Figma file (JSON) by a stream basis, and cache that.
1. Store the new version, in a version file.
1. Parse the JSON Figma file for valid icon IDs.
1. For PDF only: unpack the existing zip file with icons.
1. Checks if an icon file (SVG or PDF) exists in the repo.
1. If no, download it.
1. Details about the icon file are getting stored in a "lock" file, so we can compare it next time against.
1. For PDF only: pack the icon files to a zip (tar) and delete the files.
1. For SVG only: store a meta data file, so the portal can display more relevant data about the icons.
1. For SVG only: optimize the SVG file for a lower size.
1. For SVG only: Create a JSX component.
1. For SVG only: run integration and visual tests.
1. Commit the extracted / generated files back to the repo.

## Access denied

If you get an access denied request from the Figma API – while streaming down by the GET image endpoint, you may reset the URLs from inside the icons.lock file by running this command: `yarn figma:reset` and commit the re-generated files. Image URL's expires after 30 days.
