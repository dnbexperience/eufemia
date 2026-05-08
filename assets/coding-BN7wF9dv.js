import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Code guide`}),`
`,(0,n.jsx)(r.p,{children:`To assure that the source code remains consistent regardless of the amount of contributors, a set of code principles has been established.`}),`
`,(0,n.jsxs)(r.p,{children:[`The set of main code principles within JS, CSS, Typography and testing are located in the `,(0,n.jsx)(r.a,{href:`/uilib/usage/best-practices`,children:`UI Library - Best practices`}),`. Below is more related to further developing the Eufemia repository.`]}),`
`,(0,n.jsx)(r.h2,{children:`Recommended Tools`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.a,{href:`https://volta.sh/`,children:`Volta`}),` for `,(0,n.jsx)(r.a,{href:`https://nodejs.org/`,children:`Node.js`}),` version handling.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Use `,(0,n.jsx)(r.a,{href:`https://eslint.org/docs/user-guide/integrations`,children:`ESLint`}),` and `,(0,n.jsx)(r.a,{href:`https://prettier.io/docs/en/editors.html`,children:`Prettier`}),` plugins in your favorite code editor to show related issues inline.`]}),`
`,(0,n.jsxs)(r.li,{children:[`See the helpers section about `,(0,n.jsx)(r.a,{href:`/uilib/usage/first-steps/tools`,children:`Eufemia tools`}),` for more recommendations.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Linting`}),`
`,(0,n.jsxs)(r.p,{children:[`JavaScript and Style linting is mandatory for merging commits in Eufemia. During a commit (locally), your commit content (code) should be tested with both static and integration tests. You may run `,(0,n.jsx)(r.code,{children:`yarn test`}),` or `,(0,n.jsx)(r.code,{children:`yarn test:update`}),` before you try to commit. You may also write new tests for your code before committing.`]}),`
`,(0,n.jsx)(r.p,{children:`The Code Base is based on several Static Tests to help the code to be uniform:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Prettier`}),`
`,(0,n.jsx)(r.li,{children:`ESLint`}),`
`,(0,n.jsx)(r.li,{children:`StyleLint`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`You may consider installing plugins for your editor of choice - to visualize and run the code formatters and linters based on the given config files. This way you can immediately see how the code needs to look.`}),`
`,(0,n.jsx)(r.p,{children:`Either include the plugins in your code editor, or run the following command after you made changes:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`yarn workspace dnb/eufemia lint:js && yarn workspace @dnb/eufemia lint:styles
`})}),`
`,(0,n.jsxs)(r.p,{children:[`For only checking valid formatting, you can run `,(0,n.jsx)(r.code,{children:`yarn workspace @dnb/eufemia prettier:check`}),`. You may want to run `,(0,n.jsx)(r.code,{children:`yarn workspace @dnb/eufemia prettier:write`}),` to format all relevant files.`]}),`
`,(0,n.jsx)(r.p,{children:`Fix the resulting warnings and errors before you commit and merge.`}),`
`,(0,n.jsxs)(r.p,{children:[`The same command as above applies to the workspace: `,(0,n.jsx)(r.code,{children:`yarn workspace dnb-design-system-portal ...`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`TypeScript and type checking`}),`
`,(0,n.jsx)(r.p,{children:`TypeScript types are mandatory for merging commits in Eufemia. During a commit (locally), your commit content (code) should be tested. You may run:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`yarn workspace @dnb/eufemia test:types
`})}),`
`,(0,n.jsx)(r.p,{children:`Fix the resulting warnings and errors before you commit and merge.`}),`
`,(0,n.jsx)(r.h2,{children:`CSS code formatting`}),`
`,(0,n.jsxs)(r.p,{children:[`Eufemia uses `,(0,n.jsx)(r.a,{href:`/uilib/usage/best-practices/for-styling/#styling-structure`,children:`CSS rational order`}),`.`]}),`
`,(0,n.jsx)(r.h2,{children:`Code comments`}),`
`,(0,n.jsx)(r.p,{children:`Commenting code can be a helpful hint to understand written code for other developers trying to get a picture of what's going on. But code comments can also quickly become an extra layer of complexity while reading code.`}),`
`,(0,n.jsx)(r.p,{children:`Follow this list below to increase consistent code:`}),`
`,(0,n.jsxs)(r.ol,{children:[`
`,(0,n.jsx)(r.li,{children:`An intro at the start of a file can give an overview.`}),`
`,(0,n.jsx)(r.li,{children:`Enhance the naming of variables and functions over comments.`}),`
`,(0,n.jsx)(r.li,{children:`Do not explain what code does, but rather what is the rationale behind a block of code.`}),`
`,(0,n.jsx)(r.li,{children:`Code comments should be optional to consume while reading the code. They should be a helping hand – if needed.`}),`
`]}),`
`,(0,n.jsxs)(r.p,{children:[`Eufemia has some (`,(0,n.jsx)(r.code,{children:`multiline-comment-style`}),` and `,(0,n.jsx)(r.code,{children:`spaced-comment`}),`) ESLint and StyleLint rules to enhance consistent code comment styles.`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};