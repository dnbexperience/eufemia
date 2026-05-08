import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsx)(r.p,{children:`The Theme component is a helper component that lets you create nested theming solutions.`}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`NB:`}),` `,(0,n.jsx)(r.code,{children:`<Theme>`}),` wraps its children in a `,(0,n.jsx)(r.code,{children:`div`}),` by default. Use e.g. `,(0,n.jsx)(r.code,{children:`element="span"`}),` to change the wrapper element, or use `,(0,n.jsx)(r.code,{children:`Theme.Context`}),` to skip the wrapper entirely (see below).`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme, useTheme } from '@dnb/eufemia/shared'

const Component = () => {
  const themeName = useTheme()?.name
  return 'My Component'
}

render(
  <Theme name="sbanken">
    <App>
      <MyComponent />
    </App>
  </Theme>
)
`})}),`
`,(0,n.jsx)(r.p,{children:`From CSS you can use it as so:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.code,{children:`.eufemia-theme__sbanken`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`.eufemia-theme[data-name="sbanken"]`}),` (alternative)`]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`CSS`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`.eufemia-theme__sbanken .additional-selector {
  --color-sea-green: var(--sb-color-purple-alternative);
}
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`SCSS`})}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-scss`,children:`:global(.eufemia-theme__sbanken) {
  .additional-selector {
    --color-sea-green: var(--sb-color-purple-alternative);
  }
}
`})}),`
`,(0,n.jsxs)(r.h3,{children:[`React Hook `,(0,n.jsx)(r.code,{children:`useTheme`})]}),`
`,(0,n.jsxs)(r.p,{children:[`For accessing the theme context, you can use the `,(0,n.jsx)(r.code,{children:`useTheme`}),` Hook. It returns the theme context, with an addition of boolean constants like `,(0,n.jsx)(r.code,{children:`isSbanken`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme, useTheme } from '@dnb/eufemia/shared'

const Component = () => {
  // Result: { name: 'sbanken', isUi: false, isSbanken: true, isEiendom: false }
  const theme = useTheme()
  const { name, isUi, isSbanken, isEiendom } = theme || {}
  return null
}

render(
  <Theme name="sbanken">
    <App>
      <MyComponent />
    </App>
  </Theme>
)
`})}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`NB:`}),` If no context is given, the hook will return `,(0,n.jsx)(r.code,{children:`null`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`Theme.Context`}),`
`,(0,n.jsxs)(r.p,{children:[`You can use `,(0,n.jsx)(r.code,{children:`Theme.Context`}),` to provide theme properties to children without adding a wrapper element. This is useful in cases where you don't want to add an extra DOM element, but still want to provide theme context to the children.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme.Context>
    Children that receive theme context without an extra wrapper element.
  </Theme.Context>
)
`})}),`
`,(0,n.jsx)(r.h3,{children:`Use your component as the wrapper element`}),`
`,(0,n.jsx)(r.p,{children:`You can provide your component as the wrapper. This way no additional HTML Element will be created.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme } from '@dnb/eufemia/shared'

const Component = ({ className ...props }) => {
  return <div className={className+' more-classes'} {...props} />
}

render(
  <Theme name="theme-name">
    <App>
      <Theme name="sbanken" element={Component}>
        ...
      </Theme>
    </App>
  </Theme>
)
`})}),`
`,(0,n.jsxs)(r.h2,{children:[(0,n.jsx)(r.code,{children:`surface`}),` property`]}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`surface`}),` property can be used to adjust the component's appearance based on the background. It accepts three values: `,(0,n.jsx)(r.code,{children:`dark`}),`, `,(0,n.jsx)(r.code,{children:`light`}),`, and `,(0,n.jsx)(r.code,{children:`initial`}),`.`]}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.code,{children:`dark`}),` when the content is placed on a dark surface.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.code,{children:`light`}),` for light surfaces.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.code,{children:`initial`}),` to tell the components to use its default behavior.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme } from '@dnb/eufemia/shared'

render(
  <Section surface="dark">
    Children will use the dark surface behavior (ondark).
    <Theme.Context surface="initial">
      Children will use their default surface behavior
    </Theme.Context>
  </Section>
)
`})}),`
`,(0,n.jsxs)(r.h3,{children:[`How `,(0,n.jsx)(r.code,{children:`surface`}),` works`]}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`surface`}),` prop is passed through `,(0,n.jsx)(r.strong,{children:`React context`}),`, not through a global CSS class. When you set `,(0,n.jsx)(r.code,{children:`surface="dark"`}),` on a `,(0,n.jsx)(r.code,{children:`<Theme>`}),`, `,(0,n.jsx)(r.code,{children:`<Theme.Context>`}),`, or on a supporting component like `,(0,n.jsx)(r.a,{href:`/uilib/components/section/`,children:`Section`}),`, the value is stored in the Eufemia theme context. Individual components that support dark surfaces — such as `,(0,n.jsx)(r.a,{href:`/uilib/components/button/`,children:`Button`}),` or `,(0,n.jsx)(r.a,{href:`/uilib/components/anchor/`,children:`Anchor`}),` — read the surface value from context and apply their own component-level CSS class (e.g. `,(0,n.jsx)(r.code,{children:`dnb-button--surface-dark`}),`, `,(0,n.jsx)(r.code,{children:`dnb-anchor--surface-dark`}),`).`]}),`
`,(0,n.jsxs)(r.p,{children:[`Wrap an area with `,(0,n.jsx)(r.code,{children:`<Theme.Context>`}),` or `,(0,n.jsx)(r.code,{children:`<Section>`}),` to propagate the surface context to all supporting components inside:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Theme.Context surface="dark">
  <Button>I adapt automatically</Button>
  <Anchor href="/path">So do I</Anchor>
</Theme.Context>
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Use `,(0,n.jsx)(r.code,{children:`surface="initial"`}),` to reset components back to their default behavior inside a dark surface context:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Section surface="dark">
  <Button>Dark surface button</Button>
  <Theme.Context surface="initial">
    <Button>Default surface button</Button>
  </Theme.Context>
</Section>
`})}),`
`,(0,n.jsxs)(r.h2,{children:[`The `,(0,n.jsx)(r.code,{children:`colorScheme`}),` property (Dark mode)`]}),`
`,(0,n.jsxs)(r.p,{children:[`The `,(0,n.jsx)(r.code,{children:`Theme`}),` component accepts a `,(0,n.jsx)(r.code,{children:`colorScheme`}),` prop that controls dark and light mode.`]}),`
`,(0,n.jsxs)(r.p,{children:[`When set to `,(0,n.jsx)(r.code,{children:`"auto"`}),`, it follows the user's system color preference unless overridden by a parent theme or application setting. It uses the `,(0,n.jsx)(r.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme`,children:(0,n.jsx)(r.code,{children:`prefers-color-scheme`})}),` media query to detect the system preference.`]}),`
`,(0,n.jsxs)(r.p,{children:[`Dark mode tokens are not included in the default theme import. Import the extra dark mode stylesheet before using `,(0,n.jsx)(r.code,{children:`colorScheme`}),`:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme } from '@dnb/eufemia/shared'

// Required: import dark mode tokens
import '@dnb/eufemia/style/themes/ui/ui-theme-dark-mode--isolated.min.css' // If style isolation is used

render(
  <Theme colorScheme="auto">
    <App />
  </Theme>
)
`})}),`
`,(0,n.jsxs)(r.p,{children:[`For guidance on choosing between base, `,(0,n.jsx)(r.code,{children:`inverse`}),`, and `,(0,n.jsx)(r.code,{children:`ondark`}),` token variants in your own components, see the `,(0,n.jsx)(r.a,{href:`/uilib/usage/customisation/theming/design-tokens/dark-mode`,children:`Design Tokens dark mode guide`}),`.`]}),`
`,(0,n.jsxs)(r.h2,{children:[`Persisting the theme with `,(0,n.jsx)(r.code,{children:`getTheme`}),` and `,(0,n.jsx)(r.code,{children:`setTheme`})]}),`
`,(0,n.jsxs)(r.p,{children:[`Eufemia provides `,(0,n.jsx)(r.code,{children:`getTheme`}),` and `,(0,n.jsx)(r.code,{children:`setTheme`}),` helpers that persist theme state (including `,(0,n.jsx)(r.code,{children:`colorScheme`}),`) to `,(0,n.jsx)(r.code,{children:`localStorage`}),` under the key `,(0,n.jsx)(r.code,{children:`eufemia-theme`}),`.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { getTheme, setTheme } from '@dnb/eufemia/shared/Theme'

// Read the current persisted theme
const theme = getTheme()
// { name: 'ui', colorScheme: 'auto', ... }

// Update one or more properties (merges with existing state)
setTheme({ colorScheme: 'dark' })

// With a callback
setTheme({ name: 'sbanken' }, (updatedTheme) => {
  console.log(updatedTheme)
})
`})}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`getTheme`}),` also supports a `,(0,n.jsx)(r.code,{children:`?eufemia-theme=<name>`}),` URL query parameter, which overrides the persisted theme name. This is useful for testing or previewing themes via a link.`]}),`
`,(0,n.jsx)(r.h3,{children:`Preventing dark mode flash (FOUC)`}),`
`,(0,n.jsxs)(r.p,{children:[`When using `,(0,n.jsx)(r.code,{children:`colorScheme="system"`}),`, the resolved color scheme depends on the user's system preference, which is only available in the browser. During server-side rendering (SSR), this can cause a brief flash of the wrong color scheme before React hydrates.`]}),`
`,(0,n.jsxs)(r.p,{children:[`To prevent this, Eufemia provides blocking scripts that run synchronously before the browser paints. They read the stored preference from `,(0,n.jsx)(r.code,{children:`localStorage`}),` and apply the correct CSS classes immediately.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import {
  ColorSchemeHeadScript,
  ColorSchemeBodyFirstScript,
  ColorSchemeBodyLastScript,
} from '@dnb/eufemia/shared/ColorSchemeScript'
`})}),`
`,(0,n.jsx)(r.p,{children:`Place them in your HTML template as follows:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`<html>
  <head>
    <ColorSchemeHeadScript />
  </head>
  <body>
    <ColorSchemeBodyFirstScript />
    {/* your app content */}
    <ColorSchemeBodyLastScript />
  </body>
</html>
`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:`ColorSchemeHeadScript`})}),` — Resolves the color scheme from `,(0,n.jsx)(r.code,{children:`localStorage`}),` (or falls back to the system preference) and stores it on `,(0,n.jsx)(r.code,{children:`globalThis`}),`. Place in `,(0,n.jsx)(r.code,{children:`<head>`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:`ColorSchemeBodyFirstScript`})}),` — Adds the resolved color-scheme class to `,(0,n.jsx)(r.code,{children:`<body>`}),`. Place as the first child of `,(0,n.jsx)(r.code,{children:`<body>`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:(0,n.jsx)(r.code,{children:`ColorSchemeBodyLastScript`})}),` — Swaps color-scheme classes on server-rendered `,(0,n.jsx)(r.code,{children:`Theme`}),` elements so they match the resolved scheme. Place as the last child of `,(0,n.jsx)(r.code,{children:`<body>`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Hide or show parts of your component (filter)`}),`
`,(0,n.jsx)(r.p,{children:`With this helper function you show or hide content based on inherited theme properties.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { Theme, VisibilityByTheme } from '@dnb/eufemia/shared'

render(
  <Theme name="...">
    <VisibilityByTheme visible="sbanken">
      Only shown in Sbanken theme
    </VisibilityByTheme>

    <VisibilityByTheme hidden="eiendom">
      Only hidden in Eiendom theme
    </VisibilityByTheme>

    <VisibilityByTheme visible={['sbanken', 'eiendom']}>
      Only shown in Sbanken or Eiendom theme
    </VisibilityByTheme>

    <VisibilityByTheme
      visible={[{ name: 'sbanken' }, { name: 'eiendom' }]}
    >
      Only shown in Sbanken or Eiendom theme
    </VisibilityByTheme>

    <VisibilityByTheme
      visible={[{ name: 'sbanken' }, { name: 'eiendom', variant: 'blue' }]}
    >
      Only shown in Sbanken then or Eiendom theme – that also includes the
      fictive variant="blue".
    </VisibilityByTheme>
  </Theme>
)
`})}),`
`,(0,n.jsx)(r.h3,{children:`Integrations`}),`
`,(0,n.jsx)(r.p,{children:`When integrating runtime theme switching, your app can be wrapped with this theme component.`})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}function a(e){return(0,n.jsx)(i,{})}function o(e={}){let{wrapper:r}={...t(),...e.components};return r?(0,n.jsx)(r,{...e,children:(0,n.jsx)(a,{...e})}):a(e)}export{o as default};