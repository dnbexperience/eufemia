import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Guide contents`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#guide-contents`,children:`Guide contents`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#choosing-the-right-token`,children:`Choosing the right token`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#token-selection-by-role`,children:`Token selection by role`})}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#token-selection-by-state`,children:`Token selection by state`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#interaction-states`,children:`Interaction states`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#status-states`,children:`Status states`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#modifiers`,children:`Modifiers`})}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#practical-examples`,children:`Practical examples`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#custom-action-card`,children:`Custom action card`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#status-banner`,children:`Status banner`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#input-like-field`,children:`Input-like field`})}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#patterns-learned-from-eufemia-components`,children:`Patterns learned from Eufemia components`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#use-local-css-variables-to-simplify-state-handling`,children:`Use local CSS variables to simplify state handling`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#use-semantic-tokens-not-component-tokens`,children:`Use semantic tokens, not component tokens`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#focus-uses-the-shared-action-focus-tokens`,children:`Focus uses the shared action-focus tokens`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#use-decorative-tokens-only-for-decoration`,children:`Use decorative tokens only for decoration`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsxs)(t.a,{href:`#dark-surfaces-use-ondark-tokens`,children:[`Dark surfaces use `,(0,r.jsx)(t.code,{children:`ondark`}),` tokens`]})}),`
`]}),`
`]}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#radius-tokens`,children:`Radius tokens`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#decision-checklist`,children:`Decision checklist`})}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#common-mistakes`,children:`Common mistakes`})}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Choosing the right token`}),`
`,(0,r.jsx)(t.p,{children:`When building application components with Eufemia design tokens, think semantically. Do not ask "which token has the same color value as the one I want?" Ask "what role does this color play in this component and state?"`}),`
`,(0,r.jsxs)(t.p,{children:[`If you still find yourself reaching for legacy `,(0,r.jsx)(t.code,{children:`--color-*`}),` variables, treat that as a migration signal. Those variables are deprecated; prefer semantic `,(0,r.jsx)(t.code,{children:`--token-*`}),` design tokens instead.`]}),`
`,(0,r.jsx)(t.p,{children:`All Eufemia components already use design tokens. Their stylesheets are the best reference for how to apply tokens correctly. When you are unsure which token to use, inspect the Eufemia component that is closest to what you are building.`}),`
`,(0,r.jsx)(t.h2,{children:`Token selection by role`}),`
`,(0,r.jsx)(t.p,{children:`Every color in a component has a semantic role. Identify the role first, then pick the matching token section.`}),`
`,(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:`Role`}),(0,r.jsx)(t.th,{children:`Token section`}),(0,r.jsx)(t.th,{children:`Example`})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Readable text`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`text`})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`--token-color-text-neutral`})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Icon`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`icon`})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`--token-color-icon-neutral`})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Background / fill`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`background`})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`--token-color-background-neutral`})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Border / outline`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`stroke`})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`--token-color-stroke-neutral`})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Focus ring`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`stroke`})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`--token-color-stroke-action-focus`})})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Branded / decorative`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`decorative`})}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`--token-color-decorative-first-bold-static`})})]})]})]}),`
`,(0,r.jsx)(t.h2,{children:`Token selection by state`}),`
`,(0,r.jsx)(t.p,{children:`After the role, identify the interaction or status state. Tokens encode states as suffixes.`}),`
`,(0,r.jsx)(t.h3,{children:`Interaction states`}),`
`,(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:`State`}),(0,r.jsx)(t.th,{children:`Suffix example`}),(0,r.jsx)(t.th,{children:`When to use`})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Default`}),(0,r.jsx)(t.td,{children:`(no suffix)`}),(0,r.jsx)(t.td,{children:`Resting state`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Hover`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-hover`})}),(0,r.jsx)(t.td,{children:`Pointer over an interactive element`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Pressed`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-pressed`})}),(0,r.jsx)(t.td,{children:`Mouse down (active) or touch active`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Focus`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-focus`})}),(0,r.jsx)(t.td,{children:`Keyboard focus`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Disabled`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-disabled`})}),(0,r.jsx)(t.td,{children:`Non-interactive, visually muted`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Selected`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-selected`})}),(0,r.jsx)(t.td,{children:`Currently chosen item in a group`})]})]})]}),`
`,(0,r.jsx)(t.h3,{children:`Status states`}),`
`,(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:`Status`}),(0,r.jsx)(t.th,{children:`Suffix example`}),(0,r.jsx)(t.th,{children:`When to use`})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Error`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-error`})}),(0,r.jsx)(t.td,{children:`Validation failure`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Destructive`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-destructive`})}),(0,r.jsx)(t.td,{children:`Dangerous or irreversible action`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Positive`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-positive`})}),(0,r.jsx)(t.td,{children:`Success or upward trend`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Warning`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-warning`})}),(0,r.jsx)(t.td,{children:`Caution, needs attention`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:`Information`}),(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-info`})}),(0,r.jsx)(t.td,{children:`Neutral informational notice`})]})]})]}),`
`,(0,r.jsx)(t.h3,{children:`Modifiers`}),`
`,(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:`Modifier`}),(0,r.jsx)(t.th,{children:`Meaning`})]})}),(0,r.jsxs)(t.tbody,{children:[(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-subtle`})}),(0,r.jsx)(t.td,{children:`Lower-contrast variant, typically for backgrounds`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-inverse`})}),(0,r.jsx)(t.td,{children:`For use on a filled action surface`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-ondark`})}),(0,r.jsx)(t.td,{children:`For use on a dark surface`})]}),(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:(0,r.jsx)(t.code,{children:`-static`})}),(0,r.jsx)(t.td,{children:`Does not change with light/dark mode`})]})]})]}),`
`,(0,r.jsx)(t.h2,{children:`Practical examples`}),`
`,(0,r.jsx)(t.h3,{children:`Custom action card`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-scss`,children:`.my-action-card {
  background-color: var(--token-color-background-neutral);
  color: var(--token-color-text-neutral);
  box-shadow: inset 0 0 0 0.0625rem
    var(--token-color-stroke-neutral-subtle);

  &:hover {
    box-shadow: 0 0 0 0.125rem var(--token-color-stroke-action-hover);
  }

  &:focus-visible {
    box-shadow: 0 0 0 var(--focus-ring-width)
      var(--token-color-stroke-action-focus);
    outline: none;
  }

  &--selected {
    background-color: var(--token-color-background-selected-subtle);
    box-shadow: inset 0 0 0 0.0625rem var(--token-color-stroke-selected);
  }

  &--disabled {
    color: var(--token-color-text-action-disabled);
    box-shadow: inset 0 0 0 0.0625rem
      var(--token-color-stroke-action-disabled);
  }
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`Status banner`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-scss`,children:`.my-banner {
  &--error {
    background-color: var(--token-color-background-error-subtle);
    color: var(--token-color-text-neutral);
  }

  &--warning {
    background-color: var(--token-color-background-warning-subtle);
    color: var(--token-color-text-neutral);
  }

  &--success {
    background-color: var(--token-color-background-positive-subtle);
    color: var(--token-color-text-neutral);
  }
}
`})}),`
`,(0,r.jsx)(t.h3,{children:`Input-like field`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-scss`,children:`.my-field {
  --field-border-color: var(--token-color-stroke-action);
  --field-border-width: 0.0625rem;
  --field-border-inset: inset;
  --field-background: var(--token-color-background-neutral);
  --field-text-color: var(--token-color-text-neutral);
  --field-placeholder-color: var(--token-color-text-neutral-alternative);

  color: var(--field-text-color);
  background-color: var(--field-background);
  box-shadow: var(--field-border-inset) 0 0 0 var(--field-border-width)
    var(--field-border-color);

  &::placeholder {
    color: var(--field-placeholder-color);
  }

  &:hover {
    --field-border-color: var(--token-color-stroke-action-hover);
    --field-border-width: 0.125rem;
    --field-border-inset: ;
  }

  &:focus {
    --field-border-color: var(--token-color-stroke-action-pressed);
    --field-border-width: 0.125rem;
    --field-border-inset: ;
  }

  &--error {
    --field-border-color: var(--token-color-stroke-error);
  }

  &[disabled] {
    --field-border-color: var(--token-color-stroke-action-disabled);
    --field-background: var(--token-color-background-neutral-subtle);
    --field-placeholder-color: var(--token-color-text-action-disabled);
  }
}
`})}),`
`,(0,r.jsx)(t.h2,{children:`Patterns learned from Eufemia components`}),`
`,(0,r.jsx)(t.p,{children:`Eufemia components already follow these patterns consistently. Use them as a reference when building your own.`}),`
`,(0,r.jsx)(t.h3,{children:`Use local CSS variables to simplify state handling`}),`
`,(0,r.jsx)(t.p,{children:`When multiple child elements need to react to the same state, define a local CSS variable on the parent and point it at the right token for each state. This is cleaner than repeating tokens across many selectors.`}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia's Input component does this: it defines `,(0,r.jsx)(t.code,{children:`--input-border-color`}),`, `,(0,r.jsx)(t.code,{children:`--input-background-color`}),`, and `,(0,r.jsx)(t.code,{children:`--input-color-text`}),` at the component root and swaps token values for hover, focus, disabled, and error.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia's Button component does the same with `,(0,r.jsx)(t.code,{children:`--button-color-bg`}),`, `,(0,r.jsx)(t.code,{children:`--button-color-text`}),`, and `,(0,r.jsx)(t.code,{children:`--button-color-icon`}),`, then each variant (primary, secondary, tertiary) reassigns those variables to different tokens.`]}),`
`,(0,r.jsx)(t.h3,{children:`Use semantic tokens, not component tokens`}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`--token-color-component-*`}),` tokens are reserved for Eufemia's own components. Application code should use the semantic tokens from the `,(0,r.jsx)(t.code,{children:`background`}),`, `,(0,r.jsx)(t.code,{children:`text`}),`, `,(0,r.jsx)(t.code,{children:`icon`}),`, `,(0,r.jsx)(t.code,{children:`stroke`}),`, and `,(0,r.jsx)(t.code,{children:`decorative`}),` sections.`]}),`
`,(0,r.jsx)(t.p,{children:`Semantic tokens express shared design-system meanings such as "action text" or "neutral background". They adapt automatically across themes.`}),`
`,(0,r.jsx)(t.h3,{children:`Focus uses the shared action-focus tokens`}),`
`,(0,r.jsxs)(t.p,{children:[`See the `,(0,r.jsx)(t.a,{href:`/uilib/usage/accessibility/focus/#focus-styling-tokens`,children:`Focus styling tokens`}),` section for details on which tokens to use for keyboard focus styling.`]}),`
`,(0,r.jsx)(t.h3,{children:`Use decorative tokens only for decoration`}),`
`,(0,r.jsx)(t.p,{children:`Decorative tokens are for branded or ornamental surfaces, not for UI states. If the color represents an error, a hover, or a selection, use the matching semantic token instead.`}),`
`,(0,r.jsxs)(t.h3,{children:[`Dark surfaces use `,(0,r.jsx)(t.code,{children:`ondark`}),` tokens`]}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`ondark`}),` suffix identifies token variants designed for use on dark backgrounds. Eufemia components use these tokens automatically when `,(0,r.jsx)(t.code,{children:`surface="dark"`}),` is active — you do not need to select them yourself.`]}),`
`,(0,r.jsxs)(t.p,{children:[`When your component sits on a dark background, use the `,(0,r.jsx)(t.code,{children:`ondark`}),` suffixed tokens for text, icons, and strokes:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-scss`,children:`.my-component--dark {
  color: var(--token-color-text-action-ondark);
  border-color: var(--token-color-stroke-action-ondark);

  .my-component__icon {
    color: var(--token-color-icon-action-ondark);
  }
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`To detect the surface in React, use the `,(0,r.jsx)(t.code,{children:`useTheme`}),` hook:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import { useTheme } from '@dnb/eufemia/shared'

function MyComponent() {
  const theme = useTheme()
  const isDark = theme?.surface === 'dark'

  return (
    <div className={clsx('my-component', isDark && 'my-component--dark')}>
      ...
    </div>
  )
}
`})}),`
`,(0,r.jsx)(t.h2,{children:`Radius tokens`}),`
`,(0,r.jsxs)(t.p,{children:[`Radius tokens control `,(0,r.jsx)(t.code,{children:`border-radius`}),` values and follow the pattern `,(0,r.jsx)(t.code,{children:`--token-radius-{size}`}),`. Values differ between brands, so using radius tokens keeps your components consistent with the active theme.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-scss`,children:`.my-card {
  border-radius: var(--token-radius-md);
}

.my-pill {
  border-radius: var(--token-radius-full);
}
`})}),`
`,(0,r.jsxs)(t.p,{children:[`See the `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/theming/design-tokens/radius`,children:`Radius`}),` tab for the full list with per-theme values.`]}),`
`,(0,r.jsx)(t.h2,{children:`Decision checklist`}),`
`,(0,r.jsx)(t.p,{children:`When styling a custom component:`}),`
`,(0,r.jsxs)(t.ol,{children:[`
`,(0,r.jsx)(t.li,{children:`What is the role of this color? (text, icon, background, stroke, decorative)`}),`
`,(0,r.jsx)(t.li,{children:`What state is it in? (default, hover, focus, pressed, disabled, selected, error, etc.)`}),`
`,(0,r.jsx)(t.li,{children:`Does an Eufemia component with similar behavior already exist? If yes, check which tokens it uses.`}),`
`,(0,r.jsx)(t.li,{children:`Use the semantic token that matches both role and state.`}),`
`,(0,r.jsx)(t.li,{children:`If multiple children share a state, introduce a local CSS variable.`}),`
`,(0,r.jsx)(t.li,{children:`Never pick a token by matching hex values. Pick by semantic meaning.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Common mistakes`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Picking a token because its current color value matches an old hardcoded color.`}),`
`,(0,r.jsxs)(t.li,{children:[`Using `,(0,r.jsx)(t.code,{children:`--token-color-component-*`}),` tokens in application code — these are internal to Eufemia components.`]}),`
`,(0,r.jsx)(t.li,{children:`Using decorative tokens for UI states like error, hover, or disabled.`}),`
`,(0,r.jsxs)(t.li,{children:[`Hardcoding `,(0,r.jsx)(t.code,{children:`ondark`}),` tokens without checking the surface context.`]}),`
`,(0,r.jsx)(t.li,{children:`Repeating the same token in many selectors instead of using a local CSS variable.`}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};