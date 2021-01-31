---
title: 'Icons Library development'
draft: true
order: 6
---

# Icons Library development

To fetch new icons from the Figma Icons file, you have to:

1. re-branch `develop`, and name it `eufemia-icons` (it needs to include icons in the name): `git checkout develop && git pull origin develop && git checkout -b eufemia-icons && git push -u origin eufemia-icons`.
1. after the CI/CD process and finished, make a PR back to `develop`, review and squash merge it.
1. depending on the icons updated, you may have to pull the changes down locally, and run all tests, to eventually update broken visual snapshots. But ideally, all of that should be handled during the CI/CD process.

## Icons CI/CD process description

This is a description on what happens during adding new icons to the icons library.

Icons are getting added mor or less automatically by extracting them from Figma. Heres how the process is tied together.

1. The connection happens on CI.
1. Checks if a new Figma Icons library version is available.
1. Download the Figma file (JSON) by a stream basis, and cache that.
1. Store the new version, in a version file.
1. Parse the json Figma file for valid icon IDs.
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

If you get a access denied request from the Figma API – while streaming down by the GET image endpoint, you may reset the URLs from inside the icons.lock file by running this command: `yarn figma:reset` and commit the re-generated files. Image URL's expires after 30 days.
