---
title: 'TypeScript Types'
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

You can share PropTypes between files. You can either export them explicitly (named export):

**Named Export**

```jsx
// Make sure you include `*PropType` in the variable name. This also effects references inside a single file.
export const componentPropTypes = {
  ...otherPropTypes,
  children: PropTypes.node,
  roperty: PropTypes.string,
}
```

and import them in other components by using the spread operator:

```jsx
import { componentPropTypes } from './component'

const Other = () => {}

Other.propTypes = {
  ...componentPropTypes,
  otherProperty: PropTypes.string,
}
```

**Default Export**

or as a static reference on the component itself (default export):

```jsx
const Component = () => {}
Component.propTypes = {
  children: PropTypes.node,
  property: PropTypes.string,
}

export default Component
```

and import them in other components by using the spread operator:

```jsx
import Component from './component'

const Other = () => {}

Other.propTypes = {
  ...Component.propTypes,
  otherProperty: PropTypes.string,
}
```

There are a couple of components doing so. You may have a look at:

- `Input` and `InputMasked`
- `Icon` and `IconPrimary`
- Also the `SpacingHelper` shares `spacingPropTypes` with almost every component

**NB:** In order to activate the type generation, a component needs to import the `prop-types` dependency.

## Shared Properties docs

If you have one `/properties.md` file, but e.g. two components shares most or all of the properties. Like a component and a provider for that component (Accordion and AccordionProvider) – then you can define in the markdown table header name both of the components: You can then provide a second table with more specific table for a second component.

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
