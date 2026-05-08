import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Frequently Asked Questions (FAQ)`}),`
`,(0,n.jsx)(r.h2,{children:`Visual tests and Playwright`}),`
`,(0,n.jsxs)(r.p,{children:[`Jest starts several workers at the same time. When we simulate states on e.g., ToggleButton and Button, Playwright (v1.31.2) struggles to handle this. Some of the hover or focus tests will fail. To ensure Jest never executes several workers at the same time, we set `,(0,n.jsx)(r.code,{children:`--maxWorkers=1`}),`.`]}),`
`,(0,n.jsx)(r.h3,{children:`Installing screenshot browser`}),`
`,(0,n.jsx)(r.p,{children:`For running screenshot tests (visual tests), a headless Firefox browser is needed.`}),`
`,(0,n.jsxs)(r.p,{children:[`In normal circumstances, the browser will be installed automatically via `,(0,n.jsx)(r.code,{children:`yarn install`}),` – but to either upgrade to a newer version, or to wipe out existing versions and run the install manually, you can run these commands, depending on your needs:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`yarn workspace @dnb/eufemia playwright uninstall --all
yarn workspace @dnb/eufemia add -D @playwright/test
yarn workspace @dnb/eufemia playwright install firefox

yarn workspace dnb-design-system-portal playwright uninstall --all
yarn workspace dnb-design-system-portal add -D @playwright/test
yarn workspace dnb-design-system-portal playwright install firefox
`})}),`
`,(0,n.jsx)(r.h4,{children:`Alternative install: skip authentication`}),`
`,(0,n.jsxs)(r.p,{children:[`However, since Node.js and corporate proxies do not enjoy each other's company, this might
fail with an `,(0,n.jsx)(r.code,{children:`Error: unable to get local issuer certificate`}),` error. In that case, your only
option might be to disable all authentication for this command.`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{children:`NODE_TLS_REJECT_UNAUTHORIZED=0 yarn workspace @dnb/eufemia playwright install firefox
`})}),`
`,(0,n.jsx)(r.h4,{children:`Alternative install: manually`}),`
`,(0,n.jsxs)(r.p,{children:[`Or, in the very worst case, you can manually download the zip file that `,(0,n.jsx)(r.code,{children:`yarn workspace  @dnb/eufemia playwright install firefox`}),` attempts to download, and extract the file
("Nightly" for Firefox) to the folder indicated when `,(0,n.jsx)(r.code,{children:`yarn test:screenshots`}),` fails.`]}),`
`,(0,n.jsx)(r.h2,{children:`How can I run all screenshot tests without stopping on first failure?`}),`
`,(0,n.jsx)(r.p,{children:`By default, CI runs only affected screenshot tests based on changed files and reverse dependencies. If a global style change is detected, all screenshot tests are run.`}),`
`,(0,n.jsxs)(r.p,{children:[`To force all screenshot tests and continue after failures, include `,(0,n.jsx)(r.code,{children:`--run-all`}),` in your commit message:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`git commit -m "feat: implement new feature --run-all"
`})}),`
`,(0,n.jsxs)(r.p,{children:[`This disables `,(0,n.jsx)(r.code,{children:`--bail`}),` and runs all screenshot tests, so you can see all visual differences at once.`]}),`
`,(0,n.jsx)(r.p,{children:`The CI/CD pipeline automatically detects this flag and adjusts the test behavior accordingly.`}),`
`,(0,n.jsxs)(r.h3,{children:[`What dies `,(0,n.jsx)(r.code,{children:`build:mini`}),` do?`]}),`
`,(0,n.jsxs)(r.p,{children:[`When running `,(0,n.jsx)(r.code,{children:`build:mini`}),` scripts, the build will be faster and the output will be smaller. It's used for the CI/CD pipeline to build the package for the Sandbox or documentation preview.`]}),`
`,(0,n.jsx)(r.h2,{children:`Dependency issues`}),`
`,(0,n.jsx)(r.h3,{children:`ESLint compat patch`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`We patch `,(0,n.jsx)(r.code,{children:`eslint-plugin-compat`}),` to always report APIs, even inside `,(0,n.jsx)(r.code,{children:`if`}),` statements. The patch lives in `,(0,n.jsx)(r.code,{children:`.yarn/patches/`}),` and is referenced from `,(0,n.jsx)(r.code,{children:`packages/dnb-eufemia/package.json`}),` as `,(0,n.jsx)(r.code,{children:`patch:eslint-plugin-compat@npm:*`}),`. If you reinstall dependencies, keep the patch or reapply it with `,(0,n.jsx)(r.code,{children:`yarn patch-commit`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Jest`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`jsdom `,(0,n.jsx)(r.a,{href:`https://github.com/jsdom/jsdom/releases/tag/21.0.0`,children:`v21`}),` changed `,(0,n.jsx)(r.code,{children:`window`}),`, `,(0,n.jsx)(r.code,{children:`document`}),`, `,(0,n.jsx)(r.code,{children:`location`}),`, and top properties of Window to be non-configurable, which made it impossible to mock `,(0,n.jsx)(r.code,{children:`window.location`}),` via `,(0,n.jsx)(r.code,{children:`Object.defineProperty`}),` in Jest. Jest 30 with `,(0,n.jsx)(r.code,{children:`jest-environment-jsdom`}),` bundles jsdom v26. Tests that need to manipulate the URL now use `,(0,n.jsx)(r.code,{children:`window.history.replaceState`}),` instead of overriding `,(0,n.jsx)(r.code,{children:`window.location`}),`.`]}),`
`]}),`
`,(0,n.jsx)(r.h3,{children:`Babel`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Due to this bug: `,(0,n.jsx)(r.a,{href:`https://github.com/babel/babel/issues/11394`,children:`https://github.com/babel/babel/issues/11394`}),` we add `,(0,n.jsx)(r.code,{children:`.png,.snap`}),` so they do not get copied: `,(0,n.jsx)(r.code,{children:`--extensions '.js,.ts,.tsx,.png,.snap'`})]}),`
`]})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};