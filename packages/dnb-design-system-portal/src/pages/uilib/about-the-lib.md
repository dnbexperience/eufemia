---
header: 'UI Library'
title: 'About the Library'
draft: false
order: 1
---

import WelcomeAdvice from 'Pages/welcome-advice.md'

# About the Library

**Why does this UI Library exist?**

Simply to unify the most commonly used HTML Elements at DNB and to work together to make every of them better.

So Yes, this section of the Design System is dedicated to **application development**.

## Only HTML Elements? No.

Designers are thinking in grids and absolute sizes. Developers not. But by making the most commonly used syntaxes (h1, h2, p, etc.) unison with the DNB UX Design principles and standardizing them, it will give frontend developers, a new and much faster way to build applications based on DNB UX Design principles - naming conventions, standardized sizing, spacing and single sources of truth for common resources.

## The Library has on aim to solve:

- Ready to use HTML Elements
- Build on top of the DNB Eufemia Design System principles
- Includes DNB brand styles, fonts and icons
- Takes care of accessibility ([ARIA Techniques](https://www.w3.org/TR/WCAG20-TECHS/aria))

### In detail, a frontend developers will get:

1.  A theme-able resource of HTML elements to use in existing and new applications.
1.  An independent layer in applications, where a build in versioning system takes care of future changes.
1.  HTML elements are made WCAG 2.1 compliant and a checklist of values DNB wish to embrace in future application development.
1.  The most commonly used Icons as a part of the bundle.
1.  Tested and widely compatible HTML elements where the code is automatically verified, formatted and tested using the latest tools such as Axe, StyleLint, ESLint and Prettier. All the HTML elements are build upon integration tests for internal states, static tests and snapshot tests to make future changes more obvious to the stakeholders.

### Collaboration

Through NPM and GitHub, with a Deploy server in place, a platform on which collaboration between design and development will be more transparent. Also, Figma API integration will allow for more collaboration possibilities.

## Technical aspects

The HTML Elements are build based on [React](https://reactjs.org/).
The reason for this is that React offers a robust library of tools to build deeply and well tested and reusable elements.

### What about other Frontend Frameworks?

To make the HTML Elements work in other environments like Vue or Angular, You can use the build-in Web Components support. [VueJS](https://vuejs.org/) has also a integrated direct binding by using [vuera](https://github.com/akxcv/vuera).

The Library is hosted on [NPM](npmjs.com), so versioning and openness is secured.

### Components

The HTML Elements UI Library comes with two different parts. The first and most common is the [Components Library](/uilib/components/).

### Patterns

But then there are a lot of use cases where _components_ gets combined and a kind of new component comes to life. This will then be a pattern. The best pattern setup would be more a guidance, so a Developer can the a patterns as a good startd, and go from there.
Check out the [available Patterns Library](/uilib/patterns/).

## Where do I go next?

Check out [Getting Started](/uilib/getting-started/)
