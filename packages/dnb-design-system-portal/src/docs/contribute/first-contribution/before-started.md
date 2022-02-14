---
title: 'Before getting started'
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'

# What you should know before getting started

**Last updated**: _24. November 2021_

Before you get started, there are some technical decisions you should know about - as in every project.

Skip to:

- [About technology](/contribute/first-contribution/before-started#about-technology)
- [Mono repository](/contribute/first-contribution/before-started#eufemia-is-a-mono-repository)
  - [About project structure](/contribute/first-contribution/before-started#dnb-eufemia)
  - [About configuration files](/contribute/first-contribution/before-started#configuration-files)
  - [About types]()
- [About components](/contribute/first-contribution/before-started#about-component-structure)
  - [Component folder](/contribute/first-contribution/before-started#component-folder)
- [Development environments](/contribute/first-contribution/before-started#development-environments)

## About technology

The library exists of React components. The newer components are written as functional components, with [React hooks](https://reactjs.org/docs/hooks-intro.html). This was added to React version 16.8 and has become the new standard of React.

Files in the library were first written in JavaScript using [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) to define component types. For newer components we adopt using [TypeScript](https://www.typescriptlang.org/), substituting the use of PropTypes.

Components are styled using [nested CSS class selectors](https://medium.com/@andrew_barnes/bem-and-sass-a-perfect-match-5e48d9bc3894) with SASS (SCSS) and [BEM](http://getbem.com/naming/) (Block Element Modifier).

## Eufemia is a Mono Repository

The Eufemia repository is a mono repo consisting of the following workspaces:

- **dnb-design-system-portal**: Source code of the portal website - this website.
- **dnb-eufemia**: Source code of the npm package - where all the components are located.

### dnb-eufemia

The only folders you should need to know about to add new features are:

- `src/components`: The folder containing all the components, structured in [component folders](/contribute/first-contribution/before-started#component-folder).
- `src/elements`: The folder containing all elements, one file for each element.
- `src/extensions`: The folder containing all extensions, also structured in [component folders](/contribute/first-contribution/before-started#component-folder).

### dnb-design-system-portal

The documentation in markdown is located at `src/docs` and the portal will automatically create pages and menu items based on that current structure.

All you need to do to add a new page is to create a new markdown (`.md`) file within one of the folders. All documentation for components and elements are located at `src/docs/uilib`, which corresponds to the URL [eufemia.dnb.no/uilib](eufemia.dnb.no/uilib).

### Configuration files

- `ncurc.json` is used to ignore certain dependencies during a dependency update made by [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).
- `.eslintrc` is a file with configurations to [ESLint](https://eslint.org/docs/user-guide/configuring/), which is a tool for identifying and reporting on patterns found in ECMAScript/Javascript code, with the goal of making code more consistent and avoiding bugs.
- `.prettierrc` is a file with configurations to [Prettier](https://prettier.io/docs/en/configuration.html), which is a codeformatter for multiple languages.
- `.stylelintrc` is a file with configurations to [stylelint](https://stylelint.io/user-guide/configure), which is a linter for styling (SCSS/CSS).
- `babel.config.js` configures [Babel](https://babeljs.io/docs/en/configuration), a JavaScript compiler.
- `jest.config.js` configures [Jest](https://jestjs.io/docs/configuration), the JavaScript Testing Framework for this project.
- `jest.config.screenshots.js` configures [Jest screenshots](https://www.npmjs.com/package/jest-screenshot), which is related to the screenshot testing.
- `tsconfig.json` is a file with configurations to [TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html).

### About Types

As of now, the TypeScript types are mainly generated during the package build step on the CI. The two main purposes of delivering TypeScript types are:

- Inline property documentation
- Property validation and type safety

While the documentation, including the property tables, have to be kept in Markdown Tables, they get extracted, parsed, and inserted in the type definition files.

#### Manual type definitions

If a `*.d.ts` file is included in the source code, it will not be overwritten. But the documentation part about property types will still be inserted during the build.

#### Sharing PropTypes between components

You can share PropTypes between files. You can either export them explicitly (named export):

**Named Export**

```jsx
// Make sure you include `*PropType` in the variable name. This also effects references inside a single file.
export const componentPropTypes = {
  ...otherPropTypes,
  children: PropTypes.node,
  property: PropTypes.string,
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

#### Shared Properties docs

If you have one `/properties.md` file, but e.g. two components share most or all of the properties. Like a component and a provider for that component (Accordion and AccordionProvider) – then you can define in the markdown table header name both of the components: You can then provide a second table with a more specific table for a second component.

```md
#### Properties

| Accordion and AccordionProvider Properties  | Description                                                           |
| ------------------------------------------- | --------------------------------------------------------------------- |
| `id`                                        | _(optional)_ docs.                                                    |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported. |

| AccordionProvider Properties | Description                    |
| ---------------------------- | ------------------------------ |
| `expanded_id`                | _(optional)_ expanded_id docs. |
```

#### Local development

You can either run `yarn build:types` to generate type for all files, or use `yarn build:types:dev` to only build a certain and custom defined amount of files. Have a look at the `const isOfInterest = ...` part in `generateTypes.js`.

## About component structure

Eufemia has a couple of common parts, so every component behaves consistent:

- [Locale](/uilib/usage/customisation/localization) support
- [Provider](/uilib/usage/customisation/provider) support for centralized property forwarding
- [Spacing](/uilib/components/space) support
- [Skeleton](/uilib/components/skeleton) support
- [FormRow](/uilib/components/form-row) / [FormSet](/uilib/components/form-set) / [FormLabel](/uilib/components/form-label) support if its a form component
- Automatic id generation and linking of HTML elements to enhance accessibility
- Handling of `aria-describedby` with `combineDescribedBy` etc.

How to add support for every one of these are explained in [Additional support - Getting started](/contribute/getting-started#additional-support).

### Component folder

Every component and extension should have a similar structure, as described here.

As an example, we show the folder structure of component Breadcrumb. You can also check out the [source on Github](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/breadcrumb).

<InlineImg src="/images/folder-structure.png" width="360" caption="Folder structure of component Breadcrumb" alt="Folder structure with tests, style, typescript files and index files" right/>

1. **`/__tests__`**: Contains the tests (`Breadcrumb.test.tsx`) and screenshot tests (`Breadcrumb.screenshot.test.tsx`) for the component. All screenshots will be placed within the folder `__snapshots__`.
1. **`/style`**: Contains the styling of the component. The file `_breadcrumb.scss` defines all styling using [BEM](http://getbem.com/naming/). `dnb-breadcrumb.scss` contains the component style exports.
1. **`Breadcrumb.tsx`** and **`BreadcrumbItem.tsx`**: The React components for the Breadcrumb are defined and exported from these files.
1. **`index.js`**: Contains component exports.
1. **`style.js`**: Contains component style exports.

#### Modifications

- Adding theming files under a folder `style/themes` will unlock the possibility of having different themes in the future. Check out the [source for theming in Button](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/button/style).
- Adding support for [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) by including a file `web-component.js` in the folder structure. Check out how this is carried out by Button in the [source code](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/components/button/web-component.js). You also have to add a tag name and register the web component inside the component declaration.

## Development environments

There are a couple of environments for different purposes.

- For developing and styling new components, you can run a [Storybook development](/contribute/first-contribution/before-started#storybook-development).
- For writing documentation and displaying the components, you can run [the portal](/contribute/first-contribution/before-started#eufemia-portal) locally.
- After development, you can run [your tests](/contribute/first-contribution/before-started#testing).
- If you want to see the local changes of the search results, you can run [Algolia search queries locally](/).

### Storybook development

[Storybook](https://storybook.js.org/) is used for quick examples and component development. They do not need to be perfect.

Stories are placed inside a `/stories` directory and contain _.stories_ in the filename: `/components/button/stories/Button.stories.tsx`

Run Storybook locally by running

```bash
yarn dev
```

in the root folder. Then you can view the Storybook website by visiting [localhost:8002](http://localhost:8002/).

Add new pages to the storybook by adding a new directory `/stories` and a new file under `ComponentName.stories.tsx` and following the similar structure of the other files.

### Eufemia portal

The portal is currently handled by [Gatsby](https://www.gatsbyjs.com/), a framework for building static websites.

Run the Portal locally

```bash
$ yarn start
```

This will start the Portal. You can view the portal website by visiting [localhost:8000](http://localhost:8000/).

Content changes to both Markdown files and styles (SCSS) and code changes will be reflected immediately.

#### Local build

In case you have to create a local static build of the portal website (for various reasons), you can do so by:

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn build
```

The build will be exported to the `/public` directory. You can now also run a local static server to view it at the given port [localhost:8000](http://localhost:8000/):

```bash
# In the `dnb-design-system-portal` directory, run:
$ yarn serve
```

### Testing

Testing is currently handled by [Jest](https://jestjs.io/) and written using [Testing Library](https://testing-library.com/).

Run the integration tests with

```bash
yarn test <file/folder>
```

Run the screenshot tests (make sure to have a portal running locally) with

```bash
yarn test:screenshots <file/folder>
```

Check out the results of the screenshot test with `open ./packages/dnb-eufemia/jest-screenshot-report/index.html`.

### Run Algolia search queries locally

In order to commit Algolia search queries to the `dev_eufemia_docs` index, you have to:

Create a `.env` file inside `dnb-design-system-portal` with valid:

- `ALGOLIA_INDEX_NAME=dev_eufemia_docs`
- `ALGOLIA_APP_ID=SLD6KEYMQ9`
- `ALGOLIA_API_KEY=secret`

## What happens in the build steps

During the build, a lot of various things will happen. First, a prebuild before the build and afterward a postbuild.

### During prebuild

```bash
$ yarn build
```

- Assets are getting generated
- All index and lib files are getting generated
- All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)
- All SASS styles are validated and compiled (to support IE)
- All bundles get minified
- Icons are getting converted

To use the local build, you can either run the portal, or use `yarn link` to link the package with a totally different project.

### During postbuild

```bash
$ yarn workspace @dnb/eufemia postbuild:ci
```

- Assets are getting generated
- All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)
- UMD/ESM/ES/CJS bundles are getting generated
- TypeScript definitions are getting generated
