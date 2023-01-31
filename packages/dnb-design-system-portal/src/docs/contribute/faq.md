---
title: 'FAQ'
order: 7
icon: 'helper_classes'
---

# Frequently Asked Questions (FAQ)

## How to enable lint-staged?

Create a file called `.env.local` in the root of the repo (side-by-side to the .git folder), and put `LINT_STAGED=1` inside:

```bash
# File: .env.local
LINT_STAGED=1
```

## Dependency issues

### Stylelint

- v14 has changed a good amount of their default styling rules. Updating would require us to refactor a good amount of SCSS code. We are currently on v13.

## Babel

Due to this bug: https://github.com/babel/babel/issues/11394 we add `.png,.snap` so they not get copied: `--extensions '.js,.ts,.tsx,.png,.snap'`

### Yarn PnP

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

## How can I make faster builds?

This is only meant for "setup testing" purposes! In order to make faster local builds, you can:

- Inside `gatsby-config.js` rename all sourcing from `/docs` to `/docs_dummy`

Run `yarn workspace dnb-design-system-portal build-visual-test`

## I get Gatsby 404 Not Found on the pages I work on

- Try cleaning cache: `yarn workspace dnb-design-system-portal gatsby clean`
- Try running `yarn build` again

## I get an error importing other components in my .tsx file

You might get an error importing .js files in typescript files.
Then you have to extract their typescript files .d.ts by changing _included files_ in `generateTypes.js` and then run `yarn build:types:dev`.
