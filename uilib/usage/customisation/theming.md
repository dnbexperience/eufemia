---
title: 'Theming'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.367Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Theming

**Table of Contents**

- [Theming](#theming)
  - [Integrated theming](#integrated-theming)
    - [Theme Component and useTheme Hook](#theme-component-and-usetheme-hook)
    - [Brand theming](#brand-theming)
  - [Run your application with a different theme](#run-your-application-with-a-different-theme)
  - [WIP: Ready to use themes](#wip-ready-to-use-themes)
    - [Using `postcss-replace`](#using-postcss-replace)

---

Theming is an umbrella term for a wide range of different approaches and needs for customization.

This section covers some of the needs we've seen in DNB productions so far.

You may also check out the section in the contribution docs on [how to maintain and create a theme](/contribute/style-guides/theming/) or [how to deal with the brand as a developer](/brand/development/).

## Integrated theming

Eufemia supports theming right where all the style sources live. Having the ability to control different styles as close to the source as possible will make it easier to carefully handle continuous improvements over time.

Themes are independent style packages that should not be imported in parallel, but rather one or the other.

### Theme Component and useTheme Hook

Eufemia has [theming helpers](/uilib/usage/customisation/theming/theme), that lets you create nested theming solutions.

### Brand theming

Eufemia is a design system that aims to help DNB brands unleash their power.

Eufemia is built on top of brand assets. This means it should be possible to swap out or extend these brand assets.

Therefore, instead of overwriting Eufemia (DNB main brand) styles inside projects, it is beneficial to create additional brand themes directly where the source of the original brand lives.

The default DNB brand theme is called: `ui` which stands for _universal identity_.

## Run your application with a different theme

You can easily switch the static import of styles to a different theme:

```diff
import '@dnb/eufemia/style/core' // or /basis when "dnb-core-style" is used
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/eiendom'
```

Read more about [how to import styles](/uilib/usage/customisation/styling/consume-styles/#select-a-theme).

However, giving the user the ability to switch a theme during runtime is a very different challenge.

The Eufemia Portal (documentation) uses [gatsby-plugin-eufemia-theme-handler](https://github.com/dnbexperience/gatsby-plugin-eufemia-theme-handler) to handle it both in development and production mode.

## WIP: Ready to use themes

Right now, there's work going on to create Eufemia Themes that utilize both color and spacing along with the [Spatial system](/quickguide-designer/spatial-system).

The plan is to extend the documentation here later with how to select and use a theme inside an application.

### Using `postcss-replace`

If your application only needs new colors or other CSS properties, you could simply replace all the properties with [postcss-replace](https://www.npmjs.com/package/postcss-replace) using this config scheme:

```js
{
  resolve: 'gatsby-plugin-postcss',
  options: {
    postCssPlugins: [
      require('postcss-replace')({
        pattern: /#([A-Fa-f0-9]+)/,
        data: {
          '007272': '#YOUR_COLOR' // sea-green
        }
      })
    ]
  }
}
```
