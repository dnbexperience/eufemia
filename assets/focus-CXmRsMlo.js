import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import{n as r,r as i,t as a}from"./Examples-DwumZPHb.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return a||l(`Examples`,!1),r||l(`Examples.FocusExample`,!0),i||l(`Examples.SkipLinkExample`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Focus styling tokens`}),`
`,(0,o.jsx)(t.p,{children:`For keyboard focus styling, use the action-focus family:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`--token-color-stroke-action-focus`}),` for the focus ring`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`--token-color-background-action-focus-subtle`}),` for the focus background`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`--token-color-text-action-focus`}),` for text inside a focused element`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`--token-color-icon-action-focus`}),` for icons inside a focused element`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`--focus-ring-width`}),` for the focus ring width (shared across all themes)`]}),`
`]}),`
`,(0,o.jsx)(t.p,{children:`Every interactive Eufemia component — Button, Input, Tag, Menu, Tabs, List — uses these same tokens for focus. Your custom components should follow the same pattern.`}),`
`,(0,o.jsx)(t.p,{children:`Here is an example of how it should look when implemented:`}),`
`,(0,o.jsx)(r,{}),`
`,(0,o.jsx)(t.h1,{children:`Focus Management`}),`
`,(0,o.jsx)(t.p,{children:`Focus is an important part of keyboard-only and screen reader navigation.`}),`
`,(0,o.jsxs)(t.p,{children:[`Make sure you set the focus properly on page or context changes. Consider using Reach Router `,(0,o.jsx)(t.a,{href:`https://reach.tech/router/accessibility`,children:`because of its built-in accessibility features`}),`.`]}),`
`,(0,o.jsxs)(t.p,{children:[`From a technical perspective, we need to assign an `,(0,o.jsx)(t.em,{children:`invisible`}),` focus so the user can continue navigating inside this new content.`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Example setup:`})}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<body>
  <nav><!-- focusable navigation --></nav>
  <main>
    <!-- more markup with focusable HTMLElements -->
    <h1 class="dnb-h--xx-large dnb-no-focus" tabindex="-1">Main Title</h1>
    <a href="/path">I'm now focusable on next tab</a>
  </main>
</body>
`})}),`
`,(0,o.jsx)(t.h2,{children:`Managing focus state`}),`
`,(0,o.jsx)(t.p,{children:`Make sure you:`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`Set the focus on the content (e.g., `,(0,o.jsx)(t.code,{children:`<h1 class="dnb-h--xx-large">`}),`) after a navigation action initiated by the user.`]}),`
`,(0,o.jsxs)(t.li,{children:[`Set the focus into a `,(0,o.jsx)(t.em,{children:`menu or navigation`}),` area if it has an opening mechanism.`]}),`
`,(0,o.jsx)(t.li,{children:`Set the focus back to the content once the menu or navigation area is closed.`}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`More complex focus management is already built into the `,(0,o.jsx)(t.a,{href:`/uilib/components/modal`,children:`Modal Component`}),`. The Modal disables focus on the content behind it, so the user can only navigate inside the modal.`]}),`
`,(0,o.jsx)(t.h2,{children:`Helper tool`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`@dnb/eufemia`}),` has a built-in helper to manage basic focus handling.
This helper also handles both the `,(0,o.jsx)(t.code,{children:`tabindex="-1"`}),` and the `,(0,o.jsx)(t.code,{children:`class="dnb-no-focus"`}),` situations. What does it do?`]}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[`You define beforehand what should get focus with a CSS selector (`,(0,o.jsx)(t.em,{children:`class or id`}),`). This (`,(0,o.jsx)(t.strong,{children:`setPageFocusElement`}),`) can be set at the very first application start.`]}),`
`,(0,o.jsxs)(t.li,{children:[`Later, once the focus should be set, you call a second function `,(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.em,{children:`applyPageFocus`})}),`. This function will use the previously defined selector and execute `,(0,o.jsx)(t.code,{children:`domNode.focus()`}),`.`]}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`Focus helper`}),`
`,(0,o.jsxs)(t.p,{children:[`Set focus on an HTML element that exists inside the DOM. It can be any HTML element, regardless of whether it's an interactive element or not. Non-interactive elements will be handled by changing the `,(0,o.jsx)(t.code,{children:`tabindex`}),` to 0 alongside a CSS class `,(0,o.jsx)(t.code,{children:`dnb-no-focus`}),`, so no blue focus border is visible.`]}),`
`,(0,o.jsx)(t.p,{children:`Simple example:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`import { applyPageFocus } from '@dnb/eufemia/shared/helpers'

applyPageFocus('.my-selector')
applyPageFocus('#my-id')
`})}),`
`,(0,o.jsx)(t.p,{children:`Asynchronous example:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`import {
  setPageFocusElement,
  applyPageFocus,
} from '@dnb/eufemia/shared/helpers'

// 1. Somewhere in your app, set either an element, or a CSS Selector
setPageFocusElement('.css-selector', 'MyCustomName')

// 2. Later you can call this action, once it's time to activate the new focus state
applyPageFocus('MyCustomName', (element) => {
  /* optional callback */
})
`})}),`
`,(0,o.jsx)(t.h3,{children:`Skip Link`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`@dnb/eufemia`}),` also has a small setup for a `,(0,o.jsx)(t.a,{href:`https://www.w3.org/TR/WCAG20-TECHS/G1.html`,children:`skip link`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:`Our solution is CSS-only and should work for all kinds of application setups. Demo example below:`}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[`Place an anchor with an HTML class `,(0,o.jsx)(t.code,{children:`.dnb-skip-link`}),` as the very `,(0,o.jsx)(t.strong,{children:`first HTML element`}),` tag:`]}),`
`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<a class="dnb-skip-link" href="#content-id">Skip to content</a>
`})}),`
`,(0,o.jsxs)(t.ol,{start:`2`,children:[`
`,(0,o.jsxs)(t.li,{children:[`Define a unique element `,(0,o.jsx)(t.strong,{children:`id`}),`, such as `,(0,o.jsx)(t.code,{children:`id="content-id"`}),`, on your content wrapper:`]}),`
`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<body>
  <a class="dnb-skip-link" href="#content-id">Skip to content</a>
  <header>
    <nav>
      <!-- Nav links or content to skip -->
    </nav>
  </header>
  <main id="content-id">
    <!-- Content goes here -->
  </main>
</body>
`})}),`
`,(0,o.jsxs)(t.p,{children:[`That's it. The styles are included in both the `,(0,o.jsx)(t.strong,{children:`dnb-ui-basis`}),` and `,(0,o.jsx)(t.strong,{children:`dnb-ui-core`}),` styling packages.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`NB:`}),` If you link the anchor to only a `,(0,o.jsx)(t.code,{children:`<div id="content-id">`}),`, then you have to make sure you also add a tabindex.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`...
<div id="content-id" tabindex="-1" class="dnb-no-focus">
  <!-- Content goes here -->
</div>
...
`})})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};