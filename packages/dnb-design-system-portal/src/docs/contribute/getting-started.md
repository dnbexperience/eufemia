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
    - [Additional support](#additional-support)
      - [Locale support](#locale-support)
      - [Provider support](#provider-support)
      - [Spacing support](#spacing-support)
      - [Skeleton support](#skeleton-support)
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

Run an environment with either `yarn dev` (for Storybook) or `yarn start` (for Eufemia Portal). Make sure you follow the [Code guide](/contribute/style-guide/coding) under development.

### Styling, CSS and SCSS of components

Each component has two or three SCSS files.

All layout and position related styles go here:

- `./packages/dnb-eufemia/src/components/button/style/_button.scss` (with leading underscore)

#### SCSS dependencies

SCSS file names staring with `dnb-` are later possible to get imported as self-contained, individual packages:

- `./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`

There you can `@import` related **SCSS dependencies**. Like the button component also includes the icon component styles.

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

### Additional support

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
import { usePropsWithContext } from '../../shared/hooks'

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myString } = usePropsWithContext(
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
import { usePropsWithContext } from '../../shared/hooks'

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myParam, ...rest } = usePropsWithContext(
    props,
    defaultProps,
    context.MyComponent
    // ...
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
  usePropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes, // In case you need them as PropTypes
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  SpaceProps, // TypeScript type
  createSpacingClasses,
} from '../space/Space'

interface MyComponentProps extends SpaceProps {
  myParam?: string
}

const defaultProps = {
  myParam: 'value',
}

function MyComponent(props: MyComponentProps) {
  const context = React.useContext(Context)

  const { myParam, className, ...rest } = usePropsWithContext(
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
import { usePropsWithContext } from '../../shared/hooks'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

const defaultProps = {
  skeleton: null,
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { skeleton, className, ...rest } = usePropsWithContext(
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

```bash
# 1. First start the portal
yarn start

# 2. Then run all screenshot tests including 'breadcrumb' or 'avatar'
yarn test:screenshots breadcrumb avatar
```

You can also create a screenshot report for all components running `yarn test:screenshots`. Check the result / reports, located in: `open ./packages/dnb-eufemia/jest-screenshot-report/index.html`

4. Update eventually new or valid PNG snapshots:

```bash
# Update all screenshot tests including 'breadcrumb'
yarn test:screenshots:update breadcrumb
```

5. How to deal with failing tests on the CI server?

You may check out the logs for detailed reports.

**Failing visual screenshot tests**

If visual screenshot tests are failing on the CI, you can scroll all the way to the end of the logs. There you will find a link **Download the Report** you can use to download a zip file containing the visual test reports and diffs.

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

Changes to `@dnb/eufemia` have to be mentioned by using a [git commit messages decoration](/contribute/commit#commit-messages). During the next release, the package `CHANGELOG.md` file will be updated and changes will get listed on the [GitHub Releases](https://github.com/dnbexperience/eufemia/releases) page.

General Eufemia **Design System** changes have to be written down in the `EUFEMIA_CHANGELOG.md` file, located in the docs. This file should only be updated if there is a change in the `@dnb/eufemia` package, which affects the components, elements or extensions.

## 6. Commit changes

[Commit your change](/contribute/commit) and create a _Pull Request_ to the `origin/main` branch. Check out the [Git convention](/contribute/style-guides/git) for how to commit and make _Pull Request_.

From a Fork:

- Make your changes in your Fork and create a _Pull Request_ back to the Eufemia repo and `origin/main`.
- Watch the result of the tests.

From a clone:

- Make your changes and commit it to the repo in a new branch.
- Make a _Pull Request_ to `origin/main`.
- Watch the result of the tests.
