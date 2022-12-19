---
title: 'Usage'
icon: 'usage'
order: 3
---

<!-- import ReleasesInfo from 'Docs/design-system/changelog/info-about-releases' -->

import WatchingReleases from 'Docs/uilib/info/about-watching-releases.md'

# Usage

**Get started using the DNB user interface library**

The UI Library HTML Elements and UI Components are isolated, ready-to-use elements. They are self-supporting, and will use the styles they need to display.

- **HTML Elements** are styled HTML tags
- **UI Components** are styled and custom build HTML elements
- **UI Extensions** are styled and functional, but related additions to Eufemia

You can use any of the HTML Elements and UI Components as demonstrated in the documentation with a variety of customization properties.

<WatchingReleases />

## Installation

To install and save the `@dnb/eufemia` in your **package.json** dependencies, run:

_NB!_ [React](https://www.npmjs.com/package/react) and [React-dom](https://www.npmjs.com/package/react-dom) are needed as well.

```bash
# at time of writing, React version 16 was used
# so consider to run react@16 and react-dom@16
$ npm i @dnb/eufemia react react-dom
```

Read more in the [First Steps](/uilib/usage/first-steps/) section.

## Supported Browsers and Platforms

We use the following config in our browserlists(.browserslistrc): `edge >= 14, firefox >= 52, chrome >= 49, safari >= 10, not ie > 0, not ie_mob > 0`.

To see exactly which browsers this config supports, take a look [here](https://browsersl.ist/#q=edge+%3E%3D+14%2C+firefox+%3E%3D+52%2C+chrome+%3E%3D+49%2C+safari+%3E%3D+10%2C+not+ie+%3E+0%2C+not+ie_mob+%3E+0).

| Edge                 | Firefox              | Chrome               | Safari               | Node                 |
| -------------------- | -------------------- | -------------------- | -------------------- | -------------------- |
| <small>>=</small> 14 | <small>>=</small> 45 | <small>>=</small> 49 | <small>>=</small> 10 | <small>>=</small> 10 |
