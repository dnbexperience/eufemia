import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import{a as r,i,n as a,o,s,t as c}from"./Examples-BNz3TKMX.js";import{r as l}from"./Examples-CRJtU6FV.js";var u=e(t());function d(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return a||p(`Examples`,!1),c||p(`Examples.CoreStyle`,!0),i||p(`Examples.ScreenReaderOnly`,!0),r||p(`Examples.Selection`,!0),o||p(`Examples.TabFocus`,!0),s||p(`Examples.UnstyledList`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h1,{children:`CSS classes`}),`
`,(0,u.jsx)(t.h2,{children:`CSS helper classes`}),`
`,(0,u.jsxs)(t.p,{children:[`Reusing classes in the markup instead of using SCSS extends or `,(0,u.jsx)(t.em,{children:`mixins`}),` will prevent duplication in `,(0,u.jsx)(t.code,{children:`@dnb/eufemia`}),`. This approach also benefits your application by reusing these helper classes.`]}),`
`,(0,u.jsx)(t.h2,{children:`Core style`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-core-style`})}),`
`,(0,u.jsx)(t.p,{children:`Provides the core Body Style inside a wrapper, making it available for all its children. The Body Style includes the correct color, line-height, font, and a CSS reset, among other styles.`}),`
`,(0,u.jsx)(c,{}),`
`,(0,u.jsx)(t.h2,{children:`Tab focus`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-tab-focus`})}),`
`,(0,u.jsx)(t.p,{children:`Removes the default focus outline from a focusable element and adds a custom visual focus state when focused by a tab key.
There is also:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`dnb-mouse-focus`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`dnb-focus-ring`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`dnb-no-focus`})}),`
`]}),`
`,(0,u.jsx)(o,{}),`
`,(0,u.jsx)(t.h2,{children:`Skip link`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-skip-link`})}),`
`,(0,u.jsx)(t.p,{children:`A default Skip Link style for adding a link at the top of each page that goes directly to the main content area.`}),`
`,(0,u.jsx)(l,{}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<body>
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
`,(0,u.jsxs)(t.p,{children:[`More details in the `,(0,u.jsx)(t.a,{href:`/uilib/usage/accessibility/focus#skip-link`,children:`Focus Section`}),`.`]}),`
`,(0,u.jsx)(t.h2,{children:`Spacing`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-spacing`})}),`
`,(0,u.jsxs)(t.p,{children:[`Sets default spacing (using `,(0,u.jsx)(t.em,{children:`margin`}),`) on all HTML elements inside the container with this style. The default spacing is `,(0,u.jsx)(t.code,{children:`margin-bottom: 1.5rem`}),`, but specific margins are defined for headings, lists, and tables.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-html`,children:`<article class="dnb-spacing">
  <!-- DNB spacings -->
  <h1 class="dnb-h--xx-large">
    e.g. I have now the Eufemia spacing (margin)
  </h1>
  <p class="dnb-p">👉 Me as well</p>
</article>
`})}),`
`,(0,u.jsxs)(t.p,{children:[`More details in `,(0,u.jsx)(t.a,{href:`/uilib/usage/customisation/styling#spacing`,children:`Styling`}),`.`]}),`
`,(0,u.jsx)(t.h2,{children:`Scrollbar appearance`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-scrollbar-appearance`})}),`
`,(0,u.jsxs)(t.p,{children:[`Define the DNB scrollbar appearance, including the color `,(0,u.jsx)(t.code,{children:`--color-emerald-green`}),` with `,(0,u.jsx)(t.code,{children:`transparent`}),`.`]}),`
`,(0,u.jsx)(t.p,{children:`NB: Browser support is not fully covered (2021).`}),`
`,(0,u.jsx)(t.h2,{children:`Screen Reader (sr) only`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-sr-only`})}),`
`,(0,u.jsxs)(t.p,{children:[`Visually hide an element while keeping it accessible to screen readers. (`,(0,u.jsx)(t.em,{children:`sr`}),` stands for `,(0,u.jsx)(t.em,{children:`Screen Reader`}),`)`]}),`
`,(0,u.jsx)(i,{}),`
`,(0,u.jsx)(t.h2,{children:`Page background`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-page-background`})}),`
`,(0,u.jsxs)(t.p,{children:[`Sets the page background color using the `,(0,u.jsx)(t.code,{children:`--token-color-background-page-background`}),` design token. Use this class on a root element (such as `,(0,u.jsx)(t.code,{children:`body`}),` or a wrapper) to ensure a themed background color that adapts to light and dark modes.`]}),`
`,(0,u.jsx)(t.h2,{children:`Drop shadow`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-drop-shadow`})}),`
`,(0,u.jsxs)(t.p,{children:[`Adds a default drop shadow (`,(0,u.jsx)(t.code,{children:`box-shadow: 0 8px 16px rgba(51, 51, 51, 0.08)`}),`) to the component. The current shadow specification is designed to be softer and more blurred.`]}),`
`,(0,u.jsx)(t.h3,{children:`CSS properties`}),`
`,(0,u.jsx)(t.p,{children:`The DNB Drop shadow is also available as a CSS Custom Property:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-ts`,children:`import properties from '@dnb/eufemia/style/themes/ui/properties.js'

const cssBoxShadow = properties['--shadow-default']
`})}),`
`,(0,u.jsx)(t.p,{children:`If you only want to apply parts of the property, these are available as well:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-default-x: 0;`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-default-y: 8px;`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-default-blur-radius: 16px;`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-default-color: rgba(51, 51, 51, 0.08);`})}),`
`]}),`
`,(0,u.jsx)(t.h2,{children:`Sharp drop shadow`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-sharp-drop-shadow`})}),`
`,(0,u.jsxs)(t.p,{children:[`Adds a smaller but sharper drop shadow (`,(0,u.jsx)(t.code,{children:`box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16)`}),`) to the component. Designed for hovering elements such as dropdowns or calendars.`]}),`
`,(0,u.jsx)(t.h3,{children:`CSS properties`}),`
`,(0,u.jsx)(t.p,{children:`The DNB Sharp drop shadow is also available as a CSS Custom Property:`}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-ts`,children:`import properties from '@dnb/eufemia/style/themes/ui/properties.js'

const cssBoxShadow = properties['--shadow-sharp']
`})}),`
`,(0,u.jsx)(t.p,{children:`If you only want to apply parts of the property, these are available as well:`}),`
`,(0,u.jsxs)(t.ul,{children:[`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-sharp-x: 0;`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-sharp-y: 1px;`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-sharp-blur-radius: 6px;`})}),`
`,(0,u.jsx)(t.li,{children:(0,u.jsx)(t.code,{children:`--shadow-sharp-color: rgba(0, 0, 0, 0.16);`})}),`
`]}),`
`,(0,u.jsx)(t.h2,{children:`Responsive component`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-responsive-component`})}),`
`,(0,u.jsxs)(t.p,{children:[`Makes some form components, like `,(0,u.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),`, react to small-sized screens. Since this can have negative effects when enabled by default, you can enable it optionally using this helper class.`]}),`
`,(0,u.jsx)(t.h2,{children:`Unstyled list`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-unstyled-list`})}),`
`,(0,u.jsxs)(t.p,{children:[`Removes default styling for lists. Applies to the `,(0,u.jsx)(t.code,{children:`ul`}),` or `,(0,u.jsx)(t.code,{children:`ol`}),` elements.`]}),`
`,(0,u.jsx)(s,{}),`
`,(0,u.jsx)(t.h2,{children:`Selection`}),`
`,(0,u.jsx)(t.p,{children:(0,u.jsx)(t.code,{children:`dnb-selection`})}),`
`,(0,u.jsxs)(t.p,{children:[`Applies custom `,(0,u.jsx)(t.code,{children:`::selection`}),` colors for better contrast and readability.`]}),`
`,(0,u.jsxs)(t.p,{children:[`This is automatically applied to every element whose class starts with `,(0,u.jsx)(t.code,{children:`dnb-`}),`. For other elements, you can add the `,(0,u.jsx)(t.code,{children:`.dnb-selection`}),` class manually to opt in.`]}),`
`,(0,u.jsx)(t.pre,{children:(0,u.jsx)(t.code,{className:`language-scss`,children:`background-color: var(--token-color-decorative-first-subtle);
color: var(--token-color-text-neutral);
text-shadow: none;
`})}),`
`,(0,u.jsx)(r,{}),`
`,(0,u.jsx)(t.h2,{children:`HTML class naming`}),`
`,(0,u.jsxs)(t.p,{children:[`To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `,(0,u.jsx)(t.code,{children:`dnb-`}),`. Read more about that in the `,(0,u.jsx)(t.a,{href:`/contribute/style-guides/naming`,children:`Naming conventions`}),`.`]})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};