---
title: 'Getting started'
icon: 'tools'
order: 3
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'
import { Hr } from '@dnb/eufemia/src'

# Getting started

You are now ready to get started. Here you will find a step-by-step guide to making changes in the Eufemia repo.
If you are new to the repository, first check out [what I should know before getting started](/contribute/first-contribution#what-should-i-know-before-getting-started).

**Table of Contents**

- [Getting started](#getting-started)
  - [1. Get the repo on your local computer](#1-get-the-repo-on-your-local-computer)
  - [2. Install the dependencies](#2-install-the-dependencies)
  - [3. Making changes](#3-making-changes)
    - [Check out a new branch](#check-out-a-new-branch)
    - [Add changes](#add-changes)
    - [Styling, CSS and SCSS of components](#styling-css-and-scss-of-components)
      - [SCSS dependencies](#scss-dependencies)
      - [SCSS Theming](#scss-theming)
      - [SCSS utilities and properties](#scss-utilities-and-properties)
    - [Create a local build](#create-a-local-build)
    - [Additional component support](#additional-component-support)
      - [Locale support](#locale-support)
      - [Provider support](#provider-support)
      - [FormRow support with `includeValidProps`](#formrow-support-with-includevalidprops)
      - [Spacing support](#spacing-support)
      - [Skeleton support](#skeleton-support)
      - [TypeScript types](#typescript-types)
    - [Write documentation](#write-documentation)
  - [4. Make and run tests](#4-make-and-run-tests)
    - [Running tests locally](#running-tests-locally)
    - [Support SCSS snapshot test](#support-scss-snapshot-test)
    - [Support Axe test](#support-axe-test)
  - [5. (Optional) Update change logs](#5-optional-update-change-logs)
  - [6. Commit changes](#6-commit-changes)

<Hr top="large" light />

## 1. Get the repo on your local computer

- **Clone** the repo if you have commit access,

```bash
git clone https://github.com/dnbexperience/eufemia.git
```

- or **Fork** the repo by clicking `Fork` in the top right corner in [Eufemia on GitHub](https://github.com/dnbexperience/eufemia).

<InlineImg src="/images/fork-repo.png" width="500" alt="Fork button location on Github" />

## 2. Install the dependencies

```bash
yarn install
```

## 3. Making changes

### Check out a new branch

Make a new working branch and name it e.g. `fix/my-branch-name` or `feat/my-feature-name`. Check out [Git convention](/contribute/style-guides/git) for naming.

```bash
# Make a Feature branch
$ git checkout -b feat/my-feature
```

### Add changes

Inside `./packages/dnb-eufemia` you will find the directory `/src/components`, `/src/elements` or `/src/extensions`. There you can place a new directory with all the necessary sub folders. As a reference, take a look at Component folder section in [Before getting started](/contribute/first-contribution/before-started#component-folder).

Run an environment with either `yarn dev` (for Storybook) or `yarn start` (for Eufemia Portal). Make sure you follow the [Code guide](/contribute/style-guides/coding) under development.

### Styling, CSS and SCSS of components

Each component has two or three SCSS files.

All layout and position related styles go here:

- `./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`

#### SCSS dependencies

SCSS file names staring with `dnb-` are later possible to get imported as individual packages:

- `./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`

#### SCSS Theming

Styles that belong to a "theming footprint" – like colors or individual variants – can be put inside the `/themes` directory:

- `./packages/dnb-eufemia/src/components/button/style/themes/dnb-button-theme-ui.scss`

Theming file names ending with `-ui` will during the package release get packed into the global theming package. More details in the [theming section](/uilib/usage/customisation/theming).

#### SCSS utilities and properties

Use the same sass setup as all the other components. You may re-use all the [helper classes](/uilib/helpers/classes):

- `./packages/dnb-eufemia/src/style/core/utilities.scss`
- `./packages/dnb-eufemia/src/style/core/properties.scss`

### Create a local build

Next, we need to create a local build (prebuild) by using `yarn build` again.

Running the build command will walk through all parts and tie together all needed parts (index files of new components) in order to generate valid build bundles.

```bash
$ yarn build
```

You find the output in the `./packages/dnb-eufemia/build` folder.

### Additional component support

#### Locale support

Put your translation inside: `./packages/dnb-eufemia/src/shared/locales/nb-NO.js` as well as to the `en-GB.js` file:

```js
export default {
  'nb-NO': {
    MyComponent: {
      myString: '...',
    },
  },
}
```

And use it as so:

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'

import type { LocaleProps } from '../../shared/types'

export type ComponentProps = {
  myParam?: string
}
export type ComponentAllProps = ComponentProps &
  LocaleProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { myString } = extendPropsWithContext(
    props,
    defaultProps,
    context.getTranslation(props).MyComponent // details below 👇
    // ...
  )

  // Use myString ...
}
```

The function `getTranslation` will along with the properties support both `locale` and the HTML `lang` attribute. This way, these properties can be set by a component basis and a context basis.

#### Provider support

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'

export type ComponentProps = {
  myParam?: string
}
export type ComponentAllProps = ComponentProps &
  LocaleProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { myParam, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    context.MyComponent
    // ...
  )

  // Use myParam and spread the ...rest
}
```

#### FormRow support with `includeValidProps`

Form elements, like input, checkbox, slider etc. do support some [FormRow](/uilib/components/form-row) properties. In order to support them, you can use `includeValidProps`, so only valid properties will effected the component.

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'
import { includeValidProps } from '../../components/form-row/FormRowHelpers'

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myParam, skeleton, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    includeValidProps(context?.FormRow)
    context.MyComponent,
  )

  // Use myParam and spread the ...rest
}
```

#### Spacing support

It depends from case to case on how you would make [spacing](/uilib/components/space) support available. But you may always give the developer to send in the spacing properties to the very root element of your component.

```tsx
import { Context } from '../../shared'
import classnames from 'classnames'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import type { SpacingProps } from '../../shared/types'

export type ComponentProps = {
  myParam?: string
}
export type ComponentAllProps = ComponentProps & SpacingProps

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { myParam, className, ...rest } = extendPropsWithContext(
    props,
    defaultProps
    // ...
  )

  // This helper will remove e.g. all spacing properties so you get only valid HTML attributes
  validateDOMAttributes(props, rest)

  // This helper will add needed spacing css classes based on the given properties
  rest.className = classnames(
    'dnb-my-component',
    createSpacingClasses(props),
    className
  )

  // Spread the ...rest on your root element
}
```

#### Skeleton support

It depends from case to case on how you would make skeleton support available. There are also more info on how to create a [custom skeleton](/uilib/components/skeleton#create-custom-skeleton). But in case your component supports the `skeleton` boolean property, then you may ensure it both can be set locally on the component, and it reacts on the global Context.

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import type { SkeletonShow } from '../skeleton/Skeleton'

export type ComponentProps = {
  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonShow
}
export type ComponentAllProps = ComponentProps &
  React.HTMLProps<HTMLElement>

const defaultProps = {}

function MyComponent(props: ComponentAllProps) {
  const context = React.useContext(Context)

  const { skeleton, className, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    { skeleton: context?.skeleton }
    // ...
  )

  // This helper will add some needed HTML attributes like "disabled", "aria-disabled" and "aria-label"
  skeletonDOMAttributes(rest, skeleton, context)

  // This helper will add needed skeleton css classes in order to create a custom skeleton
  rest.className = createSkeletonClass(
    'shape',
    skeleton,
    context,
    className
  )

  // Use skeleton and spread the ...rest
}
```

#### TypeScript types

```tsx
import React from 'react'
import type { SpacingProps } from '../../shared/types'
import type { ComponentProps } from './my-component/types'

export type * from './new-component/types'

export type ComponentAllProps = ComponentProps &
  React.HTMLProps<HTMLElement>

function MyComponent(props: ComponentAllProps) {}
```

### Write documentation

All components have their own directory inside:

- `./packages/dnb-design-system-portal/src/docs/uilib/...`

You may have a look at [Documentation guide](/contribute/style-guides/documentation) and existing docs in order to get the right structure.

## 4. Make and run tests

Make tests for the new component (or for your current issue) and set up screenshot tests from the Eufemia portal. The tests should be located under `__tests__` in the component folder.

- Tip 1: Create tests for each _prop_ that change your component.
- Tip 2: Always check and make the tests fail when you are writing tests.

More on testing in the [UI Library](/uilib/usage/best-practices/for-testing#testing-frontend-code).

### Running tests locally

Run the commands from the repository's root folder. Replace `breadcrumb` with your component's name in the commands.

1. Run the integration tests:

```bash
# Run all tests
yarn test
```

```bash
# Execute the tests on file (git) changes
yarn test:watch

# Run all tests including the word 'breadcrumb'
yarn test breadcrumb

# Or be more specific
yarn test /breadcrumb.test.tsx

# Run several together
yarn test breadcrumb avatar button
```

2. Update the changed snapshots:

```bash
yarn test:update

# More specific
yarn test:update breadcrumb avatar
```

3. Run the visual test against the portal:

**NB:** Make sure you have the portal running locally on port 8000.

```bash
# 1. First start the portal
yarn start

# 2. Then run all screenshot tests including 'breadcrumb' or 'avatar'
yarn test:screenshots breadcrumb avatar
```

4. Update eventually new or valid visual PNG snapshots:

```bash
# Update all screenshot tests including 'breadcrumb'
yarn test:screenshots:update breadcrumb
```

You can also press the `u` during a watch mode to update outdated snapshots.

5. How to deal with failing visual tests?

When a visual test fails, a visual comparison file (diff) will be created. Its location and name will be:

- `**/__tests__/__image_snapshots__/__diff_output__/*.snap-diff.png`

Please do not commit these files.

You may check out the CI/CLI logs for more details.

**GitHub Actions:** If visual screenshot test is failing on the CI, you can navigate to the test "Summary" where you find "Artifacts". There you can download the **visual-test-artifact** zip file, containing the visual diff files.

### Support SCSS snapshot test

Add a similar code snippet to your tests for watching changes in the SCSS you just created.

```js
import { loadScss } from '../../../core/jest/jestSetup'
describe('Breadcrumb scss', () => {
  it('have to match snapshot', () => {
    const scss = loadScss(require.resolve('../style/dnb-breadcrumb.scss'))
    expect(scss).toMatchSnapshot()
  })
})
```

### Support Axe test

Add a similar code snippet to your tests (as the last test). It will test the accessibility of your new component. Read more on [Jest Axe](https://github.com/nickcolley/jest-axe).

```js
describe('Breadcrumb aria', () => {
  it('should validate', async () => {
    const Component = render(
      <Breadcrumb
        data={[
          { href: '/' },
          { href: '/page1', text: 'Page 1' },
          { href: '/page1/page2', text: 'Page 2' },
        ]}
        variant="collapse"
        isCollapsed={false}
      />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
```

## 5. (Optional) Update change logs

Changes to `@dnb/eufemia` have to be mentioned by using a [git commit messages decoration](/contribute/style-guides/git/#commit-messages). During the next release, the package `CHANGELOG.md` file will be updated and changes will get listed on the [GitHub Releases](https://github.com/dnbexperience/eufemia/releases) page.

General Eufemia **Design System** changes have to be written down in the `EUFEMIA_CHANGELOG.md` file, located in the docs. This file should only be updated if there is a change in the `@dnb/eufemia` package, which affects the components, elements or extensions.

## 6. Commit changes

Commit your change and create a _Pull Request_ to the `origin/main` branch. Check out the [Git convention](/contribute/style-guides/git) for how to commit and make _Pull Request_.

From a Fork:

- Make your changes in your Fork and create a _Pull Request_ back to the Eufemia repo and `origin/main`.
- Watch the result of the tests.

From a clone:

- Make your changes and commit it to the repo in a new branch.
- Make a _Pull Request_ to `origin/main`.
- Watch the result of the tests.

### Run Algolia search queries locally

In order to commit Algolia search queries to the `dev_eufemia_docs` index, you have to:

Create a `.env` file inside `dnb-design-system-portal` with valid:

- `ALGOLIA_INDEX_NAME=dev_eufemia_docs`
- `ALGOLIA_APP_ID=SLD6KEYMQ9`
- `ALGOLIA_API_KEY=secret`
