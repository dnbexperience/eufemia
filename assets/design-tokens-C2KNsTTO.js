import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{a as n,i as r}from"./Examples-BTgoBYn5.js";var i=e();function a(e){let a={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.hr,{}),`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.strong,{children:`Beta:`}),` The `,(0,i.jsx)(a.code,{children:`--token-*`}),` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.`]}),`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.strong,{children:`Deprecated legacy colors:`}),` The old `,(0,i.jsx)(a.code,{children:`--color-*`}),` CSS custom properties are deprecated. Prefer semantic design tokens such as `,(0,i.jsx)(a.code,{children:`--token-color-text-neutral`}),` instead. If you want automated help finding legacy color usage, Eufemia ships integrated ESLint and Stylelint plugins via `,(0,i.jsx)(a.code,{children:`@dnb/eufemia/plugins/eslint.js`}),` and `,(0,i.jsx)(a.code,{children:`@dnb/eufemia/plugins/stylelint.js`}),`. If you use the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/styling/style-isolation/`,children:`style isolation`}),` PostCSS plugin, `,(0,i.jsx)(a.code,{children:`warnOnDeprecatedColorVariables`}),` is enabled by default to give you build-time warnings. You can disable it by setting `,(0,i.jsx)(a.code,{children:`warnOnDeprecatedColorVariables: false`}),`.`]}),`
`,(0,i.jsx)(a.hr,{}),`
`,(0,i.jsx)(a.h2,{children:`What are design tokens?`}),`
`,(0,i.jsx)(a.p,{children:`Design tokens are semantic CSS custom properties that represent design decisions — such as "background for an action element" or "text color for an error state" — rather than raw color values.`}),`
`,(0,i.jsxs)(a.p,{children:[`They follow the naming pattern `,(0,i.jsx)(a.code,{children:`--token-color-{section}-{role}`}),` and are the recommended way to reference Eufemia colors in your own CSS.`]}),`
`,(0,i.jsx)(a.h2,{children:`Why use design tokens?`}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Theme-aware`}),` — Token values automatically adapt when the active theme changes (e.g. DNB, Sbanken, Carnegie).`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Semantic`}),` — A name like `,(0,i.jsx)(a.code,{children:`--token-color-background-action`}),` communicates `,(0,i.jsx)(a.em,{children:`intent`}),`, not just a hex value. This makes code easier to review and maintain.`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Scalable theming`}),` — Design tokens make it straightforward to introduce new brands, sub-brands, and color modes (e.g. light/dark) without changing component code.`]}),`
`]}),`
`,(0,i.jsx)(a.h2,{children:`Getting started`}),`
`,(0,i.jsxs)(a.p,{children:[`Design tokens are included when you import a Eufemia theme. No separate import is needed, except if you need dark mode support. In that case, import the extra dark mode stylesheet described in the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/theming/design-tokens/dark-mode`,children:`Dark mode guide`}),`.`]}),`
`,(0,i.jsxs)(a.p,{children:[`Read more about how to use design tokens in your own styles, and how Eufemia components use them internally, in the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/theming#design-tokens`,children:`Theming`}),` section.`]}),`
`,(0,i.jsxs)(a.p,{children:[`For practical guidance on choosing the right tokens for your application components, see the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/theming/design-tokens/guide`,children:`Guide`}),`.`]}),`
`,(0,i.jsx)(a.h2,{children:`Common patterns`}),`
`,(0,i.jsx)(a.p,{children:`These examples show how to apply design tokens in typical UI scenarios. Each pattern uses semantic token names so the styles adapt automatically to themes and surfaces.`}),`
`,(0,i.jsx)(a.h3,{children:`Action elements`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-css`,children:`.my-button {
  background-color: var(--token-color-background-action);
  color: var(--token-color-text-action-inverse);
  border: 1px solid var(--token-color-stroke-action);
}

.my-button:hover {
  background-color: var(--token-color-background-action-hover);
}
`})}),`
`,(0,i.jsx)(a.h3,{children:`Error and status states`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-css`,children:`.my-field--error {
  border-color: var(--token-color-stroke-error);
  color: var(--token-color-text-destructive);
}

.my-field--success {
  border-color: var(--token-color-stroke-positive);
}
`})}),`
`,(0,i.jsx)(a.h3,{children:`Subtle backgrounds`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-css`,children:`.my-notice {
  background-color: var(--token-color-background-warning-subtle);
  color: var(--token-color-text-warning);
}
`})}),`
`,(0,i.jsx)(a.h2,{children:`Internal usage in Eufemia components`}),`
`,(0,i.jsx)(a.p,{children:`Eufemia components are progressively adopting design tokens internally. Internally a component might look like:`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-scss`,children:`// Inside dnb-badge.scss
.dnb-badge {
  --badge-information-bg: var(--token-color-background-error);
  --badge-information-color: var(--token-color-text-neutral-inverse);
}
`})}),`
`,(0,i.jsxs)(a.p,{children:[`This internal adoption should have `,(0,i.jsx)(a.strong,{children:`no functional downsides`}),` when you use a component - the rendered result and public API remain the same. However, be aware of one potential side-effect:`]}),`
`,(0,i.jsx)(a.h3,{children:`CSS specificity changes`}),`
`,(0,i.jsxs)(a.p,{children:[`When a component switches from a hard-coded color value to a `,(0,i.jsx)(a.code,{children:`var(--token-*)`}),` reference, the `,(0,i.jsx)(a.em,{children:`selector structure`}),` of the underlying stylesheet may change. If your application overrides component styles with raw selectors, you may need to verify that your overrides still win the specificity contest.`]}),`
`,(0,i.jsx)(a.p,{children:`For example, if you previously overrode a component background with:`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-css`,children:`/* Your override */
.dnb-badge {
  background-color: hotpink;
}
`})}),`
`,(0,i.jsx)(a.p,{children:`And the component internally moves that value to a token-based custom property, the specificity of the internal selector might change. In practice this is rare, but if you notice a visual regression after upgrading it is worth checking.`}),`
`,(0,i.jsxs)(a.p,{children:[(0,i.jsx)(a.strong,{children:`Recommendation:`}),` Prefer using the component's own CSS custom properties (e.g. `,(0,i.jsx)(a.code,{children:`--badge-information-bg`}),`) for overrides rather than targeting raw CSS properties. This avoids specificity conflicts entirely.`]}),`
`,(0,i.jsxs)(a.h2,{children:[(0,i.jsx)(a.code,{children:`ondark`}),` tokens`]}),`
`,(0,i.jsxs)(a.p,{children:[`The `,(0,i.jsx)(a.code,{children:`ondark`}),` suffix identifies token variants designed for use on dark backgrounds. Eufemia components use these tokens automatically when `,(0,i.jsx)(a.code,{children:`surface="dark"`}),` is active — you do not need to select them yourself.`]}),`
`,(0,i.jsxs)(a.p,{children:[`For practical guidance on using `,(0,i.jsx)(a.code,{children:`ondark`}),`, `,(0,i.jsx)(a.code,{children:`inverse`}),`, and base tokens in your own components, see the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/theming/design-tokens/dark-mode`,children:`Dark mode guide`}),`.`]}),`
`,(0,i.jsx)(a.h2,{children:`Tailwind CSS integration`}),`
`,(0,i.jsxs)(a.p,{children:[`Design tokens are also available in Tailwind-compatible format. See the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/styling#semantic-design-tokens`,children:`CSS Styles`}),` page for details on using tokens with Tailwind utility classes.`]}),`
`,(0,i.jsx)(a.h2,{children:`Token sections`}),`
`,(0,i.jsx)(a.p,{children:`Tokens are organized into sections. Each section covers a specific surface:`}),`
`,(0,i.jsxs)(a.table,{children:[(0,i.jsx)(a.thead,{children:(0,i.jsxs)(a.tr,{children:[(0,i.jsx)(a.th,{children:`Section`}),(0,i.jsx)(a.th,{children:`Prefix`}),(0,i.jsx)(a.th,{children:`Purpose`})]})}),(0,i.jsxs)(a.tbody,{children:[(0,i.jsxs)(a.tr,{children:[(0,i.jsx)(a.td,{children:`Background`}),(0,i.jsx)(a.td,{children:(0,i.jsx)(a.code,{children:`--token-color-background-*`})}),(0,i.jsx)(a.td,{children:`Surfaces, fills, interactive fill states`})]}),(0,i.jsxs)(a.tr,{children:[(0,i.jsx)(a.td,{children:`Text`}),(0,i.jsx)(a.td,{children:(0,i.jsx)(a.code,{children:`--token-color-text-*`})}),(0,i.jsx)(a.td,{children:`Readable content, labels, text states`})]}),(0,i.jsxs)(a.tr,{children:[(0,i.jsx)(a.td,{children:`Icon`}),(0,i.jsx)(a.td,{children:(0,i.jsx)(a.code,{children:`--token-color-icon-*`})}),(0,i.jsx)(a.td,{children:`Icon colors`})]}),(0,i.jsxs)(a.tr,{children:[(0,i.jsx)(a.td,{children:`Stroke`}),(0,i.jsx)(a.td,{children:(0,i.jsx)(a.code,{children:`--token-color-stroke-*`})}),(0,i.jsx)(a.td,{children:`Borders, dividers, outlines, focus rings`})]}),(0,i.jsxs)(a.tr,{children:[(0,i.jsx)(a.td,{children:`Decorative`}),(0,i.jsx)(a.td,{children:(0,i.jsx)(a.code,{children:`--token-color-decorative-*`})}),(0,i.jsx)(a.td,{children:`Advanced decorative use cases`})]})]})]}),`
`,(0,i.jsxs)(a.p,{children:[`See the `,(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/theming/design-tokens/colors/`,children:`Color Tokens`}),` tab for the full catalog.`]}),`
`,(0,i.jsx)(a.h2,{children:`Naming contract`}),`
`,(0,i.jsx)(n,{}),`
`,(0,i.jsx)(`br`,{}),`
`,(0,i.jsx)(a.p,{children:`Typical examples:`}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[`semantic token: `,(0,i.jsx)(r,{name:`--token-color-text-neutral`})]}),`
`,(0,i.jsxs)(a.li,{children:[`semantic state token: `,(0,i.jsx)(r,{name:`--token-color-background-action-hover-subtle`})]}),`
`,(0,i.jsxs)(a.li,{children:[`component token: `,(0,i.jsx)(r,{name:`--token-color-component-button-background-action`})]}),`
`]}),`
`,(0,i.jsx)(a.h2,{children:`Source of truth`}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsx)(a.li,{children:`The token inventory is generated from the same exported theme token files that produce the CSS output.`}),`
`,(0,i.jsx)(a.li,{children:`The consumer API is the generated CSS tokens files.`}),`
`,(0,i.jsx)(a.li,{children:`The color values behind these tokens come from Eufemia Foundation colors and are mapped into semantic and component token layers per theme.`}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.strong,{children:`Eiendom`}),` currently reuses the UI token source, so the three explicit brand references are `,(0,i.jsx)(a.strong,{children:`DNB`}),`, `,(0,i.jsx)(a.strong,{children:`Sbanken`}),` and `,(0,i.jsx)(a.strong,{children:`Carnegie`}),`.`]}),`
`]})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsx)(o,{})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};