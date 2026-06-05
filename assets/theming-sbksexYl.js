import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Theming`}),`
`,(0,r.jsx)(t.p,{children:`Eufemia supports theming through design tokens and theme packages. Together, these let you adapt the look and feel of your application to match different brands or visual modes.`}),`
`,(0,r.jsxs)(t.h2,{children:[`Theme component and `,(0,r.jsx)(t.code,{children:`useTheme`}),` hook`]}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia has `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme`,children:`theming helpers`}),`, that lets you create nested theming solutions.`]}),`
`,(0,r.jsx)(t.p,{children:`It provides a React context for theme information, and a helper component to set the active theme and surface.`}),`
`,(0,r.jsx)(t.h2,{children:`Run your application with a different theme`}),`
`,(0,r.jsx)(t.p,{children:`Themes are independent style packages that should not be imported in parallel, but rather one or the other.`}),`
`,(0,r.jsx)(t.p,{children:`You can easily switch the static import of styles to a different theme:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-diff`,children:`import '@dnb/eufemia/style/core' // or /basis when "dnb-core-style" is used
- import '@dnb/eufemia/style/themes/ui'
+ import '@dnb/eufemia/style/themes/eiendom'
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling/consume-styles/#select-a-theme`,children:`how to import styles`}),`.`]}),`
`,(0,r.jsx)(t.p,{children:`However, giving the user the ability to switch a theme during runtime is a different challenge.`}),`
`,(0,r.jsx)(t.p,{children:`The Eufemia Portal (documentation) uses a dedicated runtime theme loader to handle it both in development and production mode.`}),`
`,(0,r.jsx)(t.p,{children:`In future we may provide a built-in solution for runtime theme switching.`}),`
`,(0,r.jsx)(t.h2,{children:`Design tokens`}),`
`,(0,r.jsx)(t.p,{children:`Design tokens are CSS custom properties that store colors and other values used by Eufemia components.`}),`
`,(0,r.jsxs)(t.p,{children:[`Unlike plain CSS variables such as `,(0,r.jsx)(t.code,{children:`--color-sea-green`}),` that map directly to a fixed color, tokens like `,(0,r.jsx)(t.code,{children:`--token-color-text-warning`}),` describe a `,(0,r.jsx)(t.strong,{children:`role`}),`. The actual color behind the token depends on the active theme and surface, making your styles portable across visual contexts.`]}),`
`,(0,r.jsx)(t.h2,{children:`Basic usage`}),`
`,(0,r.jsxs)(t.p,{children:[`Use the `,(0,r.jsx)(t.code,{children:`var()`}),` function to reference a token in your CSS:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`.my-component {
  background-color: var(--token-color-background-neutral-subtle);
  color: var(--token-color-text-neutral);
  border: 1px solid var(--token-color-stroke-neutral);
}

.my-component__title {
  color: var(--token-color-text-neutral);
}

.my-component__action {
  background-color: var(--token-color-background-action);
  color: var(--token-color-text-action-inverse);
}
`})}),`
`,(0,r.jsx)(t.h2,{children:`Dark surfaces`}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.code,{children:`surface="dark"`}),` on the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`Theme`}),` component to tell Eufemia that an area has a dark background. Components inside that area will automatically pick the right colors. The `,(0,r.jsx)(t.code,{children:`ondark`}),` tokens are the color values they switch to.`]}),`
`,(0,r.jsxs)(t.p,{children:[`For example, a button that normally uses `,(0,r.jsx)(t.code,{children:`--token-color-background-action-hover`}),` will switch to `,(0,r.jsx)(t.code,{children:`--token-color-background-action-hover-ondark`}),` when `,(0,r.jsx)(t.code,{children:`surface="dark"`}),` is active.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about `,(0,r.jsx)(t.code,{children:`ondark`}),` tokens and how to use them in custom components in the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/info/#ondark-tokens`,children:`Design Tokens`}),` section.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`surface`}),` property.`]}),`
`,(0,r.jsx)(t.h2,{children:`Dark mode / Color scheme`}),`
`,(0,r.jsxs)(t.p,{children:[`Use the `,(0,r.jsx)(t.code,{children:`colorScheme`}),` prop on the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`Theme`}),` component to control dark and light mode.`]}),`
`,(0,r.jsxs)(t.p,{children:[`When set to `,(0,r.jsx)(t.code,{children:`"auto"`}),`, it follows the user's system color preference unless overridden by a parent theme or application setting. It uses the `,(0,r.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme`,children:(0,r.jsx)(t.code,{children:`prefers-color-scheme`})}),` media query to detect the system preference.`]}),`
`,(0,r.jsx)(t.p,{children:`Dark mode tokens are not included in the default theme import. You need to import them separately:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`// DNB theme
import '@dnb/eufemia/style/themes/ui/ui-theme-dark-mode.min.css' // Use --isolated.min.css for style isolation

// Sbanken theme
import '@dnb/eufemia/style/themes/sbanken/sbanken-theme-dark-mode.min.css'
`})}),`
`,(0,r.jsx)(t.p,{children:`For Tailwind, dark tokens are in a separate file per theme:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`/* DNB theme */
@import '@dnb/eufemia/style/themes/ui/tokens-dark-tailwind.css';

/* Sbanken theme */
@import '@dnb/eufemia/style/themes/sbanken/tokens-dark-tailwind.css';
`})}),`
`,(0,r.jsxs)(t.p,{children:[`When the `,(0,r.jsx)(t.code,{children:`eufemia-theme__color-scheme--dark`}),` class is active, the dark tokens override the same CSS custom property names with dark-appropriate values. For example, `,(0,r.jsx)(t.code,{children:`--token-color-background-page-background`}),` switches from `,(0,r.jsx)(t.code,{children:`--dnb-greyscale-0`}),` (white) to `,(0,r.jsx)(t.code,{children:`--dnb-greyscale-1000`}),` (dark).`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/`,children:`colorScheme`}),` property, including `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/#preventing-dark-mode-flash-fouc`,children:`preventing dark mode flash (FOUC)`}),` for SSR considerations.`]}),`
`,(0,r.jsxs)(t.p,{children:[`For guidance on choosing between base, `,(0,r.jsx)(t.code,{children:`inverse`}),`, and `,(0,r.jsx)(t.code,{children:`ondark`}),` token variants in dark mode, see the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/dark-mode`,children:`Design Tokens dark mode guide`}),`.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};