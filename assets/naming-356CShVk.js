import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={code:`code`,em:`em`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Naming convention`}),`
`,(0,n.jsx)(r.p,{children:`The DNB Design System Eufemia uses the following naming conventions.`}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.strong,{children:`Formatting styles`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`pascal case`}),` also known as `,(0,n.jsx)(r.em,{children:`upper camel case`}),`. Every word upper case. Example: `,(0,n.jsx)(r.code,{children:`PascalCase`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`camel case`}),` also known as `,(0,n.jsx)(r.em,{children:`lower camel case`}),`. First word lower case. Example: `,(0,n.jsx)(r.code,{children:`camelCase`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`kebab case`}),` also known as `,(0,n.jsx)(r.em,{children:`hyphen case`}),`. Only lower case letters. Example: `,(0,n.jsx)(r.code,{children:`kebab-case`})]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.strong,{children:`snake case`}),`. Only lower case letters. Example: `,(0,n.jsx)(r.code,{children:`snake_case`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`React components`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`React Components, both as files and as components use `,(0,n.jsx)(r.strong,{children:`pascal case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`The folder containing the component uses `,(0,n.jsx)(r.strong,{children:`kebab case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Co-located files that belong to a component (such as Context, Provider, Docs, and utility files) use `,(0,n.jsx)(r.strong,{children:`pascal case`}),` prefixed with the component name. Like: `,(0,n.jsx)(r.code,{children:`SliderProvider.tsx`}),`, `,(0,n.jsx)(r.code,{children:`InputDocs.ts`}),`, `,(0,n.jsx)(r.code,{children:`DatePickerContext.ts`})]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Namespace components`}),`
`,(0,n.jsxs)(r.p,{children:[`Components exported as part of a namespace (e.g. `,(0,n.jsx)(r.code,{children:`Field.String`}),`, `,(0,n.jsx)(r.code,{children:`Form.Handler`}),`, `,(0,n.jsx)(r.code,{children:`Iterate.Array`}),`) use `,(0,n.jsx)(r.strong,{children:`pascal case`}),` for both folders and files to mirror the public API structure.`]}),`
`,(0,n.jsx)(r.h2,{children:`CSS / SCSS`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`CSS classes and the files containing the styles use `,(0,n.jsx)(r.strong,{children:`kebab case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`CSS classes are prefixed with: `,(0,n.jsx)(r.code,{children:`dnb-`})]}),`
`,(0,n.jsxs)(r.li,{children:[`CSS `,(0,n.jsx)(r.code,{children:`Custom Properties`}),` (CSS Variables) use `,(0,n.jsx)(r.strong,{children:`kebab case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`SCSS Mixins use `,(0,n.jsx)(r.strong,{children:`camel case`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`JavaScript`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`Functions`}),` and `,(0,n.jsx)(r.code,{children:`Variables`}),` use `,(0,n.jsx)(r.strong,{children:`camel case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`Classes`}),` use `,(0,n.jsx)(r.strong,{children:`pascal case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Other JavaScript files use `,(0,n.jsx)(r.strong,{children:`kebab case`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Events and Properties`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Event names use `,(0,n.jsx)(r.strong,{children:`camel case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`They have to describe what they are aiming to do. Like: `,(0,n.jsx)(r.code,{children:`onClick`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Icons`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Icon names use `,(0,n.jsx)(r.strong,{children:`snake case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`They have to describe what they are meant for. Like: `,(0,n.jsx)(r.code,{children:`chevron_right`})]}),`
`,(0,n.jsxs)(r.li,{children:[`Sizes are added as a postfix. Like: `,(0,n.jsx)(r.code,{children:`chevron_right_medium`})]}),`
`,(0,n.jsx)(r.li,{children:`Only alphabetic characters (a to z) and numeric characters (0 to 9) without special chars, due to import statements.`}),`
`,(0,n.jsx)(r.li,{children:`Figma icon naming has to match the same (icon archive) as they will define the import names.`}),`
`,(0,n.jsx)(r.li,{children:`Figma page and frame names (icon archive) have to be the same, due to the automated import mechanism.`}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Documentation`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.code,{children:`Pages`}),` and directories use `,(0,n.jsx)(r.strong,{children:`kebab-case`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Documentation example files use `,(0,n.jsx)(r.strong,{children:`pascal case`}),`. Like: `,(0,n.jsx)(r.code,{children:`Examples.tsx`})]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};