import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Hr-DHsI5Xv4.js";import{K as r}from"./index-ppRu2ktv.js";import{t as i}from"./Img-CPHTt9Kz.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...r(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h1,{children:`What you should know before getting started`}),`
`,(0,a.jsx)(t.p,{children:`Before you get started, there are some technical decisions you should know about—as with every project.`}),`
`,(0,a.jsx)(t.p,{children:(0,a.jsx)(t.strong,{children:`Table of Contents`})}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#what-you-should-know-before-getting-started`,children:`What you should know before getting started`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#about-technology`,children:`About technology`})}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#eufemia-is-a-mono-repository`,children:`Eufemia is a Mono Repository`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#dnb-eufemia`,children:`dnb-eufemia`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#dnb-design-system-portal`,children:`dnb-design-system-portal`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#configuration-files`,children:`Configuration files`})}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#about-types`,children:`About Types`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#shared-properties-docs`,children:`Shared Properties docs`})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#about-component-structure`,children:`About component structure`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#component-folder`,children:`Component folder`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#modifications`,children:`Modifications`})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#development-environments`,children:`Development environments`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#eufemia-portal`,children:`Eufemia portal`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#local-build`,children:`Local build`})}),`
`]}),`
`]}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#testing`,children:`Testing`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#run-algolia-search-queries-locally`,children:`Run Algolia search queries locally`})}),`
`]}),`
`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`#what-happens-in-the-build-steps`,children:`What happens in the build steps`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#during-prebuild`,children:`During prebuild`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`#during-postbuild`,children:`During postbuild`})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,a.jsx)(n,{top:`large`}),`
`,(0,a.jsx)(t.h2,{children:`About technology`}),`
`,(0,a.jsxs)(t.p,{children:[`The library consists of React components. The newer components are written as functional components with `,(0,a.jsx)(t.a,{href:`https://reactjs.org/docs/hooks-intro.html`,children:`React hooks`}),`. This was added to React version 16.8 and has become the new standard of React.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Components are written in `,(0,a.jsx)(t.a,{href:`https://www.typescriptlang.org/`,children:`TypeScript`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`Components are styled using `,(0,a.jsx)(t.a,{href:`https://medium.com/@andrew_barnes/bem-and-sass-a-perfect-match-5e48d9bc3894`,children:`nested CSS class selectors`}),` with SCSS and `,(0,a.jsx)(t.a,{href:`https://getbem.com/naming/`,children:`BEM`}),` (Block Element Modifier).`]}),`
`,(0,a.jsx)(t.h2,{children:`Eufemia is a Mono Repository`}),`
`,(0,a.jsx)(t.p,{children:`The Eufemia repository is a monorepo consisting of the following workspaces:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`dnb-design-system-portal`}),`: Source code of the portal website - this website.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:`dnb-eufemia`}),`: Source code of the npm package - where all the components are located.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`dnb-eufemia`}),`
`,(0,a.jsx)(t.p,{children:`The only folders you should need to know about to add new features are:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`src/components`}),`: The folder containing all the components, structured in `,(0,a.jsx)(t.a,{href:`/contribute/first-contribution/before-started#component-folder`,children:`component folders`}),`.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`src/extensions`}),`: The folder containing all extensions, also structured in `,(0,a.jsx)(t.a,{href:`/contribute/first-contribution/before-started#component-folder`,children:`component folders`}),`.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`dnb-design-system-portal`}),`
`,(0,a.jsxs)(t.p,{children:[`The documentation in markdown (MDX) is located at `,(0,a.jsx)(t.code,{children:`src/docs`}),` and the portal will automatically create pages and menu items based on that current structure.`]}),`
`,(0,a.jsxs)(t.p,{children:[`All you need to do to add a new page is to create a new markdown (`,(0,a.jsx)(t.code,{children:`.mdx`}),`) file within one of the folders. All documentation for components and elements are located at `,(0,a.jsx)(t.code,{children:`src/docs/uilib`}),`, which corresponds to the URL `,(0,a.jsx)(t.a,{href:`eufemia.dnb.no/uilib`,children:`eufemia.dnb.no/uilib`}),`.`]}),`
`,(0,a.jsx)(t.h3,{children:`Configuration files`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`ncurc.json`}),` is used to ignore certain dependencies during a dependency update made by `,(0,a.jsx)(t.a,{href:`https://www.npmjs.com/package/npm-check-updates`,children:`npm-check-updates`}),`.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`.eslintrc`}),` is a file with configurations to `,(0,a.jsx)(t.a,{href:`https://eslint.org/docs/user-guide/configuring/`,children:`ESLint`}),`, which is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`.prettierrc`}),` is a file with configurations to `,(0,a.jsx)(t.a,{href:`https://prettier.io/docs/en/configuration.html`,children:`Prettier`}),`, which is a code formatter for multiple languages.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`.stylelintrc`}),` is a file with configurations to `,(0,a.jsx)(t.a,{href:`https://stylelint.io/user-guide/configure`,children:`stylelint`}),`, which is a linter for styling (SCSS/CSS).`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`babel.config.js`}),` configures `,(0,a.jsx)(t.a,{href:`https://babeljs.io/docs/en/configuration`,children:`Babel`}),`, a JavaScript compiler.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`vitest.config.ts`}),` configures `,(0,a.jsx)(t.a,{href:`https://vitest.dev/config/`,children:`Vitest`}),`, the unit testing framework for this project.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`vitest.config.screenshots.ts`}),` configures `,(0,a.jsx)(t.a,{href:`https://vitest.dev/guide/browser/`,children:`Vitest browser mode`}),` (driving Playwright under the hood) for screenshot testing (visual assertion).`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`tsconfig.json`}),` is a file with configurations to `,(0,a.jsx)(t.a,{href:`https://www.typescriptlang.org/docs/handbook/tsconfig-json.html`,children:`TypeScript`}),`.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`About Types`}),`
`,(0,a.jsx)(t.p,{children:`The two main purposes of delivering TypeScript types are:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`Inline property documentation`}),`
`,(0,a.jsx)(t.li,{children:`Property validation and type safety`}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`Components are written in `,(0,a.jsx)(t.a,{href:`https://www.typescriptlang.org/`,children:`TypeScript`}),` (`,(0,a.jsx)(t.code,{children:`.tsx`}),`).`]}),`
`,(0,a.jsx)(t.h4,{children:`Shared Properties docs (legacy)`}),`
`,(0,a.jsxs)(t.p,{children:[`If you have one `,(0,a.jsx)(t.code,{children:`/properties.md`}),` file, but e.g., two components share most or all of the properties—like a component and a provider for that component (Accordion and AccordionProvider)—then you can define both components in the markdown table header name. You can then provide a second table with more specific properties for a second component.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-md`,children:`#### Properties

| Accordion and AccordionProvider Properties | Description                                                           |
| ------------------------------------------ | --------------------------------------------------------------------- |
| \`id\`                                       | _(optional)_ docs.                                                    |
| [Space](/uilib/layout/space/properties)    | _(optional)_ spacing properties like \`top\` or \`bottom\` are supported. |

| AccordionProvider Properties | Description                   |
| ---------------------------- | ----------------------------- |
| \`expandedId\`                 | _(optional)_ expandedId docs. |
`})}),`
`,(0,a.jsx)(t.h2,{children:`About component structure`}),`
`,(0,a.jsx)(t.p,{children:`Eufemia has a couple of common parts, so every component behaves consistently:`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/localization`,children:`Locale`}),` support.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/provider`,children:`Provider`}),` support for centralized property forwarding.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/layout/space`,children:`Spacing`}),` support.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/components/skeleton`,children:`Skeleton`}),` support.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/components/form-label`,children:`FormLabel`}),` / `,(0,a.jsx)(t.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` support if it's a form component.`]}),`
`,(0,a.jsx)(t.li,{children:`Automatic id generation and linking of HTML elements to enhance accessibility.`}),`
`,(0,a.jsxs)(t.li,{children:[`Handling of `,(0,a.jsx)(t.code,{children:`aria-describedby`}),` with `,(0,a.jsx)(t.code,{children:`combineDescribedBy`}),` etc.`]}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`How to add support for each of these is explained in `,(0,a.jsx)(t.a,{href:`/contribute/getting-started#additional-component-support`,children:`Additional support - Getting started`}),`.`]}),`
`,(0,a.jsx)(t.h3,{children:`Component folder`}),`
`,(0,a.jsx)(t.p,{children:`Every component and extension should have a similar structure, as described here.`}),`
`,(0,a.jsxs)(t.p,{children:[`As an example, we show the folder structure of component Breadcrumb. You can also check out the `,(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/breadcrumb`,children:`source on Github`}),`.`]}),`
`,(0,a.jsx)(i,{src:`/images/folder-structure.png`,width:`360`,caption:`Folder structure of component Breadcrumb`,alt:`Folder structure with tests, style, TypeScript files and index files`,right:!0}),`
`,(0,a.jsxs)(t.ol,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:`/__tests__`})}),`: Contains the tests (`,(0,a.jsx)(t.code,{children:`Breadcrumb.test.tsx`}),`) and screenshot tests (`,(0,a.jsx)(t.code,{children:`Breadcrumb.screenshot.test.tsx`}),`) for the component. All screenshots will be placed within the folder `,(0,a.jsx)(t.code,{children:`__snapshots__`}),`.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:`/style`})}),`: Contains the styling of the component. The file `,(0,a.jsx)(t.code,{children:`_breadcrumb.scss`}),` defines all styling using `,(0,a.jsx)(t.a,{href:`https://getbem.com/naming/`,children:`BEM`}),`. `,(0,a.jsx)(t.code,{children:`dnb-breadcrumb.scss`}),` contains the component style exports.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:`Breadcrumb.tsx`})}),` and `,(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:`BreadcrumbItem.tsx`})}),`: The React components for the Breadcrumb are defined and exported from these files.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:`index.js`})}),`: Contains component exports.`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.strong,{children:(0,a.jsx)(t.code,{children:`style.js`})}),`: Contains component style exports.`]}),`
`]}),`
`,(0,a.jsx)(t.h4,{children:`Modifications`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[`Adding theming files under a folder `,(0,a.jsx)(t.code,{children:`style/themes`}),` will unlock the possibility of having different themes in the future. Check out the `,(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/button/style`,children:`source for theming in Button`}),`.`]}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Development environments`}),`
`,(0,a.jsx)(t.p,{children:`There are a couple of environments for different purposes.`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[`For writing documentation and displaying the components, you can run `,(0,a.jsx)(t.a,{href:`/contribute/first-contribution/before-started#eufemia-portal`,children:`the portal`}),` locally.`]}),`
`,(0,a.jsxs)(t.li,{children:[`After development, you can run `,(0,a.jsx)(t.a,{href:`/contribute/getting-started#make-and-run-tests`,children:`your tests`}),`.`]}),`
`,(0,a.jsxs)(t.li,{children:[`If you want to see the local changes in the search results, you can run `,(0,a.jsx)(t.a,{href:`/`,children:`Algolia search queries locally`}),`.`]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Eufemia portal`}),`
`,(0,a.jsxs)(t.p,{children:[`The portal is powered by `,(0,a.jsx)(t.a,{href:`https://vite.dev/`,children:`Vite`}),` with a custom static site generation pipeline for pre-rendered SSR.`]}),`
`,(0,a.jsx)(t.p,{children:`Run the Portal locally:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-bash`,children:`$ yarn start
`})}),`
`,(0,a.jsxs)(t.p,{children:[`This will start the Portal. You can view the portal website by visiting `,(0,a.jsx)(t.a,{href:`http://localhost:8000/`,children:`localhost:8000`}),`.`]}),`
`,(0,a.jsx)(t.p,{children:`Content changes to both Markdown (MDX) files and styles (SCSS) and code changes will be reflected immediately.`}),`
`,(0,a.jsx)(t.h4,{children:`Local build`}),`
`,(0,a.jsx)(t.p,{children:`In case you have to create a local static build of the portal website (for various reasons), you can do so by:`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-bash`,children:`$ yarn workspace dnb-design-system-portal build
`})}),`
`,(0,a.jsxs)(t.p,{children:[`The build will be exported to the `,(0,a.jsx)(t.code,{children:`/public`}),` directory. You can now also run a local static server to view it at the given port `,(0,a.jsx)(t.a,{href:`http://localhost:8000/`,children:`localhost:8000`}),`:`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-bash`,children:`$ yarn workspace dnb-design-system-portal serve
`})}),`
`,(0,a.jsx)(t.h2,{children:`What happens in the build steps`}),`
`,(0,a.jsx)(t.p,{children:`During the build, various things will happen. First, a prebuild step before the build, and afterward a postbuild step.`}),`
`,(0,a.jsx)(t.h3,{children:`During prebuild`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-bash`,children:`$ yarn workspace @dnb/eufemia build
`})}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`Assets are getting generated`}),`
`,(0,a.jsx)(t.li,{children:`All index and lib files are getting generated`}),`
`,(0,a.jsx)(t.li,{children:`All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)`}),`
`,(0,a.jsx)(t.li,{children:`All SCSS styles are validated and compiled`}),`
`,(0,a.jsxs)(t.li,{children:[`Compiled CSS under `,(0,a.jsx)(t.code,{children:`build/**/*.css`}),` is parsed with `,(0,a.jsx)(t.a,{href:`https://github.com/parcel-bundler/lightningcss`,children:`Lightning CSS`}),` so invalid selectors (for example pseudo-elements not last in a compound selector) fail the build`]}),`
`,(0,a.jsx)(t.li,{children:`All bundles get minified`}),`
`,(0,a.jsx)(t.li,{children:`Icons are getting converted`}),`
`]}),`
`,(0,a.jsxs)(t.p,{children:[`To use the local build, you can either run the portal, or use `,(0,a.jsx)(t.code,{children:`yarn link`}),` to link the package with a totally different project.`]}),`
`,(0,a.jsx)(t.h3,{children:`During postbuild`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-bash`,children:`$ yarn workspace @dnb/eufemia postbuild:ci
`})}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`Assets are getting generated`}),`
`,(0,a.jsx)(t.li,{children:`All the lib code gets compiled (ECMAScript 6 and ECMAScript 5.1)`}),`
`,(0,a.jsx)(t.li,{children:`UMD/ESM/ES/CJS bundles are getting generated`}),`
`,(0,a.jsx)(t.li,{children:`TypeScript definitions are getting generated`}),`
`]})]})}function s(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};