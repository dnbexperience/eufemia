---
title: 'About the Library'
icon: 'about_the_lib'
draft: false
order: 1
---

import WelcomeAdvice from 'Pages/welcome-advice.md'
import WatchingReleases from 'Pages/uilib/info/about-watching-releases.md'

# About the library

**Why does this UI Library exist?**

Simply to unify and to maintain consistency of the most commonly used HTML Elements, custom components and patterns at DNB and to provide a platform for collaborative constant improvement. It's a part of the whole Design System.

This part of the Design System is dedicated to **application development**.

## License

The `dnb-ui-lib` is for internal DNB development only. Also, make sure you act according to the [license](/license).

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

## What about other front end frameworks?

To make the HTML Elements work in other environments like [Vue](/uilib/usage/first-steps/vue) or [Angular](/uilib/usage/first-steps/angular), You can use the built-in web components support.

The Library is hosted on [NPM](npmjs.com), so versioning and openness is secure.

## Production ready

All code examples are shown as ES6 ([ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript)). But the production `dnb-ui-lib` is actually compiled down to ES5 (5th Edition). So your product is using production ready code.

## Components & Patterns

The HTML Elements UI Library comes with two different parts. The first and most common is the [Components Library](/uilib/components/).
These are standard, out-of-the box, ready to use components.

However, there are many cases whereby the standard component needs to be customised or adjusted to suit the needs of the user. This results in a new component. We call these _patterns_. Patterns are helpful guides as to how a component _might_ be or behave. A typical example is a footer on a web page. Eufemia will not describe how every type of footer should be designed. Instead, it describes the function of a footer _in general_ with some aesthetic and content guidelines.

Patterns can be used as a start point for both developer and designer.

Check out the [available Patterns Library](/uilib/patterns/).

## Where do I go next?

Check out [Getting Started](/uilib/getting-started/)
