import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";var n=e();function r(e){let r={code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h2,{children:`Description`}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsxs)(r.p,{children:[(0,n.jsx)(r.strong,{children:`Beta:`}),` The `,(0,n.jsx)(r.code,{children:`--token-*`}),` CSS custom properties are in beta. We encourage you to start using them and welcome your feedback. The token API may still change, but we will communicate any breaking changes.`]}),`
`,(0,n.jsx)(r.hr,{}),`
`,(0,n.jsxs)(r.p,{children:[`The design tokens are exported manually from Figma and converted to CSS variables with the `,(0,n.jsx)(r.code,{children:`make-properties`}),` script. We only export colors for now. No sizes or typography.`]}),`
`,(0,n.jsx)(r.h2,{children:`Overview`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Design tokens are not automatically exported from Figma.`}),`
`,(0,n.jsx)(r.li,{children:`We only export colors. Sizes and strings (typography) are skipped for now.`}),`
`,(0,n.jsx)(r.li,{children:`We export Foundation colors, plus light and dark brand token modes for DNB and Sbanken (Carnegie is light-only for now)`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`How to update`}),`
`,(0,n.jsx)(r.h3,{children:`1. Exporting design tokens`}),`
`,(0,n.jsx)(r.p,{children:`We currently export the Figma variable collections for:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`"Foundation" collection "colors" (`,(0,n.jsx)(r.code,{children:`Mode 1.tokens 5.json`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`"💻 Eufemia - Web" collection "brand" with modes:`,`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`"dnb-light" (`,(0,n.jsx)(r.code,{children:`DNB Light.tokens.json`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`"dnb-dark" (`,(0,n.jsx)(r.code,{children:`DNB Dark.tokens.json`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`"sbanken-light" (`,(0,n.jsx)(r.code,{children:`Sbanken Light.tokens.json`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`"sbanken-dark" (`,(0,n.jsx)(r.code,{children:`Sbanken Dark.tokens.json`}),`)`]}),`
`,(0,n.jsxs)(r.li,{children:[`"dnbcarnegie-light" (`,(0,n.jsx)(r.code,{children:`DNB Carnegie Light.tokens.json`}),`)`]}),`
`]}),`
`]}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`These files are manually exported from Figma and placed in the `,(0,n.jsx)(r.code,{children:`packages/dnb-eufemia/src/style/themes/figma`}),` folder.`]}),`
`,(0,n.jsx)(r.p,{children:`Detailed steps:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Go to the "💻 Eufemia - Web" file in Figma. (You need edit permissions to see sub-collections)`}),`
`,(0,n.jsx)(r.li,{children:`Active "Design" mode.`}),`
`,(0,n.jsx)(r.li,{children:`Click the "Open variables" icon next to the label "Variables" in the right side-menu (must deselect elements to see the side-menu).`}),`
`,(0,n.jsx)(r.li,{children:`Click the "Collections options" icon next to the "Collections" heading and ensure "All collections" is selected.`}),`
`,(0,n.jsx)(r.li,{children:`Right click the collections "brand" and "colors" and select "Export Modes".`}),`
`,(0,n.jsxs)(r.li,{children:[`Unzip the downloaded .json files and place them in the `,(0,n.jsx)(r.code,{children:`packages/dnb-eufemia/src/style/themes/figma`})]}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`We export the collections from the same Figma file in order to ensure the collections are in sync.`}),`
`,(0,n.jsx)(r.h3,{children:`2. Generate CSS files`}),`
`,(0,n.jsxs)(r.p,{children:[`The CSS files are automatically generated during the "Prebuild" step by the `,(0,n.jsx)(r.code,{children:`makePropertiesFile.ts`}),` script (`,(0,n.jsx)(r.code,{children:`packages/dnb-eufemia/scripts/prebuild/tasks/makePropertiesFile.ts`}),`).`]}),`
`,(0,n.jsx)(r.h4,{children:`Generate locally (manual)`}),`
`,(0,n.jsxs)(r.p,{children:[`To generate the files manually you can run the command `,(0,n.jsx)(r.code,{children:`yarn workspace @dnb/eufemia make-properties`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Naming conventions/transforms`}),`
`,(0,n.jsx)(r.p,{children:`Since Figma has different rules and limitations than CSS we have established some naming conventions to avoid errors.`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`only use alphanumeric characters. (a-z and 0-9)`}),`
`,(0,n.jsxs)(r.li,{children:[`Variables are not case-sensitive. (`,(0,n.jsx)(r.code,{children:`onDark`}),` and `,(0,n.jsx)(r.code,{children:`ondark`}),` are considered the same variable)`]}),`
`,(0,n.jsxs)(r.li,{children:[`We use dashes (`,(0,n.jsx)(r.code,{children:`-`}),`) to separate groups and words.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Transforms`}),`
`,(0,n.jsxs)(r.p,{children:[`During the CSS generation, Figma variables are converted to lower case. And groups are separated by dashes (`,(0,n.jsx)(r.code,{children:`-`}),`).`]}),`
`,(0,n.jsxs)(r.p,{children:[`Only characters `,(0,n.jsx)(r.code,{children:`a-z`}),` `,(0,n.jsx)(r.code,{children:`A-Z`}),` `,(0,n.jsx)(r.code,{children:`0-9`}),`. and `,(0,n.jsx)(r.code,{children:`-`}),` are supported. Any unsupported characters will throw an error.`]}),`
`,(0,n.jsxs)(r.p,{children:[`We also add the prefix `,(0,n.jsx)(r.code,{children:`token`}),` to the variables from the `,(0,n.jsx)(r.code,{children:`Brand`}),` collection.`]}),`
`,(0,n.jsx)(r.h3,{children:`Example`}),`
`,(0,n.jsxs)(r.p,{children:[`Figma variable: `,(0,n.jsx)(r.code,{children:`Color/Dimmer/Action-Pressed-Subtle-OnDark`})]}),`
`,(0,n.jsxs)(r.p,{children:[`CSS variable: `,(0,n.jsx)(r.code,{children:`--token-color-dimmer-action-pressed-subtle-ondark`})]}),`
`,(0,n.jsx)(r.h3,{children:`Potential issues`}),`
`,(0,n.jsxs)(r.p,{children:[`Even following all the rules, we still risk naming overlap since groups and words use the same separator in CSS `,(0,n.jsx)(r.code,{children:`color/action/pressed`}),` and `,(0,n.jsx)(r.code,{children:`color/action-pressed`}),` would map to the same variable.`]}),`
`,(0,n.jsx)(r.p,{children:`But these will at least be caught on build.`})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};