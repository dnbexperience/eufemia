import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import{n,t as r}from"./Examples-VHUHib2Q.js";var i=e();function a(e){let a={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return n||s(`Examples`,!1),r||s(`Examples.DarkModeTokenSwatches`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h1,{children:`Dark mode guide`}),`
`,(0,i.jsx)(a.p,{children:`Dark mode changes the active color scheme. It does not change how you choose semantic tokens.`}),`
`,(0,i.jsx)(a.p,{children:`Start with the same semantic token family you would use in light mode, then adjust only when the surface relationship changes:`}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsx)(a.li,{children:`Use the base token when the content sits on the current color scheme's default surface.`}),`
`,(0,i.jsxs)(a.li,{children:[`Use the `,(0,i.jsx)(a.code,{children:`inverse`}),` variant when the content sits on a surface that follows the opposite color scheme.`]}),`
`,(0,i.jsxs)(a.li,{children:[`Use the `,(0,i.jsx)(a.code,{children:`ondark`}),` variant when the content sits on a local dark surface, regardless of the surrounding color scheme.`]}),`
`]}),`
`,(0,i.jsx)(a.h2,{children:`Choosing the right variant`}),`
`,(0,i.jsx)(a.h3,{children:`Base tokens follow the current scheme`}),`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.code,{children:`--token-color-text-neutral`}),`, `,(0,i.jsx)(a.code,{children:`--token-color-icon-neutral`}),`, `,(0,i.jsx)(a.code,{children:`--token-color-text-action`}),`, and `,(0,i.jsx)(a.code,{children:`--token-color-icon-action`}),` are the default choice for content that lives on the page's normal surface.`]}),`
`,(0,i.jsx)(a.p,{children:`If the application changes from light mode to dark mode, those same token names adapt automatically. In most cases, this is all you need.`}),`
`,(0,i.jsxs)(a.h3,{children:[(0,i.jsx)(a.code,{children:`inverse`}),` is for the opposite scheme`]}),`
`,(0,i.jsxs)(a.p,{children:[`Use `,(0,i.jsx)(a.code,{children:`inverse`}),` when the surrounding surface should feel like the opposite color scheme.`]}),`
`,(0,i.jsx)(a.p,{children:`Typical examples are overlays, promotional blocks, or embedded areas that intentionally contrast with the current page mode. The token keeps the semantic role, but flips the contrast relationship.`}),`
`,(0,i.jsxs)(a.h3,{children:[(0,i.jsx)(a.code,{children:`ondark`}),` is for local dark surfaces`]}),`
`,(0,i.jsxs)(a.p,{children:[`Use `,(0,i.jsx)(a.code,{children:`ondark`}),` when the background is dark because of the component or section itself, not because the whole app switched to dark mode.`]}),`
`,(0,i.jsxs)(a.p,{children:[`That distinction matters because a local dark card inside light mode and a full dark-mode page are not the same thing. `,(0,i.jsx)(a.code,{children:`ondark`}),` communicates that the content must stay readable on a dark surface in either case.`]}),`
`,(0,i.jsx)(a.h3,{children:`Variant behavior in each scheme`}),`
`,(0,i.jsx)(a.h4,{children:`Light color scheme`}),`
`,(0,i.jsxs)(a.p,{children:[`Use the base token on the current surface, switch to `,(0,i.jsx)(a.code,{children:`inverse`}),` when the surface follows the opposite scheme, and use `,(0,i.jsx)(a.code,{children:`ondark`}),` for a local dark surface.`]}),`
`,(0,i.jsx)(a.h4,{children:`Dark color scheme`}),`
`,(0,i.jsxs)(a.p,{children:[`The same semantic token names adapt automatically in dark mode. Only `,(0,i.jsx)(a.code,{children:`inverse`}),` and `,(0,i.jsx)(a.code,{children:`ondark`}),` change the surface relationship.`]}),`
`,(0,i.jsx)(a.h3,{children:`Color token swatches`}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsx)(a.h2,{children:`Practical rule`}),`
`,(0,i.jsx)(a.p,{children:`Choose the token by semantic role first, then by surface relationship:`}),`
`,(0,i.jsxs)(a.ol,{children:[`
`,(0,i.jsx)(a.li,{children:`Is this neutral content or action content?`}),`
`,(0,i.jsx)(a.li,{children:`Is it on the current scheme, the opposite scheme, or a local dark surface?`}),`
`,(0,i.jsxs)(a.li,{children:[`Pick the base, `,(0,i.jsx)(a.code,{children:`inverse`}),`, or `,(0,i.jsx)(a.code,{children:`ondark`}),` variant accordingly.`]}),`
`]}),`
`,(0,i.jsxs)(a.p,{children:[`If you are styling Eufemia components, prefer `,(0,i.jsx)(a.code,{children:`surface="dark"`}),` where supported. Components already switch to the correct `,(0,i.jsx)(a.code,{children:`ondark`}),` variants automatically.`]}),`
`,(0,i.jsx)(a.h2,{children:`Common pattern`}),`
`,(0,i.jsxs)(a.p,{children:[`Dark mode tokens are not included in the default theme import. Import the extra dark mode stylesheet before using `,(0,i.jsx)(a.code,{children:`colorScheme`}),`:`]}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-tsx`,children:`// DNB theme
import '@dnb/eufemia/style/themes/ui/ui-theme-dark-mode.min.css' // Use --isolated.min.css for style isolation

// Sbanken theme
import '@dnb/eufemia/style/themes/sbanken/sbanken-theme-dark-mode.min.css' // Use --isolated.min.css for style isolation
`})}),`
`,(0,i.jsxs)(a.p,{children:[`For runtime setup, persistence, and SSR details, see the `,(0,i.jsxs)(a.a,{href:`/uilib/usage/customisation/theming/theme/#the-colorscheme-property-dark-mode`,children:[(0,i.jsx)(a.code,{children:`colorScheme`}),` property`]}),`.`]}),`
`,(0,i.jsxs)(a.p,{children:[`If you render on the server, also read `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/theming/theme/#preventing-dark-mode-flash-fouc`,children:`Preventing dark mode flash (FOUC)`}),`.`]}),`
`,(0,i.jsx)(a.p,{children:`When your app switches the whole UI to dark mode, keep using the base semantic tokens once the dark mode stylesheet is loaded:`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-tsx`,children:`import { Theme } from '@dnb/eufemia/shared'

render(
  <Theme colorScheme="dark">
    <App />
  </Theme>
)
`})}),`
`,(0,i.jsx)(a.p,{children:`When a single component can appear on a dark surface, swap only the local token references:`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-scss`,children:`.my-card {
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
`,(0,i.jsx)(a.p,{children:`Use the same pattern for action-colored content:`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-scss`,children:`.my-link-card {
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
`})})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as default};