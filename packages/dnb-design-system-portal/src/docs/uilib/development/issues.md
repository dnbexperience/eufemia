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

## Yarn PnP

Currently, Eufemia uses yarn v3 with `node_modules`.

When switching over to Yarn PnP, there are some issues:

- Storybook:
  ```bash
  ERROR in eufemia/.yarn/__virtual__/@dnb-eufemia-virtual-761b82657c/1/packages/dnb-eufemia/src/components/slider/style/dnb-range.scss (eufemia/.yarn/__virtual__/css-loader-virtual-37c5c374e4/0/cache/css-loader-npm-5.2.7-e1e8b8d16f-fb0742b30a.zip/node_modules/css-loader/dist/cjs.js!eufemia/.yarn/__virtual__/sass-loader-virtual-577853f541/0/cache/sass-loader-npm-10.2.0-91ed64638b-d53212e5d1.zip/node_modules/sass-loader/dist/cjs.js!eufemia/.yarn/__virtual__/@dnb-eufemia-virtual-761b82657c/1/packages/dnb-eufemia/src/components/slider/style/dnb-range.scss)
  Module build failed (from eufemia/.yarn/__virtual__/sass-loader-virtual-577853f541/0/cache/sass-loader-npm-10.2.0-91ed64638b-d53212e5d1.zip/node_modules/sass-loader/dist/cjs.js):
  SassError: File to import not found or unreadable: eufemia/.yarn/__virtual__/@dnb-eufemia-virtual-761b82657c/1/packages/dnb-eufemia/src/style/components/imports.scss.
          on line 6 of ../../.yarn/__virtual__/@dnb-eufemia-virtual-761b82657c/1/packages/dnb-eufemia/src/components/slider/style/dnb-range.scss
  >> @import '../../../style/components/imports.scss';
  ```
  
- Gatsby
  ```bash
  gatsby-plugin-mdx tried to access mkdirp, but it isn't declared in its dependencies; this makes the require call ambiguous and unsound.
  ```
