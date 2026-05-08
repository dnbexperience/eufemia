import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Style Isolation`}),`
`,(0,n.jsx)(r.p,{children:`Eufemia provides you with a way to isolate its styles, so you can use different Eufemia versions along side each other on the same page.`}),`
`,(0,n.jsx)(r.h2,{children:`How it works`}),`
`,(0,n.jsxs)(r.p,{children:[`Eufemia's style isolation works by scoping all CSS selectors in the isolated style files (with the `,(0,n.jsx)(r.code,{children:`--isolated.min.css`}),` suffix) using a unique `,(0,n.jsx)(r.strong,{children:`scope hash`}),`. This scope hash is generated based on the Eufemia version (or a git SHA if the version is not released yet) and is used as a class name prefix for all selectors, ensuring that styles from different Eufemia versions do not conflict.`]}),`
`,(0,n.jsx)(r.p,{children:`For example, if you have two apps on the same page using different Eufemia versions, each will have its own scope hash:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-html`,children:`<div class="eufemia-scope--1_2_3">
  <!-- App 1 using Eufemia v1.2.3 -->
  <button class="dnb-button">Eufemia 1.2.3</button>
</div>

<div class="eufemia-scope--2_1_0">
  <!-- App 2 using Eufemia v2.1.0 -->
  <button class="dnb-button">Eufemia 2.1.0</button>
</div>
`})}),`
`,(0,n.jsxs)(r.p,{children:[`To apply the isolated styles, wrap your app content with the `,(0,n.jsx)(r.code,{children:`IsolatedStyleScope`}),` component:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { IsolatedStyleScope } from '@dnb/eufemia/shared'

function MyApp() {
  return <IsolatedStyleScope>Your app content</IsolatedStyleScope>
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Optionally, you can add the PostCSS plugin to your build tool to ensure your custom styles have the necessary CSS specificity when overriding or extending Eufemia styles.`}),`
`,(0,n.jsx)(r.h2,{children:`How to use it`}),`
`,(0,n.jsx)(r.h3,{children:`1. Import the isolated CSS files`}),`
`,(0,n.jsx)(r.p,{children:`In the root of your project, import the isolated CSS files:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import '@dnb/eufemia/style/isolated'
`})}),`
`,(0,n.jsx)(r.p,{children:`You can also import the isolated CSS files directly:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import '@dnb/eufemia/style/dnb-ui-basis--isolated.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-components--isolated.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis--isolated.min.css'
`})}),`
`,(0,n.jsx)(r.h3,{children:`2. Define the scope`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { IsolatedStyleScope } from '@dnb/eufemia/shared'

function MyApp() {
  return <IsolatedStyleScope>Your app content</IsolatedStyleScope>
}
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Good to know:`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Remove existing `,(0,n.jsx)(r.code,{children:`.dnb-core-style`}),` classes.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Font files are loaded from the CDN (Read more `,(0,n.jsx)(r.a,{href:`/uilib/typography/#hosted-fonts-cdn`,children:`about hosted fonts`}),`), so they are shared between Eufemia versions.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`3. Add the PostCSS plugin`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Find and add a `,(0,n.jsx)(r.a,{href:`https://github.com/postcss/postcss#usage`,children:`PostCSS extension or loader`}),` for your build tool.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Then create a `,(0,n.jsx)(r.code,{children:`postcss.config.js`}),` file in your project root:`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`module.exports = {
  plugins: [
    require('@dnb/eufemia/cjs/plugins/postcss-isolated-style-scope')(/* options */),
  ],
}
`})}),`
`,(0,n.jsx)(r.p,{children:`In some cases your bundler may not support CJS, so you can use the ESM version of the plugin:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`import styleScopePlugin from '@dnb/eufemia/plugins/postcss-isolated-style-scope.js'

export default {
  plugins: [styleScopePlugin(/* options */)],
}
`})}),`
`,(0,n.jsx)(r.p,{children:`The plugin accepts an options object. The default options are:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`{
  skipClassNames: [],
  replaceClassNames: undefined,// { 'old-class': 'new-class' }
  scopeHash: 'auto',// Can be a function: (file) => string
  sharedScopeHash: undefined, // Provide a function that returns an array of shared scope hashes
  verbose: false,
  warnOnDeprecatedColorVariables: true, // Set to false to disable warnings about deprecated --color-* variables
}
`})}),`
`,(0,n.jsx)(r.p,{children:`CSS Modules are supported including SASS (SCSS) files.`}),`
`,(0,n.jsx)(r.h2,{children:`CSS Specificity`}),`
`,(0,n.jsx)(r.p,{children:`When extending or overriding styles from Eufemia, it's essential to match the CSS specificity of the original selectors to ensure your styles are applied correctly.`}),`
`,(0,n.jsx)(r.p,{children:`To help with this, you can use the PostCSS plugin (style-scope) that automatically adds the required scope class to your CSS or SCSS (SASS). This ensures your styles have the necessary specificity to take effect.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-scss`,children:`.myButtonStyle:global(.dnb-button) {
  padding: 2rem;
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Without the PostCSS plugin, the example above will not work as expected.`}),`
`,(0,n.jsx)(r.h2,{children:`The scope element`}),`
`,(0,n.jsx)(r.p,{children:`If you want to use the scope element in your app, you can use a React Hook to get the root element:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import IsolatedStyleScope, {
  useIsolatedStyleScope,
} from '@dnb/eufemia/shared/IsolatedStyleScope'

function Component() {
  const { getScopeElement } = useIsolatedStyleScope()

  React.useEffect(() => {
    const element = getScopeElement()
  }, [getScopeElement])

  return null
}

render(
  <IsolatedStyleScope>
    <Component />
  </IsolatedStyleScope>
)
`})}),`
`,(0,n.jsxs)(r.p,{children:[`Optionally, you can provide a different scope hash (`,(0,n.jsx)(r.code,{children:`scopeHash`}),`) to the hook if you need to retrieve an element from a nested scope:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`const { getScopeElement } = useIsolatedStyleScope('my-scope')
`})}),`
`,(0,n.jsx)(r.h2,{children:`Additional information`}),`
`,(0,n.jsx)(r.h3,{children:`Isolated CSS files`}),`
`,(0,n.jsx)(r.p,{children:`Every component has its own isolated CSS file. You can import them directly:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`// Shared basis
import '@dnb/eufemia/style/dnb-ui-basis--isolated.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis--isolated.min.css'

// Components
import '@dnb/eufemia/components/button/style/dnb-button--isolated.min.css'
import '@dnb/eufemia/components/button/style/themes/dnb-button-theme-ui--isolated.min.css'
`})}),`
`,(0,n.jsx)(r.h3,{children:`Omit selectors from the scope`}),`
`,(0,n.jsxs)(r.p,{children:[`You can prepend your selectors with `,(0,n.jsx)(r.code,{children:`[skip-isolation]`}),` which will omit the scope class from the selector. Also, the selector `,(0,n.jsx)(r.code,{children:`[skip-isolation]`}),` will be removed:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`[skip-isolation] .global-selector {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Will become:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`.global-selector {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Here's how you can make a selector global when using CSS Modules:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-scss`,children:`:global {
  [skip-isolation] .global-selector {
    --color-sea-green: tomato;
  }
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Will become:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`.global-selector {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.h3,{children:`Placeholder`}),`
`,(0,n.jsxs)(r.p,{children:[`You can use the selector `,(0,n.jsx)(r.code,{children:`[scope-placeholder]`}),` as a shortcut for targeting the root of the isolated scope. The PostCSS plugin will automatically replace it with the actual scope class (e.g. `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3`}),`).`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-scss`,children:`[scope-placeholder] {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Will become:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`.eufemia-scope--1_2_3 {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.p,{children:`This gives you the ability to compose selectors with flexibility.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-scss`,children:`html [scope-placeholder] .mySelector {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.p,{children:`Will become:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`html .eufemia-scope--1_2_3 .mySelector {
  --color-sea-green: tomato;
}
`})}),`
`,(0,n.jsx)(r.h3,{children:`Overwrite the given scope hash`}),`
`,(0,n.jsx)(r.p,{children:`By using the PostCSS plugin, you can overwrite the given scope hash by providing a string or function that returns a string:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`{
  scopeHash: (file) => 'my-hash',
}
`})}),`
`,(0,n.jsxs)(r.p,{children:[`If you return `,(0,n.jsx)(r.code,{children:`undefined`}),`, the default scope hash will be applied.`]}),`
`,(0,n.jsx)(r.p,{children:`Additionally, you then also need to provide the same scope hash to the Eufemia component:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { IsolatedStyleScope } from '@dnb/eufemia/shared/IsolatedStyleScope'

function MyApp() {
  return (
    <IsolatedStyleScope scopeHash="my-hash">
      Your app content
    </IsolatedStyleScope>
  )
}
`})}),`
`,(0,n.jsx)(r.h3,{children:`Shared scopes`}),`
`,(0,n.jsx)(r.p,{children:`The PostCSS plugin supports shared scopes. This means that you can use the same selector in one file and have it be duplicated for multiple scopes.`}),`
`,(0,n.jsx)(r.p,{children:`In order to do that, you can provide a function that returns an array of shared scope hashes.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-js`,children:`{
  sharedScopeHash: () => ['shared-1', 'shared-2'],
}
`})}),`
`,(0,n.jsx)(r.p,{children:`This will create duplicate selectors for each shared scope.`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-css`,children:`.main-scope .my-class,
.shared-1 .my-class,
.shared-2 .my-class {
  /* Styles for Eufemia v1.2.3 */
}
`})}),`
`,(0,n.jsx)(r.h3,{children:`Get the current scope hash`}),`
`,(0,n.jsxs)(r.p,{children:[`You can use `,(0,n.jsx)(r.code,{children:`getStyleScopeHash`}),` to get the scope hash for the current Eufemia version via the `,(0,n.jsx)(r.code,{children:`IsolatedStyleScope`}),` component:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`import { getStyleScopeHash } from '@dnb/eufemia/shared/IsolatedStyleScope'

getStyleScopeHash() // 'eufemia-scope--1_2_3'
`})}),`
`,(0,n.jsx)(r.h3,{children:`Selector transformation and scoping behavior`}),`
`,(0,n.jsx)(r.h4,{children:`General Rules`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`CSS `,(0,n.jsx)(r.code,{children:`:root`}),` selectors are rewritten to target the scoped container.
e.g. `,(0,n.jsx)(r.code,{children:`:root {}`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 {}`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Selectors starting with `,(0,n.jsx)(r.code,{children:`[skip-isolation]`}),` are excluded from scoping.
e.g. `,(0,n.jsx)(r.code,{children:`[skip-isolation] .x`}),` → `,(0,n.jsx)(r.code,{children:`.x`})]}),`
`,(0,n.jsxs)(r.li,{children:[`A placeholder `,(0,n.jsx)(r.code,{children:`[scope-placeholder]`}),` can be used to compose selectors.
e.g. `,(0,n.jsx)(r.code,{children:`[scope-placeholder] .x`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 .x`})]}),`
`]}),`
`,(0,n.jsx)(r.h4,{children:`Additional Cases`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A `,(0,n.jsx)(r.code,{children:`html`}),` selector is left untouched and continues to target the global `,(0,n.jsx)(r.code,{children:`<html>`}),` element.
e.g. `,(0,n.jsx)(r.code,{children:`html {}`}),` → `,(0,n.jsx)(r.code,{children:`html {}`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A `,(0,n.jsx)(r.code,{children:`body`}),` selector remains unchanged.
e.g. `,(0,n.jsx)(r.code,{children:`body {}`}),` → `,(0,n.jsx)(r.code,{children:`body {}`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Combined `,(0,n.jsx)(r.code,{children:`html body`}),` selectors remain untouched.
e.g. `,(0,n.jsx)(r.code,{children:`html body {}`}),` → `,(0,n.jsx)(r.code,{children:`html body {}`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A selector like `,(0,n.jsx)(r.code,{children:`body .my-class`}),` is scoped so that the class is prefixed, but `,(0,n.jsx)(r.code,{children:`body`}),` remains global.
e.g. `,(0,n.jsx)(r.code,{children:`body .my-class`}),` → `,(0,n.jsx)(r.code,{children:`body .eufemia-scope--1_2_3 .my-class`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A selector like `,(0,n.jsx)(r.code,{children:`body *`}),` will scope the selector.
e.g. `,(0,n.jsx)(r.code,{children:`body *`}),` → `,(0,n.jsx)(r.code,{children:`body .eufemia-scope--1_2_3 *`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A combined selector like `,(0,n.jsx)(r.code,{children:`html body .my-class`}),` results in only `,(0,n.jsx)(r.code,{children:`.my-class`}),` being scoped.
e.g. `,(0,n.jsx)(r.code,{children:`html body .my-class`}),` → `,(0,n.jsx)(r.code,{children:`html body .eufemia-scope--1_2_3 .my-class`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Class selectors are prefixed with the scope class.
e.g. `,(0,n.jsx)(r.code,{children:`.my-class`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 .my-class`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`ID selectors are scoped similarly.
e.g. `,(0,n.jsx)(r.code,{children:`#header`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 #header`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Tag selectors like `,(0,n.jsx)(r.code,{children:`strong`}),`, `,(0,n.jsx)(r.code,{children:`em`}),`, or `,(0,n.jsx)(r.code,{children:`input`}),` are scoped.
e.g. `,(0,n.jsx)(r.code,{children:`strong`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 strong`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Attribute selectors are scoped.
e.g. `,(0,n.jsx)(r.code,{children:`[data-test]`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 [data-test]`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Pseudo-classes are preserved after scoping.
e.g. `,(0,n.jsx)(r.code,{children:`.button:hover`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 .button:hover`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Pseudo-elements are scoped.
e.g. `,(0,n.jsx)(r.code,{children:`.icon::before`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 .icon::before`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`The universal selector `,(0,n.jsx)(r.code,{children:`*`}),`, and pseudo-elements like `,(0,n.jsx)(r.code,{children:`::before`}),` and `,(0,n.jsx)(r.code,{children:`::after`}),`, are scoped when grouped.
e.g. `,(0,n.jsx)(r.code,{children:`*, ::before, ::after`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 *, .eufemia-scope--1_2_3 ::before, .eufemia-scope--1_2_3 ::after`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`Selectors already containing the correct scope (e.g. `,(0,n.jsx)(r.code,{children:`.eufemia-scope--something`}),`) are not scoped again.`]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`@keyframes`}),` are omitted from scoping for now.`]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h4,{children:`CSS Modules Specific`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`When `,(0,n.jsx)(r.code,{children:`runAsCssModule`}),` is `,(0,n.jsx)(r.code,{children:`true`}),`, scope classes are injected using `,(0,n.jsx)(r.code,{children:`:global(...)`}),`.
e.g. `,(0,n.jsx)(r.code,{children:`.my-class`}),` → `,(0,n.jsx)(r.code,{children:`:global(.eufemia-scope--1_2_3) .my-class`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A top-level `,(0,n.jsx)(r.code,{children:`:global`}),` block is replaced with a scoped global.
e.g. `,(0,n.jsx)(r.code,{children:`:global {}`}),` → `,(0,n.jsx)(r.code,{children:`:global(.eufemia-scope--1_2_3) {}`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[`A leading `,(0,n.jsx)(r.code,{children:`:global`}),` selector chain is wrapped accordingly.
e.g. `,(0,n.jsx)(r.code,{children:`:global .x`}),` → `,(0,n.jsx)(r.code,{children:`:global(.eufemia-scope--1_2_3) :global .x`})]}),`
`]}),`
`]}),`
`,(0,n.jsx)(r.h4,{children:`Special Configurations`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`replaceClassNames`}),`: Specific class names are renamed before scoping.
e.g. `,(0,n.jsx)(r.code,{children:`.old-name`}),` → `,(0,n.jsx)(r.code,{children:`.eufemia-scope--1_2_3 .new-name`}),`
with `,(0,n.jsx)(r.code,{children:`{ 'old-name': 'new-name' }`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`skipClassNames`}),`: These classes are never scoped.
e.g. `,(0,n.jsx)(r.code,{children:`.skip-me`}),` → `,(0,n.jsx)(r.code,{children:`.skip-me`}),`
with `,(0,n.jsx)(r.code,{children:`['skip-me']`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`sharedScopeHash`}),`: Selectors are duplicated for each shared scope.
e.g. `,(0,n.jsx)(r.code,{children:`.my-class`}),` → `,(0,n.jsx)(r.code,{children:`.main-scope .my-class, .shared-1 .my-class, .shared-2 .my-class`}),`
with `,(0,n.jsx)(r.code,{children:`sharedScopeHash: () => ['shared-1', 'shared-2']`})]}),`
`]}),`
`,(0,n.jsxs)(r.li,{children:[`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.code,{children:`scopeHash: 'auto'`}),`: Reads from `,(0,n.jsx)(r.code,{children:`scope-hash.txt`}),` if available, or falls back to default.
e.g. (`,(0,n.jsx)(r.code,{children:`scopeHash: 'my-hash'`}),`) `,(0,n.jsx)(r.code,{children:`my-hash`}),` → `,(0,n.jsx)(r.code,{children:`.my-hash .my-class`}),`
with a string: `,(0,n.jsx)(r.code,{children:`scopeHash: 'my-hash'`}),`
with a function: `,(0,n.jsx)(r.code,{children:`scopeHash: (file) => 'my-hash'`})]}),`
`]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};