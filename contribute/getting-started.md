---
title: 'Getting started'
version: 11.2.1
generatedAt: 2026-05-08T08:59:09.360Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Getting started

You are now ready to get started. Here you will find a step-by-step guide to making changes in the Eufemia repo.
If you are new to the repository, first check out [what you should know before getting started](/contribute/first-contribution#what-should-i-know-before-getting-started).

<Toc />

<Hr top="large" />


# Get the repo on your local computer

- **Clone** the repo if you have commit access,

```bash
git clone https://github.com/dnbexperience/eufemia.git
```

- or **Fork** the repo by clicking `Fork` in the top right corner in [Eufemia on GitHub](https://github.com/dnbexperience/eufemia).

<InlineImg
  src="/images/fork-repo.png"
  width="500"
  alt="Fork button location on GitHub"
/>


# Install the dependencies

```bash
yarn install
```


# Making changes

## Check out a new branch

Make a new working branch and name it e.g. `fix/my-branch-name` or `feat/my-feature-name`. Check out [Git convention](/contribute/style-guides/git) for naming.

```bash
# Make a Feature branch
$ git checkout -b feat/my-feature
```

## Add changes

Inside `./packages/dnb-eufemia` you will find the directory `/src/components` or `/src/extensions`. There you can place a new directory with all the necessary sub folders. As a reference, take a look at Component folder section in [Before getting started](/contribute/first-contribution/before-started#component-folder).

Run an environment with either `yarn dev` (for Storybook) or `yarn start` (for Eufemia Portal). Make sure you follow the [Code guide](/contribute/style-guides/coding) under development.

## How a component should be structured

A component should be structured as follows:

```tsx
import type { ComponentProps } from './types.ts'
export type * from './types.ts'

function MyComponent(props: ComponentProps) {
  return helperFunction(<button text="My Component" />)
}

export function helperFunction(children: React.ReactNode) {
  return children
}

export default MyComponent
```

## Styling, CSS and SCSS of components

Each component has two or three SCSS files.

All layout and position related styles go here:

- `./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`

### CSS packages

SCSS file names starting with `dnb-` are later possible to get imported as individual packages:

- `./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`

### Style dependencies

In order to test related style dependencies of components, we add style imports in the `deps.scss` file, which again is used in Jest tests to perform a snapshot comparison:

- `./packages/dnb-eufemia/src/components/button/style/deps.scss`

### SCSS Theming

Styles that belong to a "theming footprint" – like colors or individual variants – can be put inside the `/themes` directory:

- `./packages/dnb-eufemia/src/components/button/style/themes/dnb-button-theme-ui.scss`

Theming file names ending with `-ui` will during the package release get packed into the global theming package. More details in the [theming section](/uilib/usage/customisation/theming).

### SCSS utilities

Use the same SASS setup as all the other components. You may re-use all the [helper classes](/uilib/helpers/classes):

- `./packages/dnb-eufemia/src/style/core/utilities.scss`

## Create a local build

Next, we need to create a local build (prebuild) by using `yarn build` again.

Running the build command will walk through all parts and tie together all needed parts (index files of new components) in order to generate valid build bundles.

```bash
$ yarn build
```

You can find the output in the `./packages/dnb-eufemia/build` folder.

## Additional component support

### Locale support

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

### Provider support

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

### "Form element" components

Form elements, like input, checkbox, slider etc. should include some extra functionality in order to be used in various situations.

Basically, components we would place inside an HTML `<form>` element.

**Label vs fieldset/legend**

They should be declared as a form element:

```tsx
FormComponent._formElement = true
```

This helps e.g. to detect automated determination of label vs fieldset/legend.

**Spacing**

And they should be declared to support spacing properties as well:

```tsx
FormComponent._supportsSpacingProps = true
```

This is needed in order to fully support [Flex](/uilib/layout/flex/) layouts.

#### Usage of `pickFormElementProps`

In order to support form element properties, such as `vertical` or `labelDirection`, you can use `pickFormElementProps`, so only valid properties will affect the component.

```tsx
import { Context } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

const defaultProps = {
  myParam: 'value',
}

function FormComponent(props: Types) {
  const context = React.useContext(Context)

  const { myParam, skeleton, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    pickFormElementProps(context?.formElement)
    context.FormComponent,
  )

  // Use myParam and spread the ...rest
}
```

### Spacing support

It depends from case to case on how you would make [spacing](/uilib/layout/space) support available. But you may always allow the developer to pass in the spacing properties to the very root element of your component.

```tsx
import { Context } from '../../shared'
import clsx from 'clsx'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { applySpacing } from '../space/SpacingUtils'

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

  // This helper applies spacing classes and CSS custom properties to the root element props
  const rootParams = applySpacing(props, {
    ...rest,
    className: clsx('dnb-my-component', className),
  })

  // Spread the ...rootParams on your root element
}
```

### Skeleton support

It depends from case to case on how you would make skeleton support available. There is also more info on how to create a [custom skeleton](/uilib/components/skeleton#create-custom-skeleton). But in case your component supports the `skeleton` boolean property, then you may ensure it both can be set locally on the component, and it reacts on the global Context.

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

### TypeScript types

```tsx
import React from 'react'
import type { SpacingProps } from '../../shared/types'
import type { ComponentProps } from './my-component/types'

export type * from './new-component/types'

export type ComponentAllProps = ComponentProps &
  React.HTMLProps<HTMLElement>

function MyComponent(props: ComponentAllProps) {}
```

## Write documentation

All components have their own directory inside:

- `./packages/dnb-design-system-portal/src/docs/uilib/...`

You may have a look at [Documentation guide](/contribute/style-guides/documentation) and existing docs in order to get the right structure.


# Make and run tests

Make tests for the new component (or for your current issue) and set up screenshot tests from the Eufemia portal. The tests should be located under `__tests__` in the component folder.

- Tip 1: Create tests for each _prop_ that change your component.
- Tip 2: Always check and make the tests fail when you are writing tests.

More on testing in the [UI Library](/uilib/usage/best-practices/for-testing#testing-frontend-code).

## Running tests locally

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

Jest integration tests uses this naming convention: `/__tests__/{ComponentName}.test.tsx`

3. Run visual and end-to-end tests:

**NB:** Make sure you have the portal running locally on port 8000.

**Visual tests:**

```bash
# 1. First start the portal
yarn start

# 2. Then run screenshot tests for e.g. 'breadcrumb' or 'avatar'
yarn test:screenshots breadcrumb avatar

# You can also start it in watch mode
yarn test:screenshots:watch breadcrumb avatar
```

Visual tests uses this naming convention: `/__tests__/{ComponentName}.e2e.spec.ts`

### Run selected themes only on `main`

For screenshot tests, you can mark individual themes as main-only and keep the rest on all branches.

```ts
import {
  makeScreenshot,
  setupPageScreenshot,
  selectThemes,
  onMain,
} from '../../../core/jest/jestSetupScreenshots'

describe.each(
  selectThemes({
    always: ['ui', 'sbanken'],
    onMain: ['eiendom'],
  })
)('Button for %s', (themeName) => {
  setupPageScreenshot({
    themeName,
    url: '/uilib/components/button/demos/',
  })

  it('matches default state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
})
```

`selectThemes({ always, onMain })` only applies branch filtering in CI. In CI, `onMain` runs on `main` and branches starting with `v` followed by a digit, such as `v11` or `v11-fix`. Outside CI, the guarded themes still run locally.

You can also use callback mode for single tests:

```ts
onMain(() =>
  it('matches default state', async () => {
    const screenshot = await makeScreenshot({
      selector: '[data-visual-test="button-primary"]',
    })
    expect(screenshot).toMatchImageSnapshot()
  })
)
```

### Conditional screenshot testing

In CI, screenshot tests are selected from changed files instead of always running all screenshot suites.

Selection includes:

- Direct screenshot owners of changed files.
- Reverse TypeScript/JavaScript dependencies.
- Reverse SCSS dependencies.
- Demo/example composition usage from Portal docs.
- Portal docs/demo path impact (changed docs can trigger only related screenshot tests).

Global impact still runs all screenshot tests when shared visual config/style paths are changed (for example `packages/dnb-eufemia/package.json`, `src/style/*` or it runs on the `main` branch).

You can run the same logic locally:

```bash
yarn workspace @dnb/eufemia test:screenshots:ci:conditional
yarn workspace @dnb/eufemia test:screenshots:ci:conditional:explain
```

You can choose change scope explicitly if needed:

```bash
yarn workspace @dnb/eufemia test:screenshots:ci:conditional:explain --branch
yarn workspace @dnb/eufemia test:screenshots:ci:conditional:explain --uncommitted
```

`auto` behavior:

- Local: combines `uncommitted` + `branch` files (deduplicated).
- CI: uses `VISUAL_TEST_CHANGED_FILES` provided by GitHub Actions from `pulls.listFiles`.
- CI does not fallback to git history when `VISUAL_TEST_CHANGED_FILES` is missing.

In explain mode, each selected test includes one or more causes:

- `TS/JS dependency impact`
- `SCSS dependency impact`
- `Component usage in demo/examples`
- `Portal docs/demo impact`

By default, CI still stops on the first failure (`--bail`). You can force a full run without `--bail` by including `--run-all` in your commit message.

**Default behavior (stops on first failure):**

```bash
git commit -m "feat: implement new feature"
# Runs: playwright test --config=./playwright.config.screenshots.ts
```

**Run all tests (continues on failures):**

```bash
git commit -m "feat: implement new feature --run-all"
# Runs: playwright test --config=./playwright.config.screenshots.ts
```

This is useful when you want to see all visual test failures at once, rather than stopping at the first one. The CI/CD pipeline automatically detects this flag and adjusts test behavior accordingly.

### Skip dependency audit in CI

You can skip the dependency audit step in the Verify workflow by including `--skip-audit` in your commit message:

```bash
git commit -m "chore: update snapshots --skip-audit"
```

The CI will detect `--skip-audit` and skip the "Audit dependencies" step accordingly.

**Playwright end-to-end tests:**

```bash
# 1. First start the portal
yarn start

# 2. Then run Playwright tests including 'Slider' or 'Button'
yarn test:e2e /Slider\|Button/

# You can also start it in watch mode
yarn test:e2e:watch

# Or run the tests for the portal
yarn test:e2e:portal
yarn test:e2e:portal:watch
```

Playwright uses this naming convention: `/__tests__/{ComponentName}.screenshot.test.ts`

4. Update any new or changed visual PNG snapshots:

```bash
# Update screenshot tests including 'breadcrumb'
yarn test:screenshots:update breadcrumb
```

You can also press the `u` during a watch mode to update outdated snapshots.

5. How to deal with failing visual tests?

When a visual test fails, a visual comparison file (diff) will be created. Its location and name will be:

- `**/__tests__/__image_snapshots__/__diff_output__/*.snap-diff.png`

you can find a report entry (`index.html`), that lists all of the failed tests here:

- `/packages/dnb-eufemia/visual-diff-report/index.html`

You may check out the CI/CLI logs for more details.

**GitHub Actions:** If visual screenshot test is failing on the CI, you can navigate to the test "Summary" where you can find "Artifacts". There you can download the **visual-test-artifact** zip file, containing the visual diff files as well as the report entry inside `/visual-diff-report`.

## Support SCSS snapshot test

Add a similar code snippet to your tests for watching changes in the SCSS you just created.

```js
import { loadScss } from '../../../core/jest/jestSetup'
describe('Button scss', () => {
  it('has to match style dependencies css', () => {
    const css = loadScss(require.resolve('../style/deps.scss'))
    expect(css).toMatchSnapshot()
  })

  it.each(['ui', 'sbanken'])(
    'has to match theme css for %s',
    (themeName) => {
      const css = loadScss(
        require.resolve(
          `../style/themes/dnb-button-theme-${themeName}.scss`
        )
      )
      expect(css).toMatchSnapshot()
    }
  )
})
```

## Support Axe test

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
        collapsed={false}
      />
    )
    expect(await axeComponent(Component)).toHaveNoViolations()
  })
})
```

### Bundle size checks

Eufemia uses [BundleWatch](https://bundlewatch.io/) to track selected build artifacts in CI.

How it works:

- The setup lives in `packages/dnb-eufemia/bundlewatch.config.js`.
- CI runs the check in `.github/workflows/verify.yml` after `postbuild:ci`, so it measures the actual emitted build files.
- Each watched file has its own `maxSize`, based on the current gzip-compressed output with some headroom for future changes.
- The check is meant to catch regressions in meaningful emitted bundles, not to report every generated file in the package.

What is included:

- UMD and ESM `dnb-ui-*` bundles, except icon entry bundles.
- Core `dnb-ui-*` CSS bundles.
- Non-isolated theme CSS bundles under `build/style/themes/`.

What is excluded:

- `dnb-ui-icons` entry bundles are excluded on purpose because they are thin import/re-export wrappers and do not represent a meaningful payload by themselves.
- Isolated CSS bundles are excluded to keep the reporting focused on the primary outputs.

When updating limits:

- If a deliberate change increases a bundle size, update the matching limit in `bundlewatch.config.js`.
- Prefer checking the local `build:size` output before changing limits, so the new threshold is based on the current emitted gzip size.

Run the commands locally if needed to emulate the CI checks:

```bash
# Build the library outputs that BundleWatch measures
yarn workspace @dnb/eufemia build:ci

# Check the watched bundle sizes locally
yarn workspace @dnb/eufemia build:size
```


# (Optional) Update change logs

Changes to `@dnb/eufemia` have to be mentioned by using a [git commit message decoration](/contribute/style-guides/git/#commit-messages). During the next release, the package `CHANGELOG.md` file will be updated and changes will get listed on the [GitHub Releases](https://github.com/dnbexperience/eufemia/releases) page.

General Eufemia **Design System** changes have to be written down in the `EUFEMIA_CHANGELOG.md` file, located in the docs. This file should only be updated if there is a change in the `@dnb/eufemia` package, which affects the components, elements or extensions.


# Commit changes

Commit your change and create a _Pull Request_ to the `origin/main` branch. Check out the [Git convention](/contribute/style-guides/git) for how to commit and make _Pull Request_.

From a Fork:

- Make your changes in your Fork and create a _Pull Request_ back to the Eufemia repo and `origin/main`.
- Watch the result of the tests.

With access to the Eufemia repo:

- Make your changes and commit it to the repo in a new branch.
- Make a _Pull Request_ to `origin/main`.
- Watch the result of the tests.

## How to write a commit message

Please have a look at the [Git convention](/contribute/style-guides/git) for how to write a commit message.

## Submit Algolia search queries locally

In order to submit Algolia search queries to the `dev_eufemia_docs` index, you have to:

Create a `.env` file inside `dnb-design-system-portal` with valid:

- `ALGOLIA_INDEX_NAME=dev_eufemia_docs`
- `ALGOLIA_APP_ID=SLD6KEYMQ9`
- `ALGOLIA_API_KEY=secret`
