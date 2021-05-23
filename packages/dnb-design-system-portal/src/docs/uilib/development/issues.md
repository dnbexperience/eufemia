---
title: 'Issues'
draft: true
order: 8
---

# Issues

## Dependencies

## sass

- Eufemia uses `node-sass` instead of `sass` (dart based) because we render sass during jest tests with `sass.renderSync` – even that should work with `sass` as well, it can't find the file it says.
- Also, we use several places a module called `node-sass-once-importer`, that is compatible only with `node-sass`.
- We defined a yarn resolution in the root package.json in order to use `sass-loader` v11 which is compatible with `node-sass` v6. As of now, `gatsby-plugin-sass` uses v10, therefore we force it to use v11.
- But on the other hand, if we use `node-sass` v6, we get this error message during portal run:

  ```
  ERROR in polyfill
  Module not found: TypeError: Cannot read property 'indexOf' of
  undefined
  ```

## puppeteer

- Screen shot tests fails when simulating `active` state and v9 of `puppeteer` is sued. Probably because the delay property has changed? Because the active simulation is not kicking in.

## eslint

- Where where some issues with newer versions than v7.19.0. This way be fixed in later verions.
