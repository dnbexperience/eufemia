import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-CGxQ8PRe.js";var r=e(t());function i(e){let t={a:`a`,blockquote:`blockquote`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Importing the CSS`}),`
`,(0,r.jsxs)(t.p,{children:[`To include the packages `,(0,r.jsx)(t.code,{children:`dnb-ui-core`}),`, `,(0,r.jsx)(t.code,{children:`ui-theme-basis`}),` and `,(0,r.jsx)(t.code,{children:`ui-theme-components`}),` in a `,(0,r.jsx)(t.a,{href:`https://nodejs.org`,children:`Node.js`}),` based environment (given you have a CSS loader in place), do this:`]}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`Style package structure:`}),` The theme package `,(0,r.jsx)(t.code,{children:`ui-theme-components`}),` includes both `,(0,r.jsx)(t.a,{href:`/uilib/components`,children:`component`}),` and `,(0,r.jsx)(t.a,{href:`/uilib/extensions/forms`,children:`Eufemia Forms`}),` styles (Field, Value, Form layout, Wizard, etc.).`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:"// This includes the `dnb-ui-core`, `ui-theme-components` and `ui-theme-basis`\nimport '@dnb/eufemia/style'\n"})}),`
`,(0,r.jsx)(t.h2,{children:`Select a theme`}),`
`,(0,r.jsx)(t.p,{children:`The above import is a shorthand for the DNB main theme. It is equivalent to the following import:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// This is identical to \`import '@dnb/eufemia/style'\`
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),`
`,(0,r.jsx)(t.p,{children:`To import another theme, replace the second import:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// This imports the sbanken theme instead
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/sbanken'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Runtime theme switching`}),`
`,(0,r.jsx)(t.p,{children:`If your application needs to switch theme at runtime, preload the relevant theme CSS files and update the active theme through your application state.`}),`
`,(0,r.jsx)(t.h2,{children:`Importing styles from within JavaScript`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-tsx`,children:`import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-components.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Importing styles from within CSS`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-css`,children:`@import url('@dnb/eufemia/style/dnb-ui-core.min.css');
@import url('@dnb/eufemia/style/themes/ui/ui-theme-components.min.css');
@import url('@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css');
`})}),`
`,(0,r.jsx)(t.h2,{children:`Legacy import`}),`
`,(0,r.jsxs)(t.p,{children:[`The legacy import `,(0,r.jsx)(t.code,{children:`import '@dnb/eufemia/style/basis'`}),` scopes global css so it does not affect the whole page. But requires that
you place a wrapper element with class `,(0,r.jsx)(t.code,{children:`.dnb-core-style`}),` around all Eufemia elements. And may causes some css specificity issues.`]}),`
`,(0,r.jsxs)(t.p,{children:[`If possible, it should be replaced with `,(0,r.jsx)(t.code,{children:`import '@dnb/eufemia/style/core'`}),` that attaches the same css to the `,(0,r.jsx)(t.code,{children:`body`}),` tag instead.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Read more about `,(0,r.jsx)(t.a,{href:`/uilib/usage/customisation/styling#how-to-deal-with-existing-styles`,children:`how to deal with existing styles`}),`.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import '@dnb/eufemia/style/basis' // replaced by '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Single Component only`}),`
`,(0,r.jsx)(t.p,{children:`It is possible to import a single CSS Style of a single component at once:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`// Imports the core css for the theme
import '@dnb/eufemia/style/dnb-ui-core.min.css'
import '@dnb/eufemia/style/themes/ui/ui-theme-basis.min.css'

// Imports only the Button CSS and Main DNB Theme
import '@dnb/eufemia/components/button/style/dnb-button.min.css'
import '@dnb/eufemia/components/button/style/themes/dnb-button-theme-ui.min.css'
`})}),`
`,(0,r.jsx)(t.h2,{children:`Removing unused CSS (beta)`}),`
`,(0,r.jsxs)(t.blockquote,{children:[`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`Beta:`}),` The Vite plugin, style manifest, and lower-level optimizer helpers are beta APIs and may change in a future release.`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`Eufemia's JavaScript is tree-shakeable, but `,(0,r.jsx)(t.code,{children:`import '@dnb/eufemia/style'`}),` includes every component's CSS. Eufemia components also compose classes at runtime, so removing individual selectors based only on literal source text can delete styles that are actually needed.`]}),`
`,(0,r.jsx)(t.h3,{children:`Vite plugin (recommended)`}),`
`,(0,r.jsx)(t.p,{children:`Install PurgeCSS as a development dependency, then add the Eufemia CSS optimizer after your framework plugin:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`npm install --save-dev purgecss
# or
yarn add --dev purgecss
# or
pnpm add --dev purgecss
`})}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { eufemiaCssOptimizer } from '@dnb/eufemia/style/vite-plugin.js'

export default defineConfig({
  plugins: [react(), eufemiaCssOptimizer()],
})
`})}),`
`,(0,r.jsxs)(t.p,{children:[`PurgeCSS is an optional peer dependency of `,(0,r.jsx)(t.code,{children:`@dnb/eufemia`}),`, so applications that do not use the optimizer do not install it. No separate PurgeCSS configuration or build command is required after installing it. Run your normal production build:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`yarn build
`})}),`
`,(0,r.jsxs)(t.p,{children:[`The plugin scans `,(0,r.jsx)(t.code,{children:`src`}),` once for Eufemia imports, expands every detected component with its style and render dependencies, and removes unused component blocks during Vite's CSS transform pipeline. Vite therefore calculates source maps, minification, filenames, and content hashes from the optimized CSS.`]}),`
`,(0,r.jsxs)(t.p,{children:[`The beta style manifest is generated when the Eufemia package is prepared and ships as `,(0,r.jsx)(t.code,{children:`@dnb/eufemia/style/style-manifest.json`}),`; it is not committed as source. Consumers load the manifest from the installed package automatically.`]}),`
`,(0,r.jsxs)(t.p,{children:[`The optimizer only processes Eufemia's aggregate component, fragment, extension, and Forms styles. It leaves application CSS unchanged, and preserves `,(0,r.jsx)(t.code,{children:`dnb-ui-core`}),` and theme basis CSS because they contain global resets, accessibility rules, fonts, design tokens, shared element styles, and other foundation styles that cannot be safely inferred from component imports. The build prints the detected components and before/after Eufemia CSS size.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.code,{children:`sources`}),` when application code lives outside `,(0,r.jsx)(t.code,{children:`src`}),`, `,(0,r.jsx)(t.code,{children:`extensions`}),` when it uses other source-file extensions, or `,(0,r.jsx)(t.code,{children:`components`}),` when usage is selected dynamically and cannot be detected statically:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-ts`,children:`plugins: [
  react(),
  eufemiaCssOptimizer({
    sources: ['app', 'packages/shared'],
    extensions: ['ts', 'tsx', 'mdx'],
    // Or manage detection explicitly:
    // components: ['autocomplete', 'button'],
  }),
]
`})}),`
`,(0,r.jsxs)(t.p,{children:[`Automatic detection covers named and aliased imports, deep imports, namespace imports, direct re-exports, public element aliases, and Eufemia Forms. Forms detection includes `,(0,r.jsx)(t.code,{children:`Field`}),`/`,(0,r.jsx)(t.code,{children:`Value`}),`, `,(0,r.jsx)(t.code,{children:`RegisteredField`}),`/`,(0,r.jsx)(t.code,{children:`RegisteredValue`}),`, member barrels, the compatibility default export from `,(0,r.jsx)(t.code,{children:`extensions/forms/Forms`}),`, namespace usage such as `,(0,r.jsx)(t.code,{children:`Forms.Field.Upload`}),`, straightforward destructuring, and Forms deep imports. Member-specific dependencies are retained only for the members in use. If a recognized Forms namespace is used through an unresolved computed or indirect member pattern, the optimizer conservatively keeps all member-specific Forms dependencies.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Detection scans files on disk before the build. It cannot follow components through local multi-hop re-export chains, arbitrary assignment chains, computed component names, or source generated only in a virtual module. Include generated files in `,(0,r.jsx)(t.code,{children:`sources`}),` when they exist on disk, and use `,(0,r.jsx)(t.code,{children:`components`}),` to explicitly retain components for other dynamic or generated usage.`]}),`
`,(0,r.jsx)(t.h3,{children:`Advanced: non-Vite builds`}),`
`,(0,r.jsxs)(t.p,{children:[`For other build systems, `,(0,r.jsx)(t.code,{children:`createSafelist`}),` and `,(0,r.jsx)(t.code,{children:`protectWhereSelectors`}),` are available as lower-level integration APIs. `,(0,r.jsx)(t.code,{children:`createSafelist`}),` loads the shipped manifest, detects imported components, expands their transitive dependencies, and returns PurgeCSS-compatible greedy patterns. `,(0,r.jsx)(t.code,{children:`protectWhereSelectors`}),` preserves Eufemia's nested `,(0,r.jsx)(t.code,{children:`:where(:not(…))`}),` and `,(0,r.jsx)(t.code,{children:`:is(:not(…))`}),` rules, which PurgeCSS cannot retain through a safelist alone. Always apply it to Eufemia's aggregate CSS before passing the CSS to PurgeCSS:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-js`,children:`import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { PurgeCSS } from 'purgecss'
import {
  createSafelist,
  protectWhereSelectors,
} from '@dnb/eufemia/style/optimizer.js'

const require = createRequire(import.meta.url)
const { greedy } = createSafelist({ sources: ['src'] })
const cssPath =
  require.resolve('@dnb/eufemia/style/themes/ui/ui-theme-components.min.css')
const eufemiaCss = await readFile(cssPath, 'utf8')

const [result] = await new PurgeCSS().purge({
  content: ['src/**/*.{ts,tsx,js,jsx,mdx}'],
  css: [{ raw: protectWhereSelectors(eufemiaCss, greedy) }],
  safelist: { greedy },
})
`})}),`
`,(0,r.jsxs)(t.p,{children:[`The `,(0,r.jsx)(t.code,{children:`sources`}),` option controls Eufemia import detection, while PurgeCSS's `,(0,r.jsx)(t.code,{children:`content`}),` option controls literal selector scanning. Write or otherwise pass `,(0,r.jsx)(t.code,{children:`result.css`}),` to the rest of your build. Keep `,(0,r.jsx)(t.code,{children:`dnb-ui-core`}),` and theme basis CSS outside the purge input.`]}),`
`,(0,r.jsxs)(t.p,{children:[`Always include the `,(0,r.jsx)(t.code,{children:`.js`}),` extension when importing the published plugin or optimizer helper.`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};