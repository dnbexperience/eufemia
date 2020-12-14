---
title: 'New Icons'
draft: true
order: 6
---

# Adding new icons to the Icons Library

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
