import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import{a as r,i}from"./Examples-B-C9FsEF.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.hr,{}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:`Beta:`}),` The `,(0,a.jsx)(t.code,{children:`--token-*`}),` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.`]}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:`Deprecated legacy colors:`}),` The old `,(0,a.jsx)(t.code,{children:`--color-*`}),` CSS custom properties are deprecated. Prefer semantic design tokens such as `,(0,a.jsx)(t.code,{children:`--token-color-text-neutral`}),` instead. If you want automated help finding legacy color usage, Eufemia ships integrated ESLint and Stylelint plugins via `,(0,a.jsx)(t.code,{children:`@dnb/eufemia/plugins/eslint.js`}),` and `,(0,a.jsx)(t.code,{children:`@dnb/eufemia/plugins/stylelint.js`}),`. If you use the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/styling/style-isolation/`,children:`style isolation`}),` PostCSS plugin, `,(0,a.jsx)(t.code,{children:`warnOnDeprecatedColorVariables`}),` is enabled by default to give you build-time warnings. You can disable it by setting `,(0,a.jsx)(t.code,{children:`warnOnDeprecatedColorVariables: false`}),`.`]}),`
`,(0,a.jsx)(t.hr,{}),`
`,(0,a.jsx)(t.h2,{children:`What are design tokens?`}),`
`,(0,a.jsx)(t.p,{children:`Design tokens are semantic CSS custom properties that represent design decisions — such as "background for an action element" or "text color for an error state" — rather than raw color values.`}),`
`,(0,a.jsxs)(t.p,{children:[`They follow the naming pattern `,(0,a.jsx)(t.code,{children:`--token-color-{section}-{role}`}),` and are the recommended way to reference Eufemia colors in your own CSS.`]}),`
`,(0,a.jsx)(t.h2,{children:`Why use design tokens?`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Theme-aware`}),` — Token values automatically adapt when the active theme changes (e.g. DNB, Sbanken, Carnegie).`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Semantic`}),` — A name like `,(0,a.jsx)(t.code,{children:`--token-color-background-action`}),` communicates `,(0,a.jsx)(t.em,{children:`intent`}),`, not just a hex value. This makes code easier to review and maintain.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Scalable theming`}),` — Design tokens make it straightforward to introduce new brands, sub-brands, and color modes (e.g. light/dark) without changing component code.`]}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Getting started`}),`
`,(0,a.jsxs)(t.p,{children:[`Design tokens are included when you import a Eufemia theme. No separate import is needed, except if you need dark mode support. In that case, import the extra dark mode stylesheet described in the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/dark-mode`,children:`Dark mode guide`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Read more about how to use design tokens in your own styles, and how Eufemia components use them internally, in the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/theming#design-tokens`,children:`Theming`}),` section.`]}),`
`,(0,a.jsxs)(t.p,{children:[`For practical guidance on choosing the right tokens for your application components, see the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/guide`,children:`Guide`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Common patterns`}),`
`,(0,a.jsx)(t.p,{children:`These examples show how to apply design tokens in typical UI scenarios. Each pattern uses semantic token names so the styles adapt automatically to themes and surfaces.`}),`
`,(0,a.jsx)(t.h3,{children:`Action elements`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`.my-button {
  background-color: var(--token-color-background-action);
  color: var(--token-color-text-action-inverse);
  border: 1px solid var(--token-color-stroke-action);
}

.my-button:hover {
  background-color: var(--token-color-background-action-hover);
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`Error and status states`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`.my-field--error {
  border-color: var(--token-color-stroke-error);
  color: var(--token-color-text-error);
}

.my-field--success {
  border-color: var(--token-color-stroke-positive);
}
`})}),`
`,(0,a.jsx)(t.h3,{children:`Subtle backgrounds`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`.my-notice {
  background-color: var(--token-color-background-warning-subtle);
  color: var(--token-color-text-warning);
}
`})}),`
`,(0,a.jsx)(t.h2,{children:`Internal usage in Eufemia components`}),`
`,(0,a.jsx)(t.p,{children:`Eufemia components are progressively adopting design tokens internally. Internally a component might look like:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-scss`,children:`// Inside dnb-badge.scss
.dnb-badge {
  --badge-information-bg: var(--token-color-background-error);
  --badge-information-color: var(--token-color-text-neutral-inverse);
}
`})}),`
`,(0,a.jsxs)(t.p,{children:[`This internal adoption should have `,(0,a.jsx)(t.strong,{children:`no functional downsides`}),` when you use a component - the rendered result and public API remain the same. However, be aware of one potential side-effect:`]}),`
`,(0,a.jsx)(t.h3,{children:`CSS specificity changes`}),`
`,(0,a.jsxs)(t.p,{children:[`When a component switches from a hard-coded color value to a `,(0,a.jsx)(t.code,{children:`var(--token-*)`}),` reference, the `,(0,a.jsx)(t.em,{children:`selector structure`}),` of the underlying stylesheet may change. If your application overrides component styles with raw selectors, you may need to verify that your overrides still win the specificity contest.`]}),`
`,(0,a.jsx)(t.p,{children:`For example, if you previously overrode a component background with:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-css`,children:`/* Your override */
.dnb-badge {
  background-color: hotpink;
}
`})}),`
`,(0,a.jsx)(t.p,{children:`And the component internally moves that value to a token-based custom property, the specificity of the internal selector might change. In practice this is rare, but if you notice a visual regression after upgrading it is worth checking.`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.strong,{children:`Recommendation:`}),` Prefer using the component's own CSS custom properties (e.g. `,(0,a.jsx)(t.code,{children:`--badge-information-bg`}),`) for overrides rather than targeting raw CSS properties. This avoids specificity conflicts entirely.`]}),`
`,(0,a.jsxs)(t.h2,{children:[(0,a.jsx)(t.code,{children:`ondark`}),` tokens`]}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`ondark`}),` suffix identifies token variants designed for use on dark backgrounds. Eufemia components use these tokens automatically when `,(0,a.jsx)(t.code,{children:`surface="dark"`}),` is active — you do not need to select them yourself.`]}),`
`,(0,a.jsxs)(t.p,{children:[`For practical guidance on using `,(0,a.jsx)(t.code,{children:`ondark`}),`, `,(0,a.jsx)(t.code,{children:`inverse`}),`, and base tokens in your own components, see the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/dark-mode`,children:`Dark mode guide`}),`.`]}),`
`,(0,a.jsx)(t.h2,{children:`Tailwind CSS integration`}),`
`,(0,a.jsxs)(t.p,{children:[`Design tokens are also available in Tailwind-compatible format. See the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/styling#semantic-design-tokens`,children:`CSS Styles`}),` page for details on using tokens with Tailwind utility classes.`]}),`
`,(0,a.jsx)(t.h2,{children:`Token sections`}),`
`,(0,a.jsx)(t.p,{children:`Tokens are organized into sections. Each section covers a specific surface:`}),`
`,(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:`Section`}),(0,a.jsx)(t.th,{children:`Prefix`}),(0,a.jsx)(t.th,{children:`Purpose`})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:`Background`}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`--token-color-background-*`})}),(0,a.jsx)(t.td,{children:`Surfaces, fills, interactive fill states`})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:`Text`}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`--token-color-text-*`})}),(0,a.jsx)(t.td,{children:`Readable content, labels, text states`})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:`Icon`}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`--token-color-icon-*`})}),(0,a.jsx)(t.td,{children:`Icon colors`})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:`Stroke`}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`--token-color-stroke-*`})}),(0,a.jsx)(t.td,{children:`Borders, dividers, outlines, focus rings`})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:`Decorative`}),(0,a.jsx)(t.td,{children:(0,a.jsx)(t.code,{children:`--token-color-decorative-*`})}),(0,a.jsx)(t.td,{children:`Advanced decorative use cases`})]})]})]}),`
`,(0,a.jsxs)(t.p,{children:[`See the `,(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/colors/`,children:`Color Tokens`}),` tab for the full catalog.`]}),`
`,(0,a.jsx)(t.h2,{children:`Naming contract`}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(`br`,{}),`
`,(0,a.jsx)(t.p,{children:`Typical examples:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[`semantic token: `,(0,a.jsx)(i,{name:`--token-color-text-neutral`})]}),`
`,(0,a.jsxs)(t.li,{children:[`semantic state token: `,(0,a.jsx)(i,{name:`--token-color-background-action-hover-subtle`})]}),`
`,(0,a.jsxs)(t.li,{children:[`component token: `,(0,a.jsx)(i,{name:`--token-color-component-button-background-action`})]}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Source of truth`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`The token inventory is generated from the same exported theme token files that produce the CSS output.`}),`
`,(0,a.jsx)(t.li,{children:`The consumer API is the generated CSS tokens files.`}),`
`,(0,a.jsx)(t.li,{children:`The color values behind these tokens come from Eufemia Foundation colors and are mapped into semantic and component token layers per theme.`}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`Eiendom`}),` currently reuses the UI token source, so the three explicit brand references are `,(0,a.jsx)(t.strong,{children:`DNB`}),`, `,(0,a.jsx)(t.strong,{children:`Sbanken`}),` and `,(0,a.jsx)(t.strong,{children:`Carnegie`}),`.`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsx)(s,{})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};