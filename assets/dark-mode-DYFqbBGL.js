import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import{n as r,t as i}from"./Examples-MidJc7Bl.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return r||c(`Examples`,!1),i||c(`Examples.DarkModeTokenSwatches`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`Dark mode guide`}),`
`,(0,a.jsx)(t.p,{children:`Dark mode changes the active color scheme. It does not change how you choose semantic tokens.`}),`
`,(0,a.jsx)(t.p,{children:`Start with the same semantic token family you would use in light mode, then adjust only when the surface relationship changes:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`Use the base token when the content sits on the current color scheme's default surface.`}),`
`,(0,a.jsxs)(t.li,{children:[`Use the `,(0,a.jsx)(t.code,{children:`inverse`}),` variant when the content sits on a surface that follows the opposite color scheme.`]}),`
`,(0,a.jsxs)(t.li,{children:[`Use the `,(0,a.jsx)(t.code,{children:`ondark`}),` variant when the content sits on a local dark surface, regardless of the surrounding color scheme.`]}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Choosing the right variant`}),`
`,(0,a.jsx)(t.h3,{children:`Base tokens follow the current scheme`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`--token-color-text-neutral`}),`, `,(0,a.jsx)(t.code,{children:`--token-color-icon-neutral`}),`, `,(0,a.jsx)(t.code,{children:`--token-color-text-action`}),`, and `,(0,a.jsx)(t.code,{children:`--token-color-icon-action`}),` are the default choice for content that lives on the page's normal surface.`]}),`
`,(0,a.jsx)(t.p,{children:`If the application changes from light mode to dark mode, those same token names adapt automatically. In most cases, this is all you need.`}),`
`,(0,a.jsxs)(t.h3,{children:[(0,a.jsx)(t.code,{children:`inverse`}),` is for the opposite scheme`]}),`
`,(0,a.jsxs)(t.p,{children:[`Use `,(0,a.jsx)(t.code,{children:`inverse`}),` when the surrounding surface should feel like the opposite color scheme.`]}),`
`,(0,a.jsx)(t.p,{children:`Typical examples are overlays, promotional blocks, or embedded areas that intentionally contrast with the current page mode. The token keeps the semantic role, but flips the contrast relationship.`}),`
`,(0,a.jsxs)(t.h3,{children:[(0,a.jsx)(t.code,{children:`ondark`}),` is for local dark surfaces`]}),`
`,(0,a.jsxs)(t.p,{children:[`Use `,(0,a.jsx)(t.code,{children:`ondark`}),` when the background is dark because of the component or section itself, not because the whole app switched to dark mode.`]}),`
`,(0,a.jsxs)(t.p,{children:[`That distinction matters because a local dark card inside light mode and a full dark-mode page are not the same thing. `,(0,a.jsx)(t.code,{children:`ondark`}),` communicates that the content must stay readable on a dark surface in either case.`]}),`
`,(0,a.jsx)(t.h3,{children:`Variant behavior in each scheme`}),`
`,(0,a.jsx)(t.h4,{children:`Light color scheme`}),`
`,(0,a.jsxs)(t.p,{children:[`Use the base token on the current surface, switch to `,(0,a.jsx)(t.code,{children:`inverse`}),` when the surface follows the opposite scheme, and use `,(0,a.jsx)(t.code,{children:`ondark`}),` for a local dark surface.`]}),`
`,(0,a.jsx)(t.h4,{children:`Dark color scheme`}),`
`,(0,a.jsxs)(t.p,{children:[`The same semantic token names adapt automatically in dark mode. Only `,(0,a.jsx)(t.code,{children:`inverse`}),` and `,(0,a.jsx)(t.code,{children:`ondark`}),` change the surface relationship.`]}),`
`,(0,a.jsx)(t.h3,{children:`Color token swatches`}),`
`,(0,a.jsx)(i,{}),`
`,(0,a.jsx)(t.h2,{children:`Practical rule`}),`
`,(0,a.jsx)(t.p,{children:`Choose the token by semantic role first, then by surface relationship:`}),`
`,(0,a.jsxs)(t.ol,{children:[`
`,(0,a.jsx)(t.li,{children:`Is this neutral content or action content?`}),`
`,(0,a.jsx)(t.li,{children:`Is it on the current scheme, the opposite scheme, or a local dark surface?`}),`
`,(0,a.jsxs)(t.li,{children:[`Pick the base, `,(0,a.jsx)(t.code,{children:`inverse`}),`, or `,(0,a.jsx)(t.code,{children:`ondark`}),` variant accordingly.`]}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`If you are styling Eufemia components, prefer `,(0,a.jsx)(t.code,{children:`surface="dark"`}),` where supported. Components already switch to the correct `,(0,a.jsx)(t.code,{children:`ondark`}),` variants automatically.`]}),`
`,(0,a.jsx)(t.h2,{children:`Common pattern`}),`
`,(0,a.jsxs)(t.p,{children:[`Dark mode tokens are not included in the default theme import. Import the extra dark mode stylesheet before using `,(0,a.jsx)(t.code,{children:`colorScheme`}),`:`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`// DNB theme
import '@dnb/eufemia/style/themes/ui/ui-theme-dark-mode.min.css' // Use --isolated.min.css for style isolation

// Sbanken theme
import '@dnb/eufemia/style/themes/sbanken/sbanken-theme-dark-mode.min.css' // Use --isolated.min.css for style isolation
`})}),`
`,(0,a.jsxs)(t.p,{children:[`For runtime setup, persistence, and SSR details, see the `,(0,a.jsxs)(t.a,{href:`/uilib/usage/customisation/theming/theme/#the-colorscheme-property-dark-mode`,children:[(0,a.jsx)(t.code,{children:`colorScheme`}),` property`]}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`If you render on the server, also read `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/theming/theme/#preventing-dark-mode-flash-fouc`,children:`Preventing dark mode flash (FOUC)`}),`.`]}),`
`,(0,a.jsx)(t.p,{children:`When your app switches the whole UI to dark mode, keep using the base semantic tokens once the dark mode stylesheet is loaded:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme colorScheme="dark">
    <App />
  </Theme>
)
`})}),`
`,(0,a.jsx)(t.p,{children:`When a single component can appear on a dark surface, swap only the local token references:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`.my-card {
  --card-text-color: var(--token-color-text-neutral);
  --card-icon-color: var(--token-color-icon-neutral);
}

.my-card--on-dark {
  --card-text-color: var(--token-color-text-neutral-ondark);
  --card-icon-color: var(--token-color-icon-neutral-ondark);
}

.my-card__title {
  color: var(--card-text-color);
}

.my-card__icon {
  color: var(--card-icon-color);
}
`})}),`
`,(0,a.jsx)(t.p,{children:`Use the same pattern for action-colored content:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`.my-link-card {
  --card-link-color: var(--token-color-text-action);
  --card-link-icon-color: var(--token-color-icon-action);
}

.my-link-card--inverse {
  --card-link-color: var(--token-color-text-action-inverse);
  --card-link-icon-color: var(--token-color-icon-action-inverse);
}

.my-link-card--on-dark {
  --card-link-color: var(--token-color-text-action-ondark);
  --card-link-icon-color: var(--token-color-icon-action-ondark);
}
`})})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{s as default};