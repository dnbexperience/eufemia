---
title: 'TypeScript Types'
draft: true
order: 7
---

# TypeScript Types

As of now, the TypeScript types are mainly generated during the package build step on the CI.

## About the build process

The two main purposes of delivering TypeScript types are:

- Inline property documentation
- Property validation and type safety

While the documentation, including the property tables, have to be kept in Markdown Tables, they get extracted, parsed and inserted in the type definition files.

## Manual type definitions

If a `*.d.ts` file is included in the source code, it will not be overwritten. But the documentation part about property types will still be inserted during the build.

## Sharing PropTypes between components

There are a couple of components doing so. You may have a look at:

- `Input` and `InputMasked`
- `Icon` and `IconPrimary`
- Also the `SpacingHelper` shares `spacingPropTypes` with almost every component

So, You can share PropTypes between files. But you may have to spread the objects, instead of only referencing them.

## Shared Properties docs

If you have one `/properties.md` file, but e.g. two components shares most or all of the properties. Like a component and a provider for that component (Accordion and AccordionProvider) – then you can define din the markdown table header name both of the components: You can then provide a second table with more specific table for a second component.

```md
## Properties

| Accordion and AccordionProvider Properties  | Description                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| `id`                                        | _(optional)_ docs.                                                    |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported. |

| AccordionProvider Properties | Description                    |
| ---------------------------- | ------------------------------ |
| `expanded_id`                | _(optional)_ expanded_id docs. |
```

## Local development

You can either run `yarn build:types` to generate type for all files, or use `yarn build:types:dev` to only build a certain and custom defined amount of files. Have a look at the `const isOfInterest = ...` part in `generateTypes.js`.
