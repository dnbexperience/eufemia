---
title: 'Issues'
draft: true
order: 8
---

# Issues

## Dependencies

## sass

- Eufemia uses `node-sass` instead of `sass` (dart based) because we render sass during jest tests with `sass.renderSync` – even that should work with `sass` as well, it can't find the file it says.
- We use several places a module called `node-sass-once-importer`, that is compatible only with `node-sass`.
- We use `sass-loader` v10 because `TypeError: this.getOptions is not a function`.
- We use `node-sass` v5, else we get this error message during portal run:

  ```
  ERROR in polyfill
  Module not found: TypeError: Cannot read property 'indexOf' of
  undefined
  ```

## puppeteer

- Screen shot tests fails when simulating `active` state and v9 of `puppeteer` is sued. Probably because the delay property has changed? Because the active simulation is not kicking in.

## eslint

- Where where some issues with newer versions than v7.19.0. This way be fixed in later verions.
