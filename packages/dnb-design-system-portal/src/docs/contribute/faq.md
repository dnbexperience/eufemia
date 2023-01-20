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

### puppeteer

- When upgrading to a newer version than v8, puppeteer behaves inconsistent. Sometimes the content is just tiny bit off. But most importantly, > v10.4 is very inconsistent and off running on the GitHub Actions maxOS.

### Stylelint

- v14 has changed a good amount of their default styling rules. Updating would require us to refactor a good amount of SCSS code. We are currently on v13.

### Storybook

The Storybook setup is using the default `@storybook/preset-scss` addon with the recommended dependencies. But for some reason, we can't use the latest versions of the following dependencies:

- `sass-loader` v10.2.0
- `style-loader` v2.0.0
- `css-loader` v5.2.7

We get else this error:

> Type Error: this.getOptions is not a function for style-loader

### gatsby-plugin-emotion

Newer versions than `7.1.0` have an issue with our Emotion setup. We may either switch complately to SASS or ensure the root (home) on the portal looks OK.

## Babel

Due to this bug: https://github.com/babel/babel/issues/11394 we add `.png,.snap` so they not get copied: `--extensions '.js,.ts,.tsx,.png,.snap'`

### Gatsby Cloud

The plugin `gatsby-plugin-gatsby-cloud` relays on a newer Webpack version than other plugins. In order to let the Portal run on the latest version, we set the yarn resolutions:

```json
"resolutions": {
  "webpack": "5.61.0"
}
```

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
