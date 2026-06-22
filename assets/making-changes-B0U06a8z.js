import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Making changes`}),`
`,(0,r.jsx)(t.h2,{children:`Check out a new branch`}),`
`,(0,r.jsxs)(t.p,{children:[`Make a new working branch and name it e.g. `,(0,r.jsx)(t.code,{children:`fix/my-branch-name`}),` or `,(0,r.jsx)(t.code,{children:`feat/my-feature-name`}),`. Check out `,(0,r.jsx)(t.a,{href:`/contribute/style-guides/git`,children:`Git convention`}),` for naming.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`# Make a Feature branch
$ git checkout -b feat/my-feature
`})}),`
`,(0,r.jsx)(t.h2,{children:`Add changes`}),`
`,(0,r.jsxs)(t.p,{children:[`Inside `,(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia`}),`, you will find the directory `,(0,r.jsx)(t.code,{children:`/src/components`}),` or `,(0,r.jsx)(t.code,{children:`/src/extensions`}),`. There you can place a new directory with all the necessary subfolders. As a reference, take a look at Component folder section in `,(0,r.jsx)(t.a,{href:`/contribute/first-contribution/before-started#component-folder`,children:`Before getting started`}),`.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Run the Eufemia Portal with `,(0,r.jsx)(t.code,{children:`yarn start`}),`. Make sure you follow the `,(0,r.jsx)(t.a,{href:`/contribute/style-guides/coding`,children:`Code guide`}),` during development.`]}),`
`,(0,r.jsx)(t.h2,{children:`How a component should be structured`}),`
`,(0,r.jsx)(t.p,{children:`A component should be structured as follows:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import type { ComponentProps } from './types.ts'
export type * from './types.ts'

function MyComponent(props: ComponentProps) {
  return helperFunction(<button text="My Component" />)
}

export function helperFunction(children: React.ReactNode) {
  return children
}

export default MyComponent
`})}),`
`,(0,r.jsx)(t.h2,{children:`Styling, CSS and SCSS of components`}),`
`,(0,r.jsx)(t.p,{children:`Each component has two or three SCSS files.`}),`
`,(0,r.jsx)(t.p,{children:`All layout and position-related styles go here:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`})}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`CSS packages`}),`
`,(0,r.jsxs)(t.p,{children:[`SCSS file names starting with `,(0,r.jsx)(t.code,{children:`dnb-`}),` can later be imported as individual packages:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/src/components/button/style/dnb-button.scss`})}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Style dependencies`}),`
`,(0,r.jsxs)(t.p,{children:[`In order to test related style dependencies of components, we add style imports in the `,(0,r.jsx)(t.code,{children:`deps.scss`}),` file, which is then used in Jest tests to perform a snapshot comparison:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/src/components/button/style/deps.scss`})}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`SCSS Theming`}),`
`,(0,r.jsxs)(t.p,{children:[`Styles that belong to a "theming footprint" – like colors or individual variants – can be put inside the `,(0,r.jsx)(t.code,{children:`/themes`}),` directory:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/src/components/button/style/themes/dnb-button-theme-ui.scss`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Theming file names ending with `,(0,r.jsx)(t.code,{children:`-ui`}),` will be packed into the global theming package during release. More details in the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming`,children:`theming section`}),`.`]}),`
`,(0,r.jsx)(t.h3,{children:`SCSS utilities`}),`
`,(0,r.jsxs)(t.p,{children:[`Use the same SCSS setup as all the other components. You may re-use all the `,(0,r.jsx)(t.a,{href:`/uilib/helpers/classes`,children:`helper classes`}),`:`]}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/src/style/core/utilities.scss`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Create a local build`}),`
`,(0,r.jsxs)(t.p,{children:[`Next, we need to create a local build (prebuild) by using `,(0,r.jsx)(t.code,{children:`yarn build`}),` again.`]}),`
`,(0,r.jsx)(t.p,{children:`Running the build command will walk through all parts and tie together the needed pieces in order to generate valid build bundles.`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ yarn build
`})}),`
`,(0,r.jsxs)(t.p,{children:[`You can find the output in the `,(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/build`}),` folder.`]}),`
`,(0,r.jsx)(t.h2,{children:`Additional component support`}),`
`,(0,r.jsx)(t.h3,{children:`Locale support`}),`
`,(0,r.jsxs)(t.p,{children:[`Put your translation inside: `,(0,r.jsx)(t.code,{children:`./packages/dnb-eufemia/src/shared/locales/nb-NO.js`}),` as well as in the `,(0,r.jsx)(t.code,{children:`en-GB.js`}),` file:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`export default {
  'nb-NO': {
    MyComponent: {
      myString: '...',
    },
  },
}
`})}),`
`,(0,r.jsx)(t.p,{children:`And use it as so:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
`,(0,r.jsxs)(t.p,{children:[`The function `,(0,r.jsx)(t.code,{children:`getTranslation`}),` will, along with the properties, support both `,(0,r.jsx)(t.code,{children:`locale`}),` and the HTML `,(0,r.jsx)(t.code,{children:`lang`}),` attribute. This way, these properties can be set on a per-component basis and a per-context basis.`]}),`
`,(0,r.jsx)(t.h3,{children:`Provider support`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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

  const { myParam, ...rest } = extendPropsWithContext(
    props,
    defaultProps,
    context.MyComponent
    // ...
  )

  // Use myParam and spread the ...rest
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`"Form element" components`}),`
`,(0,r.jsx)(t.p,{children:`Form elements, like input, checkbox, slider etc. should include some extra functionality in order to be used in various situations.`}),`
`,(0,r.jsxs)(t.p,{children:[`Basically, components we would place inside an HTML `,(0,r.jsx)(t.code,{children:`<form>`}),` element.`]}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Label vs fieldset/legend`})}),`
`,(0,r.jsx)(t.p,{children:`They should be declared as a form element:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`FormComponent._formElement = true
`})}),`
`,(0,r.jsx)(t.p,{children:`This helps e.g. to detect automated determination of label vs fieldset/legend.`}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Spacing`})}),`
`,(0,r.jsx)(t.p,{children:`And they should be declared to support spacing properties as well:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`FormComponent._supportsSpacingProps = true
`})}),`
`,(0,r.jsxs)(t.p,{children:[`This is needed in order to fully support `,(0,r.jsx)(t.a,{href:`/uilib/layout/flex/`,children:`Flex`}),` layouts.`]}),`
`,(0,r.jsxs)(t.h4,{children:[`Usage of `,(0,r.jsx)(t.code,{children:`pickFormElementProps`})]}),`
`,(0,r.jsxs)(t.p,{children:[`In order to support form element properties, such as `,(0,r.jsx)(t.code,{children:`vertical`}),` or `,(0,r.jsx)(t.code,{children:`labelDirection`}),`, you can use `,(0,r.jsx)(t.code,{children:`pickFormElementProps`}),`, so only valid properties will affect the component.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
    pickFormElementProps(context?.formElement),
    context.FormComponent
  )

  // Use myParam and spread the ...rest
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`Spacing support`}),`
`,(0,r.jsxs)(t.p,{children:[`How you make `,(0,r.jsx)(t.a,{href:`/uilib/layout/space`,children:`spacing`}),` support available varies from case to case. But you may always allow the developer to pass in the spacing properties to the very root element of your component.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
import { clsx } from 'clsx'
import {
  validateDOMAttributes,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'

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

  // This hook applies spacing classes and CSS custom properties to the root element props
  const rootParams = useSpacing(props, {
    ...rest,
    className: clsx('dnb-my-component', className),
  })

  // Spread the ...rootParams on your root element
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`Skeleton support`}),`
`,(0,r.jsxs)(t.p,{children:[`How you make skeleton support available varies from case to case. There is also more info on how to create a `,(0,r.jsx)(t.a,{href:`/uilib/components/skeleton#create-custom-skeleton`,children:`custom skeleton`}),`. But in case your component supports the `,(0,r.jsx)(t.code,{children:`skeleton`}),` boolean property, then you may ensure it both can be set locally on the component, and it reacts on the global Context.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { Context } from '../../shared'
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
  const skeletonClassName = createSkeletonClass(
    'shape',
    skeleton,
    context,
    className
  )

  // Use skeleton, skeletonClassName and spread the ...rest
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`TypeScript types`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import React from 'react'
import type { SpacingProps } from '../../shared/types'
import type { ComponentProps } from './my-component/types'

export type * from './new-component/types'

export type ComponentAllProps = ComponentProps &
  React.HTMLProps<HTMLElement>

function MyComponent(props: ComponentAllProps) {}
`})}),`
`,(0,r.jsx)(t.h2,{children:`Write documentation`}),`
`,(0,r.jsx)(t.p,{children:`All components have their own directory inside:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.code,{children:`./packages/dnb-design-system-portal/src/docs/uilib/...`})}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`You may have a look at the `,(0,r.jsx)(t.a,{href:`/contribute/style-guides/documentation`,children:`Documentation guide`}),` and existing docs in order to get the right structure.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};