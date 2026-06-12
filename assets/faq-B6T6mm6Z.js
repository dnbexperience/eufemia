import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`Frequently Asked Questions (FAQ)`}),`
`,(0,r.jsx)(t.h2,{children:`Visual tests and Vitest browser mode`}),`
`,(0,r.jsxs)(t.p,{children:[`Screenshot tests run with `,(0,r.jsx)(t.a,{href:`https://vitest.dev/guide/browser/`,children:`Vitest browser mode`}),` and use Playwright as the browser provider under the hood. The helper in `,(0,r.jsx)(t.code,{children:`core/vitest-screenshots/`}),` drives a single Firefox page per worker against the running portal on `,(0,r.jsx)(t.code,{children:`http://localhost:8000`}),`. The screenshot config sets `,(0,r.jsx)(t.code,{children:`fileParallelism: true`}),`, so test files run in parallel across workers while tests inside a file run sequentially on the same page.`]}),`
`,(0,r.jsx)(t.h3,{children:`Installing screenshot browser`}),`
`,(0,r.jsx)(t.p,{children:`For running screenshot tests (visual tests), a headless Firefox browser is needed.`}),`
`,(0,r.jsxs)(t.p,{children:[`In normal circumstances, the browser will be installed automatically via `,(0,r.jsx)(t.code,{children:`yarn install`}),` – but to either upgrade to a newer version, or to wipe out existing versions and run the install manually, you can run these commands, depending on your needs:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:`yarn workspace @dnb/eufemia playwright uninstall --all
yarn workspace @dnb/eufemia add -D @playwright/test
yarn workspace @dnb/eufemia playwright install firefox

yarn workspace dnb-design-system-portal playwright uninstall --all
yarn workspace dnb-design-system-portal add -D @playwright/test
yarn workspace dnb-design-system-portal playwright install firefox
`})}),`
`,(0,r.jsx)(t.h4,{children:`Alternative install: skip authentication`}),`
`,(0,r.jsxs)(t.p,{children:[`However, since Node.js and corporate proxies do not enjoy each other's company, this might
fail with an `,(0,r.jsx)(t.code,{children:`Error: unable to get local issuer certificate`}),` error. In that case, your only
option might be to disable all authentication for this command.`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:`NODE_TLS_REJECT_UNAUTHORIZED=0 yarn workspace @dnb/eufemia playwright install firefox
`})}),`
`,(0,r.jsx)(t.h4,{children:`Alternative install: manually`}),`
`,(0,r.jsxs)(t.p,{children:[`Or, in the very worst case, you can manually download the zip file that `,(0,r.jsx)(t.code,{children:`yarn workspace  @dnb/eufemia playwright install firefox`}),` attempts to download, and extract the file
("Nightly" for Firefox) to the folder indicated when `,(0,r.jsx)(t.code,{children:`yarn test:screenshots`}),` fails.`]}),`
`,(0,r.jsx)(t.h2,{children:`How can I run all screenshot tests without stopping on first failure?`}),`
`,(0,r.jsx)(t.p,{children:`By default, CI runs only affected screenshot tests based on changed files and reverse dependencies. If a global style change is detected, all screenshot tests are run.`}),`
`,(0,r.jsxs)(t.p,{children:[`To force all screenshot tests and continue after failures, include `,(0,r.jsx)(t.code,{children:`--run-all`}),` in your commit message:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`git commit -m "feat: implement new feature --run-all"
`})}),`
`,(0,r.jsxs)(t.p,{children:[`This disables `,(0,r.jsx)(t.code,{children:`--bail`}),` and runs all screenshot tests, so you can see all visual differences at once.`]}),`
`,(0,r.jsx)(t.p,{children:`The CI/CD pipeline automatically detects this flag and adjusts the test behavior accordingly.`}),`
`,(0,r.jsxs)(t.h3,{children:[`What does `,(0,r.jsx)(t.code,{children:`build:mini`}),` do?`]}),`
`,(0,r.jsxs)(t.p,{children:[`When running `,(0,r.jsx)(t.code,{children:`build:mini`}),` scripts, the build will be faster and the output will be smaller. It's used for the CI/CD pipeline to build the package for the documentation preview.`]}),`
`,(0,r.jsx)(t.h2,{children:`Dependency issues`}),`
`,(0,r.jsx)(t.h3,{children:`ESLint compat patch`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`We patch `,(0,r.jsx)(t.code,{children:`eslint-plugin-compat`}),` to always report APIs, even inside `,(0,r.jsx)(t.code,{children:`if`}),` statements. The patch lives in `,(0,r.jsx)(t.code,{children:`.yarn/patches/`}),` and is referenced from `,(0,r.jsx)(t.code,{children:`packages/dnb-eufemia/package.json`}),` as `,(0,r.jsx)(t.code,{children:`patch:eslint-plugin-compat@npm:*`}),`. If you reinstall dependencies, keep the patch or reapply it with `,(0,r.jsx)(t.code,{children:`yarn patch-commit`}),`.`]}),`
`]}),`
`,(0,r.jsx)(t.h3,{children:`Babel`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[`Due to this bug: `,(0,r.jsx)(t.a,{href:`https://github.com/babel/babel/issues/11394`,children:`https://github.com/babel/babel/issues/11394`}),` we add `,(0,r.jsx)(t.code,{children:`.png,.snap`}),` so they do not get copied: `,(0,r.jsx)(t.code,{children:`--extensions '.js,.ts,.tsx,.png,.snap'`})]}),`
`]})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};