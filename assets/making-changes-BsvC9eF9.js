import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Making changes`}),`
`,(0,n.jsx)(r.h2,{children:`Check out a new branch`}),`
`,(0,n.jsxs)(r.p,{children:[`Make a new working branch and name it e.g. `,(0,n.jsx)(r.code,{children:`fix/my-branch-name`}),` or `,(0,n.jsx)(r.code,{children:`feat/my-feature-name`}),`. Check out `,(0,n.jsx)(r.a,{href:`/contribute/style-guides/git`,children:`Git convention`}),` for naming.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`# Make a Feature branch
$ git checkout -b feat/my-feature
`})}),`
`,(0,n.jsx)(r.h2,{children:`Add changes`}),`
`,(0,n.jsxs)(r.p,{children:[`Inside `,(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia`}),` you will find the directory `,(0,n.jsx)(r.code,{children:`/src/components`}),` or `,(0,n.jsx)(r.code,{children:`/src/extensions`}),`. There you can place a new directory with all the necessary sub folders. As a reference, take a look at Component folder section in `,(0,n.jsx)(r.a,{href:`/contribute/first-contribution/before-started#component-folder`,children:`Before getting started`}),`.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Run an environment with either `,(0,n.jsx)(r.code,{children:`yarn dev`}),` (for Storybook) or `,(0,n.jsx)(r.code,{children:`yarn start`}),` (for Eufemia Portal). Make sure you follow the `,(0,n.jsx)(r.a,{href:`/contribute/style-guides/coding`,children:`Code guide`}),` under development.`]}),`
`,(0,n.jsx)(r.h2,{children:`How a component should be structured`}),`
`,(0,n.jsx)(r.p,{children:`A component should be structured as follows:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import type { ComponentProps } from './types.ts'
export type * from './types.ts'

function MyComponent(props: ComponentProps) {
  return helperFunction(<button text="My Component" />)
}

export function helperFunction(children: React.ReactNode) {
  return children
}

export default MyComponent
`})}),`
`,(0,n.jsx)(r.h2,{children:`Styling, CSS and SCSS of components`}),`
`,(0,n.jsx)(r.p,{children:`Each component has two or three SCSS files.`}),`
`,(0,n.jsx)(r.p,{children:`All layout and position related styles go here:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`CSS packages`}),`
`,(0,n.jsxs)(r.p,{children:[`SCSS file names starting with `,(0,n.jsx)(r.code,{children:`dnb-`}),` are later possible to get imported as individual packages:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Style dependencies`}),`
`,(0,n.jsxs)(r.p,{children:[`In order to test related style dependencies of components, we add style imports in the `,(0,n.jsx)(r.code,{children:`deps.scss`}),` file, which again is used in Jest tests to perform a snapshot comparison:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/src/components/button/style/deps.scss`})}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`SCSS Theming`}),`
`,(0,n.jsxs)(r.p,{children:[`Styles that belong to a "theming footprint" – like colors or individual variants – can be put inside the `,(0,n.jsx)(r.code,{children:`/themes`}),` directory:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/src/components/button/style/themes/dnb-button-theme-ui.scss`})}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Theming file names ending with `,(0,n.jsx)(r.code,{children:`-ui`}),` will during the package release get packed into the global theming package. More details in the `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/theming`,children:`theming section`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`SCSS utilities`}),`
`,(0,n.jsxs)(r.p,{children:[`Use the same SASS setup as all the other components. You may re-use all the `,(0,n.jsx)(r.a,{href:`/uilib/helpers/classes`,children:`helper classes`}),`:`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/src/style/core/utilities.scss`})}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Create a local build`}),`
`,(0,n.jsxs)(r.p,{children:[`Next, we need to create a local build (prebuild) by using `,(0,n.jsx)(r.code,{children:`yarn build`}),` again.`]}),`
`,(0,n.jsx)(r.p,{children:`Running the build command will walk through all parts and tie together all needed parts (index files of new components) in order to generate valid build bundles.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`$ yarn build
`})}),`
`,(0,n.jsxs)(r.p,{children:[`You can find the output in the `,(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/build`}),` folder.`]}),`
`,(0,n.jsx)(r.h2,{children:`Additional component support`}),`
`,(0,n.jsx)(r.h3,{children:`Locale support`}),`
`,(0,n.jsxs)(r.p,{children:[`Put your translation inside: `,(0,n.jsx)(r.code,{children:`./packages/dnb-eufemia/src/shared/locales/nb-NO.js`}),` as well as to the `,(0,n.jsx)(r.code,{children:`en-GB.js`}),` file:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`export default {
  'nb-NO': {
    MyComponent: {
      myString: '...',
    },
  },
}
`})}),`
`,(0,n.jsx)(r.p,{children:`And use it as so:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
`})}),`
`,(0,n.jsxs)(r.p,{children:[`The function `,(0,n.jsx)(r.code,{children:`getTranslation`}),` will along with the properties support both `,(0,n.jsx)(r.code,{children:`locale`}),` and the HTML `,(0,n.jsx)(r.code,{children:`lang`}),` attribute. This way, these properties can be set by a component basis and a context basis.`]}),`
`,(0,n.jsx)(r.h3,{children:`Provider support`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
`})}),`
`,(0,n.jsx)(r.h3,{children:`"Form element" components`}),`
`,(0,n.jsx)(r.p,{children:`Form elements, like input, checkbox, slider etc. should include some extra functionality in order to be used in various situations.`}),`
`,(0,n.jsxs)(r.p,{children:[`Basically, components we would place inside an HTML `,(0,n.jsx)(r.code,{children:`<form>`}),` element.`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Label vs fieldset/legend`})}),`
`,(0,n.jsx)(r.p,{children:`They should be declared as a form element:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`FormComponent._formElement = true
`})}),`
`,(0,n.jsx)(r.p,{children:`This helps e.g. to detect automated determination of label vs fieldset/legend.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Spacing`})}),`
`,(0,n.jsx)(r.p,{children:`And they should be declared to support spacing properties as well:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`FormComponent._supportsSpacingProps = true
`})}),`
`,(0,n.jsxs)(r.p,{children:[`This is needed in order to fully support `,(0,n.jsx)(r.a,{href:`/uilib/layout/flex/`,children:`Flex`}),` layouts.`]}),`
`,(0,n.jsxs)(r.h4,{children:[`Usage of `,(0,n.jsx)(r.code,{children:`pickFormElementProps`})]}),`
`,(0,n.jsxs)(r.p,{children:[`In order to support form element properties, such as `,(0,n.jsx)(r.code,{children:`vertical`}),` or `,(0,n.jsx)(r.code,{children:`labelDirection`}),`, you can use `,(0,n.jsx)(r.code,{children:`pickFormElementProps`}),`, so only valid properties will affect the component.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
`})}),`
`,(0,n.jsx)(r.h3,{children:`Spacing support`}),`
`,(0,n.jsxs)(r.p,{children:[`It depends from case to case on how you would make `,(0,n.jsx)(r.a,{href:`/uilib/layout/space`,children:`spacing`}),` support available. But you may always allow the developer to pass in the spacing properties to the very root element of your component.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
`})}),`
`,(0,n.jsx)(r.h3,{children:`Skeleton support`}),`
`,(0,n.jsxs)(r.p,{children:[`It depends from case to case on how you would make skeleton support available. There is also more info on how to create a `,(0,n.jsx)(r.a,{href:`/uilib/components/skeleton#create-custom-skeleton`,children:`custom skeleton`}),`. But in case your component supports the `,(0,n.jsx)(r.code,{children:`skeleton`}),` boolean property, then you may ensure it both can be set locally on the component, and it reacts on the global Context.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
`})}),`
`,(0,n.jsx)(r.h3,{children:`TypeScript types`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import React from 'react'
import type { SpacingProps } from '../../shared/types'
import type { ComponentProps } from './my-component/types'

export type * from './new-component/types'

export type ComponentAllProps = ComponentProps &
  React.HTMLProps<HTMLElement>

function MyComponent(props: ComponentAllProps) {}
`})}),`
`,(0,n.jsx)(r.h2,{children:`Write documentation`}),`
`,(0,n.jsx)(r.p,{children:`All components have their own directory inside:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`./packages/dnb-design-system-portal/src/docs/uilib/...`})}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`You may have a look at `,(0,n.jsx)(r.a,{href:`/contribute/style-guides/documentation`,children:`Documentation guide`}),` and existing docs in order to get the right structure.`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};