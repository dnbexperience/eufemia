---
title: 'Requirements'
description: 'Eufemia can be used within an UMD, ESM, CJS or TypeScript environment. The purpose is to use it on top (or inside) of modern JavaScript frontend framework and setups.'
metadata: https://eufemia.dnb.no/uilib/getting-started/requirements/metadata.json
---

# Requirements

Aside from the peer dependencies, there are no specific technical requirements, except that it is highly recommended to use a compiling process with [tree shaking](/uilib/usage/first-steps/module-formats/#tree-shaking) in place.

## Usage

Eufemia (`@dnb/eufemia`) can be used within a UMD, ESM, CJS, or TypeScript environment. The purpose is to use it on top of (or inside) modern JavaScript frontend frameworks and setups. However, we strongly recommend using Eufemia with a **React stack**, as this makes including the Eufemia tools and components most productive. All the component internal states are handled with React to keep only the most necessary elements in the DOM (HTML elements and event bindings).

## The hard part of a living design system

The hard part of a [living design system](/uilib/getting-started/living-system), like Eufemia, is avoiding the creation of black holes and choosing ways that make **maintainability of user experience** hard and complex. To address this challenge and gain more insight, read on about [**maintainability**](/uilib/getting-started/maintainability).

## React

Why React is a good choice:

- Declarative and functional
- Immutable structure
- Lightweight
- Centralization of code that should work in context (concepts like writing code like **reading a book**)
- Can be used with a JAM stack, CSR, and SSR (SPA) using the same code base (App)
- Flexible frontend stack to create the best user experience, depending on the solution and its needs
- Can be tailored to different conventions and guidelines

## Using the styles

This library works perfectly with any styling techniques, such as **Styled Components** ([Emotion](https://emotion.sh)), CSS Modules, or SASS/LESS. You simply consume **ready-to-use CSS files** and CSS Custom Properties (CSS variables).
