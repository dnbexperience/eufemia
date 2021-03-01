---
title: 'About the Library'
icon: 'about_the_lib'
order: 1
---

import WelcomeAdvice from 'Pages/welcome-advice.md'
import WatchingReleases from 'Pages/uilib/info/about-watching-releases.md'

# About the library

**Why does this UI Library exist?**

Simply to unify and to maintain consistency of the most commonly used HTML Elements, custom components and extensions at DNB and to provide a platform for collaborative constant improvement. It's a part of the whole Design System.

This part of the Design System is dedicated to **application development**.

## License

The `@dnb/eufemia` is for internal DNB development only. Also, make sure you act according to the [license](/license).

---

<WatchingReleases />

---

## Only HTML elements? No.

Designers and developers tend to think differently regarding the structure, layout and sizing of web interface elements. It is common for designers to design grids, fixed font sizes, widths etc.

Developers tend to think more in terms of re-usability, modularity, flexibility and scaleability of their elements.
This library aims to bridge and merge these two ways of thinking by applying naming conventions, spatial rules and single sources of truth for the most common resources. Design resources are designed based on how they behave in the browser. This means that coded designs will more likely resemble the handovers from designers.

## The library ...

- contains ready to use HTML elements
- is built on top of the DNB Eufemia Design System principles
- includes DNB brand styles, fonts and icons
- incorporates accessibility compliancy ([ARIA Techniques](https://www.w3.org/TR/WCAG20-TECHS/aria))

## Developers - what to expect :

1. a theme-able resource of HTML elements to use in existing and new applications
1. an independent layer in applications, where a build in versioning system takes care of future changes
1. HTML elements are made WCAG 2.1 compliant and a checklist of values DNB wish to embrace in future application development
1. the most commonly used Icons as a part of the bundle
1. tested and widely compatible HTML elements where the code is automatically verified, formatted and tested using the latest tools such as Axe, StyleLint, ESLint and Prettier. All the HTML elements are build upon integration tests for internal states, static tests and snapshot tests to make future changes more obvious to the stakeholders

## Collaboration

Collaboration between design and development is easy through use of NPM and Github. Figma's API integration opens the possibilities for collaboration between cross disciplinary teams (developer-developer, developer-designer).

## Technical aspects

The HTML Elements are built based on [React](https://reactjs.org/).
The reason for this is that React offers a robust library of tools to build deep, well tested and reusable elements.

The Library is hosted on [NPM](npmjs.com), so versioning and openness is secure.

## Production ready

All code examples are shown as ES6 ([ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript)). But the production `@dnb/eufemia` is actually compiled down to ES5 (5th Edition). So your product is using production ready code.

## Components, Elements and Extensions

The HTML Elements UI Library comes with two different parts. The first and most common is the [Components Library](/uilib/components/).
These are standard, out-of-the box, ready to use components.

However, there are many cases whereby the standard component needs to be customized or adjusted to suit the needs of the user. This results in a new component. We call these _extensions_.

Eufemia extensions are reusable parts that not fits naturally in to a component or element, but rather has the nature of being a extended solution of Eufemia.

Check out the [available Extensions Library](/uilib/extensions/).

## Where do I go next?

Check out [Getting Started](/uilib/getting-started/)
