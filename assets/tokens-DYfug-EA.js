import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";var r=e(t());function i(e){let t={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Description`}),`
`,(0,r.jsx)(t.hr,{}),`
`,(0,r.jsxs)(t.p,{children:[(0,r.jsx)(t.strong,{children:`Beta:`}),` The `,(0,r.jsx)(t.code,{children:`--token-*`}),` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.`]}),`
`,(0,r.jsx)(t.hr,{}),`
`,(0,r.jsxs)(t.p,{children:[`The design tokens are exported manually from Figma and converted to CSS variables with the `,(0,r.jsx)(t.code,{children:`make-properties`}),` script. We only export colors for now. No sizes or typography.`]}),`
`,(0,r.jsx)(t.h2,{children:`Overview`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Design tokens are not automatically exported from Figma.`}),`
`,(0,r.jsx)(t.li,{children:`We only export colors. Sizes and strings (typography) are skipped for now.`}),`
`,(0,r.jsx)(t.li,{children:`We export Foundation colors, plus light and dark brand token modes for DNB and Sbanken (Carnegie is light-only for now)`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`How to update`}),`
`,(0,r.jsx)(t.h3,{children:`1. Exporting design tokens`}),`
`,(0,r.jsx)(t.p,{children:`We currently export the Figma variable collections for:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`"Foundation" collection "colors" (`,(0,r.jsx)(t.code,{children:`Mode 1.tokens 5.json`}),`)`]}),`
`,(0,r.jsxs)(t.li,{children:[`"💻 Eufemia - Web" collection "brand" with modes:`,`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`"dnb-light" (`,(0,r.jsx)(t.code,{children:`DNB Light.tokens.json`}),`)`]}),`
`,(0,r.jsxs)(t.li,{children:[`"dnb-dark" (`,(0,r.jsx)(t.code,{children:`DNB Dark.tokens.json`}),`)`]}),`
`,(0,r.jsxs)(t.li,{children:[`"sbanken-light" (`,(0,r.jsx)(t.code,{children:`Sbanken Light.tokens.json`}),`)`]}),`
`,(0,r.jsxs)(t.li,{children:[`"sbanken-dark" (`,(0,r.jsx)(t.code,{children:`Sbanken Dark.tokens.json`}),`)`]}),`
`,(0,r.jsxs)(t.li,{children:[`"dnbcarnegie-light" (`,(0,r.jsx)(t.code,{children:`DNB Carnegie Light.tokens.json`}),`)`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(t.p,{children:[`These files are manually exported from Figma and placed in the `,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/src/style/themes/figma`}),` folder.`]}),`
`,(0,r.jsx)(t.p,{children:`Detailed steps:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Go to the "💻 Eufemia - Web" file in Figma. (You need edit permissions to see sub-collections)`}),`
`,(0,r.jsx)(t.li,{children:`Active "Design" mode.`}),`
`,(0,r.jsx)(t.li,{children:`Click the "Open variables" icon next to the label "Variables" in the right side-menu (must deselect elements to see the side-menu).`}),`
`,(0,r.jsx)(t.li,{children:`Click the "Collections options" icon next to the "Collections" heading and ensure "All collections" is selected.`}),`
`,(0,r.jsx)(t.li,{children:`Right click the collections "brand" and "colors" and select "Export Modes".`}),`
`,(0,r.jsxs)(t.li,{children:[`Unzip the downloaded .json files and place them in the `,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/src/style/themes/figma`})]}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`We export the collections from the same Figma file in order to ensure the collections are in sync.`}),`
`,(0,r.jsx)(t.h3,{children:`2. Generate CSS files`}),`
`,(0,r.jsxs)(t.p,{children:[`The CSS files are automatically generated during the "Prebuild" step by the `,(0,r.jsx)(t.code,{children:`makePropertiesFile.ts`}),` script (`,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/scripts/prebuild/tasks/makePropertiesFile.ts`}),`).`]}),`
`,(0,r.jsx)(t.h4,{children:`Generate locally (manual)`}),`
`,(0,r.jsxs)(t.p,{children:[`To generate the files manually you can run the command `,(0,r.jsx)(t.code,{children:`yarn workspace @dnb/eufemia make-properties`}),`.`]}),`
`,(0,r.jsx)(t.h2,{children:`Naming conventions/transforms`}),`
`,(0,r.jsx)(t.p,{children:`Since Figma has different rules and limitations than CSS we have established some naming conventions to avoid errors.`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`only use alphanumeric characters. (a-z and 0-9)`}),`
`,(0,r.jsxs)(t.li,{children:[`Variables are not case-sensitive. (`,(0,r.jsx)(t.code,{children:`onDark`}),` and `,(0,r.jsx)(t.code,{children:`ondark`}),` are considered the same variable)`]}),`
`,(0,r.jsxs)(t.li,{children:[`We use dashes (`,(0,r.jsx)(t.code,{children:`-`}),`) to separate groups and words.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Transforms`}),`
`,(0,r.jsxs)(t.p,{children:[`During the CSS generation, Figma variables are converted to lower case. And groups are separated by dashes (`,(0,r.jsx)(t.code,{children:`-`}),`).`]}),`
`,(0,r.jsxs)(t.p,{children:[`Only characters `,(0,r.jsx)(t.code,{children:`a-z`}),` `,(0,r.jsx)(t.code,{children:`A-Z`}),` `,(0,r.jsx)(t.code,{children:`0-9`}),`. and `,(0,r.jsx)(t.code,{children:`-`}),` are supported. Any unsupported characters will throw an error.`]}),`
`,(0,r.jsxs)(t.p,{children:[`We also add the prefix `,(0,r.jsx)(t.code,{children:`token`}),` to the variables from the `,(0,r.jsx)(t.code,{children:`Brand`}),` collection.`]}),`
`,(0,r.jsx)(t.h3,{children:`Example`}),`
`,(0,r.jsxs)(t.p,{children:[`Figma variable: `,(0,r.jsx)(t.code,{children:`Color/Dimmer/Action-Pressed-Subtle-OnDark`})]}),`
`,(0,r.jsxs)(t.p,{children:[`CSS variable: `,(0,r.jsx)(t.code,{children:`--token-color-dimmer-action-pressed-subtle-ondark`})]}),`
`,(0,r.jsx)(t.h3,{children:`Potential issues`}),`
`,(0,r.jsxs)(t.p,{children:[`Even following all the rules, we still risk naming overlap since groups and words use the same separator in CSS `,(0,r.jsx)(t.code,{children:`color/action/pressed`}),` and `,(0,r.jsx)(t.code,{children:`color/action-pressed`}),` would map to the same variable.`]}),`
`,(0,r.jsx)(t.p,{children:`But these will at least be caught on build.`})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};