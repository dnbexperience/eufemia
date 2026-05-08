import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{a as n,i as r,n as i,o as a,s as o,t as s}from"./Examples-3Lvy-nFc.js";import{r as c}from"./Examples-BtVicr_1.js";var l=e();function u(e){let u={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return i||f(`Examples`,!1),s||f(`Examples.CoreStyle`,!0),r||f(`Examples.ScreenReaderOnly`,!0),n||f(`Examples.Selection`,!0),a||f(`Examples.TabFocus`,!0),o||f(`Examples.UnstyledList`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(u.h1,{children:`CSS classes`}),`
`,(0,l.jsx)(u.h2,{children:`CSS helper classes`}),`
`,(0,l.jsxs)(u.p,{children:[`Reusing classes in the markup instead of using SCSS extends or `,(0,l.jsx)(u.em,{children:`mixins`}),` will prevent duplication in `,(0,l.jsx)(u.code,{children:`@dnb/eufemia`}),`. This approach also benefits your application by reusing these helper classes.`]}),`
`,(0,l.jsx)(u.h2,{children:`Core style`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-core-style`})}),`
`,(0,l.jsx)(u.p,{children:`Provides the core Body Style inside a wrapper, making it available for all its children. The Body Style includes the correct color, line-height, font, and a CSS reset, among other styles.`}),`
`,(0,l.jsx)(s,{}),`
`,(0,l.jsx)(u.h2,{children:`Tab focus`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-tab-focus`})}),`
`,(0,l.jsx)(u.p,{children:`Removes the default focus outline from a focusable element and adds a custom visual focus state when focused by a tab key.
There is also:`}),`
`,(0,l.jsxs)(u.ul,{children:[`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`dnb-mouse-focus`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`dnb-focus-ring`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`dnb-no-focus`})}),`
`]}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsx)(u.h2,{children:`Skip link`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-skip-link`})}),`
`,(0,l.jsx)(u.p,{children:`A default Skip Link style for adding a link at the top of each page that goes directly to the main content area.`}),`
`,(0,l.jsx)(c,{}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-html`,children:`<body>
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
`,(0,l.jsxs)(u.p,{children:[`More details in the `,(0,l.jsx)(u.a,{href:`/uilib/usage/accessibility/focus#skip-link`,children:`Focus Section`}),`.`]}),`
`,(0,l.jsx)(u.h2,{children:`Spacing`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-spacing`})}),`
`,(0,l.jsxs)(u.p,{children:[`Sets default spacing (using `,(0,l.jsx)(u.em,{children:`margin`}),`) on all HTML elements inside the container with this style. The default spacing is `,(0,l.jsx)(u.code,{children:`margin-bottom: 1.5rem`}),`, but specific margins are defined for headings, lists, and tables.`]}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-html`,children:`<article class="dnb-spacing">
  <!-- DNB spacings -->
  <h1 class="dnb-h--xx-large">
    e.g. I have now the Eufemia spacing (margin)
  </h1>
  <p class="dnb-p">👉 Me as well</p>
</article>
`})}),`
`,(0,l.jsxs)(u.p,{children:[`More details in `,(0,l.jsx)(u.a,{href:`/uilib/usage/customisation/styling#spacing`,children:`Styling`}),`.`]}),`
`,(0,l.jsx)(u.h2,{children:`Scrollbar appearance`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-scrollbar-appearance`})}),`
`,(0,l.jsxs)(u.p,{children:[`Define the DNB scrollbar appearance, including the color `,(0,l.jsx)(u.code,{children:`--color-emerald-green`}),` with `,(0,l.jsx)(u.code,{children:`transparent`}),`.`]}),`
`,(0,l.jsx)(u.p,{children:`NB: Browser support is not fully covered (2021).`}),`
`,(0,l.jsx)(u.h2,{children:`Screen Reader (sr) only`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-sr-only`})}),`
`,(0,l.jsxs)(u.p,{children:[`Visually hide an element while keeping it accessible to screen readers. (`,(0,l.jsx)(u.em,{children:`sr`}),` stands for `,(0,l.jsx)(u.em,{children:`Screen Reader`}),`)`]}),`
`,(0,l.jsx)(r,{}),`
`,(0,l.jsx)(u.h2,{children:`Page background`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-page-background`})}),`
`,(0,l.jsxs)(u.p,{children:[`Sets the page background color using the `,(0,l.jsx)(u.code,{children:`--token-color-background-page-background`}),` design token. Use this class on a root element (such as `,(0,l.jsx)(u.code,{children:`body`}),` or a wrapper) to ensure a themed background color that adapts to light and dark modes.`]}),`
`,(0,l.jsx)(u.h2,{children:`Drop shadow`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-drop-shadow`})}),`
`,(0,l.jsxs)(u.p,{children:[`Adds a default drop shadow (`,(0,l.jsx)(u.code,{children:`box-shadow: 0 8px 16px rgba(51, 51, 51, 0.08)`}),`) to the component. The current shadow specification is designed to be softer and more blurred.`]}),`
`,(0,l.jsx)(u.h3,{children:`CSS properties`}),`
`,(0,l.jsx)(u.p,{children:`The DNB Drop shadow is also available as a CSS Custom Property:`}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-ts`,children:`import properties from '@dnb/eufemia/style/themes/ui/properties.js'

const cssBoxShadow = properties['--shadow-default']
`})}),`
`,(0,l.jsx)(u.p,{children:`If you only want to apply parts of the property, these are available as well:`}),`
`,(0,l.jsxs)(u.ul,{children:[`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-default-x: 0;`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-default-y: 8px;`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-default-blur-radius: 16px;`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-default-color: rgba(51, 51, 51, 0.08);`})}),`
`]}),`
`,(0,l.jsx)(u.h2,{children:`Sharp drop shadow`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-sharp-drop-shadow`})}),`
`,(0,l.jsxs)(u.p,{children:[`Adds a smaller but sharper drop shadow (`,(0,l.jsx)(u.code,{children:`box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16)`}),`) to the component. Designed for hovering elements such as dropdowns or calendars.`]}),`
`,(0,l.jsx)(u.h3,{children:`CSS properties`}),`
`,(0,l.jsx)(u.p,{children:`The DNB Sharp drop shadow is also available as a CSS Custom Property:`}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-ts`,children:`import properties from '@dnb/eufemia/style/themes/ui/properties.js'

const cssBoxShadow = properties['--shadow-sharp']
`})}),`
`,(0,l.jsx)(u.p,{children:`If you only want to apply parts of the property, these are available as well:`}),`
`,(0,l.jsxs)(u.ul,{children:[`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-sharp-x: 0;`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-sharp-y: 1px;`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-sharp-blur-radius: 6px;`})}),`
`,(0,l.jsx)(u.li,{children:(0,l.jsx)(u.code,{children:`--shadow-sharp-color: rgba(0, 0, 0, 0.16);`})}),`
`]}),`
`,(0,l.jsx)(u.h2,{children:`Responsive component`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-responsive-component`})}),`
`,(0,l.jsxs)(u.p,{children:[`Makes some form components, like `,(0,l.jsx)(u.a,{href:`/uilib/components/input`,children:`Input`}),`, react to small-sized screens. Since this can have negative effects when enabled by default, you can enable it optionally using this helper class.`]}),`
`,(0,l.jsx)(u.h2,{children:`Unstyled list`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-unstyled-list`})}),`
`,(0,l.jsxs)(u.p,{children:[`Removes default styling for lists. Applies to the `,(0,l.jsx)(u.code,{children:`ul`}),` or `,(0,l.jsx)(u.code,{children:`ol`}),` elements.`]}),`
`,(0,l.jsx)(o,{}),`
`,(0,l.jsx)(u.h2,{children:`Selection`}),`
`,(0,l.jsx)(u.p,{children:(0,l.jsx)(u.code,{children:`dnb-selection`})}),`
`,(0,l.jsxs)(u.p,{children:[`Applies custom `,(0,l.jsx)(u.code,{children:`::selection`}),` colors for better contrast and readability.`]}),`
`,(0,l.jsxs)(u.p,{children:[`This is automatically applied to every element whose class starts with `,(0,l.jsx)(u.code,{children:`dnb-`}),`. For other elements, you can add the `,(0,l.jsx)(u.code,{children:`.dnb-selection`}),` class manually to opt in.`]}),`
`,(0,l.jsx)(u.pre,{children:(0,l.jsx)(u.code,{className:`language-scss`,children:`background-color: var(--token-color-decorative-first-subtle);
color: var(--token-color-text-neutral);
text-shadow: none;
`})}),`
`,(0,l.jsx)(n,{}),`
`,(0,l.jsx)(u.h2,{children:`HTML class naming`}),`
`,(0,l.jsxs)(u.p,{children:[`To ensure a consistent class structure and to ensure that the class is owned by the DNB UI Library, all classes in the UI Library are prefixed with `,(0,l.jsx)(u.code,{children:`dnb-`}),`. Read more about that in the `,(0,l.jsx)(u.a,{href:`/contribute/style-guides/naming`,children:`Naming conventions`}),`.`]})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};