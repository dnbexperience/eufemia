import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";var r=e(t());function i(e){let t={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Naming convention`}),`
`,(0,r.jsx)(t.p,{children:`The DNB Design System Eufemia uses the following naming conventions.`}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.strong,{children:`Formatting styles`})}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`pascal case`}),` also known as `,(0,r.jsx)(t.em,{children:`upper camel case`}),`. Every word upper case. Example: `,(0,r.jsx)(t.code,{children:`PascalCase`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`camel case`}),` also known as `,(0,r.jsx)(t.em,{children:`lower camel case`}),`. First word lower case. Example: `,(0,r.jsx)(t.code,{children:`camelCase`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`kebab case`}),` also known as `,(0,r.jsx)(t.em,{children:`hyphen case`}),`. Only lower case letters. Example: `,(0,r.jsx)(t.code,{children:`kebab-case`})]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.strong,{children:`snake case`}),`. Only lower case letters. Example: `,(0,r.jsx)(t.code,{children:`snake_case`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`React components`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`React Components, both as files and as components use `,(0,r.jsx)(t.strong,{children:`pascal case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`The folder containing the component uses `,(0,r.jsx)(t.strong,{children:`kebab case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Co-located files that belong to a component (such as Context, Provider, Docs, and utility files) use `,(0,r.jsx)(t.strong,{children:`pascal case`}),` prefixed with the component name. Like: `,(0,r.jsx)(t.code,{children:`SliderProvider.tsx`}),`, `,(0,r.jsx)(t.code,{children:`InputDocs.ts`}),`, `,(0,r.jsx)(t.code,{children:`DatePickerContext.ts`})]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Namespace components`}),`
`,(0,r.jsxs)(t.p,{children:[`Components exported as part of a namespace (e.g. `,(0,r.jsx)(t.code,{children:`Field.String`}),`, `,(0,r.jsx)(t.code,{children:`Form.Handler`}),`, `,(0,r.jsx)(t.code,{children:`Iterate.Array`}),`) use `,(0,r.jsx)(t.strong,{children:`pascal case`}),` for both folders and files to mirror the public API structure.`]}),`
`,(0,r.jsx)(t.h2,{children:`CSS / SCSS`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`CSS classes and the files containing the styles use `,(0,r.jsx)(t.strong,{children:`kebab case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`CSS classes are prefixed with: `,(0,r.jsx)(t.code,{children:`dnb-`})]}),`
`,(0,r.jsxs)(t.li,{children:[`CSS `,(0,r.jsx)(t.code,{children:`Custom Properties`}),` (CSS Variables) use `,(0,r.jsx)(t.strong,{children:`kebab case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`SCSS Mixins use `,(0,r.jsx)(t.strong,{children:`camel case`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`JavaScript`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`Functions`}),` and `,(0,r.jsx)(t.code,{children:`Variables`}),` use `,(0,r.jsx)(t.strong,{children:`camel case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`Classes`}),` use `,(0,r.jsx)(t.strong,{children:`pascal case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Other JavaScript files use `,(0,r.jsx)(t.strong,{children:`kebab case`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Events and Properties`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Event names use `,(0,r.jsx)(t.strong,{children:`camel case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`They have to describe what they are aiming to do. Like: `,(0,r.jsx)(t.code,{children:`onClick`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Icons`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Icon names use `,(0,r.jsx)(t.strong,{children:`snake case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`They have to describe what they are meant for. Like: `,(0,r.jsx)(t.code,{children:`chevron_right`})]}),`
`,(0,r.jsxs)(t.li,{children:[`Sizes are added as a postfix. Like: `,(0,r.jsx)(t.code,{children:`chevron_right_medium`})]}),`
`,(0,r.jsx)(t.li,{children:`Only alphabetic characters (a to z) and numeric characters (0 to 9) without special chars, due to import statements.`}),`
`,(0,r.jsx)(t.li,{children:`Figma icon naming has to match the same (icon archive) as they will define the import names.`}),`
`,(0,r.jsx)(t.li,{children:`Figma page and frame names (icon archive) have to be the same, due to the automated import mechanism.`}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Documentation`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.code,{children:`Pages`}),` and directories use `,(0,r.jsx)(t.strong,{children:`kebab-case`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Documentation example files use `,(0,r.jsx)(t.strong,{children:`pascal case`}),`. Like: `,(0,r.jsx)(t.code,{children:`Examples.tsx`})]}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};