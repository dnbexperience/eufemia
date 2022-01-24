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

**Skip to step**:

1. [Get the repository on your local computer](/contribute/getting-started#1-get-the-repo-on-your-local-computer)
1. [Install dependencies](//contribute/getting-started#2-install-the-dependencies)
1. [Making changes](/contribute/getting-started#3-making-changes)
   - [Check out a new branch](/contribute/getting-started#check-out-in-a-new-branch)
   - [Add changes](/contribute/getting-started#add-changes)
   - [Styling](/contribute/getting-started#styling-css-and-scss-of-components)
   - [Create a local build](/contribute/getting-started#create-a-local-build)
   - [Additional support](/contribute/getting-started#additional-support): Support for locale, provider, spacing and skeleton.
   - [Write documentation](/contribute/getting-started#write-documentation)
1. [Make and run tests](/contribute/getting-started#4-make-and-run-tests)
1. (Optional): [Update the EUFEMIA_CHANGELOG.md with your changes](/contribute/getting-started#5-optional-update-change-logs)
1. [Commit your change and create a Pull Request](/contribute/getting-started#6-commit-changes)

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

Run an environment with either `yarn dev` (for Storybook sandbox) or `yarn start` (for Eufemia Portal). Make sure you follow the [Code guide](/contribute/style-guide/coding) under development.

### Styling, CSS and SCSS of components

Use the same sass setup as all the other components. You may re-use all the [helper classes](/uilib/helpers/classes):

- `./packages/dnb-eufemia/src/style/core/utilities.scss`
- `./packages/dnb-eufemia/src/style/core/properties.scss`

### Create a local build

Next, we need to create a local build (prebuild) by using `yarn build` again.

Running the build command will walk through all parts and tie together all needed parts in order to generate valid build bundles.

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
import { extendPropsWithContext } from '../../shared/component-helper'

const defaultProps = {
  myString: null, // can be null, as we get our default from the translation file
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myString } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
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

const defaultProps = {
  myParam: null,
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { myParam, ...rest } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
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
  extendPropsWithContext,
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
  myParam: string
}

const defaultProps = {
  myParam: null,
}

function MyComponent(props: MyComponentProps) {
  const context = React.useContext(Context)

  const { myParam, className, ...rest } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
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

  // Spead the ...rest on your root element
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

const defaultProps = {
  skeleton: null,
}

function MyComponent(props: Types) {
  const context = React.useContext(Context)

  const { skeleton, className, ...rest } = extendPropsWithContext(
    {
      ...props,
      ...defaultProps,
    },
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

  // Use skeleton and spead the ...rest
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

### Support SCSS snapshot test

Add a similar code snippet to your tests for watching changes in the SCSS you just created.

```js
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

### Running tests locally

The commands are run from the repository's root folder. Replace `breadcrumb` with your component's name in the commands.

1. Run the integration tests:

```bash
# Run all tests including the word 'breadcrumb'
yarn test breadcrumb
```

```bash
# or be more specific
yarn test /breadcrumb.test.tsx
```

```bash
# Execute the tests periodically
yarn test:watch breadcrumb
```

2. Update the changed snapshots:

```bash
yarn test:update breadcrumb
```

3. Run the visual test against the portal:

```bash
# First start the portal
yarn start
# Then run all screenshot tests including 'breadcrumb'
yarn test:screenshots breadcrumb
```

You can also create a screenshot report for all components running `yarn test:screenshots`. Check the result / reports, located in: `open ./packages/dnb-eufemia/jest-screenshot-report/index.html`

4. Update eventually new or valid PNG snapshots:

```bash
# Update all screenshot tests including 'breadcrumb'
yarn test:screenshots:update breadcrumb
```

## 5. (Optional) Update change logs

Changes to `@dnb/eufemia` have to be mentioned by using a [git commit messages decoration](/contribute/commit#commit-messages). During the next release, a `CHANGELOG.md` file will be generated and changes will get listed on the [GitHub Releases](https://github.com/dnbexperience/eufemia/releases) page.

General Eufemia **Design System** changes have to be written down in the `EUFEMIA_CHANGELOG.md` file, located in the repository root. This file should only be updated if there is a change in the `@dnb/eufemia` package, which affects the components/elements/extensions.

## 6. Commit changes

[Commit your change](/contribute/commit) and create a Pull Request to the `origin/main` branch. Check out the [Git convention](/contribute/style-guides/git) for how to commit and make pull requests.

From a Fork:

- Make your changes in your Fork and create a _Pull Request_ back to the Eufemia repo and `origin/main`.
- Watch the result of the tests.

From a clone:

- Make your changes and commit it to the repo in a new branch.
- Make a _Pull Request_ to `origin/main`.
- Watch the result of the tests.
