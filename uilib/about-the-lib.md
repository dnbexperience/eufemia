---
title: 'About the Library'
version: 10.95.1
generatedAt: 2026-01-27T13:53:25.953Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# About the library

**Why does this UI library exist?**

The library exists to unify and maintain consistency across the most commonly used HTML elements, custom components, and extensions at DNB. It provides a platform for collaborative, continuous improvement and is part of the broader design system.

This part of the design system is dedicated to **application development**.

## License

The `@dnb/eufemia` package is intended for internal DNB development only. Make sure you comply with the [license](/license).

---

## The Eufemia Repository

The `@dnb/eufemia` is hosted as a sub package inside the [<Icon icon={EufemiaLogo} size="large" />**Eufemia Repository**](https://github.com/dnbexperience/eufemia) on GitHub.

You can also enable [<Icon icon={GithubLogo} size="default" />notification about upcoming releases](https://help.github.com/articles/watching-and-unwatching-releases-for-a-repository/).

---

## Only HTML elements? No.

Designers and developers tend to think differently about the structure, layout, and sizing of web interface elements. Designers commonly focus on grids, fixed font sizes, widths, and other visual specifications.

Developers, on the other hand, think more in terms of reusability, modularity, flexibility, and scalability.

This library aims to bridge these two perspectives by applying consistent naming conventions, spatial rules, and single sources of truth for common resources. Design resources are created based on how they behave in the browser, ensuring that coded designs closely resemble design handovers.

## The library

- Contains ready-to-use HTML elements
- Is built on the DNB Eufemia design system principles
- Includes DNB brand styles, fonts, and icons
- Incorporates accessibility compliance ([ARIA Techniques](https://www.w3.org/TR/WCAG20-TECHS/aria))

## Developers – what to expect

1. Themeable HTML elements to use in existing and new applications.
1. An independent layer with a built-in versioning system that handles future changes automatically.
1. WCAG 2.1 compliant HTML elements that embody DNB's values for application development.
1. The most commonly used icons included in the bundle.
1. Thoroughly tested and widely compatible HTML elements. Code is automatically verified, formatted, and tested using industry-standard tools such as Axe, StyleLint, ESLint, and Prettier. All elements are built with integration tests, static tests, and snapshot tests to make future changes transparent to stakeholders.

## Collaboration

Collaboration between design and development is streamlined through NPM and GitHub. Figma's API integration enables cross-disciplinary collaboration between developers and designers.

## Technical aspects

The HTML elements are built with [React](https://reactjs.org/), which provides a robust set of tools for building deeply tested and reusable components.

The library is hosted on [NPM](https://www.npmjs.com/package/@dnb/eufemia), ensuring secure versioning and open access.

## Production ready

All code examples use modern JavaScript syntax ([ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript)). However, the production build of `@dnb/eufemia` is transpiled [for broad browser compatibility](/uilib/usage/#supported-browsers-and-platforms), ensuring your product uses production-ready code.

## Components, elements, and extensions

The HTML elements UI library includes two main parts. The first and most common is the [components library](/uilib/components/), which provides standard, out-of-the-box, ready-to-use components.

However, standard components sometimes need customization to meet specific user needs. When this happens, we create _extensions_.

Eufemia extensions are reusable solutions that don't fit naturally into standard components or elements but serve as extended functionality within Eufemia.

Check out the [available extensions library](/uilib/extensions/).

## Where do I go next?

Check out [Getting Started](/uilib/getting-started/)
